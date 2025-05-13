import { defineStore } from 'pinia'

export const usePostStore = defineStore('post', {
  state: () => ({
    loading: false,
  }),

  actions: {
    async submitPost(payload) {
      this.loading = true
      const toast = useGlobalStore()

      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })

        if (!res.ok) throw new Error('خطا در ارسال پست')

        toast.showToast('پست با موفقیت ارسال شد!', 'success')
        return await res.json()
      } catch (err) {
        toast.showToast('ارسال پست با خطا مواجه شد.', 'error')
      } finally {
        this.loading = false
      }
    },
  },
})
