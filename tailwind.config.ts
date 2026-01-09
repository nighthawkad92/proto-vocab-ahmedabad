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
          50: '#F6FEF7',
          100: '#CEF8D5',
          200: '#86E99F',
          300: '#36CE7C',
          400: '#24C26D',
          500: '#02A959',
          600: '#028E4B',
          700: '#02743D',
          800: '#025A2F',
          900: '#01321A',
        },
        secondary: {
          50: '#FFFBF5',
          100: '#FEF3E2',
          200: '#FDE7C4',
          300: '#FBD698',
          400: '#F8BF5D',
          500: '#F59E0B',
          600: '#D88B09',
          700: '#BA7808',
          800: '#895806',
          900: '#583904',
        },
        tertiary: {
          50: '#F5FAFE',
          100: '#CFE7FC',
          200: '#B7DBFA',
          300: '#8CC4F7',
          400: '#61AEF4',
          500: '#2E94F1',
          600: '#478CAE',
          700: '#0C65B6',
          800: '#094A86',
          900: '#06325B',
        },
        error: {
          50: '#FFFAFA',
          100: '#FFE5E5',
          200: '#FFC2C2',
          300: '#FF9494',
          400: '#F76969',
          500: '#EF4444',
          600: '#CF2A2A',
          700: '#AE2424',
          800: '#861919',
          900: '#490E0E',
        },
        neutral: {
          50: '#F9F9FA',
          100: '#F4F5F5',
          200: '#ECEEF0',
          300: '#DEE1E5',
          400: '#CFD3DA',
          500: '#B7BDC7',
          600: '#969DAC',
          700: '#737E91',
          800: '#515967',
          900: '#414853',
        },
      },
      fontFamily: {
        sans: ['var(--font-andika)', 'system-ui', 'sans-serif'],
        display: ['var(--font-bubblegum)', 'system-ui', 'sans-serif'],
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
