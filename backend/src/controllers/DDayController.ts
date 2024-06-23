import { Request, Response } from 'express'
import { getUserHash } from '../utils'
import { inject, injectable } from 'inversify'
import { INTERFACE_TYPES } from '../utils/beanFactory'
import { IDDayRepository } from '../interfaces/IDDayRepository'
import { DDayResponse } from '../entities/DDayResponse'
import { DDay } from '../entities/DDay'

@injectable()
export class DDayController {

  private repository: IDDayRepository

  constructor(
    @inject(INTERFACE_TYPES.DDayRepository) ddayRepository: IDDayRepository
  ) {
    this.repository = ddayRepository
  }

  public GetDDay = async (req: Request, res: Response) => {
    try {
      const ddays = await this.repository.find(getUserHash(req))
      if (ddays.length === 0) {
        return res.status(404).json({error: "No dday found"})
      }
      res.status(200).json(ddays.map(el => new DDayResponse(el)))
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({error: error.message})
      }
    }
  }

  public PostDDay = async (req: Request, res: Response) => {
    try {
      const { name, type, localeDateString } = req.body
      // 데이터 등록 처리
      const dday = await this.repository.create(new DDay({
        name: name,
        type: type,
        locale_date_string: localeDateString,
        user_hash: getUserHash(req)
      }))
      res.status(200).json(new DDayResponse(dday))
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({error: error.message})
      }
    }
  }

  /*
  public DeleteDDay = async (req: Request, res: Response) => {
    try {
      const { routineId, completedDt } = req.params
      const ddays: DDay[] = await this.repository.findByCompletedDt(completedDt, getUserHash(req))
      const dday: DDay = ddays.find(el => {
        return Number(el.routine_items_user_work_id) === Number(routineId)
      })
      if (!dday) {
        return res.status(404).json({error: "No routine found"})
      }
      await this.repository.delete(dday)
      res.status(200).json({ deleted: true })
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({error: error.message})
      }
    }
  }
   */

}
