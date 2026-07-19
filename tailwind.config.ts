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
        paper: {
          DEFAULT: "#F7F1E3",
          dark: "#E8DFC8",
          edge: "#D4C4A8",
        },
        ink: {
          DEFAULT: "#2F2A25",
          light: "#5C534A",
          faint: "#8A8178",
        },
        cinnabar: {
          DEFAULT: "#8C3A2B",
          light: "#A84D3C",
        },
        wood: {
          DEFAULT: "#6B4E3D",
          light: "#8B6F5C",
          dark: "#4A3528",
        },
      },
      fontFamily: {
        title: ["var(--font-title)", "serif"],
        body: ["var(--font-body)", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 1.2s ease-out forwards",
        "fade-in-slow": "fadeIn 2s ease-out forwards",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
