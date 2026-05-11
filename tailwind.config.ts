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
        ink: "#0A0A0F",
        parchment: "#FAF8F2",
        gold: "#C49800",
        emerald: "#12B26E",
        lapis: "#2B60FF",
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        "bounce-slow": "bounce 3s infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        arabic: ["var(--font-amiri)", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
