import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "\"SF Pro Display\"",
          "\"Segoe UI\"",
          "Inter",
          "Roboto",
          "Arial",
          "sans-serif"
        ]
      },
      colors: {
        ink: "#0F1115",
        muted: "#6E6E73",
        cream: "#F7F8FA",
        sand: "#FFFFFF",
        gold: "#0F1115",
        line: "#E7E9EE",
        blue: "#0A66FF",
        amber: "#0F1115",
        surface: "#FFFFFF"
      },
      boxShadow: {
        premium: "0 1px 2px rgba(15,17,21,0.04)",
        hero: "0 1px 2px rgba(15,17,21,0.04)"
      },
      borderRadius: {
        premium: "0.5rem"
      }
    }
  },
  plugins: []
};

export default config;
