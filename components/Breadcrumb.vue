<template>
  <nav class="text-sm text-black/70 fixed-width px-4 py-4 font-semibold">
    <ol class="flex items-center">
      <li
        v-for="(crumb, index) in breadcrumbs"
        :key="index"
        class="flex items-center"
      >
        <template v-if="index !== breadcrumbs.length - 1">
          <NuxtLink
            :to="crumb.to"
            class="flex items-center text-black/70 cursor-pointer"
          >
            {{ crumb.title }}
          </NuxtLink>
          <ChevronLeft class="w-4 h-4 mx-2 text-black/70" />
        </template>
        <template v-else>
          <span class="text-blue-500 cursor-default">{{ crumb.title }}</span>
        </template>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import ChevronLeft from '~/assets/icons/ChevronLeft.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { menuItems } from '~/assets/constants'

const titleFinder = (path) => {
  return menuItems.find((item) => {
    return item.to === path
  })
}

const route = useRoute()

const breadcrumbs = computed(() => {
  const crumbs = []

  crumbs.push({
    to: '/',
    title: 'خانه',
  })

  route.matched.forEach((item) => {
    if (item.path === '/') return

    let resolvedPath = item.path

    Object.entries(route.params).forEach(([key, value]) => {
      resolvedPath = resolvedPath.replace(`:${key}`, value)
    })

    crumbs.push({
      to: resolvedPath,
      title: titleFinder(resolvedPath).title || decodeURIComponent(resolvedPath.split('/').pop()),
    })
  })

  return crumbs
})
</script>
