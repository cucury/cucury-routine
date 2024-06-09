<template>
  <input type='radio' class='hidden' :value='color' v-model='newGroup.color' />
  <button
    @click='selectedColor($event)'
    :class='`mx-3 mt-3 w-6 h-6 rounded-full bg-${color}-500 border-1 border-${color}-900 ${this.newGroup.color === color? `opacity-50` : `opacity-100` }`'
  > <span v-if='newGroup.color === color' class='text-xs flex justify-center items-center p-1'>✔</span>︎ </button>
  <!--
  //'`opacity-20`': newGroup.color === color
  -->
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import { RoutineGroup } from '@/models'

export default defineComponent ({
  name: 'GroupColorRadio',
  props: {
    color: {
      type: String,
      required: true
    },
    group: {
      type: Object as PropType<RoutineGroup>,
      required: true
    }
  },
  computed: {
    newGroup: {
      get() { return this.group },
      set(value: RoutineGroup) {
        this.$emit('update:group', value)
      }
    }
  },
  methods: {
    selectedColor(event: Event) {
      event.preventDefault()
      this.newGroup.color = this.color
    }
  }
})
</script>
