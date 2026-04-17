/** @type {import('tailwindcss').Config} */
import scrollbar from "tailwind-scrollbar";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bgDark: "var(--bg-dark)",
        bgLight: "var(--bg-light)",
        textMain: "var(--text-main)",
        textMuted: "var(--text-muted)",
        cyan: "#22d3ee",
        pink: "var(--pink)",
      },
      borderRadius: {
        base: "var(--radius)",
      },
      transitionDuration: {
        base: "200ms",
      }
    },
  },
  plugins: [scrollbar],
}

