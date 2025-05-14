<template>
  <button
    class="flex items-center justify-center rounded-full cursor-pointer outline-none transition"
    :class="sizeClass"
    @click="onClick"
  >
    <component
      :is="icon"
      class="w-5 h-5 transition"
      :class="iconClass"
    />
  </button>
</template>

<script setup>
const props = defineProps({
  icon: Object,
  iconClass: String,
  onClick: Function,
  size: {
    type: String,
    default: 'md',
  },
})

const sizeClass = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10 p-2',
  lg: 'w-12 h-12',
}[props.size]
</script>
