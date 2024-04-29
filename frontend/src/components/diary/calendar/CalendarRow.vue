<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import CalendarItem from '@/components/diary/DiaryItem.vue'
import type { DiaryProps } from '@/props'

export default defineComponent({
  name: 'CalendarRow',
  props: {
    dates: {
      type: Array<DiaryProps>,
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
  methods: {
    isToday(day: number) {
      const current = this.getDate(day).setHours(0, 0, 0, 0)
      const today = new Date().setHours(0, 0, 0, 0)
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
        <CalendarItem
          :key="i"
          v-for="(diary, i) in dates"
          :day="new Date(diary.time).getDate().toString()"
          :isToday="isToday(Number(new Date(diary.time).getDate()))"
          :mode="diary.mode"
        />
      </div>
    </div>
  </div>
</template>
