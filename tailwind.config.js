/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./apps/web/src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "hsl(var(--color-canvas) / <alpha-value>)",
          accent: "hsl(var(--color-canvas-accent) / <alpha-value>)",
        },
        text: {
          DEFAULT: "hsl(var(--color-text) / <alpha-value>)",
          muted: "hsl(var(--color-text-muted) / <alpha-value>)",
          inverted: "hsl(var(--color-text-inverted) / <alpha-value>)",
        },
        brand: {
          DEFAULT: "hsl(var(--color-brand) / <alpha-value>)",
          dark: "hsl(var(--color-brand-dark) / <alpha-value>)",
          light: "hsl(var(--color-brand-light) / <alpha-value>)",
        },
        stroke: "hsl(var(--color-stroke) / <alpha-value>)",
        success: "hsl(var(--color-success) / <alpha-value>)",
        warning: "hsl(var(--color-warning) / <alpha-value>)",
      },
      borderRadius: {
        lg: "1rem",
        md: "0.75rem",
        sm: "0.5rem",
      },
      boxShadow: {
        subtle: "0 10px 30px hsl(var(--color-shadow) / 0.08)",
        card: "0 20px 50px hsl(var(--color-shadow) / 0.12)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "sans-serif"],
      },
      backgroundImage: {
        "grid-glow":
          "radial-gradient(circle at 1px 1px, hsl(var(--color-grid)) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};
