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
        background: "var(--background)",
        foreground: "var(--foreground)",
        "heatio-dark-blue": "rgb(3, 8, 31)",
        "heatio-mid-blue": "rgb(3, 10, 50)",
        "heatio-tile-blue": "rgb(4, 20, 65)",
        "heatio-accent-blue": "rgb(46, 179, 255)",
        "heatio-border-blue": "rgb(36, 55, 107)",
        "heatio-dividing-line": "rgb(24, 30, 50)",
      },
    },
  },
  plugins: [],
} satisfies Config;
