<template>
  <!-- Main modal -->
  <div
    id="default-modal"
    tabindex="-1"
    aria-hidden="true"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50"
    :class="{
    'opacity-100 z-50 ': isShow,
    '-z-50 opacity-0 hidden': !isShow
    }"
    @click.self='() => { isShow = false }'
  >

    <div class="relative p-4 w-full max-w-2xl max-h-full z-50">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5">
          <h3 class="text-xl font-semibold text-gray-900">
            {{ title }}
          </h3>
        </div>
        <div class='p-2'>
          <slot />
        </div>
        <!-- Modal footer -->
        <div class="flex items-center justify-center p-4 md:p-5 rounded-b">
          <button
            data-modal-hide="default-modal"
            type="button"
            class="text-white bg-lime-500 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            @click="() => { $emit('exec') }"
          >{{ label }}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SimpleModal',
  props: {
    title: {
      type: String,
      default: () => 'Modal Title'
    },
    label: {
      type: String,
      default: () => '확인'
    }
  },
  data() {
    return {
      isShow: false
    }
  }
})
</script>