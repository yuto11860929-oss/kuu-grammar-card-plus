import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgTop: "#FFFFFF",
        bgMid: "#FBFBFC",
        bgBottom: "#F7F7F8",
        surface: "#FFFFFF",
        textPrimary: "#111827",
        textSecondary: "#6B7280",
        border: "#E5E7EB",
        known: "#16A34A",
        unknown: "#DC2626",
      },
      boxShadow: {
        card: "0 8px 24px rgba(0,0,0,0.08)",
      },
      borderRadius: {
        unit: "18px",
        card: "24px",
        btn: "16px",
      },
    },
  },
  plugins: [],
};
export default config;
