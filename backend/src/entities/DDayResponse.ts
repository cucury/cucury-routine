import { DDay } from './DDay'

export class DDayResponse {
  id?: string
  type: string
  localeDateString: string
  name: string

  constructor({
    id,
    type,
    locale_date_string,
    name
  }: DDay) {
    if (id) {
      this.id = id
    }
    this.type = type
    this.name = name
    this.localeDateString = locale_date_string
  }

}