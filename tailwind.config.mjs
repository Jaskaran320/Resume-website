/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        background: "#faf2df",
        slider: "#FFF3D7",
        primary: "#3b3048",
        text: "#5c5f7a",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
      },
    },
  },
  plugins: [],
};
