export class Diary {
  id: string
  mood: string
  time: string
  content: string
  user_hash: string

  constructor({ id, mood, content, time, user_hash }: { id?: string, mood: string, content: string, time: string, user_hash: string}) {
    if (id) {
      this.id = id
    }
    this.mood = mood
    this.content = content
    this.time = time
    this.user_hash = user_hash
  }

}