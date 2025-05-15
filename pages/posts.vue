<template>
  <DataGrid
    :columns="columns"
    :data="postStore.posts"
    @view="showComments"
    @edit="editPost"
    @delete="confirmDelete"
    :itemsPerPage="10"
    :items="postStore.posts"
  />
  <Modal>
    <p>برگشت پذیر نیست.</p>
  </Modal>
</template>

<script setup>
import DataGrid from '@/components/DataGrid.vue'
import { usePostStore } from '@/stores/posts'
import Modal from '~/components/UI/Modal.vue'

const globalStore = useGlobalStore()
const postStore = usePostStore()
await postStore.fetchPosts()

const columns = [
  { label: 'عنوان', key: 'title' },
  { label: 'متن', key: 'body' },
]
const showComments = (post) => {
  // مدال نمایش نظرات باز کن
}
const editPost = (post) => {
  globalStore.showModal({
    type: 'content',
    title: 'Modal Info',
  })
  console.log(post)
}
const confirmDelete = (post) => {
  globalStore.showModal({
    type: 'confirm',
    title: 'آیا مطمئنی؟',

    onConfirm: () => alert('Confirmed!'),
    onCancel: () => alert('Cancelled.'),
  })
  console.log(post)
}
useHead({
  title: 'رسا سامانه | پست ها',
  meta: [{ name: 'description', content: 'My amazing site.' }],
})
</script>
