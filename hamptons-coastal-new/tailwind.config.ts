import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        paper: '#f4f0e8',
        'paper-deep': '#ebe5da',
        'paper-soft': '#faf8f3',
        ink: '#111111',
        'ink-muted': '#5e625f',
        'ink-faint': '#858982',
        ocean: '#1f3a44',
        'ocean-deep': '#162d35',
        'ocean-soft': '#dce6e5',
        stone: '#d8d1c5',
        line: '#d5cec2',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
