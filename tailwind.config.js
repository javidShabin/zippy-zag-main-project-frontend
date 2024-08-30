/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slideRight: {
          "0%": { transform: "translateX(-50%)", opacity: "1" },
          "100%": { transform: "translateX(0)", opacity: "0" },
        },
      },
      animation: {
        slideRight: "slideRight 4s ease-out infinite",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: false, // false: only light + dark | true: all themes | array: specific themes like ["light", "dark", "cupcake"]
    darkTheme: "light", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames
    logs: true, // Shows info about daisyUI version and used config in the console
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
};
