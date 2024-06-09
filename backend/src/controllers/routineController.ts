import { Request, Response } from 'express'
import { Routine } from '../entities/Routine'
import { getUserHash } from '../utils'
import { inject, injectable } from 'inversify'
import { INTERFACE_TYPES } from '../utils/beanFactory'
import { IRoutineRepository } from '../interfaces/IRoutineRepository'
import { IRoutineGroupRepository } from '../interfaces/IRoutineGroupRepository'
import { RoutineGroup } from '../entities/RoutineGroup'
import { RoutineResponse } from '../entities/RoutineResponse'
import { IRoutineMetaDataRepository } from '../interfaces/IRoutineMetaDataRepository'
import { RoutineMetaData } from '../entities/RoutineMetaData'
import { RoutineResponseWithCompletedDt } from '../entities/RoutineResponseWithCompletedDt'
import { Dictionary, groupBy } from 'lodash'
import { RoutineResponseByCompletedDt } from '../entities/RoutineResponseByCompletedDt.ts'

@injectable()
export class RoutineController {

  private repository: IRoutineRepository
  private routineGroupRepository: IRoutineGroupRepository
  private routineMetaDataRepository: IRoutineMetaDataRepository

  constructor(
    @inject(INTERFACE_TYPES.RoutineRepository) repository: IRoutineRepository,
    @inject(INTERFACE_TYPES.RoutineGroupRepository) routineGroupRepository: IRoutineGroupRepository,
    @inject(INTERFACE_TYPES.RoutineMetaDataRepository) routineMetaDataRepository: IRoutineMetaDataRepository
  ) {
    this.repository = repository
    this.routineGroupRepository = routineGroupRepository
    this.routineMetaDataRepository = routineMetaDataRepository

  }

