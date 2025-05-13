<script setup>
import Card from '../components/UI/Card'
import Bar from '../components/Chart/Bar'
import Pie from '../components/Chart/Pie'

useHead({
  title: 'رسا سامانه | آمار بازدید',
  meta: [{ name: 'description', content: 'My amazing site.' }],
})
</script>

<template>
  <section class="fixed-width sm:py-5 lg:grid-cols-2 grid gap-3">
    <Card title="آمار بازدید بر اساس روز های هفته">
      <Bar />
    </Card>
    <Card title="آمار بازدید بر اساس کشور">
      <Pie />
    </Card>
  </section>
</template>
