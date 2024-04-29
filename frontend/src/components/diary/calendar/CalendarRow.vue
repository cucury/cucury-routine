<script lang="ts">
import { defineComponent, type PropType, type Ref, type UnwrapRef } from 'vue'
import CalendarItem from '@/components/diary/DiaryItem.vue'
import type { DiaryProps } from '@/props'
import useCalendarStore from '@/stores/calendar'
import type SlidingModal from '@/components/modal/SlidingModal.vue'

export default defineComponent({
  name: 'CalendarRow',
  setup() {
    const calendar = useCalendarStore()
    return {
      calendar
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
      mode: '평범'
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
              calendar.setSelectedDate(new Date(diary.time))
              $emit('show-modal')
            }
          "
          :key="i"
          v-for="(diary, i) in dates"
          :day="new Date(diary.time).getDate().toString()"
          :isToday="isToday(new Date(diary.time))"
          :mode="diary.mode"
        />
      </div>
    </div>
  </div>
</template>
