import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary - Sophisticated monochrome scale
        primary: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',  // Mid gray
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        // Aurora - Ethereal gradient colors
        aurora: {
          blue: {
            light: '#E0F2FF',
            DEFAULT: '#60A5FA',
            dark: '#2563EB',
          },
          purple: {
            light: '#F3E8FF',
            DEFAULT: '#A855F7',
            dark: '#7C3AED',
          },
          pink: {
            light: '#FCE7F3',
            DEFAULT: '#EC4899',
            dark: '#DB2777',
          },
        },
        // Surface - Clean, paper-like whites
        surface: {
          50: '#FFFFFF',
          100: '#FAFAFA',
          200: '#F7F7F7',
          300: '#F5F5F5',
          400: '#F2F2F2',
          500: '#E5E5E5',
        },
        // Accent - Aurora gradient stops
        accent: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',  // Purple core
          600: '#7C3AED',  // Vibrant purple
          700: '#6D28D9',  // Deep purple
          800: '#5B21B6',
          900: '#4C1D95',
        }
      },
      // Gradient presets
      backgroundImage: {
        'aurora-subtle': 'linear-gradient(to right, var(--aurora-blue-light), var(--aurora-purple-light), var(--aurora-pink-light))',
        'aurora-vivid': 'linear-gradient(to right, var(--aurora-blue), var(--aurora-purple), var(--aurora-pink))',
        'aurora-deep': 'linear-gradient(to right, var(--aurora-blue-dark), var(--aurora-purple-dark), var(--aurora-pink-dark))',
      },
      // CSS Variables for aurora colors
      extend: {
        '--aurora-blue-light': '#E0F2FF',
        '--aurora-blue': '#60A5FA',
        '--aurora-blue-dark': '#2563EB',
        '--aurora-purple-light': '#F3E8FF',
        '--aurora-purple': '#A855F7',
        '--aurora-purple-dark': '#7C3AED',
        '--aurora-pink-light': '#FCE7F3',
        '--aurora-pink': '#EC4899',
        '--aurora-pink-dark': '#DB2777',
      },
      // Keep existing font families
      fontFamily: {
        serif: ['Fraunces', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      // Keep existing font sizes and spacing
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.16' }],
        '6xl': ['3.75rem', { lineHeight: '1.12' }],
        '7xl': ['4.5rem', { lineHeight: '1.08' }],
      },
      spacing: {
        '4xs': '0.125rem',
        '3xs': '0.25rem',
        '2xs': '0.375rem',
        'xs': '0.5rem',
        'sm': '0.75rem',
        'md': '1rem',
        'lg': '1.5rem',
        'xl': '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
        '4xl': '6rem',
      },
      // Enhanced animations for aurora effects
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-up': 'fade-up 0.5s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'aurora-shift': 'aurora-shift 8s ease infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'aurora-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};

export default config; 