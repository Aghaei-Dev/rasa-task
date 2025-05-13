<template>
  <html
    lang="fa"
    dir="rtl"
  >
    <NuxtLayout>
      <NuxtPage />
      <Overlay
        :condition="isSidebarOpen"
        :close-fn="toggle"
      />
      <Toast />
    </NuxtLayout>
  </html>
</template>
<script setup>
import Toast from './components/UI/Toast.vue'

const store = useGlobalStore()
const { toggle } = store
const { isSidebarOpen } = storeToRefs(store)
</script>
