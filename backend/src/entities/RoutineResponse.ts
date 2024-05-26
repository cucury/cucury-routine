import { RoutineGroupResponse } from './RoutineGroupResponse'
import { Routine } from './Routine'

export class RoutineResponse {
  id: number
  routineGroup?: RoutineGroupResponse
  title: string
  dayOfWeek: string
  startAt: string
  endAt: string
  alarmTime: string
  loopAt: string

  constructor(routine: Routine) {
    const { id, routine_group_by_user, title, day_of_week, start_at, end_at, alarm_time, loop_at } = routine
    this.id = id
    this.routineGroup = new RoutineGroupResponse(<RoutineGroupResponse>{
      id: routine_group_by_user?.id,
      name: routine_group_by_user?.name,
      color: routine_group_by_user?.color
    })
    this.title = title
    this.dayOfWeek = day_of_week
    this.startAt = start_at
    this.endAt = end_at
    this.alarmTime = alarm_time
    this.loopAt = loop_at
  }

}
