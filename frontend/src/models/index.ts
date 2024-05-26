import type { DiaryProps } from '@/props'
import type { Routine, RoutineGroup } from './Routine'

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

export { Routine, RoutineGroup }