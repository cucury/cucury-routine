<template>
  <div v-if='this.isShow' class='absolute top-0 bg-white z-20 w-full'>
    <CucuryDDayBirthdayOfMoon
      v-if='"birthday_by_lunar" === category'
      :category='category'
      @updated:closed-edit='() => {
        this.onCloseEdit()
      }'/>
    <CucuryDDayBirthdayOfSun
      v-if='"birthday_by_solar" === category'
      :category='category'
      @updated:closed-edit='() => {
        this.onCloseEdit()
      }'/>
    <CucuryDDayCouple
      v-if='"couple" === category'
      :category='category'
      @updated:closed-edit='() => {
        this.onCloseEdit()
      }'/>
    <CucuryDDayExam
      v-if='"exam" === category'
      :category='category'
      @updated:closed-edit='() => {
        this.onCloseEdit()
      }'/>
    <CucuryDDayJapaneseAge
      v-if='"japanese_age" === category'
      :category='category'
      @updated:closed-edit='() => {
        this.onCloseEdit()
      }'/>
    <CucuryDDayTrip
      v-if='"trip" === category'
      :category='category'
      @updated:closed-edit='() => {
        this.onCloseEdit()
      }'/>
  </div>
</template>

<script>
import CucuryDDayBirthdayOfMoon from './items/CucuryDDayBirthdayByLunar.vue'
import CucuryDDayBirthdayOfSun from './items/CucuryDDayBirthdayBySolar.vue'
import CucuryDDayCouple from './items/CucuryDDayCouple.vue'
import CucuryDDayExam from './items/CucuryDDayExam.vue'
import CucuryDDayJapaneseAge from './items/CucuryDDayJapaneseAge.vue'
import CucuryDDayTrip from './items/CucuryDDayTrip.vue'

import { DDayCategoryNames } from '@/consts'
export default {
  name: 'CucuryDDayCategoryEdit',
  components: {
    CucuryDDayBirthdayOfMoon,
    CucuryDDayBirthdayOfSun,
    CucuryDDayCouple,
    CucuryDDayExam,
    CucuryDDayJapaneseAge,
    CucuryDDayTrip
  },
props: {
  category: {
    type: String,
      required: true
  }
},
setup() {
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
    }
  },
}
</script>

<style scoped>

</style>