import { RoutineGroup } from '../src/entities/RoutineGroup'
import { RoutineMetaData } from '../src/entities/RoutineMetaData'

export type Routine = {
  id?:number
  group?:RoutineGroup
  title:string
  dayOfWeek: string
  startAt?:Date
  endAt?:Date
  alarmTime?:string
  loopAt?:Date
  userHash: string
  routineGroup: RoutineGroup | null
  routineMetaData: RoutineMetaData[] | null
}