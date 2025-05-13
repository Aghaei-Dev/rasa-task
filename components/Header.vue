<template>
  <div class="shadow bg-gray-50">
    <header class="fixed-width py-1 flex justify-between items-center">
      <Menu :array="menu" />

      <Burger class="sm:hidden" />
      <div class="flex items-center gap-2">
        <h1 class="text-2xl text-blue-500 font-bold">رسا سامانه</h1>
        <img
          src="../assets/imgs/rocket.png"
          alt="logo"
          class="w-8"
        />
      </div>
    </header>
  </div>

  <slot />
</template>

<script setup>
import { menuItems } from '~/assets/constants'
const menu = menuItems
</script>
