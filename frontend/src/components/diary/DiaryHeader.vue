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
})
</script>

<template>
  <div class="flex flex-col justify-center items-center gap-4">
    <div class="flex gap-2">
      <button type="button" @click="() => {
        const month: number = calendar.getDate().getMonth() - 1
        calendar.setDate(new Date(calendar.getDate().getFullYear(), month))
      }">
        👈
      </button>
      <div>
        {{ `${calendar.getDate().getFullYear()}.${calendar.getDate().getMonth() + 1}` }}
      </div>
      <button type="button" @click="() => {
        const month: number = calendar.getDate().getMonth() + 1
        calendar.setDate(new Date(calendar.getDate().getFullYear(), month))
      }">
        👉
      </button>
    </div>
    <div class="p-1 bg-gray-200 w-64 rounded-lg text-xs">
      <button
        type="button"
        class="w-1/2 rounded-lg p-1"
        :class="{ 'bg-lime-600 text-white': diaryHeaderToggle.isCalendar() }"
        @click="() => { diaryHeaderToggle.toggle()} "
      >캘린더</button>
      <button
        type="button"
        class="w-1/2 rounded-lg p-1"
        :class="{ 'bg-lime-600 text-white': diaryHeaderToggle.isTimeline() }"
        @click="() => { diaryHeaderToggle.toggle()} "
      >타임라인</button>
    </div>
  </div>
</template>

<style scoped>

</style>