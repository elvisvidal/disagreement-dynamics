export default defineNuxtConfig({
  compatibilityDate: '2024-07-19',
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  typescript: {
    strict: true
  },
  devtools: { enabled: false }
})
