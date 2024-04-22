<script lang="ts">
import {defineComponent} from "vue"
import useNaviStore,{ Navigations } from "@/stores/navi"

export default defineComponent({
  name: "RoutineNavi",
  setup() {
    const navi = useNaviStore()
    return {
      navi,
      Navigations
    }
  },
})
</script>

<template>
  <div class="fixed z-50 w-full h-16 max-w-sm -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2">
    <div class="grid h-full max-w-lg grid-cols-5 mx-auto">
      <button
          data-tooltip-target="tooltip-home"
          type="button"
          class="inline-flex flex-col items-center justify-center px-1 rounded-s-full hover:bg-gray-50 group"
          :class="navi.tab === Navigations.Home ? 'bg-gray-50' : ''"
          @click="navi.setTab(Navigations.Home)">
        <svg class="w-5 h-5 mb-1 group-hover:text-blue-600 "
             :class="navi.tab === Navigations.Home ? 'text-blue-600' : 'text-gray-500'"
             aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
        </svg>
        <span class="sr-only">Home</span>
      </button>
      <div id="tooltip-home" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip ">
        Home
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
      <button data-tooltip-target="tooltip-wallet" type="button" class="inline-flex flex-col items-center justify-center px-1 hover:bg-gray-50 group"
          :class="navi.tab === Navigations.Routine ? 'bg-gray-50' : ''"
          @click="navi.setTab(Navigations.Routine)">
        <svg class="w-5 h-5 mb-1 group-hover:text-blue-600 "
             :class="navi.tab === Navigations.Routine ? 'text-blue-600' : 'text-gray-500'"
             aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6h8m-8 6h8m-8 6h8M4 16a2 2 0 1 1 3.321 1.5L4 20h5M4 5l2-1v6m-2 0h4"/>
        </svg>
        <span class="sr-only">Wallet</span>
      </button>
      <div id="tooltip-wallet" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip ">
        Wallet
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
      <div class="flex items-center justify-center">
        <button data-tooltip-target="tooltip-new" type="button" class="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none ">
          <svg class="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
          </svg>
          <span class="sr-only">New item</span>
        </button>
      </div>
      <div id="tooltip-new" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip ">
        Create new item
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
      <button data-tooltip-target="tooltip-settings" type="button" class="inline-flex flex-col items-center justify-center px-1 hover:bg-gray-50 group"
        :class="navi.tab === Navigations.DDay ? 'bg-gray-50' : ''"
        @click="navi.setTab(Navigations.DDay)">
        <svg class="w-5 h-5 mb-1 group-hover:text-blue-600 "
             :class="navi.tab === Navigations.DDay ? 'text-blue-600' : 'text-gray-500'"
             aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z"/>
        </svg>
      </button>
      <div id="tooltip-settings" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip ">
        Settings
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
      <button data-tooltip-target="tooltip-profile" type="button" class="inline-flex flex-col items-center justify-center px-1 rounded-e-full hover:bg-gray-50 group"
          :class="navi.tab === Navigations.Diary ? 'bg-gray-50' : ''"
          @click="navi.setTab(Navigations.Diary)">
        <svg class="w-5 h-5 mb-1 group-hover:text-blue-600 "
             :class="navi.tab === Navigations.Diary ? 'text-blue-600' : 'text-gray-500'"
             aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path fill-rule="evenodd" d="M6 2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 1 0 0-2h-2v-2h2a1 1 0 0 0 1-1V4a2 2 0 0 0-2-2h-8v16h5v2H7a1 1 0 1 1 0-2h1V2H6Z" clip-rule="evenodd"/>
        </svg>
      </button>
      <div id="tooltip-profile" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip ">
        Profile
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
    </div>
  </div>
</template>