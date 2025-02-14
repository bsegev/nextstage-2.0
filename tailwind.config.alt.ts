import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				'50': '#FAFAFA',
  				'100': '#F5F5F5',
  				'200': '#E5E5E5',
  				'300': '#D4D4D4',
  				'400': '#A3A3A3',
  				'500': '#737373',
  				'600': '#525252',
  				'700': '#404040',
  				'800': '#262626',
  				'900': '#171717',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			aurora: {
  				blue: {
  					light: '#E0F2FF',
  					DEFAULT: '#60A5FA',
  					dark: '#2563EB'
  				},
  				purple: {
  					light: '#F3E8FF',
  					DEFAULT: '#A855F7',
  					dark: '#7C3AED'
  				},
  				pink: {
  					light: '#FCE7F3',
  					DEFAULT: '#EC4899',
  					dark: '#DB2777'
  				}
  			},
  			surface: {
  				'50': '#FFFFFF',
  				'100': '#FAFAFA',
  				'200': '#F7F7F7',
  				'300': '#F5F5F5',
  				'400': '#F2F2F2',
  				'500': '#E5E5E5'
  			},
  			accent: {
  				'50': '#F5F3FF',
  				'100': '#EDE9FE',
  				'200': '#DDD6FE',
  				'300': '#C4B5FD',
  				'400': '#A78BFA',
  				'500': '#8B5CF6',
  				'600': '#7C3AED',
  				'700': '#6D28D9',
  				'800': '#5B21B6',
  				'900': '#4C1D95',
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		backgroundImage: {
  			'aurora-subtle': 'linear-gradient(to right, var(--aurora-blue-light), var(--aurora-purple-light), var(--aurora-pink-light))',
  			'aurora-vivid': 'linear-gradient(to right, var(--aurora-blue), var(--aurora-purple), var(--aurora-pink))',
  			'aurora-deep': 'linear-gradient(to right, var(--aurora-blue-dark), var(--aurora-purple-dark), var(--aurora-pink-dark))'
  		},
  		extend: {
  			'--aurora-blue-light': '#E0F2FF',
  			'--aurora-blue': '#60A5FA',
  			'--aurora-blue-dark': '#2563EB',
  			'--aurora-purple-light': '#F3E8FF',
  			'--aurora-purple': '#A855F7',
  			'--aurora-purple-dark': '#7C3AED',
  			'--aurora-pink-light': '#FCE7F3',
  			'--aurora-pink': '#EC4899',
  			'--aurora-pink-dark': '#DB2777'
  		},
  		fontFamily: {
  			serif: [
  				'Fraunces',
  				'serif'
  			],
  			sans: [
  				'Inter',
  				'system-ui',
  				'sans-serif'
  			],
  			mono: [
  				'JetBrains Mono',
  				'monospace'
  			]
  		},
  		fontSize: {
  			xs: [
  				'0.75rem',
  				{
  					lineHeight: '1rem'
  				}
  			],
  			sm: [
  				'0.875rem',
  				{
  					lineHeight: '1.25rem'
  				}
  			],
  			base: [
  				'1rem',
  				{
  					lineHeight: '1.5rem'
  				}
  			],
  			lg: [
  				'1.125rem',
  				{
  					lineHeight: '1.75rem'
  				}
  			],
  			xl: [
  				'1.25rem',
  				{
  					lineHeight: '1.75rem'
  				}
  			],
  			'2xl': [
  				'1.5rem',
  				{
  					lineHeight: '2rem'
  				}
  			],
  			'3xl': [
  				'1.875rem',
  				{
  					lineHeight: '2.25rem'
  				}
  			],
  			'4xl': [
  				'2.25rem',
  				{
  					lineHeight: '2.5rem'
  				}
  			],
  			'5xl': [
  				'3rem',
  				{
  					lineHeight: '1.16'
  				}
  			],
  			'6xl': [
  				'3.75rem',
  				{
  					lineHeight: '1.12'
  				}
  			],
  			'7xl': [
  				'4.5rem',
  				{
  					lineHeight: '1.08'
  				}
  			]
  		},
  		spacing: {
  			'4xs': '0.125rem',
  			'3xs': '0.25rem',
  			'2xs': '0.375rem',
  			xs: '0.5rem',
  			sm: '0.75rem',
  			md: '1rem',
  			lg: '1.5rem',
  			xl: '2rem',
  			'2xl': '3rem',
  			'3xl': '4rem',
  			'4xl': '6rem'
  		},
  		animation: {
  			'fade-in': 'fade-in 0.5s ease-out',
  			'fade-up': 'fade-up 0.5s ease-out',
  			'scale-in': 'scale-in 0.3s ease-out',
  			'aurora-shift': 'aurora-shift 8s ease infinite'
  		},
  		keyframes: {
  			'fade-in': {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			'fade-up': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(10px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'scale-in': {
  				'0%': {
  					opacity: '0',
  					transform: 'scale(0.95)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'scale(1)'
  				}
  			},
  			'aurora-shift': {
  				'0%, 100%': {
  					backgroundPosition: '0% 50%'
  				},
  				'50%': {
  					backgroundPosition: '100% 50%'
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

export default config; 