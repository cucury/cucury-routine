<template>
  <div class='flex flex-col items-center'>
    <button
      type='button'
      class='flex items-center justify-center text-white p-2 w-8 h-8 rounded-full'
      :class='{
        "bg-gray-800 text-white": isToday,
        "bg-lime-800 text-gray-600": isSelected,
        "bg-lime-500 text-gray-600": !isSelected && !isToday
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
      const current = new Date(this.time).toLocaleDateString("sv-SE")
      const today = new Date().toLocaleDateString("sv-SE")
      return current === today
    }
  }
}
</script>

<style scoped>

</style>