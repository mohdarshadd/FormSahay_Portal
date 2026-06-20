/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#2E5088',
          DEFAULT: '#1B365D', // Deep Navy Blue
          dark: '#0F2545',
        },
        secondary: {
          light: '#64748B',
          DEFAULT: '#475569', // Slate Gray
          dark: '#334155',
        },
        govgreen: '#15803D', // Muted India Green
        govsaffron: '#D97706', // Muted Saffron Orange
        errorred: '#B91C1C',
      },
      borderRadius: {
        card: '8px',      // Sharper, formal card corners
        button: '6px',    // Sharp, professional buttons
        input: '6px',     // Standard input borders
        small: '4px'
      },
      boxShadow: {
        soft: '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)',
        medium: '0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -1px rgba(0,0,0,0.04)',
      }
    },
  },
  plugins: [],
}
