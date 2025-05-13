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
  }),

  actions: {
    toggle() {
      this.isSidebarOpen = !this.isSidebarOpen
    },
    close() {
      this.isSidebarOpen = false
    },
    open() {
      this.isSidebarOpen = true
    },

    showToast(message, type = 'success') {
      this.toast.message = message
      this.toast.type = type
      this.toast.show = true

      // ✅ پاک کردن تایمر قبلی
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      // ✅ تنظیم تایمر جدید
      timeoutId = setTimeout(() => {
        this.toast.show = false
        timeoutId = null
      }, 3000)
    },

    hideToast() {
      this.toast.show = false

      // ✅ پاک کردن تایمر اگر هنوز تمام نشده
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
    },
  },
})
