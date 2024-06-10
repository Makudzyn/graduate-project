import type { Config } from 'tailwindcss'

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        '22': '5.5rem',
      },
      fontSize: {
        'sm+': '0.95rem',
      },
      colors: {
        'purpleFirst': "#6161ff",
        'purpleSecond': "#7878ff",
        'lightBg': "#f0f5fa",
        'primary': "#212529",
        'paragraph': "#343a40",
        'secondary': "#c8c8c8",
        'bgSecondary': "#18181b"
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        libreFranklin: ['Libre Franklin', 'sans-serif'],
        robotoMono: ['Roboto Mono', 'monospace'],
      },
      transitionTimingFunction: {
        spline: 'ease-in-out',
      }
    },
  },
  plugins: [],
} satisfies Config;
