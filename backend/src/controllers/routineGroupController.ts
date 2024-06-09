import { Request, Response } from 'express'
import { getUserHash } from '../utils'
import { inject, injectable } from 'inversify'
import { INTERFACE_TYPES } from '../utils/beanFactory'
import { IRoutineGroupRepository } from '../interfaces/IRoutineGroupRepository'
import { RoutineGroupResponse } from '../entities/RoutineGroupResponse'

@injectable()
export class RoutineGroupController {

  private repository: IRoutineGroupRepository

  constructor(
    @inject(INTERFACE_TYPES.RoutineGroupRepository) routineGroupRepository: IRoutineGroupRepository
  ) {
    this.repository = routineGroupRepository
  }

  public GetRoutineGroup = async (req: Request, res: Response) => {
    try {
      const routineGroups = await this.repository.find(getUserHash(req))
      if (routineGroups.length === 0) {
        return res.status(404).json({error: "No routine found"})
      }
      res.status(200).json(routineGroups.map(el => new RoutineGroupResponse(el)))
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({error: error.message})
      }
    }
  }

  public GetRoutineGroupById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const routineGroup = await this.repository.findById(Number(id), getUserHash(req))
      if (!routineGroup) {
        return res.status(404).json({error: "No routine found"})
      }
      res.status(200).json(new RoutineGroupResponse(routineGroup))
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({error: error.message})
      }
    }
  }
}
