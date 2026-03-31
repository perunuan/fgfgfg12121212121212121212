import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Точные цвета с dipaul.ru
        primary: {
          DEFAULT: "#0056A6",    // Основной синий
          dark: "#003D7A",       // Темно-синий
          light: "#E6F0FA",      // Светло-голубой фон
        },
        dark: {
          DEFAULT: "#1E1E1E",    // Темный фон шапки
          gray: "#2D2D2D",       // Серый темный
        },
        gray: {
          light: "#F5F7FA",      // Светлый фон секций
          medium: "#6B7280",     // Серый текст
        },
        white: "#FFFFFF",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
          lg: "2rem",
          xl: "4rem",
        },
        screens: {
          "2xl": "1400px",
        },
      },
      spacing: {
        'header-top': '40px',    // Высота верхней полоски
        'header-main': '80px',   // Высота основного хедера
      }
    },
  },
  plugins: [],
};
export default config;
