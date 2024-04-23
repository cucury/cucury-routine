import { defineStore } from 'pinia'
import { getCalendarMonth } from 'mnth'

export const useCalendarStore = defineStore('calendar', {
  state: () => ({
    currentDate: new Date(),
  }),
  actions: {
    setDate(date: Date) {
      this.currentDate = new Date(date.getFullYear(), date.getMonth(), 1)
    },
    getDate() {
      return this.currentDate
    },
    getWeeks() {
      const date = new Date()
      return getCalendarMonth(date, { firstDayOfWeek: 0 }).map((week) =>
        week.map((day) => day.getDate())
      )
    }
  },
})

export default useCalendarStore