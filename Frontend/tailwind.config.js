/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Red (60%) - Main brand color
        primary: {
          50: '#ffe5e5',
          100: '#ffcccc',
          200: '#ff9999',
          300: '#ff6666',
          400: '#ff3333',
          500: '#e81123', // Primary Red
          600: '#d81b21',
          700: '#c50f1f',
          800: '#a4373a',
          900: '#5d1f1a',
        },
        // Red accent (60% - primary brand)
        accent: {
          50: '#ffe5e5',
          100: '#ffcccc',
          200: '#ff9999',
          300: '#ff6666',
          400: '#ff3333',
          500: '#e81123', // Primary Red
          600: '#d81b21',
          700: '#c50f1f',
          800: '#a4373a',
          900: '#5d1f1a',
        },
        // Black (20%) - Secondary/dark elements
        dark: {
          50: '#f5f5f5',
          100: '#ebebeb',
          200: '#d7d7d7',
          300: '#c3c3c3',
          400: '#afafaf',
          500: '#1f1f1f', // Dark Black
          600: '#1a1a1a',
          700: '#151515',
          800: '#0f0f0f',
          900: '#000000',
        },
        // White (20%) - Light/background elements
        light: {
          50: '#ffffff',
          100: '#fafafa',
          200: '#f5f5f5',
          300: '#f0f0f0',
          400: '#ebebeb',
          500: '#e6e6e6',
          600: '#d9d9d9',
          700: '#cccccc',
          800: '#bfbfbf',
          900: '#b3b3b3',
        },
        // Neutral palette (grayscale for text and borders)
        neutral: {
          50: '#ffffff',
          100: '#f9f9f9',
          200: '#f0f0f0',
          300: '#e6e6e6',
          400: '#cccccc',
          500: '#999999',
          600: '#666666',
          700: '#333333',
          800: '#1f1f1f',
          900: '#000000',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Segoe UI', 'sans-serif'],
      },
      fontSize: {
        xs: ['12px', { lineHeight: '16px' }],
        sm: ['13px', { lineHeight: '20px' }],
        base: ['14px', { lineHeight: '20px' }],
        lg: ['16px', { lineHeight: '24px' }],
        xl: ['18px', { lineHeight: '28px' }],
        '2xl': ['20px', { lineHeight: '28px' }],
        '3xl': ['24px', { lineHeight: '32px' }],
        '4xl': ['32px', { lineHeight: '40px' }],
        '5xl': ['40px', { lineHeight: '48px' }],
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
        '3xl': '48px',
      },
      borderRadius: {
        none: '0',
        xs: '2px',
        sm: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
        '2xl': '16px',
        full: '9999px',
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        // Neon glow effects
        'neon-red': '0 0 10px rgba(232, 17, 35, 0.5), 0 0 20px rgba(232, 17, 35, 0.3)',
        'neon-red-lg': '0 0 20px rgba(232, 17, 35, 0.6), 0 0 40px rgba(232, 17, 35, 0.4)',
        'neon-cyan': '0 0 10px rgba(0, 217, 255, 0.5), 0 0 20px rgba(0, 217, 255, 0.3)',
        'neon-pink': '0 0 10px rgba(255, 1, 110, 0.5), 0 0 20px rgba(255, 1, 110, 0.3)',
      },
      animation: {
        'pulse-neon': 'pulse-neon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'slide-in': 'slide-in 0.3s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
      },
      keyframes: {
        'pulse-neon': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'glow': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(232, 17, 35, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(232, 17, 35, 0.8)' },
        },
        'slide-in': {
          'from': { transform: 'translateX(-100%)', opacity: '0' },
          'to': { transform: 'translateX(0)', opacity: '1' },
        },
        'fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
      },
      transitionDuration: {
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
    },
  },
  plugins: [],
};
