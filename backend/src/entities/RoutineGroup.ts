export class RoutineGroup {
  id: number
  name: string
  color: string
  user_hash: string

  constructor({
    id,
    name,
    color,
    user_hash,
  }: RoutineGroup) {
    if (id) {
      this.id = id
    }
    this.name = name
    this.color = color
    this.user_hash = user_hash
  }

}