<template>
  <div
    v-for="comment in comments"
    :key="comment"
    class="grid gap-1 items-center justify-center border-b border-gray-300 last:border-none py-1 text-left break-words"
  >
    <div>id : {{ toPersianNumber(comment.id) }}</div>
    <div>name : {{ comment.name }}</div>
    <div>email : {{ comment.email }}</div>
    <div>body : {{ truncateText(comment.body, 100) }}</div>
  </div>
</template>
<script setup>
const props = defineProps({
  comments: Array,
})
</script>
