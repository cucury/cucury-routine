<script lang="ts">
import { defineComponent } from "vue"
import CucuryDDayDetail from '@/components/dday/CucuryDDayDetail.vue'

export default defineComponent({
  name: "CucuryRoutineDDay",
  components: {
    CucuryDDayDetail,
  },
  data() {
    return {
      showEditMode: false
    }
  },
})
</script>

<template>
  <div class="relative flex flex-col h-full bg-white">
    <CucuryDDayDetail
      :showEditMode='showEditMode'
      @updated:closed-modal='() => { this.showEditMode = false }'
    />
    <button
      type='button'
      class='absolute p-2 rounded-full bg-lime-500 bottom-8 right-2'
      @click='() => this.showEditMode = true'
    >
      <svg class="w-8 h-8 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
      </svg>
    </button>
  </div>
</template>

<style scoped>

</style>