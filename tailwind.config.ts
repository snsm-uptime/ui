import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* White shades */
        white: {
          DEFAULT: 'var(--color-white-50)',
          50: 'var(--color-white-50)',
          100: 'var(--color-white-100)',
          200: 'var(--color-white-200)',
          300: 'var(--color-white-300)',
          400: 'var(--color-white-400)',
          500: 'var(--color-white-500)',
          600: 'var(--color-white-600)',
          700: 'var(--color-white-700)',
          800: 'var(--color-white-800)',
          900: 'var(--color-white-900)',
        },
        /* Black shades */
        black: {
          DEFAULT: 'var(--color-black-900)',
          50: 'var(--color-black-50)',
          100: 'var(--color-black-100)',
          200: 'var(--color-black-200)',
          300: 'var(--color-black-300)',
          400: 'var(--color-black-400)',
          500: 'var(--color-black-500)',
          600: 'var(--color-black-600)',
          700: 'var(--color-black-700)',
          800: 'var(--color-black-800)',
          900: 'var(--color-black-900)',
        },
        /* primary shades */
        primary: {
          DEFAULT: 'var(--color-primary-500)',
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
        },
        /* Secondary (Blue) shades */
        secondary: {
          DEFAULT: 'var(--color-secondary-600)',
          50: 'var(--color-secondary-50)',
          100: 'var(--color-secondary-100)',
          200: 'var(--color-secondary-200)',
          300: 'var(--color-secondary-300)',
          400: 'var(--color-secondary-400)',
          500: 'var(--color-secondary-500)',
          600: 'var(--color-secondary-600)',
          700: 'var(--color-secondary-700)',
          800: 'var(--color-secondary-800)',
          900: 'var(--color-secondary-900)',
        },
      },
    },
  },
  plugins: [],
};
export default config;
