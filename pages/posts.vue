<template>
  <Button @click="openConfirm">Open Confirm Modal</Button>
  <Button @click="openContent">Open Content Modal</Button>

  <Modal>
    <p>برگشت پذیر نیست.</p>
  </Modal>
</template>

<script setup>
import { useGlobalStore } from '~/stores/global'
import Modal from '~/components/UI/Modal.vue'
import Button from '~/components/UI/Button.vue'
const globalStore = useGlobalStore()

function openConfirm() {
  globalStore.showModal({
    type: 'confirm',
    title: 'آیا مطمئنی؟',

    onConfirm: () => alert('Confirmed!'),
    onCancel: () => alert('Cancelled.'),
  })
}

function openContent() {
  globalStore.showModal({
    type: 'content',
    title: 'Modal Info',
  })
}
useHead({
  title: 'رسا سامانه | پست ها',
  meta: [{ name: 'description', content: 'My amazing site.' }],
})
</script>
