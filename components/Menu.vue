<template>
  <ul
    :class="[
      'sm:flex gap-4 p-2 flex-row text-md font-bold',
      isSidebarOpen ? 'flex-col z-50 fixed-up text-center text-4xl leading-20' : 'hidden',
    ]"
  >
    <li
      v-for="item in props.array"
      :key="item.to"
      @click="closeSidebar"
    >
      <NuxtLink
        :to="item.to"
        :class="[
          'p-2 transition',
          isActive(item.to) ? 'text-blue-500 border-b-1 border-blue-500' : isSidebarOpen ? 'text-white' : 'text-black/70',
        ]"
      >
        {{ item.title }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup>
import { useGlobalStore } from '@/stores/global'
const props = defineProps({
  array: {
    type: [Object],
    required: true,
  },
  dir: { type: String },
})
const store = useGlobalStore()
const { closeSidebar } = store
const { isSidebarOpen } = storeToRefs(store)

const route = useRoute()
const isActive = (path) => route.path === path
</script>
