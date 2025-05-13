<script setup>
import { ref, shallowRef, onMounted, onBeforeUnmount } from 'vue'

const chart = ref(null)

function random() {
  return Math.ceil(Math.round(300 + Math.random() * 700) / 10)
}

const option = shallowRef({
  animation: true,
  tooltip: {
    className: 'echarts-tooltip',
  },
  toolbox: {
    show: true,
    feature: {
      saveAsImage: {},
    },
  },
  dataset: {
    dimensions: ['day', 'view'],
    source: [
      { day: 'شنبه', view: random() },
      { day: 'یکشنبه', view: random() },
      { day: 'دوشنبه', view: random() },
      { day: 'سه شنبه', view: random() },
      { day: 'چهار شنبه', view: random() },
      { day: 'پنج شنبه', view: random() },
      { day: 'جمعه', view: random() },
    ],
  },
  xAxis: { type: 'category' },
  yAxis: {},
  itemStyle: { borderRadius: 3 },
  series: [{ type: 'bar' }],
})

function resizeChart() {
  chart.value?.resize()
}

onMounted(() => {
  window.addEventListener('resize', resizeChart)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart)
})
</script>

<template>
  <div class="w-full h-[300px] sm:h-[400px]">
    <VChart
      ref="chart"
      :option="option"
      autoresize
      class="w-full h-full"
    />
  </div>
</template>
