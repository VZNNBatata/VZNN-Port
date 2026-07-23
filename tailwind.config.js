/** @type {import('tailwindcss').Config} */
import animate from "tailwindcss-animate";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Inter Tight", "sans-serif"],
        body: ["Geist Mono", "monospace"],
      },
      animation: {
        "slow-pulse": "pulse 4s ease-in-out infinite",
      },
    },
  },
  plugins: [animate],
};
