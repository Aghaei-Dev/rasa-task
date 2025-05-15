import { defineStore } from 'pinia'

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [],
    comments: [],
    selectedPost: null,
    isLoading: false,
    error: null,
    editPostData: {},
  }),

  actions: {
    setEditPostData(post) {
      this.editPostData = post
    },
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
      this.isLoading = true
      const toast = useGlobalStore()
      try {
        const response = await api.get('/posts')
        this.posts = response.data
      } catch (error) {
        this.error = error
        toast.showToast('دریافت پست با خطا مواجه شد.', 'error')
        console.log(this.error)
      } finally {
        this.isLoading = false
      }
    },
    async fetchComments(postId) {
      this.isLoading = true
      try {
        const response = await api.get('/comments', {
          params: { postId },
        })
        this.comments = response.data
      } catch (error) {
        this.error = error
      } finally {
        this.isLoading = false
      }
    },
    async updatePost(post) {
      this.isLoading = true
      const toast = useGlobalStore()
      try {
        await api.put(`/posts/${post.id}`, post)
        toast.showToast('پست با موفقیت ویرایش شد!', 'success')
      } catch (error) {
        toast.showToast('ویرایش پست با خطا مواجه شد.', 'error')
      } finally {
        this.isLoading = false
        toast.closeModal()
      }
    },
    async deletePost(postId) {
      await api.delete(`/posts/${postId}`)
      this.posts = this.posts.filter((p) => p.id !== postId)
    },
  },
})
