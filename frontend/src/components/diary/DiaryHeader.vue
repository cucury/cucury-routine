<script lang="ts">
import { defineComponent } from 'vue'
import useCalendarStore from '@/stores/calendar'
import useDiaryHeaderToggleStore from '@/stores/diaryHeaderToggle'

export default defineComponent({
  name: 'DiaryHeader',
  setup() {
    const calendar = useCalendarStore()
    const diaryHeaderToggle = useDiaryHeaderToggleStore()
    return {
      calendar,
      diaryHeaderToggle
    }
  },
  computed: {
    currentDate() {
      return `${this.calendar.getMonth().getFullYear()}.${this.calendar.getMonth().getMonth() + 1}`
    }
  }
})
</script>

<template>
  <div class="gap-4 contents">
    <div class="flex justify-center gap-2 w-64">
      <button
        type="button"
        @click="
          () => {
            calendar.movePrev()
          }
        "
      >
        👈
      </button>
      <div>
        {{ currentDate }}
      </div>
      <button
        type="button"
        @click="
          () => {
            calendar.moveNext()
          }
        "
      >
        👉
      </button>
    </div>
    <div class="p-1 bg-gray-200 rounded-lg text-xs w-64">
      <button
        type="button"
        class="w-1/2 rounded-lg p-1"
        :class="{ 'bg-lime-600 text-white': diaryHeaderToggle.isCalendar() }"
        @click="
          () => {
            diaryHeaderToggle.toggle()
          }
        "
      >
        캘린더
      </button>
      <button
        type="button"
        class="w-1/2 rounded-lg p-1"
        :class="{ 'bg-lime-600 text-white': diaryHeaderToggle.isTimeline() }"
        @click="
          () => {
            diaryHeaderToggle.toggle()
          }
        "
      >
        타임라인
      </button>
    </div>
  </div>
</template>

<style scoped></style>
