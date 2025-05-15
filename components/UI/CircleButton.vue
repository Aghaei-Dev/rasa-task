<template>
  <button
    class="flex items-center justify-center rounded-full cursor-pointer outline-none transition"
    @click="onClick"
    :class="[sizeClass, disabled ? 'opacity-50 bg-gray-400 cursor-not-allowed hover:translate-none hover:bg-gray-500' : '']"
    :disabled="disabled"
  >
    <component
      v-if="icon"
      :is="icon"
      class="w-5 h-5 transition"
      :class="iconClass"
    />

    <span
      v-else
      class="text-sm font-medium"
    >
      <slot />
    </span>
  </button>
</template>

<script setup>
const props = defineProps({
  icon: [Object, Function],
  iconClass: {
    type: String,
    default: '',
  },
  onClick: {
    type: Function,
    default: () => {},
  },
  size: {
    type: String,
    default: 'md',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const sizeClass = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10 p-2',
  lg: 'w-12 h-12',
}[props.size]
</script>
