export class Routine {
  constructor(param: { id?: number; title?: string; dayOfWeek: Array<number>; group: RoutineGroup; completedDt?: string}) {
    this.id = param.id
    if (param.title) {
      this.title = param.title
    }
    this.completedDt = param.completedDt
    this.dayOfWeek = param.dayOfWeek.join(',')
    this.group = param.group
  }

  private dayOfWeek: string
  id?:number
  group?:RoutineGroup
  title:string
  startAt?:Date
  endAt?:Date
  alarmTime?:string
  loopAt?:Date
  completedDt?:string

  get _dayOfWeek(): number[] {
    return this.dayOfWeek.split(",").map(s => Number(s))
  }
  set _dayOfWeek(value) {
    this.dayOfWeek = value.join(",")
  }
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

