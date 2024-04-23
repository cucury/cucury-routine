import { DayType } from '@/consts'

export const getDayLabel = (day: number) => {
  return DayType[day]
}