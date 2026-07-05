const tokens = require("./tokens.json");

/**
 * The design tokens in tokens.json are the single source of truth:
 * DriftGuard maps arbitrary values to these same tokens when auto-patching.
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ...tokens.colors,
        background: "#030712",
        surface: tokens.colors.brand.surface,
        card: tokens.colors.slate["800"],
      },
      borderRadius: tokens.borderRadius,
    },
  },
  plugins: [],
}
