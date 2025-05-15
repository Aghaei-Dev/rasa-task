import { defineStore } from 'pinia'

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [],
    comments: [],
    selectedPost: null,
    isLoading: false,
    error: null,
  }),

  actions: {
    async submitPost(payload) {
      this.isLoading = true
      const toast = useGlobalStore()
      try {
        const response = await api.post('/posts', payload)
        toast.showToast('پست با موفقیت ارسال شد!', 'success')
        return response.data
      } catch (err) {
        toast.showToast('ارسال پست با خطا مواجه شد.', 'error')
      } finally {
        this.isLoading = false
      }
    },
    async fetchPosts() {
      this.loading = true
      try {
        const response = await api.get('/posts')
        this.posts = response.data
      } catch (error) {
        this.error = error
        toast.showToast('دریافت پست با خطا مواجه شد.', 'error')
        console.log(this.error)
      } finally {
        this.loading = false
      }
    },
    async fetchComments(postId) {
      try {
        const response = await api.get('/comments', {
          params: { postId },
        })
        this.comments = response.data
      } catch (error) {
        this.error = error
      }
    },
    async updatePost(post) {
      await api.put(`/posts/${post.id}`, post)
    },
    async deletePost(postId) {
      await api.delete(`/posts/${postId}`)
      this.posts = this.posts.filter((p) => p.id !== postId)
    },
  },
})
