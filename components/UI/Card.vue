<template>
  <div class="bg-gray-50 rounded-md shadow-md hover:shadow-xl transition p-4 sm:p-6 pb-0 sm:pb-0 w-full">
    <h2 class="text-xl font-semibold text-black/80">{{ props.title }}</h2>

    <div class="w-full">
      <slot />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
})
</script>
