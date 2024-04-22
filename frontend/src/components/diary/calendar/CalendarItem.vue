<script lang="ts">
import { defineComponent } from 'vue'

export const DiaryMode = {
  Ordinary: '평범',
  Happiness: '행복',
  Tranquility: '평온',
  Depressed: '우울',
  Tired: '피곤',
  Aggro: '화남',
  Good: '좋음',
  Sadness: '슬픔',
  Busyness: '바쁨',
  Pain: '아픔'
}

export default defineComponent({
  name: 'CalendarItem',
  props: {
    date: {
      type: String,
      required: true
    },
    isToday: {
      type: Boolean,
      required: true
    },
    mode: {
      type: String,
      required: false
    }
  }
})
</script>

<template>
  <div class="w-8">
    <div class="flex">
      <div class="relative flex w-8 h-8 bg-green-200 rounded-full text-[0.8rem] font-bold justify-center items-center">
        <div v-if="isToday">
          <svg class="w-6 h-6 text-gray-800 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
          </svg>
          <div class="absolute top-0 left-0 w-8 h-8 border border-green-500 rounded-full border-dashed"></div>
        </div>
        <div v-if="!isToday">
          {{ mode ?? '' }}
        </div>
      </div>
    </div>
    <div class="text-sm">
      <div class="flex justify-center items-center">{{ date }}</div>
    </div>
  </div>
</template>

<style scoped>

</style>