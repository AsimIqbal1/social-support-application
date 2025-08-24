/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#fff000',
        'uae': {
          'brown': '#8b4513',
          'cream': '#f0ede4',
        },
        'gov': {
          'primary': '#1890ff',
          'secondary': '#722ed1',
          'success': '#52c41a',
          'dark': '#001529',
        }
      },
      spacing: {
        '18': '4.5rem',  // 72px
        '22': '5.5rem',  // 88px
        '30': '7.5rem',  // 120px
        '42': '10.5rem', // 168px (for header margin)
      },
      boxShadow: {
        'card': '0 4px 16px rgba(0, 0, 0, 0.1)',
        'header': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'button': '0 4px 16px rgba(82, 196, 26, 0.3)',
      },
      borderRadius: {
        'card': '12px',
      }
    },
  },
  plugins: [],
} 