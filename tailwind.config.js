/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        emerald: {
          deep: 'rgb(var(--color-olive) / <alpha-value>)',
          dark: 'rgb(var(--color-olive-dark) / <alpha-value>)',
          light: 'rgb(var(--color-olive-light) / <alpha-value>)',
          mist: 'rgb(var(--color-olive-mist) / <alpha-value>)',
        },
        bronze: {
          DEFAULT: 'rgb(var(--color-bronze) / <alpha-value>)',
          light: 'rgb(var(--color-bronze-light) / <alpha-value>)',
          soft: 'rgb(var(--color-bronze-soft) / <alpha-value>)',
          champagne: 'rgb(var(--color-bronze-champagne) / <alpha-value>)',
        },
        sand: 'rgb(var(--color-sand) / <alpha-value>)',
        ivory: 'rgb(var(--color-ivory) / <alpha-value>)',
        olive: {
          muted: 'rgb(var(--color-olive-muted) / <alpha-value>)',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'ultra-wide': '0.25em',
        'ultra-wider': '0.35em',
      },
    },
  },
  plugins: [],
};
