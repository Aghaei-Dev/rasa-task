<template>
  <select
    class="bg-gray-100 rounded-md text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
    :value="modelValue"
    @input="$emit('update:modelValue', Number($event.target.value))"
  >
    <option
      v-for="item in array"
      :key="item"
      :value="item"
    >
      {{ toPersianNumber(item) }}
    </option>
  </select>
</template>

<script setup>
const props = defineProps({
  array: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: [String, Number],
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])
</script>
