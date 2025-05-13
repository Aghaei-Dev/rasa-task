<script setup lang="ts">
import type { ECSSRClientEventParams } from 'echarts/ssr/client/index'

const option = ref({
  legend: {
    top: '1%',
    left: 'center',
    selected: {
      آمریکا: true,
      ایران: true,
      ترکیه: true,
      امارات: true,
      آلمان: true,
    },
  },
  tooltip: {
    className: 'echarts-tooltip',
  },
  toolbox: {
    show: true,
    feature: {
      saveAsImage: {},
    },
  },
  animation: false,

  series: [
    {
      name: 'View By Country',
      type: 'pie',
      radius: ['30%', '70%'],
      // roseType: 'angle',
      itemStyle: {
        // borderRadius: [20, 5, 5, 10],
      },
      label: {
        show: true,
      },
      data: [
        { value: 800, name: 'آمریکا' },
        { value: 735, name: 'ایران' },
        { value: 580, name: 'ترکیه' },
        { value: 484, name: 'امارات' },
        { value: 400, name: 'آلمان' },
      ],
    },
  ],
})

function onClick(params: ECSSRClientEventParams) {
  if (params.ssrType === 'legend') {
    const key = Object.keys(option.value.legend.selected)[params.dataIndex!] as keyof typeof option.value.legend.selected
    option.value.legend.selected[key] = !option.value.legend.selected[key]
  }
}
</script>

<template>
  <VChartLight
    :option="option"
    @click="onClick"
  />
</template>
