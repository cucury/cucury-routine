<template>
  <div class='flex items-center gap-2 relative pt-2'>
    <div class='flex items-center'>
      {{ new Date(currentTime).toLocaleDateString() }}
    </div>
    <a
      v-if='new Date(currentTime).toLocaleDateString("sv-SE") !== new Date().toLocaleDateString("sv-SE")'
      class='bg-black text-white p-1 rounded-lg flex items-center gap-1 cursor-pointer absolute right-[-4.4rem]'
      @click='() => {
        this.currentTime = new Date().getTime()
        this.weeks = this.getWeeks(this.currentTime)
        this.$emit("update:current-time", this.currentTime)
      }'
    >
      <div>
        <svg class="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m16 10 3-3m0 0-3-3m3 3H5v3m3 4-3 3m0 0 3 3m-3-3h14v-3"/>
        </svg>
      </div>
      <div>
        Today︎
      </div>
    </a>
  </div>
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
          :isSelected='Number(v) === Number(currentTime)'
          @click='() => {
            this.currentTime = new Date(v).getTime()
            this.$emit("update:current-time", this.currentTime)
           }' >
          v: {{Number(v) === Number(currentTime)}}
        </CucuryRoutineItem>
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
    this.$emit("update:current-time", this.currentTime)
  },
  methods: {
    prevWeek() {
      const prevDate = new Date(this.currentTime)
      prevDate.setDate(prevDate.getDate() - 7)
      this.currentTime = prevDate.getTime()
      this.$emit("update:current-time", this.currentTime)
      this.weeks = this.getWeeks(prevDate.getTime())
    },
    nextWeek() {
      const nextDate = new Date(this.currentTime)
      nextDate.setDate(nextDate.getDate() + 7)
      this.currentTime = nextDate.getTime()
      this.$emit("update:current-time", this.currentTime)
      this.weeks = this.getWeeks(nextDate.getTime())
    },
    getWeeks(time) {
      return getCalendarMonth(new Date(time), { firstDayOfWeek: 0 } )
        .filter(el => {
          const currentDate = new Date(time).toLocaleDateString("sv-SE")
          const currentWeek =
            el
            .map(e => new Date(e).toLocaleDateString("sv-SE"))
            .filter(e => e === currentDate)
          return currentWeek.length > 0
        })[0].map(e => e.getTime())
    }
  }
}
</script>

<style scoped>

</style>