<script lang="ts">
import {defineComponent} from "vue"
import CucuryRoutineDetail from "@/components/routine/CucuryRoutineDetail.vue"
import CucuryTimeStatus from "@/components/routine/CucuryTimeStatus.vue"
// import CucuryRoutineTemplateList from "@/components/routine/CucuryRoutineTemplateList.vue"

export default defineComponent({
  name: "CucuryRoutineContent",
  components: {
    CucuryRoutineDetail,
    // CucuryRoutineTemplateList,
    CucuryTimeStatus
  },
  data(): {
    currentTime: number | null
  } {
    return {
      currentTime: null
    }
  }
})
</script>

<template>
  <div class='flex flex-col justify-center items-center gap-6'>
    <CucuryTimeStatus @update:current-time='(time) => { this.currentTime = time }' />
    <CucuryRoutineDetail :currentTime='this.currentTime' />
    <!--
    <CucuryRoutineTemplateList />
    -->
  </div>
</template>