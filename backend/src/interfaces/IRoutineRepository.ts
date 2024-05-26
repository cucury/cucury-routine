import { Routine } from '../entities/Routine'

export interface IRoutineRepository {
  create(diary: Routine): Promise<Routine>
  update(diary: Routine): Promise<Routine>
  find(userHash: string): Promise<Routine[]>
  findById(id: number, userHash: string): Promise<Routine>
}