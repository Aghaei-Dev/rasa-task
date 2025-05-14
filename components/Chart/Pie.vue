<script setup>
import { ref, shallowRef, onMounted, onBeforeUnmount } from 'vue'
import { toPersianNumber } from '~/utils'

const chart = ref(null)

const countries = ['ایران', 'آمریکا', 'ترکیه', 'آلمان', 'امارات', 'عراق', 'فرانسه']

function generateRandomData() {
  return countries.map((name) => ({
    name,
    value: Math.floor(400 + Math.random() * 700),
  }))
}
const option = shallowRef({
  animation: true,
  animationDuration: 1000,
  animationEasing: 'cubicOut',
  tooltip: {
    trigger: 'item',
    className: 'echarts-tooltip',
    formatter: (params) => `${params.name}: ${toPersianNumber(params.value)} بازدید`,
  },

  toolbox: {
    show: true,
    feature: {
      saveAsImage: {
        title: 'ذخیره تصویر',
        type: 'png',
        pixelRatio: 2,
        backgroundColor: '#fff',
      },
      dataView: {
        title: 'مشاهده داده‌ها',
        readOnly: false,
      },
      restore: {
        title: 'بازگشت به حالت اولیه',
      },
    },
  },
  series: [
    {
      type: 'pie',
      radius: ['35%', '80%'],
      avoidLabelOverlap: true,
      label: {
        show: true,
        position: 'inside',
        formatter: ({ name, value }) => `${name}\n${toPersianNumber(value)}`,
        fontSize: 14,
      },
      labelLine: {
        show: true,
      },
      emphasis: {
        scale: true,
        scaleSize: 14,
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
      data: generateRandomData(),
    },
  ],
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
    <ClientOnly>
      <VChart
        ref="chart"
        :option="option"
        autoresize
        class="w-full h-full"
      />
    </ClientOnly>
  </div>
</template>
