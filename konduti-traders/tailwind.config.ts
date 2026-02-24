import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Updated premium palette
        mint: '#f4f9f2',
        'off-white': '#fafaf8',
        cream: '#e8d5a0',
        'cream-light': '#f2e8c4',
        green: {
          DEFAULT: '#3d8b5e',
          light: '#5fb87a',
          dark: '#2c6b47',
          muted: '#6aaa84',
        },
        teal: {
          DEFAULT: '#2c5f4a',
          light: '#3d8b6e',
          dark: '#1a3d2e',
          deeper: '#0f2a1e',
        },
        stone: {
          DEFAULT: '#8a9a88',
          light: '#c4d4c0',
          lighter: '#e4ece2',
        },
        dark: '#111a14',
        'dark-2': '#1c2e20',
        'gray-light': '#eef3ec',
        'gray-text': '#4a5a47',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Enhanced base sizes — premium typography scale
        'xs': ['0.8125rem', { lineHeight: '1.5' }], // 13px
        'sm': ['0.9375rem', { lineHeight: '1.6' }], // 15px
        'base': ['1.0625rem', { lineHeight: '1.65' }], // 17px
        'lg': ['1.1875rem', { lineHeight: '1.7' }], // 19px
        'xl': ['1.375rem', { lineHeight: '1.55' }], // 22px
        '2xl': ['1.625rem', { lineHeight: '1.5' }], // 26px
        '3xl': ['2rem', { lineHeight: '1.35' }], // 32px
        '4xl': ['2.5rem', { lineHeight: '1.25' }], // 40px
        '5xl': ['3.125rem', { lineHeight: '1.15' }], // 50px
        '6xl': ['3.75rem', { lineHeight: '1.08' }], // 60px
        '7xl': ['4.5rem', { lineHeight: '1.05' }], // 72px
        '8xl': ['6rem', { lineHeight: '1.0' }],
        '9xl': ['8rem', { lineHeight: '0.95' }],
        '10xl': ['10rem', { lineHeight: '0.9' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      boxShadow: {
        // Layered shadows for depth
        'premium-sm': '0 1px 3px rgba(17, 26, 20, 0.06), 0 1px 2px rgba(17, 26, 20, 0.04)',
        'premium-md': '0 4px 16px rgba(17, 26, 20, 0.08), 0 2px 6px rgba(17, 26, 20, 0.05)',
        'premium-lg': '0 12px 40px rgba(17, 26, 20, 0.1), 0 4px 16px rgba(17, 26, 20, 0.06)',
        'premium-xl': '0 24px 64px rgba(17, 26, 20, 0.12), 0 8px 24px rgba(17, 26, 20, 0.08)',
        'green-glow': '0 0 40px rgba(61, 139, 94, 0.25), 0 8px 24px rgba(61, 139, 94, 0.15)',
        'green-sm': '0 2px 8px rgba(44, 95, 74, 0.12)',
        'green-md': '0 6px 20px rgba(44, 95, 74, 0.14)',
        'green-lg': '0 16px 48px rgba(44, 95, 74, 0.16)',
        'inset-subtle': 'inset 0 1px 0 rgba(255,255,255,0.06)',
      },
      backgroundImage: {
        // Gradients
        'hero-gradient': 'linear-gradient(180deg, rgba(17,26,20,0.75) 0%, rgba(17,26,20,0.35) 40%, rgba(17,26,20,0.5) 100%)',
        'dark-gradient': 'linear-gradient(180deg, #111a14 0%, #1c2e20 100%)',
        'teal-gradient': 'linear-gradient(135deg, #2c5f4a 0%, #1a3d2e 100%)',
        'green-gradient': 'linear-gradient(135deg, #3d8b5e 0%, #2c6b47 100%)',
        'mint-gradient': 'linear-gradient(180deg, #f4f9f2 0%, #fafaf8 100%)',
        // Grain texture
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'ticker-scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-left': {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.94)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-6px) rotate(1deg)' },
        },
        shimmer: {
          '0%': { left: '-100%' },
          '100%': { left: '200%' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.5' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        ticker: 'ticker-scroll 28s linear infinite',
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-left': 'fade-left 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        float: 'float 5s ease-in-out infinite',
        'float-slow': 'float-slow 7s ease-in-out infinite',
        shimmer: 'shimmer 3.5s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 3s ease-out infinite',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}

export default config
