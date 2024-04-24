import { defineStore } from 'pinia'
import { getCalendarMonth } from 'mnth'
import type { DiaryProps } from '@/props'

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
      const weeks = getCalendarMonth(date, { firstDayOfWeek: 0 }).map((week) =>
        week.map((day) => day.getTime())
      )
      return weeks.map((times) => {
        return times.map((time) => {
          const result:DiaryProps = {
            id: -1,
            mode: '',
            content: '',
            time: time,
            createdAt: 0,
          }
          return result
        })
      })
    }
  },
})

export default useCalendarStore