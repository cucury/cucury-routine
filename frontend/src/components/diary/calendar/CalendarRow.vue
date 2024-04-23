<script lang="ts">
import { defineComponent } from 'vue'
import CalendarItem from '@/components/diary/calendar/CalendarItem.vue'

export default defineComponent({
  name: 'CalendarRow',
  props: {
    dates: {
      type: Array<String | number>,
      required: true
    },
    currentDate: {
      type: Date,
      required: true
    }
  },
  data() {
    return {
      mode: '평범'
    }
  },
  methods : {
    isToday(day: number) {
      const current = this.getDate(day).setHours(0, 0, 0, 0)
      const today = new Date().setHours(0, 0, 0, 0)
      console.log(day, this.getDate(day), new Date(), current === today)
      return current === today
    },
    getDate(day: number) {
      const date = new Date()
      date.setDate(day)
      return date
    }
  },
  components: {
    CalendarItem
  }
})
</script>

<template>
  <div>
    <div class="flex justify-between">
      <div class="flex gap-2">
        <CalendarItem :key="Number(day)" v-for="day in dates" :day="day.toString()" :isToday="isToday(Number(day))" :mode="mode" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>