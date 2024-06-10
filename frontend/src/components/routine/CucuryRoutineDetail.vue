<template>
  <div class='bg-white w-11/12 min-h-32 border rounded-lg flex flex-col'>
    <div
      class='flex flex-col justify-start items-start gap-2 w-full p-2'
      v-if='groupedRoutines.length > 0'
    >
      <div class='h-[calc(100vh_-_20rem)] overflow-y-scroll w-full'>
        <div
          class='flex flex-col gap-1 pl-2'
          :key='i' v-for='(v,i) in groupedRoutines'
        >
          <div v-if='v.routineGroup?.id'
            class='text-sm font-bold'
            :class="`text-${v.group?.color}-500 rounded-lg p-2`"
          >
            {{ v.routineGroup?.name }}
          </div>
          <div
            v-else
            class='text-sm font-bold'
            :class="`text-${v.group?.color}-500 rounded-lg p-2`"
          >
            그룹 없음
          </div>
          <div
            class='pl-6 relative'
            :key='j' v-for='(el,j) in v.routines'>
            <div class='hover:opacity-50 absolute h-full w-[90%] -left-2 bg-white opacity-0 flex items-center'>
              <button type='button' @click='removeRoutine(el.id)'>
                <svg class="w-6 h-6 text-lime-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
                </svg>
              </button>
            </div>
            <div class='flex justify-between items-center'>
              <div class='w-[calc(100vw_-_26rem)] break-words line-clamp-2'>
                {{ el.title }}
              </div>
              <CucuryCheckbox
                v-model='el.isCompleted'
                :value='el.isCompleted'
                @input='selectedCompletedCheckBox(el)'
              />
            </div>
          </div>
        </div>
      </div>
      <div class='flex justify-center items-center w-full'>
        <button
          @click='openNewRoutine'
          type='button'
          class='bg-lime-500 text-white p-2 rounded-lg'
        >루틴 추가</button>
      </div>
    </div>
    <div
      v-else
      class='flex flex-col justify-center items-center gap-2l h-32 gap-2'>
      <div>
        새로운 루틴을 추가해보세요.
      </div>
      <button
        @click='openNewRoutine'
        type='button'
        class='bg-lime-500 text-white p-2 rounded-lg'
      >루틴 추가</button>
    </div>
  </div>
  <SlidingModal ref='detailModalRef' label='루틴 추가' >
    <RoutineEdit @updated:saved='async() => {
      await fetchRoutineInfo()
      this.detailModalRef.isShow = false
    }' />
  </SlidingModal>
</template>

<script>
import SlidingModal from "@/components/modal/SlidingModal.vue"
import RoutineEdit from '@/components/routine/edit/RoutineEdit.vue'
import { routineServerInstance } from '@/service'
import CucuryCheckbox from '@/components/checkbox/CucuryCheckbox.vue'

export default {
  name: 'CucuryRoutineDetail',
  components: { CucuryCheckbox, RoutineEdit, SlidingModal },
  setup() {
    const detailModalRef = null
    const routineServer = routineServerInstance()
    return {
      detailModalRef,
      routineServer
    }
  },
  props: {
    currentTime: {
      type: Number,
      default: () => new Date().getTime()
    }
  },
  data() {
    return {
      groupedRoutines: [],
      completedRoutineId: []
    }
  },
  mounted() {
    this.init()
  },
  computed: {
    currentDt() {
      if (this.currentTime) {
        return new Date(this.currentTime).toLocaleDateString('sv-SE')
      } else {
        return new Date().toLocaleDateString('sv-SE')
      }
    }
  },
  watch: {
    async currentTime() {
      await this.fetchRoutineInfo()
    }
  },
  methods: {
    async init() {
      await this.fetchRoutineInfo()
    },
    async fetchRoutineInfo() {
      // fetch data from server
      const res = await this.routineServer.get(`/routine/completed-dt/${this.currentDt}`)
      this.groupedRoutines = res.data
    },
    async removeRoutine(id) {
      if (!confirm('루틴이 삭제 됩니다.\n삭제하시겠습니까?')) {
        return
      }
      try {
        await this.routineServer.delete(`/routine/${id}`)
        this.groupedRoutines = this.groupedRoutines.map(el => {
            el.routines = el.routines.filter(r => r.id !== id)
            return el
          })
      } catch (e) {
        console.error(e)
      }
    },
    openNewRoutine() {
      this.detailModalRef.isShow = true
    },
    async selectedCompletedCheckBox(el) {
      this.completedRoutineId = el.completedDt ? [...this.completedRoutineId, el.id] : this.completedRoutineId.filter((id) => id !== el.id)

      if (!el.isCompleted) {
        const res = await this.routineServer.post(
        `routine-meta-data`, {
          routineId: el.id,
          completedDt: this.currentDt
        })
        el.completedDt = res.data?.completedDt
        el.isCompleted = true
      } else {
        const res = await this.routineServer.delete(
          `routine-meta-data/routine-id/${el.id}/completed-dt/${this.currentDt}`)
        if (res.data?.deleted) {
          el.completedDt = null
          el.isCompleted = false
        }
      }
    }
  }
}
</script>

<style scoped>

</style>