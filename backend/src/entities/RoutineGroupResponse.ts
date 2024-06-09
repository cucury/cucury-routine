export class RoutineGroupResponse {
  id: number
  name: string
  color: string

  constructor({
    id,
    name,
    color,
  }:RoutineGroupResponse) {
    if (id) {
      this.id = id
    }
    this.name = name
    this.color = color
  }
}
