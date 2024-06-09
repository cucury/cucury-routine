import { defineStore } from 'pinia'
import type { DiaryProps } from '@/props'

export const useDiaryStore = defineStore('diary', {
  state: (): { diary: DiaryProps | null } => ({
    currentDt: '',
  }),
  actions: {
    getSelectedDiary() {
      return this.diary
    },
    setSelectedDiary(newDiary: DiaryProps) {
      this.diary = newDiary
    },
  }
})

export default useDiaryStore
