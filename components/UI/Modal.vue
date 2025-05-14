<template>
  <transition
    name="modal-fade"
    @after-leave="handleAfterLeave"
  >
    <div
      v-if="modalState.isVisible"
      class="bg-gray-50 z-50 rounded-md max-w-lg w-full relative transition-all duration-300"
      :class="modalState.type === 'confirm' ? 'p-6' : 'p-4'"
    >
      <CircleButton
        :icon="Close"
        :iconClass="'stroke-gray-700 hover:stroke-gray-800'"
        size="sm"
        class="absolute top-3 left-3 bg-gray-50 hover:bg-gray-100"
        @click="closeModal"
      />
      <h3
        v-if="modalState.title"
        class="text-lg font-semibold mb-4"
      >
        {{ modalState.title }}
      </h3>

      <div class="mb-4">
        <slot />
      </div>

      <div
        v-if="modalState.type === 'confirm'"
        class="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700"
      >
        <Button
          @click="handleCancel"
          full
          variant="danger"
        >
          {{ modalState.cancelText }}
        </Button>
        <Button
          @click="handleConfirm"
          full
        >
          {{ modalState.confirmText }}
        </Button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { useGlobalStore } from '@/stores/global'
import { storeToRefs } from 'pinia'
import Button from './Button.vue'
import CircleButton from './CircleButton.vue'
import Close from '~/assets/icons/Close.vue'

const globalStore = useGlobalStore()
const { modalState } = storeToRefs(globalStore)

const closeModal = () => {
  globalStore.closeModal()
}

const handleConfirm = () => {
  modalState.value?.onConfirm?.()
  closeModal()
}

const handleCancel = () => {
  modalState.value?.onCancel?.()
  closeModal()
}

const handleAfterLeave = () => {
  globalStore.closeOverlay()
}
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
