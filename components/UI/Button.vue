<script setup>
const props = defineProps({
  onClick: Function,
  type: {
    type: String,
    default: 'button',
  },
  variant: {
    type: String,
    default: 'primary',
  },
  size: {
    type: String,
    default: 'md',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  customClass: {
    type: String,
    default: '',
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  full: {
    type: Boolean,
    default: false,
  },
})

const baseClasses = 'font-semibold transition duration-300 ease-in-out focus:outline-none shadow-sm cursor-pointer hover:translate-y-0.25'

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-5 py-3 text-lg',
}

const variantClasses = {
  primary: 'bg-blue-500 text-white hover:bg-blue-600 ',
  secondary: 'bg-gray-500 text-white hover:bg-gray-600 ',
  danger: 'bg-red-500 text-white hover:bg-red-600',
  outline: 'border border-gray-500 text-gray-800 hover:bg-gray-100 ',
}
</script>

<template>
  <button
    @click="props.onClick"
    :type="type"
    :disabled="disabled"
    :class="[
      baseClasses,
      sizeClasses[size],
      variantClasses[variant],
      rounded ? 'rounded-full' : 'rounded-md',
      full ? 'w-full' : '',
      customClass,
      disabled ? 'bg-gray-400 cursor-not-allowed hover:translate-none hover:bg-gray-500' : '',
    ]"
  >
    <slot />
  </button>
</template>
