<template >
  <div class='relative flex w-full'>
    <CucuryDDayCategoryEditHeader
      :label='`${ lunar.err ? "올바르지 않은 날짜입니다." : howManyDay === 0 ? "D-DAY" : "D-" + howManyDay }`'
      :dDay @updated:closed-edit='() => {
        this.$emit("updated:closed-edit")
      }' />
    <div class='absolute top-32 bg-white w-full rounded-tl-2xl rounded-tr-2xl p-6 h-[calc(100vh_-_18rem)] z-30' >
      <div class='flex flex-col h-full gap-4'>
        <div class='font-bold text-red-500'>음력 생일</div>
        <input type='text' placeholder='누구의 생일인가요?' v-model="name">
        <div class='flex justify-between p-2'>
          <div>
            태어난 날
          </div>
          <div class='flex flex-col'>
            <div class="flex gap-2">
              <div>
                양력
              </div>
              <div>
                <input type='date' v-model='anniversaryDate'>
              </div>
            </div>
            <div v-if='lunar.ok' class="flex gap-2">
              <div>
                음력
              </div>
              <div>
              {{ `${lunar.val.replace(/-/g, " . ")}.` }}
              </div>
            </div>
            <div v-if="lunar.err" class="w-32 text-red-400 whitespace-pre-wrap">
              {{ lunar.val.message }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CucuryDDayCategoryEditHeader from '@/components/dday/category/CucuryDDayCategoryEditHeader.vue'
import { getDDay } from '@/service/dday'
import solarlunar from 'solarlunar'
import { isInvalidDate } from '@/service/dday'
import { Err, Ok } from 'ts-results'
import { DDay } from '@/models/DDay'

export default {
  name: 'CucuryDDayBirthdayByLunar',
  components: { CucuryDDayCategoryEditHeader },
  setup() {
    return {
      prevLunar: Ok(new Date().toLocaleDateString("sv-SE"))
    }
  },
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
    lunar() {
      const selectedDate = new Date(this.anniversaryDate)
      const lunar = solarlunar.lunar2solar(
        selectedDate.getFullYear(),
        selectedDate.getMonth() +1,
        selectedDate.getDate())
      if (isInvalidDate(this.anniversaryDate)) {
        return Err(new Error("음력 날짜를 계산할 수 없습니다."))
      } else if (!lunar.cYear
      || !lunar.cMonth
      || !lunar.cDay
      || lunar === -1
      ) {
        return Err(new Error(`음력 ${this.anniversaryDate}은 존재하지 않는 날짜입니다.`))
      } else {
        const mm = lunar.cMonth.toString().padStart(2, "0")
        const dd = lunar.cDay.toString().padStart(2, "0")
        const dateString = `${lunar.cYear}-${mm}-${dd}`
        return Ok(dateString)
      }
    },
    dDay() {
      return new DDay({
        name: this.name,
        localeDateString: this.anniversaryDate,
        type: this.category
      })
    }
  },
  watch: {
    lunar(n, o) {
      this.prevLunar = o
    }
  },
  data() {
    return {
      anniversaryDate: new Date().toLocaleDateString("sv-SE"),
      name: ''
    }
  }
}
</script>
