/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'gradient': 'gradient 15s ease infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'wave': 'wave 1.5s infinite',
        'typing': 'typing 3.5s steps(40, end)',
        'blink-caret': 'blink-caret 1s infinite'
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-position': '0% 50%'
          },
          '50%': {
            'background-position': '100% 50%'
          }
        },
        glow: {
          '0%': {
            'text-shadow': '0 0 5px #00f5d4, 0 0 10px #00f5d4, 0 0 15px #00f5d4, 0 0 20px #00f5d4'
          },
          '100%': {
            'text-shadow': '0 0 10px #00f5d4, 0 0 20px #00f5d4, 0 0 30px #00f5d4, 0 0 40px #00f5d4'
          }
        },
        wave: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' }
        },
        'blink-caret': {
          'from, to': { 'border-color': 'transparent' },
          '50%': { 'border-color': '#00f5d4' }
        }
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#00f5d4',
          foreground: '#000000'
        }
      }
    },
  },
  plugins: [],
}