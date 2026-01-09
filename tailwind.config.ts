import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        secondary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        accent: {
          50: '#fef3c7',
          100: '#fde68a',
          200: '#fcd34d',
          300: '#fbbf24',
          400: '#f59e0b',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        achievement: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'child-xs': ['12px', { lineHeight: '16px' }],      // Paragraph XSmall
        'child-sm': ['14px', { lineHeight: '20px' }],      // Paragraph Small
        'child-base': ['16px', { lineHeight: '24px' }],    // Paragraph Medium
        'child-lg': ['18px', { lineHeight: '28px' }],      // Paragraph Large
        'child-xl': ['20px', { lineHeight: '28px' }],      // H4
        'child-2xl': ['28px', { lineHeight: '28px' }],     // H3
        'child-3xl': ['40px', { lineHeight: '40px' }],     // H2
        'child-4xl': ['48px', { lineHeight: '48px' }],     // H1
      },
      spacing: {
        'tap': '3rem',
        'child-gutter': '16px',
        'child-margin': '12px',
      },
      borderRadius: {
        'child': '1.5rem',
      },
      boxShadow: {
        'child-sm': '0 2px 4px rgba(0,0,0,0.06)',
        'child': '0 4px 8px rgba(0,0,0,0.08)',
        'child-md': '0 6px 12px rgba(0,0,0,0.1)',
        'child-lg': '0 10px 20px rgba(0,0,0,0.12)',
        'child-xl': '0 15px 30px rgba(0,0,0,0.15)',
        'child-inner': 'inset 0 2px 4px rgba(0,0,0,0.06)',
      },
      gridTemplateColumns: {
        'child-mobile': 'repeat(4, 1fr)',
        'child-tablet': 'repeat(6, 1fr)',
      },
    },
  },
  plugins: [],
}
export default config
