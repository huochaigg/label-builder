/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './renderer/**/*.{js,ts,jsx,tsx}', // 如果你是 Electron 项目
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

