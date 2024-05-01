<script lang="ts">
import { defineComponent } from 'vue'
import DiaryItem from '@/components/diary/DiaryItem.vue'
import { DiaryMood } from '@/consts'

export default defineComponent({
  name: 'DiaryDetailMood',
  props: {
    mood: {
      type: String,
      required: true
    }
  },
  setup() {
    return {
      DiaryMood
    }
  },
  computed: {
    selectedMood: {
      get() {
        return this.mood
      },
      set(value: string) {
        this.$emit('update:mood', value)
      }
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
        'opacity-100': selectedMood === mood,
        'opacity-50': selectedMood !== mood
      }"
      type="button"
      @click="
        () => {
          selectedMood = mood
        }
      "
      :key="i"
      v-for="(mood, i) in DiaryMood"
    >
      <DiaryItem :is-today="false" :mood="mood" />
    </button>
  </div>
</template>
