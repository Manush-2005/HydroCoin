/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // enable dark mode via `class`
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hydrogen: {
          bg: "#0a0f0d",       // background
          card: "#121a14",     // card/container
          neon: "#39ff14",     // neon green
          neonSoft: "#00ff9d", // secondary neon
          text: "#e6ffe6",     // main text
          muted: "#8aff80",    // muted text
        },
      },
      fontFamily: {
        futuristic: ["Orbitron", "Rajdhani", "Share Tech Mono", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 15px #39ff14",
        neonHover: "0 0 30px #39ff14",
      },
    },
  },
  plugins: [],
}
