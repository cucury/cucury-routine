import type { DiaryProps } from '@/props'

export class Diary implements DiaryProps {
  constructor(id: number|null, mood: string, content: string, time: number) {
    this.id = id
    this.mood = mood
    this.content = content
    this.time = time
  }
  id
  mood
  content
  time

}