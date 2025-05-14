<template>
  <html
    lang="fa"
    dir="rtl"
  >
    <NuxtLayout>
      <NuxtPage />
      <Overlay
        :condition="isShowOverlay"
        :close-fn="closeOverlay"
      />
      <Toast />
    </NuxtLayout>
  </html>
</template>
<script setup>
import Toast from './components/UI/Toast.vue'

const store = useGlobalStore()
const { closeOverlay } = store
const { isShowOverlay } = storeToRefs(store)
</script>
