<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CucuryButton'
})
</script>

<template>
  <button class="w-full h-20 bg-lime-500 text-white rounded-2xl">
    <slot />
  </button>
</template>

<style scoped></style>
