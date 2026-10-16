/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#f7f3ec",
        surface: "#fffdf9",
        ink: "#1c2b26",
        muted: "#5d6b64",
        teal: {
          DEFAULT: "#0e5c4a",
          ink: "#09382e",
        },
        gold: "#c79a45",
        terra: "#c96f4a",
      },
      fontFamily: {
        serif: ["Fraunces", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
