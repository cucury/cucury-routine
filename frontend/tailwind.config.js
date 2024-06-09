/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    {
      pattern: /bg-(slate|red|orange|emerald|sky|indigo|rose|lime|amber|purple)-500/,
    },
    {
      pattern: /text-(slate|red|orange|emerald|sky|indigo|rose|lime|amber|purple)-500/,
    }
  ]
}

