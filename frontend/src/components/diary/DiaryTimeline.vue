<script lang="ts">
import { defineComponent } from 'vue'
import { routineServerInstance } from '@/service'
import TimelineItem from '@/components/diary/timeline/TimelineItem.vue'
import SlidingModal from '@/components/modal/SlidingModal.vue'
import DiaryDetail from '@/components/diary/DiaryDetail.vue'
import { ref, type Ref, type UnwrapRef } from 'vue'
import useDiaryStore from '@/stores/diary'

export default defineComponent({
  name: 'DiaryTimeline',
  components: { TimelineItem, SlidingModal, DiaryDetail },
  setup() {
    const routineServer = routineServerInstance()
    const diaryStore = useDiaryStore()
    const detailModalRef: Ref<UnwrapRef<typeof SlidingModal | null>> = ref(null)
    return {
      routineServer,
      detailModalRef,
      diaryStore
    }
  },
  data() {
    return {
      diaries: []
    }
  },
  computed: {
    sortedDiaries() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.diaries.sort((a, b) => b.time - a.time)
    }
  },
  async mounted() {
    // fetch data from server
    const { data } = await this.routineServer.get('/diary')
    this.diaries = data.map((el: any) => {
      return {
        ...el,
        time: Number(el.time)
      }
    })
  },
  methods: {
    openNewDiary() {
      const diary = {
        id: 0,
        mood: '',
        content: '',
        time: new Date().getTime()
      }
      this.diaryStore.setSelectedDiary(diary)
      this.detailModalRef.isShow = true
    }
  }
})
</script>

<template>
  <div class=' h-[calc(100vh_-_220px)] overflow-y-scroll'>
    <div class="flex">
      <div v-if="diaries?.length === 0" class="flex flex-col items-center gap-4">
        <div class="text-md font-bold">오늘 하루 내용을 기록해보세요~</div>
        <button
          @click='openNewDiary'
          type="button" class="bg-lime-700 p-2 rounded-lg text-white w-32">기록하기</button>
      </div>
    </div>
    <div v-if="diaries?.length > 0" class="flex flex-col items-center gap-4">
      <div class="flex flex-col">
        <div :key="i" v-for="(diary, i) in sortedDiaries.filter((el) => el.mood)">
          <TimelineItem :diary="diary" />
        </div>
      </div>
    </div>
  </div>
  <SlidingModal ref="detailModalRef" label="기록하기">
    <DiaryDetail @close:detail='async() => {
                     detailModalRef.isShow = false
                   }' />
  </SlidingModal>
</template>

<style scoped></style>
