import { DDay } from '../entities/DDay'

export interface IDDayRepository {
  create(dDay: DDay): Promise<DDay>
  update(dDay: DDay): Promise<DDay>
  delete(dDay: DDay): Promise<DDay>
  find(userHash: string): Promise<DDay[]>
  findById(id: number, userHash: string): Promise<DDay>
}