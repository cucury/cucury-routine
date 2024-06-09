import { RoutineMetaData } from './RoutineMetaData'

export class RoutineMetaDataResponse {
  routineId: string
  completedDt: string

  constructor({
    routine_items_user_work_id,
    completed_dt,
  }: RoutineMetaData
  ) {

    this.routineId = routine_items_user_work_id
    this.completedDt = completed_dt
  }
}