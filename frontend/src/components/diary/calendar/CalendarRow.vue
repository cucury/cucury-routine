<script lang="ts">
import { defineComponent } from 'vue'
import CalendarItem from '@/components/diary/calendar/CalendarItem.vue'

export default defineComponent({
  name: 'CalendarRow',
  data() {
    return {
      today: new Date().toISOString().slice(0, 10),
      dates: Array.from({ length: 7 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() + i)
        return date.toISOString().slice(0, 10)
      }),
      mode: '평범'
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
      <div class="flex">
        <CalendarItem v-for="date in dates" :key="date" :date="date" :isToday="date === today" :mode="mode" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>