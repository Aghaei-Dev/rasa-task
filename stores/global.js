import { defineStore } from 'pinia'

let timeoutId = null

export const useGlobalStore = defineStore('global', {
  state: () => ({
    isSidebarOpen: false,
    isShowOverlay: false,

    toast: {
      show: false,
      message: '',
      type: 'success',
    },
    modalState: {
      isVisible: false,
      type: 'content',
      content: '',
      title: '',
      confirmText: '',
      cancelText: '',
      onConfirm: null,
      onCancel: null,
    },
  }),

  actions: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen
      this.isShowOverlay = !this.isShowOverlay
    },
    closeSidebar() {
      this.isSidebarOpen = false
      this.isShowOverlay = false
    },
    openSidebar() {
      this.isSidebarOpen = true
      this.isShowOverlay = true
    },
    toggleOverlay() {
      this.isShowOverlay = !this.isShowOverlay
    },
    ShowOverlay() {
      this.isShowOverlay = true
    },
    closeOverlay() {
      this.isShowOverlay = false
      this.isSidebarOpen = false
      this.modalState.isVisible = false
    },

    showToast(message, type = 'success') {
      this.toast.message = message
      this.toast.type = type
      this.toast.show = true

      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        this.toast.show = false
        timeoutId = null
      }, 3000)
    },

    hideToast() {
      this.toast.show = false
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
    },

    showModal(options) {
      this.ShowOverlay()
      this.modalState = {
        isVisible: true,
        type: options.type || 'content',
        title: options.title || '',
        confirmText: options.confirmText || 'تایید',
        cancelText: options.cancelText || 'لغو',
        onConfirm: options.onConfirm || null,
        onCancel: options.onCancel || null,
        content: options.content || '',
      }
    },
    closeModal() {
      this.modalState.isVisible = false
      this.isShowOverlay = false
    },
  },
})
