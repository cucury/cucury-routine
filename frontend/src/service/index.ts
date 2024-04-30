import { DayType } from '@/consts'
import { routineServerInstance, authServerInstance } from './cucuryAxios'

export const getDayLabel = (day: number) => {
  return DayType[day]
}

export {
  routineServerInstance,
  authServerInstance
}