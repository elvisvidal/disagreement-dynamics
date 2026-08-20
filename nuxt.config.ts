export default defineNuxtConfig({
  compatibilityDate: '2024-07-19',
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/'
  },
  typescript: {
    strict: true
  },
  devtools: { enabled: false }
})
