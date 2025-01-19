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
        // Primary - Sophisticated navy that works well with AI aesthetics
        primary: {
          50: '#F0F4F8',
          100: '#D9E2EC',
          200: '#BCCCDC',
          300: '#9FB3C8',
          400: '#829AB1',
          500: '#526D82',  // Our brand blue
          600: '#486A8F',
          700: '#334E68',
          800: '#243B53',
          900: '#102A43',
        },
        // Secondary - Warm grays for a human touch
        secondary: {
          50: '#F9F7F5',
          100: '#E8E6E1',
          200: '#D3CEC4',
          300: '#B8B2A7',
          400: '#A39E93',
          500: '#857F72',
          600: '#625D52',
          700: '#504A40',
          800: '#423D33',
          900: '#27241D',
        },
        // Surface colors - Subtle, paper-like textures
        surface: {
          50: '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D7D3D0',
          400: '#A8A29E',
          500: '#78716C',
        },
        // Accent - Warm orange gradient from animation
        accent: {
          50: '#FDF2F0',
          100: '#FCE3DE',
          200: '#F8C7BE',
          300: '#F4AB9D',
          400: '#F08F7D',
          500: '#DB6E64', // Start of gradient
          600: '#D97460', // Middle of gradient
          700: '#D87A5D', // End of gradient
          800: '#B85847',
          900: '#8F4436',
        },
        // New ethereal theme colors
        ethereal: {
          light: '#FFFFF0',
          dark: '#1C1C1C',
          glass: {
            light: 'rgba(255, 255, 240, 0.1)',
            dark: 'rgba(28, 28, 28, 0.9)',
            border: 'rgba(255, 255, 240, 0.2)',
          },
          text: {
            primary: 'rgba(255, 255, 240, 1)',
            secondary: 'rgba(255, 255, 240, 0.8)',
            muted: 'rgba(255, 255, 240, 0.6)',
          },
          overlay: {
            light: 'rgba(255, 255, 255, 0.2)',
            blue: 'rgba(230, 233, 255, 0.2)',
          }
        }
      },
      fontFamily: {
        // Sophisticated serif for headlines
        serif: ['Fraunces', 'serif'],
        // Clean, modern sans for body
        sans: ['Inter', 'system-ui', 'sans-serif'],
        // Monospace for technical/AI elements
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        // Refined type scale
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
        // Harmonious spacing scale
        '4xs': '0.125rem',  // 2px
        '3xs': '0.25rem',   // 4px
        '2xs': '0.375rem',  // 6px
        'xs': '0.5rem',     // 8px
        'sm': '0.75rem',    // 12px
        'md': '1rem',       // 16px
        'lg': '1.5rem',     // 24px
        'xl': '2rem',       // 32px
        '2xl': '3rem',      // 48px
        '3xl': '4rem',      // 64px
        '4xl': '6rem',      // 96px
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-up': 'fade-up 0.5s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
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
      },
      backgroundImage: {
        'gradient-ethereal': 'linear-gradient(to bottom right, var(--ethereal-light), var(--ethereal-dark))',
        'gradient-glass': 'linear-gradient(to bottom right, rgba(255, 255, 240, 0.1), rgba(28, 28, 28, 0.9))',
      },
      backdropBlur: {
        'ethereal': '8px',
      },
    },
  },
  plugins: [],
};

export default config;
