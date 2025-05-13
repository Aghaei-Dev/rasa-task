<template>
  <button
    class="flex items-center justify-center rounded-full p-2 cursor-pointer outline-none bg-blue-100 hover:bg-blue-200 transition"
    :class="sizeClass"
    @click="onClick"
  >
    <component
      :is="icon"
      class="w-5 h-5 stroke-blue-700 hover:stroke-blue-800 transition"
    />
  </button>
</template>

<script setup>
const props = defineProps({
  icon: Object,
  onClick: Function,
  size: {
    type: String,
    default: 'md',
  },
})

const sizeClass = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
}[props.size]
</script>
