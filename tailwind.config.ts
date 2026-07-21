import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#FFF5EC",
          100: "#FFE7D2",
          200: "#FFCBA1",
          300: "#FFA968",
          400: "#FF8A3D",
          500: "#F76B1C", // primary
          600: "#E3550E",
          700: "#BC420B",
          800: "#95350F",
          900: "#792C10",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          soft: "#F7F7F9",
          muted: "#EFEFF3",
          border: "#E7E7ED",
        },
        ink: {
          900: "#161318",
          700: "#3A3640",
          500: "#6B6773",
          300: "#A7A3AF",
        },
        success: "#1FA97A",
        danger: "#E5484D",
        gold: {
          300: "#FFD98A",
          500: "#FFB300",
          700: "#C98A00",
        },
      },
      fontFamily: {
        vazir: ["var(--font-vazirmatn)", "Tahoma", "sans-serif"],
      },
      borderRadius: {
        xl2: "20px",
        xl3: "24px",
      },
      boxShadow: {
        soft: "0 8px 24px -12px rgba(22, 19, 24, 0.12)",
        card: "0 16px 40px -16px rgba(247, 107, 28, 0.35)",
        glow: "0 20px 48px -14px rgba(247, 107, 28, 0.55)",
      },
      spacing: {
        18: "4.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
