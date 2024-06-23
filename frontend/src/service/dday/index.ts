import { routineServerInstance } from '@/service'
import { DDay } from '@/models/DDay'
const routineServer = routineServerInstance()

export const getDDay = (anniversaryDate: Date) => {
  const today = new Date()
  // 연도가 바뀌는 것은 무시할 것.
  anniversaryDate.setFullYear(today.getFullYear())
  const dDay = Math.ceil((anniversaryDate.getTime() - today.getTime()) / (1000 * 3600 * 24))
  if (dDay === 0) {
    // 디 데이가 오늘일 경우 0일 돌려줘서 오늘이 디데이라는 것을 알림
    return dDay
  } else {
    // 만약 디데이가 1/1일이고
    if (dDay < 0) {
      // 입력 값이 12/31일 일 때 예상 결과는 D-364
      return dDay + 365
    } else {
      // 입력 값이 1/2일 일 때 예상 결과는 D-1
      return dDay
    }
  }
}
/**
 * isInvalidDate('2024-02-31') true
 * isInvalidDate('2024-02-01') false
 * isInvalidDate('2024-03-31') false
 */
export const isInvalidDate = (localeDateString: string) => {
  if (!RegExp(/^[1|2]\d{3}-\d{1,2}-\d{1,2}$/).exec(localeDateString)) {
    return true
  }
  try {
    const target =  new Date(localeDateString).toLocaleDateString('sv-SE')
    return target !== localeDateString
  } catch(e) {
    return true
  }
}

export const postAsyncDDay = async(dDay: DDay) => {
  const res = await routineServer.post('/d-day', dDay)
  return res.data
}

export const getAsyncDDays = async(): Promise<Array<DDay>> => {
  const res = await routineServer.get('/d-day')
  return res.data
}
