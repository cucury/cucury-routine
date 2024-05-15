<template>
  {{ new Date(currentTime).toLocaleDateString() }}
  <div class='flex gap-2 items-center'>
    <button type='button' @click='prevWeek'>
      👈
    </button>
    <div class='flex flex-col gap-2'>
      <div class='flex gap-2'>
        <CucuryRoutineItem
          :key='i'
          v-for='(v,i) in weeks'
          :time='v'
          :isSelected='v === currentTime'
          @click='() => {
            this.currentTime = new Date(v).getTime()
           }' />
      </div>
    </div>
    <button type='button' @click='nextWeek'>
      👉
    </button>
  </div>
</template>

<script lang='ts'>
import { getCalendarMonth } from 'mnth'
import CucuryRoutineItem from './CucuryRoutineItem.vue'
export default {
  name: 'CucuryRoutineList',
  setup() {
    return {
      getCalendarMonth
    }
  },
  components: {
    CucuryRoutineItem
  },
  data(): {
    currentTime: number,
    weeks: Array<number>
  } {
    return {
      currentTime: new Date().getTime(),
      weeks: []
    }
  },
  mounted() {
    this.weeks = this.getWeeks(this.currentTime)
  },
  methods: {
    prevWeek() {
      const prevDate = new Date(this.currentTime)
      prevDate.setDate(prevDate.getDate() - 7)
      this.currentTime = prevDate.getTime()
      this.weeks = this.getWeeks(prevDate.getTime())
    },
    nextWeek() {
      const nextDate = new Date(this.currentTime)
      nextDate.setDate(nextDate.getDate() + 7)
      this.currentTime = nextDate.getTime()
      this.weeks = this.getWeeks(nextDate.getTime())
    },
    getWeeks(time: number) {
      return getCalendarMonth(new Date(time), { firstDayOfWeek: 0 } )
        .filter(el => {
          const currentDate = new Date(time)
          currentDate.setHours(0, 0, 0, 0)
          const currentWeek = el
            .map(e => {
              const currentDate = new Date(e)
              currentDate.setHours(0, 0, 0, 0)
              return currentDate
            })
            .filter(e => e.getTime() === currentDate.getTime()
            )
          return currentWeek.length > 0
        })[0].map(e => e.getTime())
    }
  }
}
</script>

<style scoped>

</style>