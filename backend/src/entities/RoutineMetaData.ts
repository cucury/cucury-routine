export class RoutineMetaData {
  id?: string
  routine_items_user_work_id: string
  completed_dt: string

  constructor({
    id,
    routine_items_user_work_id,
    completed_dt,
  }: RoutineMetaData) {
    if (id) {
      this.id = id
    }
    this.routine_items_user_work_id = routine_items_user_work_id
    this.completed_dt = completed_dt
  }

}