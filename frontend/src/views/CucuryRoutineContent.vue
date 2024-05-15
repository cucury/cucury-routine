<script lang="ts">
import {defineComponent} from "vue"
import CucuryRoutineDetail from "@/components/routine/CucuryRoutineDetail.vue"
import CucuryRoutineItemList from "@/components/routine/CucuryRoutineItemList.vue"
import CucuryRoutineTemplateList from "@/components/routine/CucuryRoutineTemplateList.vue"
import CucuryTimeStatus from "@/components/routine/CucuryTimeStatus.vue"

export default defineComponent({
  name: "CucuryRoutineContent",
  components: {
    CucuryRoutineDetail,
    CucuryRoutineTemplateList,
    CucuryTimeStatus
  }
})
</script>

<template>
  <div class='flex flex-col justify-center items-center gap-6'>
    <CucuryTimeStatus />
    <CucuryRoutineDetail />
    <CucuryRoutineTemplateList />
  </div>
</template>

<style scoped>

</style>