<template>
    <button type='button' class='bg-indigo-300 w-32 h-32 rounded-lg px-1 py-2 text-xs flex justify-center items-end'>
      {{ label }}
    </button>
</template>

<script>
export default {
  name: 'CucuryRoutineTemplate',
  props: {
    label: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>