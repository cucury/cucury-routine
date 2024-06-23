export class DDay {
  constructor({id, name, localeDateString, type}: { id?: number; name: string; localeDateString: string; type: string }) {
    if (id) {
        this.id = id
    }
    this.name = name
    this.localeDateString = localeDateString
    this.type = type
  }
  id?: number
  name: string
  localeDateString: string
  type: number

}