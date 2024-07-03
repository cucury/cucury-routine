<template>
  <div class='w-full p-2 text-sm bg-gray-100 border border-gray-300 rounded-lg'>
    <div class="flex items-center justify-between">
      <div>
        <CalendarHeartIcon v-if="'couple' === dDay.type" class="text-pink-500" />
        <CertificateIcon v-else-if="'exam' === dDay.type" class="text-blue-500" />
        <AirplaneTakeoffIcon v-else-if="'trip' === dDay.type" class="text-lime-500"  />
        <CakeIcon v-else class="text-indigo-500" />
      </div>
      <div class="w-full px-2">
        <div class="line-clamp-1">
          {{ dDay.name }}
        </div>
        <div>
          {{ toDisplayDate(dDay.localeDateString) }}
        </div>
      </div>
      <div>
        <div v-if="'couple' === dDay.type">
          {{ new Date(dDay.localeDateString).getTime() > new Date().getTime() ? 'D-' : 'D+' }}
          {{ Math.abs(Math.floor((new Date(dDay.localeDateString).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))) }}
        </div>
        <div v-else-if="'birthday_by_solar' === dDay.type">
          {{ new Date(dDay.localeDateString).getTime() > new Date().getTime() ? 'D-' : 'D+' }}
          {{ Math.abs(Math.floor((new Date(dDay.localeDateString).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))) }}
        </div>
        <div v-else>
          {{ new Date(dDay.localeDateString).getTime() > new Date().getTime() ? 'D-' : 'D+' }}
          {{ Math.abs(Math.floor((new Date(dDay.localeDateString).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CalendarHeartIcon from 'vue-material-design-icons/CalendarHeart.vue'
import CakeIcon from 'vue-material-design-icons/Cake.vue'
import CertificateIcon from 'vue-material-design-icons/Certificate.vue'
import AirplaneTakeoffIcon from 'vue-material-design-icons/AirplaneTakeoff.vue'

export default {
  name: 'CucuryDDayCard',
  components: { CalendarHeartIcon, CakeIcon, CertificateIcon, AirplaneTakeoffIcon },
  props: {
    dDay: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      week: ['일', '월', '화', '수', '목', '금', '토']
    }
  },
  methods: {
    toDisplayDate(localeDateString: string) {
      const dateString = new Date(localeDateString).toLocaleDateString('ko-KR')
      const weekString = this.week[new Date(localeDateString).getDay()]
      return `${dateString} (${weekString})`
    }
  }
}
</script>