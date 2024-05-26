import { IRoutineInteractor } from '../../interfaces/IRoutineInteractor'
import { Routine } from '../../entities/Routine'
import { IRoutineRepository } from '../../interfaces/IRoutineRepository'
import { inject, injectable } from 'inversify'
import { INTERFACE_TYPES } from '../../utils/beanFactory'

@injectable()
export class RoutineInteractor implements IRoutineInteractor {
  private repository: IRoutineRepository

  constructor(
    @inject(INTERFACE_TYPES.RoutineRepository) repository: IRoutineRepository
  ) {
    this.repository = repository
  }

  async createRoutine({mood, content, time, user_hash}: Routine): Promise<Routine> {
    return this.repository.create(new Routine({ mood, content, time, user_hash }))
  }

  async updateRoutine({id, mood, content, time, user_hash}: Routine): Promise<Routine> {
    const routine: Routine = await this.getRoutineById(Number(id), user_hash)
    routine.mood = mood || routine.mood
    routine.content = content || routine.content
    routine.time = time || routine.time
    return this.repository.update(routine)
  }

  async getDiaries(userHash: string): Promise<Routine[]> {
    return this.repository.find(userHash)
  }

  async getRoutineById(id: number, userHash: string): Promise<Routine> {
    return this.repository.findById(id, userHash)
  }
}
