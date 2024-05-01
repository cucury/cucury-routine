<script lang="ts">
import { defineComponent, type PropType, type Ref, type UnwrapRef } from 'vue'
import CalendarItem from '@/components/diary/DiaryItem.vue'
import type { DiaryProps } from '@/props'
import useCalendarStore from '@/stores/calendar'
import useDiaryStore from '@/stores/diary'

export default defineComponent({
  name: 'CalendarRow',
  setup() {
    const calendarStore = useCalendarStore()
    const diaryStore = useDiaryStore()
    return {
      calendarStore,
      diaryStore
    }
  },
  props: {
    dates: {
      type: Array<DiaryProps>,
      required: true
    },
    currentMonth: {
      type: Date,
      required: true
    }
  },
  data() {
    return {
      mood: '평범'
    }
  },
  methods: {
    isToday(date: Date) {
      const current = date.setHours(0, 0, 0, 0)
      const today = new Date().setHours(0, 0, 0, 0)
      return current === today
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
        <CalendarItem
          :class="{ 'opacity-50': currentMonth.getMonth() !== new Date(diary.time).getMonth() }"
          @click="
            () => {
              calendarStore.setSelectedDate(new Date(diary.time))
              diaryStore.setSelectedDiary(diary)
              $emit('show-modal')
            }
          "
          :key="i"
          v-for="(diary, i) in dates"
          :day="new Date(diary.time).getDate().toString()"
          :isToday="isToday(new Date(diary.time))"
          :mood="diary.mood"
        />
      </div>
    </div>
  </div>
</template>
