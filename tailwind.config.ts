import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ["Archivo Variable", "system-ui", "sans-serif"],
      },
      screens: {
        xs: "26rem"
      },
      backgroundImage: {
        rainbow: `linear-gradient(to right, #FF00FF, #FF6600, #FFFF00, #00FF00, #00FFFF, #0000FF)`
      },
      colors: {}
    }
  }
} satisfies Config;
