import { RoutineGroup } from '../entities/RoutineGroup'

export interface IRoutineGroupRepository {
  create(diary: RoutineGroup): Promise<RoutineGroup>
  update(diary: RoutineGroup): Promise<RoutineGroup>
  find(userHash: string): Promise<RoutineGroup[]>
  findById(id: number, userHash: string): Promise<RoutineGroup>
}