<template>
  <div class='flex h-full'>
    <div v-if='dDays.length > 0' class="flex flex-col w-full gap-2 p-2">
      <CucuryDDayCard
        v-for='(dDay, index) in dDays'
        :key='index'
        :dDay='dDay'
        />
    </div>
    <div
      v-else
      class='flex items-end justify-start pb-10 text-lg'
    >
      새로운 디데이를 추가해보세요.
    </div>
    <SlidingModal
      label='어떤 디데이인가요?'
      ref='editModal'
      @updated:closed-modal='() => {
      this.$emit("updated:closed-modal")
    }'
    >
      <CucuryDDayEdit/>
    </SlidingModal>
  </div>
</template>

<script>
import CucuryDDayEdit from '@/components/dday/CucuryDDayEdit.vue'
import CucuryDDayCard from '@/components/dday/CucuryDDayCard.vue'
import SlidingModal from '@/components/modal/SlidingModal.vue'
import { getAsyncDDays } from '@/service/dday'

export default {
  name: 'CucuryDDayDetail',
  emits: ['updated:closed-modal'],
  components: {
    CucuryDDayEdit,
    CucuryDDayCard,
    SlidingModal,
  },
  setup() {
    const editModal = null
    return {
      editModal
    }
  },
  props: {
    showEditMode: {
      type: Boolean,
      default: () => false
    }
  },
  watch: {
    showEditMode(n) {
      this.$refs.editModal.isShow = n
    }
  },
  methods: {
    getAsyncDDays
  },
  async mounted() {
    this.dDays = await this.getAsyncDDays()
    console.log(this.dDays)
  },
  data() {
    return {
      dDays: []
    }
  }
}
</script>