<template>
  <div class="space-y-4">
    <div
      v-for="comment in comments"
      :key="comment.id"
      class="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200"
    >
      <div class="flex items-start gap-4">
        <img
          class="w-12 h-12 rounded-full bg-blue-100 object-cover border"
          alt="avatar"
        />

        <div class="grid grid-cols-1 sm:grid-cols-4 sm:gap-x-4 gap-y-2 text-sm w-full">
          <div class="font-semibold text-gray-600">ID</div>
          <div class="sm:col-span-3 text-gray-800">{{ toPersianNumber(comment.id) }}</div>

          <div class="font-semibold text-gray-600">Name</div>
          <div class="sm:col-span-3 text-gray-800">{{ comment.name }}</div>

          <div class="font-semibold text-gray-600">Email</div>
          <div class="sm:col-span-3 text-gray-800 break-words">{{ comment.email }}</div>

          <div class="font-semibold text-gray-600">Body</div>
          <div class="sm:col-span-3 text-gray-800 break-words">
            {{ expandedComments[comment.id] ? comment.body : truncateText(comment.body, 100) }}
            <button
              class="text-blue-500 ml-2 underline text-xs cursor-pointer"
              @click="toggleExpand(comment.id)"
            >
              {{ expandedComments[comment.id] ? 'Read less' : 'Read more' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
const props = defineProps({
  comments: Array,
})

const expandedComments = reactive({})
const toggleExpand = (id) => {
  expandedComments[id] = !expandedComments[id]
}
</script>
