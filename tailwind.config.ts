import type { Config } from "tailwindcss";

/**
 * Bilic Cleaning Company — design system.
 * All brand colours live here so they can be changed in one place.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0B2545", // primary / headings / footer / navbar
        sky: "#2AA7E0", // accent — buttons, links, highlights
        skyDark: "#1E86C7", // accent hover
        offwhite: "#F5F9FC", // soft section background
        ink: "#0F1B2D", // dark text
        muted: "#5A6B7B", // muted text
      },
      fontFamily: {
        // Wired up in app/layout.tsx with next/font
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(11, 37, 69, 0.15)",
        lift: "0 22px 45px -18px rgba(11, 37, 69, 0.30)",
      },
      backgroundImage: {
        "navy-sky":
          "linear-gradient(135deg, #0B2545 0%, #123A63 45%, #1E86C7 100%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "float-slow": "float 12s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
