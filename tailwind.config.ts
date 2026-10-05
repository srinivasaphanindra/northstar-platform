import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#0c0d0f",
        surface: "#141518",
        elevated: "#1c1e24",
        accent: "#c96442",
        parchment: "#f5f4ed",
      },
    },
  },
  plugins: [],
} satisfies Config;
