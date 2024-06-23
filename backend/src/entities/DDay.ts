export class DDay {
  id?: string
  type: string
  locale_date_string: string
  user_hash: string
  name: string

  constructor({
    id,
    type,
    locale_date_string,
    user_hash,
    name
  }: DDay) {
    if (id) {
      this.id = id
    }
    this.type = type
    this.locale_date_string = locale_date_string
    this.user_hash = user_hash
    this.name = name
  }

}