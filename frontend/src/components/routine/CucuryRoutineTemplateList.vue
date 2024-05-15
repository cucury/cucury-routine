<template>
  <div class='flex flex-wrap gap-2 justify-center items-center'>
    <CucuryRoutineTemplate label='완벽한 아침 만들기' />
    <CucuryRoutineTemplate label='생산적인 오후 만들기' />
    <CucuryRoutineTemplate label='정돈된 저녁 만들기' />
    <CucuryRoutineTemplate label='꾸준히 자산을 늘리는 습관' />
  </div>
</template>

<script>
import CucuryRoutineTemplate from './CucuryRoutineTemplate.vue'
export default {
  name: 'CucuryRoutineTemplateList',
  components: {
    CucuryRoutineTemplate
  }
}
</script>

<style scoped>

</style>