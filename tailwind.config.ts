import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem"
    },
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"]
      },
      colors: {
        brand: {
          50: "#f4f7ff",
          100: "#e7edfb",
          200: "#c9d8f4",
          300: "#9ebae6",
          400: "#6d91c8",
          500: "#3d5f98",
          600: "#2f4979",
          700: "#24395f",
          800: "#1d2f4f",
          900: "#172741"
        },
        ink: {
          50: "#f6f7fb",
          100: "#e7e9f2",
          200: "#cfd5e3",
          300: "#adb7cc",
          400: "#8a92ad",
          500: "#6f7491",
          600: "#585c74",
          700: "#43465d",
          800: "#2e3043",
          900: "#1f2031"
        }
      },
      boxShadow: {
        card: "0 18px 45px rgba(16, 24, 40, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
