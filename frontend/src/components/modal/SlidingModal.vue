<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SlidingModal',
  props: {
    label: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isShow: false
    }
  }
})
</script>

<template>
  <div
    class="absolute top-0 h-full transform duration-[600ms] delay-150 ease-in-out overflow-hidden z-[100] w-[375px] bg-white"
    :class="{
      'translate-x-0 opacity-100': isShow,
      'translate-x-[-100%] -z-50 opacity-0': !isShow
    }"
  >
    <div class="h-16 flex items-center">
      <button
        type="button"
        @click="
          () => {
            this.isShow = false
            this.$emit('updated:closed-modal')
          }
        "
        class="w-2/12 flex justify-center"
      >
        <svg
          class="w-8 h-8 text-gray-800"
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
            d="m15 19-7-7 7-7"
          />
        </svg>
      </button>
      <div class="w-8/12 flex justify-center">{{ label }}</div>
      <div class="w-2/12"></div>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>
