import { Request, Response } from 'express'
import { Routine } from '../entities/Routine'
import { getUserHash } from '../utils'
import { inject, injectable } from 'inversify'
import { INTERFACE_TYPES } from '../utils/beanFactory'
import { IRoutineRepository } from '../interfaces/IRoutineRepository'
import { IRoutineGroupRepository } from '../interfaces/IRoutineGroupRepository'
import { RoutineGroup } from '../entities/RoutineGroup'
import { RoutineResponse } from '../entities/RoutineResponse'

@injectable()
export class RoutineController {

  private repository: IRoutineRepository
  private routineGroupRepository: IRoutineGroupRepository

  constructor(
    @inject(INTERFACE_TYPES.RoutineRepository) repository: IRoutineRepository,
    @inject(INTERFACE_TYPES.RoutineGroupRepository) routineGroupRepository: IRoutineGroupRepository
  ) {
    this.repository = repository
    this.routineGroupRepository = routineGroupRepository
  }

  public CreateRoutine = async (req: Request, res: Response) => {
    try {
      console.log('CreateRoutine start')
      const { group } = req.body
      let newGroup = null

      if (group?.id) {
        const { id, name, color } = group
        const groupFromDb = await this.routineGroupRepository.findById(id, getUserHash(req))
        if (!groupFromDb) {
          console.log('group : ', group)
          return res.status(404).json({ error: "Routine group not found" })
        }
        groupFromDb.name = name ?? groupFromDb.name
        groupFromDb.color = color ?? groupFromDb.color
        newGroup = await this.routineGroupRepository.update(groupFromDb)
      } else {
        const { id, name, color } = group
        const routineGroup = new RoutineGroup({
          id: id,
          name: name,
          color: color,
          user_hash: getUserHash(req)
        })
        console.log('group : ', group)
        newGroup = await this.routineGroupRepository.create(routineGroup)
      }

      const { id, title, dayOfWeek, startAt, endAt, alarmTime, loopAt } = req.body
      const newRoutine =
        await this.repository.create(
          new Routine({
            id: id,
            routine_group_by_user_id: newGroup.id,
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
      let routines = []
      routines = await this.repository.find(getUserHash(req))
      routines = routines.map(routine => {
        return {id: routine.id.toString(), ...routine, user_hash: undefined}
      })
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

      if (group?.id) {
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

      const { id, title, dayOfWeek, startAt, endAt, alarmTime, loopAt } = req.body
      const routine = new Routine({
        id: id,
        routine_group_by_user_id: newGroup.id,
        title: title,
        day_of_week: dayOfWeek,
        start_at: startAt,
        end_at: endAt,
        alarm_time: alarmTime,
        loop_at: loopAt,
        user_hash: getUserHash(req)
      })
      const updatedRoutine = await this.repository.update(routine)
      res.status(200).json(new RoutineResponse(updatedRoutine))
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({error: error.message})
      }
    }
  }

}
