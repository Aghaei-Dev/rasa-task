import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', 'nuxt-echarts', '@vite-pwa/nuxt'],
  css: ['~/assets/css/main.css'],
  build: { transpile: ['echarts-liquidfill'] },
  app: {
    head: {
      title: 'رسا سامانه',
      htmlAttrs: {
        lang: 'fa',
      },
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: { 'echarts/lib/util/number': 'echarts/lib/util/number.js' },
    },
  },
  echarts: {
    ssr: false,
    renderer: ['canvas', 'svg'],
    charts: ['BarChart', 'PieChart'],
    components: ['DatasetComponent', 'GridComponent', 'TooltipComponent', 'ToolboxComponent', 'GeoComponent', 'VisualMapComponent'],
    features: ['LabelLayout', 'UniversalTransition'],
  },
  pwa: {
    registerType: 'autoUpdate', // auto updates service worker
    manifest: {
      name: 'Rasa Task App',
      short_name: 'Rasa App',
      description: 'its a Task',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      lang: 'fa',
      start_url: '/',
      icons: [
        {
          src: '/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    workbox: {},
    devOptions: {
      enabled: true,
    },
  },
})
