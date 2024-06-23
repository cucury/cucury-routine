<template>
  <div>
    <div>
      계산방법을 선택해보세요
    </div>
    <div class='flex overflow-x-scroll hidden-scrollbar'>
      <div class='flex flex-row flex-col flex-wrap max-h-64'>
        <a
          :key="i"
          v-for='(category, i) in Object.getOwnPropertyNames(categoryNames)'
          class='flex items-center justify-center w-32 h-32 p-1 cursor-pointer'
          @click='() => {
            this.$refs.categoryEdit.isShow = true
            this.selectedCategory = category
          }'
        >
          <div
            class='relative flex items-center justify-center w-full h-full rounded-lg'
          >
            <div class='absolute z-10 text-lg font-bold text-white'>
              {{ categoryNames[category] }}
            </div>
            <div class='relative'>
              <div class='absolute w-full h-full bg-gray-800 rounded-lg opacity-60'></div>
              <img
                class='rounded-lg'
                :src="`/images/${category}.webp`" :alt='categoryNames[category]' />
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
  <div>
    <CucuryDDayCategoryEdit
      ref='categoryEdit'
      :category='this.selectedCategory'
    />
  </div>
</template>
<script>

import CucuryDDayCategoryEdit from '@/components/dday/category/CucuryDDayCategoryEdit.vue'
import { DDayCategoryNames } from '@/consts'

export default {
  name: 'CucuryDDayCard',
  components: { CucuryDDayCategoryEdit },
  setup() {
    return {
      categoryNames: DDayCategoryNames,
      categoryEdit: null
    }
  },
  data() {
    return {
      addMode: false,
      selectedCategory: 'couple'
    }
  },
}
</script>