<template>
  <div class='flex flex-col items-center'>
    <button
      type='button'
      class='flex items-center justify-center bg-lime-500 text-white p-2 w-8 h-8 rounded-full'
      :class='{
        "bg-lime-300 text-gray-600": isSelected,
        "bg-gray-800 text-white": !isSelected && isToday
      }'
      @click='() => {}'
    >
      <span>{{ new Date(time).getDate() }}</span>
    </button>
    <div class='flex  items-center'>
      <span>{{ getDayLabel(new Date(time).getDay()) }}</span>
    </div>
  </div>
</template>

<script>
import { getDayLabel } from '@/service'
export default {
  name: 'CucuryRoutineItem',
  setup() {
    return {
      getDayLabel
    }
  },
  props: {
    time: {
      type: Number,
      required: true
    },
    isSelected: {
      type: Boolean,
      required: true
    }
  }, computed: {
    isToday() {
      const current = new Date(this.time).setHours(0, 0, 0, 0)
      const today = new Date().setHours(0, 0, 0, 0)
      return current === today
    }
  }
}
</script>

<style scoped>

</style>