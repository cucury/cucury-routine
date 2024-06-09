<template>
  <CucuryRoutineItemList
    @update:current-time='(time) => {
      this.currentTime = time
      this.$emit("update:current-time", time)
    }'
  />
</template>

<script>
import CucuryRoutineItemList from './CucuryRoutineItemList.vue'
export default {
  name: 'CucuryTimeStatus',
  components: {
    CucuryRoutineItemList
  },
  data() {
    return {
      currentTime: null
    }
  }
}
</script>