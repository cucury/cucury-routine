<template >
  <div class='relative flex w-full'>
    <CucuryDDayCategoryEditHeader
      :label='`${ isNaN(howManyDay) ? "올바르지 않은 날짜입니다." : howManyDay === 0 ? "D-DAY" : "D-" + howManyDay }`'
      :dDay 
      @updated:closed-edit='() => {
        this.$emit("updated:closed-edit")
      }' />
    <div class='absolute top-32 bg-white w-full rounded-tl-2xl rounded-tr-2xl p-6 h-[calc(100vh_-_18rem)] z-30' >
      <div class='flex flex-col h-full gap-4'>
        <div class='font-bold text-red-500'>생일</div>
        <input type='text' placeholder='누구의 생일인가요?️' v-model="name">
        <div class='flex justify-between p-2'>
          <div>
            태어난 날
          </div>
          <div>
            <input type='date' v-model='anniversaryDate'>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CucuryDDayCategoryEditHeader from '@/components/dday/category/CucuryDDayCategoryEditHeader.vue'
import { getDDay } from '@/service/dday'
import { DDay } from '@/models/DDay'
export default {
  name: 'CucuryDDayBirthdayBySolar',
  components: { CucuryDDayCategoryEditHeader },
  props: {
    category: {
      type: String,
      required: true
    }
  },
  computed: {
    howManyDay() {
      return getDDay(new Date(this.anniversaryDate))
    },
    dDay() {
      return new DDay({
        name: this.name,
        localeDateString: this.anniversaryDate,
        type: this.category
      })
    }
  },
  data() {
    return {
      anniversaryDate: new Date().toLocaleDateString("sv-SE"),
      name: ''
    }
  },
}
</script>
