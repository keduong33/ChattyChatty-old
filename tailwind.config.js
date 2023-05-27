/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // keyframes: {
      //   bounce: {
      //     "0%, 100%": {
      //       transform: "scale(0)",
      //       "transform-origin": "center",
      //     },
      //     "50%": {
      //       transform: "scale(1)",
      //     },
      //   },
      // },
      // animation: {
      //   loading: "bounce 1s infinite",
      // },
    },
  },
  plugins: [],
};
