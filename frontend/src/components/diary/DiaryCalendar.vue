<script lang="ts">
import { defineComponent } from 'vue'
import useCalendarStore from '@/stores/calendar'
import CalendarRow from '@/components/diary/calendar/CalendarRow.vue'
import type { DiaryProps } from '@/props'

export default defineComponent({
  name: 'DiaryCalender',
  components: { CalendarRow },
  setup() {
    const calendar = useCalendarStore()
    return {
      calendar
    }
  },
  data(): { diaries: Array<DiaryProps> } {
    return {
      diaries: [
        {
          id: 1,
          time: new Date('2024. 4. 20.').getTime(),
          mode: '평범',
          content: '',
          createdAt: 0
        },
        {
          id: 2,
          time: new Date('2024. 4. 21.').getTime(),
          mode: '행복',
          content: '',
          createdAt: 0
        },
        {
          id: 3,
          time: new Date('2024. 4. 22.').getTime(),
          mode: '평온',
          content: '',
          createdAt: 0
        }
      ]
    }
  },
  computed: {
    weeks(): Array<Array<DiaryProps>> {
      let weeks: Array<Array<DiaryProps>> = []
      weeks = [...this.calendar.getWeeks()]
      weeks = weeks.map((diaries) => {
        return diaries.map((diary) => {
          const diaryByStorage: DiaryProps | undefined = this.diaries.find((diaryByStorage) => {
            const diaryDate = new Date(Number(diaryByStorage.time))
            const calendarDate = new Date(Number(diary.time))
            diaryDate.setHours(0, 0, 0, 0)
            calendarDate.setHours(0, 0, 0, 0)
            return diaryDate.getTime() === calendarDate.getTime()
          })

          if (diaryByStorage) {
            return diaryByStorage
          } else {
            return diary
          }
        })
      })
      console.log(weeks)
      return weeks
    }
  }
})
</script>

<template>
  <div>
    <div class="flex justify-between">
      <div class="flex flex-col">
        <div v-for="(week, i) in weeks" :key="i">
          <div class="flex">
            <CalendarRow :dates="week" :current-date="calendar.currentDate" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
