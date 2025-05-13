<script setup>
import { computed } from 'vue'
import Fail from '~/assets/icons/Fail.vue'
import Success from '~/assets/icons/Success.vue'
import { useGlobalStore } from '~/stores/global'
const store = useGlobalStore()

const bgClass = computed(() => (store.toast.type === 'success' ? 'border-green-200' : 'border-red-200'))
</script>

<template>
  <transition name="fade">
    <div
      v-if="store.toast.show"
      class="fixed top-6 w-full max-w-2xs left-1/2 -translate-x-1/2 bg-white border text-black/80 px-4 py-3 rounded shadow-lg flex items-center gap-2 z-50 transition-all"
      :class="bgClass"
    >
      <span
        ><Success
          v-if="store.toast.type === 'success'"
          class="stroke-green-500" />
        <Fail
          v-if="store.toast.type === 'error'"
          class="stroke-red-500"
      /></span>
      <span class="font-medium">{{ store.toast.message }}</span>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
