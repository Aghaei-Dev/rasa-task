<template>
  <DataGrid
    :columns="columns"
    :data="postStore.posts"
    @view="showComments"
    @edit="editPost"
    @delete="deletePostHandler"
    :items="postStore.posts"
  />
  <Modal>
    <PostForm
      :postData="postStore.editPostData"
      v-if="postStore.editPostData"
    />
    <Comments
      v-else
      :comments="postStore.comments"
    />
  </Modal>
</template>

<script setup>
import DataGrid from '@/components/DataGrid.vue'
import { usePostStore } from '@/stores/posts'
import Modal from '~/components/UI/Modal.vue'
import { toPersianNumber } from '../utils'
import PostForm from '~/components/PostForm.vue'

const globalStore = useGlobalStore()
const postStore = usePostStore()
await postStore.fetchPosts()

const columns = [
  { label: 'عنوان', key: 'title' },
  { label: 'متن', key: 'body' },
]
const showComments = async (post) => {
  postStore.editPostData = null
  await postStore.fetchComments(post.id)
  globalStore.showModal({
    type: 'content',
    title: `کامنت های پست با آیدی ${toPersianNumber(post.id)}`,
  })
}
const editPost = (post) => {
  globalStore.showModal({
    type: 'content',
    title: `ویرایش پست با آیدی ${toPersianNumber(post.id)}`,
  })
  postStore.setEditPostData(post)
}
const deletePostHandler = (post) => {
  globalStore.showModal({
    type: 'confirm',
    title: `آیا از حذف پست با آیدی ${toPersianNumber(post.id)} مطمئنی؟`,
    content: `<h1 class='text-red-500'>عنوان : ${post.title} حذف خواهد شد.</h1>`,
    onConfirm: () => {
      postStore.deletePost(post.id)
      globalStore.showToast('حذف پست با موفقیت انجام شد.', 'success')
    },
    onCancel: () => globalStore.closeModal(),
  })
}
useHead({
  title: 'رسا سامانه | پست ها',
  meta: [{ name: 'description', content: 'My amazing site.' }],
})
</script>
