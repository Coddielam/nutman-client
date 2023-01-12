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
      blue: '#5299D3',
      yellow: '#FDE74C',
      white: '#FDFFFC',
      platinum: '#ecece9',
      orange: '#ff934f',
      'dark-blue': '#2B2D42',
      green: '#00A56A',
      purple: '#8F00FF',
    },
    extend: {
      backgroundImage: {
        memphisPattern: "url('/images/memPat1.svg')",
      },
      fontFamily: {
        notoSansTC: '"Noto Sans TC", sans-serif',
      },
      spacing: {
        navbar: 'var(--navbar-height)',
        'container-px': 'var(--container-px)',
      },
      colors: {
        red: '#f94449',
        purple: '#7600bc',
        main: '#ff4c4c',
        offwhite: '#fff',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
