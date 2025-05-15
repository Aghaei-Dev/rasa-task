<template>
  <div class="relative">
    <input
      :readonly="props.isReadOnly"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :class="[
        'bg-gray-100 text-gray-800 rounded-md p-2 pl-8 w-full transition ease-in-out duration-150',
        'focus:outline-none focus:ring-1',
        error
          ? 'border border-red-500 focus:ring-transparent'
          : props.isReadOnly
          ? 'focus:ring-emerald-500'
          : 'border border-transparent focus:ring-blue-500',
      ]"
    />
    <button
      v-if="modelValue && !props.isReadOnly"
      @click="$emit('update:modelValue', '')"
      class="absolute left-2 top-1/2 transform -translate-y-1/2 text-red-500 hover:text-red-700 cursor-pointer"
    >
      <Close class="w-4 h-4" />
    </button>
  </div>
</template>

<script setup>
import Close from '~/assets/icons/Close.vue'

const props = defineProps({
  type: String,
  placeholder: String,
  modelValue: String,
  error: Boolean,
  isReadOnly: Boolean,
})

defineEmits(['update:modelValue'])
</script>
