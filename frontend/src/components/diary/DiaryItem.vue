<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DiaryItem',
  props: {
    day: {
      type: String,
      required: false
    },
    isToday: {
      type: Boolean,
      required: true
    },
    mood: {
      type: String,
      required: false
    }
  }
})
</script>

<template>
  <div class="w-8">
    <div class="flex">
      <button
        type="button"
        class="relative flex w-8 h-8 bg-green-200 rounded-full text-[0.8rem] font-bold justify-center items-center"
      >
        <div v-if="mood">
          {{ mood }}
        </div>
        <div v-else-if="isToday && !mood">
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
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 12h14m-7 7V5"
            />
          </svg>
          <div
            class="absolute top-0 left-0 w-8 h-8 border border-green-500 rounded-full border-dashed"
          ></div>
        </div>
      </button>
    </div>
    <div class="text-sm">
      <div class="flex justify-center items-center">{{ day }}</div>
    </div>
  </div>
</template>

<style scoped></style>
