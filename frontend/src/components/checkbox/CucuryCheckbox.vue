<template>
  <div>
    <label
      @click='() => {
                  $emit("input", !value)
                }'
      class='cursor-pointer w-6 h-6 border rounded-lg flex justify-center items-center'
    >
                <span
                  class='w-3 h-3 rounded-full'
                  :class='{
                    "bg-lime-500": value,
                    "bg-gray-200": !value
                  }'
                ></span>
    </label>
    {{ label }}
  </div>
</template>

<script>
export default {
  name: 'CucuryCheckbox',
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  },
}
</script>