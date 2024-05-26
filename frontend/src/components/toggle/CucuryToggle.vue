<template>
  <div class='flex items-center gap-2'>
    {{ label }}
    <input type='checkbox' class='hidden' />
    <button
      class='flex w-10 h-5 rounded-full p-1 border border-gray-300 cursor-pointer items-center'
      :class='{
        "justify-end bg-gray-300": !isChecked,
        "justify-start bg-white": isChecked
      }'
      @click='() => {
        this.isChecked = !isChecked
        this.$emit("input", isChecked)
      }'
    >
      <span
        class='w-3 h-3 rounded-full'
        :class='{
          "bg-white": !isChecked,
          "bg-lime-500": isChecked
        }'
      ></span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'CucuryToggle',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isChecked: this.value ?? false
    }
  },
}
</script>