import { RoutineGroup } from './RoutineGroup'

export class Routine {
  id: number
  routine_group_by_user_id: number
  title: string
  day_of_week: string
  start_at?: string
  end_at?: string
  alarm_time?: string
  loop_at?: string
  completed_at?: string
  user_hash: string
  routine_group_by_user?: RoutineGroup

  constructor({
    id,
    routine_group_by_user_id,
    title,
    day_of_week,
    start_at,
    end_at,
    alarm_time,
    loop_at,
    user_hash,
    completed_at
  }: Routine) {
    if (id) {
      this.id = id
    }
    this.routine_group_by_user_id = routine_group_by_user_id
    this.title = title
    this.day_of_week = day_of_week
    this.start_at = start_at
    this.end_at = end_at
    this.alarm_time = alarm_time
    this.loop_at = loop_at
    this.user_hash = user_hash
    this.completed_at = completed_at
  }

}