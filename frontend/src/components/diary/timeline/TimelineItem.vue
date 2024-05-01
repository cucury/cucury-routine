<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { DiaryProps } from '@/props'
import { getDayLabel } from '@/service'

export default defineComponent({
  name: 'TimelineItem',
  props: {
    diary: {
      type: Object as PropType<DiaryProps>,
      required: true
    }
  },
  methods: {
    getDayLabel
  }
})
</script>

<template>
  <div>
    <div class="flex justify-between px-3">
      <div>
        {{
          `${new Date(Number(diary.time)).getMonth() + 1}.${new Date(Number(diary.time)).getDate()} ${getDayLabel(new Date(Number(diary.time)).getDay())}`
        }}
      </div>
      <button type="button">
        <svg
          class="w-6 h-6 text-gray-800"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-width="2"
            d="M6 12h.01m6 0h.01m5.99 0h.01"
          />
        </svg>
      </button>
    </div>
    <div class="flex gap-2 bg-gray-200 rounded-lg p-4">
      <div class="flex flex-col gap-2">
        <div class="w-8 h-8 rounded-full bg-indigo-500" />
        <div class="text-sm">
          {{ diary.mood }}
        </div>
      </div>
      <div class="text-lg">
        {{ diary.content }}
      </div>
    </div>
  </div>
</template>
