import { defineStore } from 'pinia'

export const useDiaryHeaderToggleStore = defineStore('diaryHeaderToggle', {
  state: (): { mode: 'calendar' | 'timeline'} => ({
    mode: 'calendar',
  }),
  actions: {
    toggle() {
      this.mode = this.mode === 'calendar' ? 'timeline' : 'calendar'
    },
    isCalendar() {
      return this.mode === 'calendar'
    },
    isTimeline() {
      return this.mode === 'timeline'
    },
  },
})

export default useDiaryHeaderToggleStore