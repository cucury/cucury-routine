<script lang="ts">
import { defineComponent } from 'vue'
import useCalendarStore from '@/stores/calendar'
import CalendarRow from '@/components/diary/calendar/CalendarRow.vue'
import type { DiaryProps } from '@/props'
import SlidingModal from '@/components/modal/SlidingModal.vue'
import DiaryDetail from '@/components/diary/DiaryDetail.vue'
import type { SubscriptionCallbackMutation } from 'pinia'

export default defineComponent({
  name: 'DiaryCalender',
  components: { DiaryDetail, SlidingModal, CalendarRow },
  setup() {
    const calendar = useCalendarStore()
    return {
      calendar
    }
  },
  data(): { diaries: Array<DiaryProps>; weeks: Array } {
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
      ],
      weeks: []
    }
  },
  mounted() {
    this.weeks = this.getWeeks()
    this.calendar.$subscribe((mutation) => {
      if (mutation.events.key === 'currentMonth') {
        this.weeks = this.getWeeks()
      }
    })
  },
  methods: {
    getWeeks(): Array<Array<DiaryProps>> {
      let weeks: Array<Array<DiaryProps>> = []
      weeks = [...this.calendar.getWeeks()]
      if (weeks == this.calendar.getWeeks()) {
      }
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
      return weeks
    }
  }
})
</script>

<template>
  <div class="contents">
    <div class="flex justify-between">
      <div class="flex flex-col">
        <div v-for="(week, i) in weeks" :key="i">
          <div class="flex">
            <CalendarRow
              :dates="week"
              :current-date="calendar.currentDate"
              @click="
                () => {
                  $refs.detailModal.isShow = true
                }
              "
            />
          </div>
        </div>
      </div>
    </div>
    <SlidingModal ref="detailModal" :label="calendar.currentDate.toLocaleDateString()">
      <DiaryDetail />
    </SlidingModal>
  </div>
</template>
