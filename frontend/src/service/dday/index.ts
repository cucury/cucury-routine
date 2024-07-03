import { routineServerInstance } from '@/service'
import { DDay } from '@/models/DDay'
import { Result, Ok, Err } from 'ts-results' 
import solarlunar from 'solarlunar'

const routineServer = routineServerInstance()

export const getDDay = (anniversaryDate: Date): number => {
  const today = new Date()
  // 연도가 바뀌는 것은 무시할 것.
  anniversaryDate.setFullYear(today.getFullYear())
  const dDay: number = Math.ceil((anniversaryDate.getTime() - today.getTime()) / (1000 * 3600 * 24))
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

export const getLunar = ({anniversaryDate}: {anniversaryDate: string}) => {
  let selectedDate = null 
  try {
    selectedDate = new Date(anniversaryDate)
  } catch(e) {
    return Err(new Error("올바르지 않은 날짜입니다."))
  }

  const lunar = solarlunar.lunar2solar(
    selectedDate.getFullYear(),
    selectedDate.getMonth() +1,
    selectedDate.getDate())
  if (isInvalidDate(anniversaryDate)) {
    return Err(new Error("음력 날짜를 계산할 수 없습니다."))
  } else if (!lunar.cYear
  || !lunar.cMonth
  || !lunar.cDay
  || lunar === -1
  ) {
    return Err(new Error(`음력 ${anniversaryDate}은 존재하지 않는 날짜입니다.`))
  } else {
    const mm = lunar.cMonth.toString().padStart(2, "0")
    const dd = lunar.cDay.toString().padStart(2, "0")
    const dateString = `${lunar.cYear}-${mm}-${dd}`
    return Ok(dateString)
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

export const getDDayTextByLunarBirthday = ({ 
  lunar, 
  howManyDay 
}: {
  lunar: Ok<string> | Err<Error>,
  howManyDay: number
}): string => {
  if (lunar.err) {
    return "올바르지 않은 날짜입니다."
  } else if(howManyDay === 0) {
    return "D-DAY"
  } else {
    return "D-" + howManyDay
  }
}

export const getDDayTextBySolarBirthday = ({ 
  howManyDay 
}: {
  howManyDay: number
}) => {
  if (isNaN(howManyDay)) {
    return "올바르지 않은 날짜입니다."
  } else if(howManyDay === 0) {
    return "D-DAY"
  } else {
    return "D-" + howManyDay
  }
}

export const getDDayTextByCouple = ({
  howManyDay
}: {
  howManyDay: number
}) => {
  if (isNaN(howManyDay)) {
    return "올바르지 않은 날짜입니다."
  } else if(howManyDay > 0) {
    return howManyDay + "일"
  } else {
    return Math.abs(howManyDay - 1) + "일 전"
  }
}

export const getDDayTextByExam = ({ 
  howManyDay 
}: {
  howManyDay: number
}) => {
 if (isNaN(howManyDay)) {
   return "올바르지 않은 날짜입니다."
  } else if(howManyDay === 0) {
    return "D-DAY"
  } else {
    return "D-" + howManyDay
 }
}

export const getDDayTextByJapaneseAge = ({
  howManyDay
}: {
  howManyDay: number
}) => {
 if (isNaN(howManyDay)) {
    return "올바르지 않은 날짜입니다."
 } else if(howManyDay > 0) {
    return howManyDay + "일"
 } else {
    return Math.abs(howManyDay - 1) + "일 전"
 }
}

export const getDDayTextByTrip = ({
  howManyDay
}: {
  howManyDay: number
}) => {
 if (isNaN(howManyDay)) {
    return "올바르지 않은 날짜입니다."
 } else if(howManyDay === 0) {
    return "D-DAY"
 } else if(howManyDay > 0) {
    return "D-" + howManyDay
 } else {
    return "D+" + Math.abs(howManyDay)
 }
}

export const getHowManyDay = (anniversaryDate: Date): number => {
  const today = new Date()
  const dDay: number = Math.floor((anniversaryDate.getTime() - today.getTime()) / (1000 * 3600 * 24))
  return dDay
}
