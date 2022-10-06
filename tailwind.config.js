/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      black: '#313638',
      orange: '#ff934f',
      'dark-blue': '#2B2D42',
      blue: '#5299D3',
      yellow: '#FDE74C',
      white: '#FDFFFC',
    },
    extend: {
      spacing: {
        navbar: 'var(--navbar-height)',
        'container-px': 'var(--container-px)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
