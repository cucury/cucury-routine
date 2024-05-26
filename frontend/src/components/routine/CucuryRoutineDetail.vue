<template>
  <div class='bg-white w-2/3 h-32 border rounded-lg flex flex-col justify-center items-center gap-2'>
    새로운 루틴을 추가해보세요.
    <button
      @click='openNewRoutine'
      type='button'
      class='bg-lime-500 text-white p-2 rounded-lg'
    >루틴 추가</button>
  </div>
  <SlidingModal ref='detailModalRef' label='루틴 추가' >
    <RoutineEdit />
  </SlidingModal>
</template>

<script>
import SlidingModal from "@/components/modal/SlidingModal.vue"
import RoutineEdit from '@/components/routine/edit/RoutineEdit.vue'

export default {
  name: 'CucuryRoutineDetail',
  components: { RoutineEdit, SlidingModal },
  setup() {
    const detailModalRef = null

    return {
      detailModalRef
    }
  },
  methods: {
    openNewRoutine() {
      console.log(this.detailModalRef)
      this.detailModalRef.isShow = true
    }

  }
}
</script>

<style scoped>

</style>