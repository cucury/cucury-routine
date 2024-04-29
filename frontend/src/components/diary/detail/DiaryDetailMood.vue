<script lang="ts">
import { defineComponent } from 'vue'
import DiaryItem from '@/components/diary/DiaryItem.vue'
import { DiaryMode } from '@/consts'

export default defineComponent({
  name: 'DiaryDetailMood',
  setup() {
    return {
      DiaryMode
    }
  },
  data() {
    return {
      selectedMood: ''
    }
  },
  components: { DiaryItem }
})
</script>

<template>
  <div class="flex gap-2 overflow-x-scroll hidden-scrollbar">
    <button
      class=""
      :class="{
        'opacity-100': selectedMood === mode,
        'opacity-50': selectedMood !== mode
      }"
      type="button"
      @click="
        () => {
          selectedMood = mode
        }
      "
      :key="i"
      v-for="(mode, i) in DiaryMode"
    >
      <DiaryItem :is-today="false" :mode="mode" />
    </button>
  </div>
</template>
