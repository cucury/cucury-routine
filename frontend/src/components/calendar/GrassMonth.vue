<template>
  <div>
    <div>
      {{ new Date(`2024-${month}-01`).toString().split(" ")[1] }}
    </div>
    <div class='flex gap-1'>
      <GrassWeek />
      <GrassWeek />
      <GrassWeek />
      <GrassWeek />
      <GrassWeek />
    </div>

  </div>
</template>

<script>
import GrassWeek from './GrassWeek.vue'
export default {
  name: 'GrassMonth',
  components: {
    GrassWeek
  },
  props: {
    month: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>

</style>