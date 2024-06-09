import { Request, Response } from 'express'
import { getUserHash } from '../utils'
import { inject, injectable } from 'inversify'
import { INTERFACE_TYPES } from '../utils/beanFactory'
import { IRoutineMetaDataRepository } from '../interfaces/IRoutineMetaDataRepository'
import { RoutineMetaDataResponse } from '../entities/RoutineMetaDataResponse'
import { RoutineMetaData } from '../entities/RoutineMetaData'

@injectable()
export class RoutineMetaDataController {

  private repository: IRoutineMetaDataRepository

  constructor(
    @inject(INTERFACE_TYPES.RoutineMetaDataRepository) routineMetaDataRepository: IRoutineMetaDataRepository
  ) {
    this.repository = routineMetaDataRepository
  }

  public PostRoutineMetaData = async (req: Request, res: Response) => {
    try {
      const { routineId, completedDt } = req.body
      const routineMetaDatas: RoutineMetaData[] = await this.repository.findByCompletedDt(completedDt, getUserHash(req))
      let routineMetaData: RoutineMetaData = routineMetaDatas.find(el => el.routine_items_user_work_id === routineId)

      // 해당 데이터가 벌써 존재한다면 입력 처리를 하지 않을 것..
      // 기본적으로는 발생되지 않을 처리(루틴 완료처리를 취소할 때는 데이터를 삭제하기 때문)
      if (routineMetaData) {
        return res.status(200).json(new RoutineMetaDataResponse(routineMetaData))
      }

      // 데이터 등록 처리
      routineMetaData = await this.repository.create(new RoutineMetaData({
        routine_items_user_work_id: routineId,
        completed_dt: completedDt
      }))

      res.status(200).json(new RoutineMetaDataResponse(routineMetaData))
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({error: error.message})
      }
    }
  }

  public DeleteRoutineMetaData = async (req: Request, res: Response) => {
    try {
      const { routineId, completedDt } = req.params
      const routineMetaDatas: RoutineMetaData[] = await this.repository.findByCompletedDt(completedDt, getUserHash(req))
      const routineMetaData: RoutineMetaData = routineMetaDatas.find(el => {
        return Number(el.routine_items_user_work_id) === Number(routineId)
      })
      if (!routineMetaData) {
        return res.status(404).json({error: "No routine found"})
      }
      await this.repository.delete(routineMetaData)
      res.status(200).json({ deleted: true })
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({error: error.message})
      }
    }
  }

}
