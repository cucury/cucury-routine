<template>
  <div class='flex flex-col gap-1'>
    <GrassItem fill='5' />
    <GrassItem fill='1' />
    <GrassItem fill='0' />
    <GrassItem fill='2' />
    <GrassItem fill='0' />
    <GrassItem fill='3' />
    <GrassItem fill='4' />
  </div>
</template>

<script>
import GrassItem from './GrassItem.vue'
export default {
  name: 'GrassWeek',
  components: {
    GrassItem
  }
}
</script>