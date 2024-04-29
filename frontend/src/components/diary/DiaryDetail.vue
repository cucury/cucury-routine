<script lang="ts">
import { defineComponent } from 'vue'
import DiaryDetailMood from '@/components/diary/detail/DiaryDetailMood.vue'
import CucuryButton from '@/components/button/CucuryButton.vue'

export default defineComponent({
  name: 'DiaryDetail',
  components: { CucuryButton, DiaryDetailMood }
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <div>
      <div>
        <div>기분</div>
      </div>
      <div>
        <div class="px-4">
          <DiaryDetailMood />
        </div>
      </div>
    </div>
    <div>
      <div>
        <div>기록</div>
      </div>
      <div>
        <div class="flex justify-center px-4">
          <textarea
            class="border border-gray-200 rounded-xl w-[90vw] p-3 focus:border-transparent focus:ring-1 focus:outline-0"
            placeholder="일기를 작성해보세요"
            rows="5"
          />
        </div>
      </div>
    </div>
    <div>
      <CucuryButton> 저장 </CucuryButton>
    </div>
  </div>
</template>