  public CreateRoutine = async (req: Request, res: Response) => {
    try {
      const { group } = req.body
      let newGroup = null

      if (group?.id) {
        if (Number(group.id) > -1) {
          const { id, name, color } = group
          const groupFromDb = await this.routineGroupRepository.findById(id, getUserHash(req))
          if (!groupFromDb) {
            return res.status(404).json({ error: "Routine group not found" })
          }
          groupFromDb.name = name ?? groupFromDb.name
          groupFromDb.color = color ?? groupFromDb.color
          newGroup = await this.routineGroupRepository.update(groupFromDb)
        } else {
          // -1은 그룹 없음
        }
      } else {
        const { id, name, color } = group
        const routineGroup = new RoutineGroup({
          id: id,
          name: name,
          color: color,
          user_hash: getUserHash(req)
        })
        newGroup = await this.routineGroupRepository.create(routineGroup)
      }

      const { id, title, dayOfWeek, startAt, endAt, alarmTime, loopAt } = req.body
      const newRoutine =
        await this.repository.create(
          new Routine({
            id: id,
            routine_group_by_user_id: newGroup?.id,
            title: title,
            day_of_week: dayOfWeek,
            start_at: startAt,
            end_at: endAt,
            alarm_time: alarmTime,
            loop_at: loopAt,
            user_hash: getUserHash(req)
          }))
      res.status(201).json(new RoutineResponse(newRoutine))
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message })
      }
    }
  }

  public GetRoutine = async (req: Request, res: Response) => {
    try {
      const routines = await this.repository.find(getUserHash(req))
      if (routines.length === 0) {
        return res.status(404).json({error: "No routine found"})
      }
      res.status(200).json(routines.map(routine => new RoutineResponse(routine)))
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({error: error.message})
      }
    }
  }

  public GetRoutineByCompletedDt = async (req: Request, res: Response) => {
    try {
      const completedDt: string = <string>req.params.completedDt
      if (!completedDt) {
        res.status(400).json({error: "Invalid completed date"})
      }
      let routines = await this.repository.find(getUserHash(req))

      // 루틴의 요일 배정에 따라서 제외하는 처리
      const day = new Date(completedDt).getDay()
      routines = routines.filter(el =>
        el.day_of_week
          .split(",")
          .map(d =>
            Number(d)).includes(day))


      const routineMetaData: RoutineMetaData[] =
        await this.routineMetaDataRepository.findByCompletedDt(completedDt, getUserHash(req))

      /**
       * 상당히.. 복잡한 로직이다..
       * 이유는 routineWithMetaList 를 groupBy 를 통해 group.id 로 묶어주고
       * group.id 를 통해 routineGroup 을 찾아서 RoutineGroupResponse 를 만들어야 하고
       * 그리고 RoutineGroupResponse 를 RoutineResponse 에 넣어주어야 한다.
       * 그리고 RoutineResponse 를 RoutineResponseByCompletedDt 에 넣어주어야 한다.
       * 그리고 이를 전부 묶어서 return 해주어야 한다.

       * 이렇게 된 경위는 단순한데.. prisma에서 아우터 조인을 할수 없는 제약이 있다.
       * According to the Prisma documentation, lists cannot be optional:
       * https:*www.prisma.io/docs/reference/api-reference/prisma-schema-reference#remarks-5
       * 즉 조인 대상이 리스트일 경우는 무조건 값이 존재해야하는 것이다.

       * 하지만 사양 상 루틴 그룹이 없을 수도 있고, 루틴 그룹이 있을 수도 있다.
       * 그리고 루틴이 성공했는지 기억하는 루틴 메타 데이터가 있을 수도 있고 없을 수도 있다.
       */
      const completedRoutineIds = routineMetaData.map(routine => Number(routine.routine_items_user_work_id))
      const routineGroupByGroupId: Dictionary<Routine[]> = groupBy(routines, 'routine_group_by_user.id')
      const groupIds = Object.keys(routineGroupByGroupId)

      // 취득한 데이터를 바탕으로 응답 데이터를 작성한다.
      const routineGroupList = groupIds.map(key => {

        // 그룹 별로 분류한 데이터에서 그룹에 속한 루틴의 리스트를 추출한다.
        const routines: Routine[] = routineGroupByGroupId[key]

        // 루틴별로 완료 체크박스가 활성화 됐는지 안됐는지에 대한 정보의 초기값을 입력해준다.
        // 루틴 중에 완료된 체크박스가 있다면 체크를 해준다.
        const routinesByCompletedDt: RoutineResponseWithCompletedDt[] =
          routines.map(el => new RoutineResponseWithCompletedDt(el, completedRoutineIds.includes(el.id)))

        // 기본적으로 그룹 별로 분류한 데이터기 때문에 같은 그룹이므로 가장 첫 루틴에서 공통의 그룹정보를 추출한다.
        const [ firstRoutine ] = routinesByCompletedDt
        const { routineGroup } = firstRoutine

        // 그룹과 루틴의 정보를 같은 계층으로 재구성한다.
        return new RoutineResponseByCompletedDt(
          routineGroup,
          routinesByCompletedDt
        )
      })

      // 결과값을 response 해준다.
      res.status(200).json(routineGroupList)
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({error: error.message})
      }
    }
  }

  public GetRoutineById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const routine = await this.repository.findById(Number(id), getUserHash(req))
      if (!routine) {
        return res.status(404).json({error: "No routine found"})
      }
      res.status(200).json(new RoutineResponse(routine))
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({error: error.message})
      }
    }
  }

  public UpdateRoutine = async (req: Request, res: Response) => {
    try {
      const { group } = req.body
      let newGroup = null

      if (group) {
        if (group.id) {
          const { id, name, color } = group
          const groupFromDb = await this.routineGroupRepository.findById(id, getUserHash(req))
          if (!groupFromDb) {
            return res.status(404).json({ error: "Routine group not found" })
          }
          groupFromDb.name = name ?? groupFromDb.name
          groupFromDb.color = color ?? groupFromDb.color
          newGroup = await this.routineGroupRepository.update(groupFromDb)
        } else {
          const { id, name, color } = group
          newGroup = await this.routineGroupRepository.create(new RoutineGroup({
            id: id,
            name: name,
            color: color,
            user_hash: getUserHash(req)
          }))
        }
      }

      const { id, title, dayOfWeek, startAt, endAt, alarmTime, loopAt } = req.body
      const routineByDb = await this.repository.findById(id, getUserHash(req))
      if ( group ) {
        routineByDb.routine_group_by_user_id = newGroup?.id ?? routineByDb.routine_group_by_user_id
      }
      routineByDb.title = title ?? routineByDb.title
      routineByDb.day_of_week = dayOfWeek || routineByDb.day_of_week
      routineByDb.start_at = startAt || routineByDb.start_at
      routineByDb.end_at = endAt || routineByDb.end_at
      routineByDb.alarm_time = alarmTime || routineByDb.alarm_time
      routineByDb.loop_at = loopAt || routineByDb.loop_at

      delete routineByDb.routine_group_by_user
      const updatedRoutine = await this.repository.update(routineByDb)
      res.status(200).json(new RoutineResponse(updatedRoutine))
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({error: error.message})
      }
    }
  }

}
