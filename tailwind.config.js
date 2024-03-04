/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        nav: "#FFF6E1",
        bgColor: "#222324",
        "nav-text": "#0C0D0F",
        "page-text-color": "#FFF6E1",
        "search-bar": "#61677B",
        "search-bar-border": "#D9DADB",
      },
    },
  },
  plugins: [],
};
