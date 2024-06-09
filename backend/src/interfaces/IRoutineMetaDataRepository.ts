import { RoutineMetaData } from '../entities/RoutineMetaData'

export interface IRoutineMetaDataRepository {
  create(routineMetaData: RoutineMetaData): Promise<RoutineMetaData>
  update(routineMetaData: RoutineMetaData): Promise<RoutineMetaData>
  delete(routineMetaData: RoutineMetaData): Promise<RoutineMetaData>
  find(userHash: string): Promise<RoutineMetaData[]>
  findByCompletedDt(completeDt: string, userHash: string): Promise<RoutineMetaData[]>
  findById(routineId: number, completeDt: number, userHash: string): Promise<RoutineMetaData>
}