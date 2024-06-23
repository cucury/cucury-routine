<template>
    <div class='flex w-full'>
      <div class='flex w-full'>
        <img
          class='rounded-lg h-[10rem] w-full object-cover'
          :src="`/images/${dDay.type}.webp`" :alt='categoryNames[dDay.category]' />
        <div class='absolute z-20 w-full h-full bg-gray-800 rounded-lg opacity-60' />
      </div>
      <div class='absolute z-30 flex items-center justify-center w-full h-full text-2xl text-white'>
        {{ label }}
      </div>
      <div class='absolute z-30 w-full p-2'>
        <div class='flex justify-between w-full '>
          <button
            type='button'
            @click='onCloseEdit'
          >
            <svg class="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
            </svg>
          </button>
          <button type='button' class='text-white' @click="execSave">
            저장
          </button>
        </div>
      </div>
    </div>
</template>

<script>
import { DDayCategoryNames } from '@/consts'
import { postAsyncDDay } from '@/service/dday'
export default {
  name: 'CucuryDDayCategoryEditHeader',
  props: {
    dDay: {
      type: Object,
      required: true
    },
    label: {
      type: String,
      default: () => ''
    },
  },
  setup(props) {
    console.log(props.dDay.category)
    return {
      categoryNames: DDayCategoryNames,
    }
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    onCloseEdit() {
      this.isShow = false
      this.$emit("updated:closed-edit")
    },
    execSave() {
      this.$emit('updated:save')
      if(!confirm('저장하시겠습니까?')) {
        return
      }
      postAsyncDDay(this.dDay)
    }
  },
}
</script>

<style scoped>

</style>