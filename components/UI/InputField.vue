<template>
  <input
    :type="type"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :placeholder="placeholder"
    :class="[
      'bg-gray-100 text-gray-800 rounded-md p-2 mb-4 transition ease-in-out duration-150',
      'focus:bg-gray-200 focus:outline-none focus:ring-1',
      error ? 'border border-red-500 focus:ring-transparent' : 'border border-transparent focus:ring-blue-500',
    ]"
  />
</template>

<script setup>
defineProps({
  type: String,
  placeholder: String,
  modelValue: String,
  error: Boolean,
})

defineEmits(['update:modelValue'])
</script>
