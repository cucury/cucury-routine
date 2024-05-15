<template>
  <div class="h-[calc(100vh_-_130px)] overflow-y-scroll flex flex-col bg-pink-100 py-2 px-1 gap-2">
    <div>
      <div class='text-2xl'>Welcome!</div>
      <div>
      </div>
    </div>
    <div class='p-4'>
      <div class='text-2xl'>Cucury Routine</div>
      <div class='bg-white rounded-lg'>
        <div>
          <GrassYear />
        </div>
      </div>
    </div>
    <div class='p-4'>
      <div class='text-2xl'>Cucury D-Day</div>
      <div class='bg-white rounded-lg'>
        <div>
          <GrassYear />
        </div>
      </div>
    </div>
    <div class='p-4'>
      <div class='text-2xl'>Cucury Diary</div>
      <div class='bg-white rounded-lg'>
        <div>
          <GrassYear />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GrassYear from '@/components/calendar/GrassYear.vue'

export default defineComponent({
  name: 'RoutineHome',
  components: {
    GrassYear
  }
})
</script>

