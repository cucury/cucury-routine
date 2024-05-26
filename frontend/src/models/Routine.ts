export class Routine {
  constructor(param: { dayForWeek: any[]; routineGroupByUser: RoutineGroup }) {
    this.dayForWeek = param.dayForWeek
    this.routineGroupByUser = param.routineGroupByUser
  }

  id?:number
  title:string
  dayForWeek:Array<number>
  startAt?:Date
  endAt?:Date
  alarmTime?:string
  loopAt?:Date
  routineGroupByUser?:RoutineGroup
}

export class RoutineGroup {
  constructor(param: { id: number | null, name: string, color: string }) {
    this.id = param.id
    this.name = param.name
    this.color = param.color
  }
  id?:number | null
  name:string
  color:string
}

