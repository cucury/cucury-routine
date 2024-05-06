<script lang="ts">
import { defineComponent, ref, type Ref, type UnwrapRef } from 'vue'
import useCalendarStore from '@/stores/calendar'
import CalendarRow from '@/components/diary/calendar/CalendarRow.vue'
import type { DiaryProps } from '@/props'
import SlidingModal from '@/components/modal/SlidingModal.vue'
import DiaryDetail from '@/components/diary/DiaryDetail.vue'
import { routineServerInstance } from '@/service'
import useDiaryStore from '@/stores/diary'

export default defineComponent({
  name: 'DiaryCalender',
  components: { DiaryDetail, SlidingModal, CalendarRow },
  setup() {
    const calendar = useCalendarStore()
    const detailModalRef: Ref<UnwrapRef<typeof SlidingModal | null>> = ref(null)
    const diaryDetailRef: Ref<UnwrapRef<typeof SlidingModal | null>> = ref(null)
    const routineServer = routineServerInstance()
    const diaryStore = useDiaryStore()
    return {
      calendar,
      detailModalRef,
      diaryDetailRef,
      routineServer,
      diaryStore
    }
  },
  data(): { diaries: Array<DiaryProps>; weeks: Array<Array<DiaryProps>> } {
    return {
      diaries: [
        {
          id: 1,
          time: new Date('2024. 4. 20.').getTime(),
          mood: '평범',
          content: '',
        },
        {
          id: 2,
          time: new Date('2024. 4. 21.').getTime(),
          mood: '행복',
          content: '',
        },
        {
          id: 3,
          time: new Date('2024. 4. 22.').getTime(),
          mood: '평온',
          content: '',
        }
      ],
      weeks: []
    }
  },
  async mounted() {
    await this.fetchDiaries()
  },
  computed: {
    selectedDate() {
      return this.calendar.getSelectedDate()
    }
  },
  methods: {
    async fetchDiaries() {
      // fetch diaries from server
      try {
        const res = await this.routineServer.get('/diary')
        if (res) {
          this.diaries = res?.data.map((el: any) => {return { ...el, time: Number(el.time) }})
        }
        this.weeks = this.getWeeks()
        this.calendar.$subscribe((mutation) => {
          if (Array.isArray(mutation.events)) {
            // do nothing
          } else {
            if (mutation.events.key === 'currentMonth') {
              this.weeks = this.getWeeks()
            }
          }
        })
      } catch (error) {
        console.error(error)
      }
    },
    getWeeks(): Array<Array<DiaryProps>> {
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
            return JSON.parse(JSON.stringify(diaryByStorage))
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
              :current-month="calendar.currentMonth"
              @show-modal="
                () => {
                  if (detailModalRef) {
                    detailModalRef.isShow = true
                  }
                }
              "
            />
          </div>
        </div>
      </div>
    </div>
    <SlidingModal ref="detailModalRef" :label="selectedDate.toLocaleDateString()">
      <DiaryDetail @close:detail='async() => {
                     await this.fetchDiaries()
                     detailModalRef.isShow = false
                   }' />
    </SlidingModal>
  </div>
</template>
