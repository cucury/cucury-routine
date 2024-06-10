import { Routine } from '../entities/Routine'

export interface IRoutineRepository {
  create(routine: Routine): Promise<Routine>
  update(routine: Routine): Promise<Routine>
  find(userHash: string): Promise<Routine[]>
  findById(id: number, userHash: string): Promise<Routine>
  delete(routine: Routine): Promise<Routine>
}