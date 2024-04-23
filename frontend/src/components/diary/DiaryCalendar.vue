<script lang="ts">
import { defineComponent } from 'vue'
import { getCalendarMonth } from 'mnth'
import useCalendarStore from '@/stores/calendar'
import CalendarRow from '@/components/diary/calendar/CalendarRow.vue'

interface DiaryProps {
  id?: number
  time?: string
  mode?: string
  day: Array<number>
}

export default defineComponent({
  name: 'DiaryCalender',
  components: { CalendarRow },
  setup() {
    const calendar = useCalendarStore()
    return {
      calendar
    }
  },
  data() {
    return {
      diarys: [
        {
          id: 1,
          time: '1711942194833',
          mode: '평범'
        },
        {
          id: 2,
          time: '1712028625725',
          mode: '행복'
        },
        {
          id: 3,
          time: '1713842877069',
          mode: '평온'
        },
      ]
    }
  },
  computed: {
    weeks() {
      let weeks = []
      weeks = [...this.calendar.getWeeks()]
      weeks.map((day) => {
        const result:DiaryProps = {
          id: undefined,
          time: undefined,
          mode: undefined,
          day: day
        }
        const diary = this.diarys.find((diary) => {
          const diaryDate = new Date(diary.time)
          return diaryDate.getFullYear() === this.calendar.currentDate.getFullYear() &&
            diaryDate.getMonth() === this.calendar.currentDate.getMonth() &&
            diaryDate.getDate() === day
        })
        if (diary) {
          result.mode = diary.mode
        }
        return {
          day,
          mode: diary ? diary.mode : null,
          time: diary.time
        }
      })
      return weeks
    },
  },
})
</script>

<template>
  <div>
    <div class="flex justify-between">
      <div class="flex flex-col">
        <div v-for="(week,i) in weeks" :key="i">
          <div class="flex">
            <CalendarRow :dates="week" :current-date="calendar.currentDate" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>