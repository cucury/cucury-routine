import { defineStore } from 'pinia'

interface NavigationsProps {
  Home: number
  Routine: number
  DDay: number
  Diary: number
}
const Navigations: NavigationsProps = {
  Home: 0,
  Routine: 1,
  DDay: 2,
  Diary: 3
}
export const useNaviStore = defineStore('navigation', {
  state: () => ({
    tab: Navigations.Diary,
  }),
  actions: {
    setTab(navi: number) {
      this.tab = navi
    },
  },
})

export default useNaviStore
export { Navigations, type NavigationsProps }