<script lang="ts">
import { defineComponent } from 'vue'
import TimelineItem from '@/components/diary/timeline/TimelineItem.vue'
import { routineServerInstance } from '@/service'

export default defineComponent({
  name: 'DiaryTimeline',
  components: { TimelineItem },
  setup() {
    const routineServer = routineServerInstance()
    return {
      routineServer
    }
  },
  data() {
    return {
      diaries: []
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
  }
})
</script>

<template>
  <div>
    <div class="flex">
      <div v-if="diaries?.length === 0" class="flex flex-col items-center gap-4">
        <div class="text-md font-bold">오늘 하루 내용을 기록해보세요~</div>
        <button type="button" class="bg-lime-700 p-2 rounded-lg text-white w-32">기록하기</button>
      </div>
    </div>
    <div v-if="diaries?.length > 0" class="flex flex-col items-center gap-4">
      <div>
        <div :key="i" v-for="(diary, i) in diaries.filter((el) => el.mood)">
          <TimelineItem :diary="diary" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
