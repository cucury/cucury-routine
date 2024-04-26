<script lang="ts">
import CucuryRoutineHome from '@/views/CucuryRoutineHome.vue'
import CucuryRoutineNavi from '@/components/CucuryRoutineNavi.vue'
import CucuryRoutineContent from '@/views/CucuryRoutineContent.vue'
import CucuryRoutineDDay from '@/views/CucuryRoutineDDay.vue'
import CucuryRoutineDiary from '@/views/CucuryRoutineDiary.vue'
import useNaviStore, { Navigations } from '@/stores/navi'

export default {
  name: 'HomeView',
  setup() {
    const navi = useNaviStore()
    return {
      navi,
      Navigations
    }
  },
  components: {
    CucuryRoutineHome,
    CucuryRoutineNavi,
    CucuryRoutineContent,
    CucuryRoutineDDay,
    CucuryRoutineDiary
  }
}
</script>

<template>
  <main>
    <div>
      <CucuryRoutineHome v-if="navi.tab === Navigations.Home" />
      <CucuryRoutineContent v-if="navi.tab === Navigations.Routine" />
      <CucuryRoutineDDay v-if="navi.tab === Navigations.DDay" />
      <CucuryRoutineDiary v-if="navi.tab === Navigations.Diary" />
      <CucuryRoutineNavi />
    </div>
  </main>
</template>
