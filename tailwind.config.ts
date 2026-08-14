import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        mar: '#0f4c5c',
        arena: '#f4f1ea',
        acento: '#b45309',
      },
    },
  },
  plugins: [],
};

export default config;
