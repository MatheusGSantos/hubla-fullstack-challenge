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

        red: {
          primary: "#f87171",
        },
        blue: {
          primary: "#bae6fd",
        },
        purple: {
          primary: "#a78bfa",
        },
        yellow: {
          primary: "#fde68a",
        },
        black: {
          primary: "#030303",
        },
        green: {
          primary: "#d7ff61",
          secondary: "#4d7c0f",
        },
        gray: {
          lighter: "#a1a1a1",
          light: "#525252",
          medium: "#27272a",
          dark: "#18181b",
        },
      },
    },
  },
  plugins: [],
};
export default config;
