<template>
  <label class="z-50">
    <div class="w-9 h-10 cursor-pointer flex flex-col items-center justify-center">
      <input
        class="hidden peer"
        type="checkbox"
        :checked="isSidebarOpen"
        @change="toggleSidebar"
      />
      <div
        class="w-[50%] h-[2px] bg-black rounded-sm transition-all duration-300 origin-left translate-y-[0.45rem] peer-checked:rotate-[-45deg] peer-checked:bg-white"
      ></div>
      <div class="w-[50%] h-[2px] bg-black rounded-md transition-all duration-300 origin-center peer-checked:hidden"></div>
      <div
        class="w-[50%] h-[2px] bg-black rounded-md transition-all duration-300 origin-left -translate-y-[0.45rem] peer-checked:rotate-[45deg] peer-checked:bg-white"
      ></div>
    </div>
  </label>
</template>

<script setup>
import { useGlobalStore } from '@/stores/global'
import { storeToRefs } from 'pinia'

const store = useGlobalStore()
const { toggleSidebar } = store
const { isSidebarOpen } = storeToRefs(store)
</script>
