<script lang="ts">
import CucuryRoutineHome from '@/views/CucuryRoutineHome.vue'
import CucuryRoutineNavi from '@/components/CucuryRoutineNavi.vue'
import CucuryRoutineContent from '@/views/CucuryRoutineContent.vue'
import CucuryRoutineDDay from '@/views/CucuryRoutineDDay.vue'
import CucuryRoutineDiary from '@/views/CucuryRoutineDiary.vue'
import useNaviStore, { Navigations } from '@/stores/navi'

declare const window: Window & typeof globalThis
export default {
  name: 'HomeView',
  setup() {
    const navi = useNaviStore()
    return {
      navi,
      Navigations,
      window
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
      <div class="flex justify-between items-center bg-white px-2 py-1">
        <div class="flex">
          <img
            class="w-6 h-6 mr-2 rounded-full"
            src="https://static.h-9.info/images/961c5913-4712-4c41-a2d7-fb5e23dd3273.png"
            alt="logo"
          />
          <h1 class="text-lg font-semibold">CUCURY</h1>
        </div>
        <button
          type="button"
          @click="() => {
            window.localStorage.removeItem('accessToken')
            window.location.reload()
          }"
        >
          로그아웃
        </button>
      </div>
      <CucuryRoutineHome v-if="navi.tab === Navigations.Home" />
      <CucuryRoutineContent v-if="navi.tab === Navigations.Routine" />
      <CucuryRoutineDDay v-if="navi.tab === Navigations.DDay" />
      <CucuryRoutineDiary v-if="navi.tab === Navigations.Diary" />
      <CucuryRoutineNavi />
    </div>
  </main>
</template>
