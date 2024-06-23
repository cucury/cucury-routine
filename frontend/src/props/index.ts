export interface DiaryProps {
  id: number | null
  content: string
  mood: string
  time: number
}

export interface LunarDateProps {
  dateString: string,
  isValidDate: boolean
}
