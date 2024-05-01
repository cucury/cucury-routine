import { defineStore } from 'pinia'
import { getCalendarMonth } from 'mnth'
import type { DiaryProps } from '@/props'

export const useCalendarStore = defineStore('calendar', {
  state: (): { currentMonth: Date; selectedDate: Date } => ({
    currentMonth: new Date(),
    selectedDate: new Date()
  }),
  actions: {
    movePrev() {
      const prev = new Date(this.currentMonth)
      prev.setMonth(prev.getMonth(), 0)
      this.setMonth(prev)
    },
    moveNext() {
      const next = new Date(this.currentMonth)
      next.setMonth(next.getMonth() + 2, 0)
      this.setMonth(next)
    },
    getMonth() {
      return this.currentMonth
    },
    setMonth(month: Date) {
      this.currentMonth = new Date(month.getFullYear(), month.getMonth(), 1)
    },
    getSelectedDate() {
      return this.selectedDate
    },
    setSelectedDate(date: Date) {
      this.selectedDate = date
    },
    getWeeks() {
      const date = this.getMonth()
      const weeks = getCalendarMonth(date, { firstDayOfWeek: 0 }).map((week) =>
        week.map((day) => day.getTime())
      )
      return weeks.map((times) => {
        return times.map((time) => {
          const result: DiaryProps = {
            id: -1,
            mood: '',
            content: '',
            time: time,
          }
          return result
        })
      })
    }
  }
})

export default useCalendarStore
