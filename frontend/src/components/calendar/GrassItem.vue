<template>
  <button
    type='button'
    class='h-2 w-2 border rounded-[2px]'
    :class='{
      "bg-gray-500 border-gray-700": Number(fill) === 0,
      "bg-green-300 border-green-500": Number(fill) === 1,
      "bg-green-400 border-green-600": Number(fill) === 2,
      "bg-green-500 border-green-700": Number(fill) === 3,
      "bg-green-600 border-green-800": Number(fill) === 4,
      "bg-green-700 border-green-900": Number(fill) === 5,
    }'
  ></button>
</template>

<script>
export default {
  name: 'GrassItem',
  props: {
    fill: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>