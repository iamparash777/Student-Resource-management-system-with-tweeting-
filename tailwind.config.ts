import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx,mp4}', // Added mp4 for media content
    './src/components/**/*.{js,ts,jsx,tsx,mdx,mp4}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx,mp4}',
  
  ],
  theme: {
    extend: {
      animation: {
        'chrome-shine': 'chrome-shine 8s ease infinite', // Custom animation
      },
      keyframes: {
        'chrome-shine': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'chrome-dark': `
          radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.1) 100%),
          linear-gradient(to bottom, #1a1a1a 0%, #2c2c2c 100%)
        `, // Dark chrome effect
      },
    },
  },
  darkMode: 'class', // Enables dark mode via class
} satisfies Config;
