import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './components/**/*.{vue,js,ts}',
    './composables/**/*.{js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif']
      },
      colors: {
        ink: '#20201d',
        paper: '#f7f4ed',
        clay: '#9a654d',
        moss: '#63715b',
        mist: '#d8ded6',
        line: '#ded8cc'
      },
      boxShadow: {
        soft: '0 18px 45px rgba(32, 32, 29, 0.08)'
      }
    }
  }
}
