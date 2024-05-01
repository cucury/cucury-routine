<script lang="ts">
import { defineComponent } from 'vue'
import DiaryHeader from '@/components/diary/DiaryHeader.vue'
import DiaryCalendar from '@/components/diary/DiaryCalendar.vue'
import DiaryTimeline from '@/components/diary/DiaryTimeline.vue'
import useDiaryHeaderToggleStore from '@/stores/diaryHeaderToggle'
import { dummyWeeks } from '@/consts'
import SlidingModal from '@/components/modal/SlidingModal.vue'

export default defineComponent({
  name: 'CucuryRoutineDiary',
  methods: {
    dummyWeeks() {
      return dummyWeeks
    }
  },
  components: { DiaryHeader, DiaryCalendar, DiaryTimeline },
  setup() {
    const diaryHeaderToggle = useDiaryHeaderToggleStore()
    return {
      diaryHeaderToggle,
    }
  },
  async mounted() {

  }
})
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <DiaryHeader />
    <DiaryCalendar v-if="diaryHeaderToggle.isCalendar()" />
    <DiaryTimeline v-if="diaryHeaderToggle.isTimeline()" />
  </div>
</template>
