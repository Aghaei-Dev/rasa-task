<template>
  <Transition name="fade">
    <div
      v-if="condition"
      class="fixed inset-0 w-full h-full bg-black/90 bg-rust-600"
      :style="{ zIndex }"
      @click="closeFn"
    ></div>
  </Transition>
</template>

<script setup>
import { watch, onBeforeUnmount } from 'vue'

const props = defineProps({
  closeFn: {
    type: Function,
    required: true,
  },
  condition: {
    type: Boolean,
    required: true,
  },
  zIndex: {
    type: [String, Number],
    default: '30',
  },
})

watch(
  () => props.condition,
  (val) => {
    document.body.style.overflow = val ? 'hidden' : 'unset'
  }
)

onBeforeUnmount(() => {
  document.body.style.overflow = 'unset'
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
