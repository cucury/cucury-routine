<template>
  <div class='p-2 flex gap-1 overflow-auto hover:overflow-x-scroll relative overflow-y-none' @scroll='() => {
          if (!this.inactiveScrollDescription) {
            this.inactiveScrollDescription = true
          }
       }'
       style='scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;'
     >
    <div
      class='absolute bg-white top-0 left-0 z-50 w-full h-full flex justify-center items-center transform duration-[600ms] delay-300'
      :class='{
        "opacity-0 hidden": inactiveScrollDescription,
        "opacity-90": !inactiveScrollDescription,
      }'
    >
      <div class='bg-white rounded-lg shadow-lg opacity-100'>
        <div class='text-sm'>Scroll to see more</div>
      </div>
    </div>
    <div class='pt-7'>
      <div>
        Mon
      </div>
      <div>
        Wed
      </div>
      <div>
        Fri
      </div>
    </div>
    <GrassMonth :key='i' v-for='(v,i) in 12' :month='v' />
  </div>
</template>

<script>
import GrassMonth from './GrassMonth.vue'
export default {
  name: 'GrassYear',
  components: {
    GrassMonth
  },
  data() {
    return {
      inactiveScrollDescription: false,

    }
  },
}
</script>

<style scoped>

</style>