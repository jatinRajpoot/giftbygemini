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
        background: "var(--background)",
        foreground: "var(--foreground)",
        burgundy: {
          DEFAULT: "#4a0414",
          light: "#700b23",
          dark: "#260109",
        },
        crimson: {
          DEFAULT: "#e6194b",
          deep: "#800e2e",
        },
        rosegold: {
          DEFAULT: "#b76e79",
          light: "#f7d6d0",
          dark: "#8d4f58",
        },
        gold: {
          DEFAULT: "#ffd700",
          light: "#fff3a8",
          dark: "#b89600",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      animation: {
        'heartbeat': 'heartbeat 1.6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
      },
      keyframes: {
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)', filter: 'drop-shadow(0 0 15px rgba(230, 25, 75, 0.6))' },
          '15%': { transform: 'scale(1.18)', filter: 'drop-shadow(0 0 30px rgba(230, 25, 75, 0.95))' },
           '30%': { transform: 'scale(1)', filter: 'drop-shadow(0 0 15px rgba(230, 25, 75, 0.6))' },
          '45%': { transform: 'scale(1.12)', filter: 'drop-shadow(0 0 25px rgba(230, 25, 75, 0.85))' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.95' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1.5deg)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
