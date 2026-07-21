import { createTheme } from "@mui/material/styles";

// Design tokens — kept in sync with tailwind.config.ts `brand` / `surface` / `ink` scales.
export const tokens = {
  brand: {
    50: "#FFF5EC",
    100: "#FFE7D2",
    200: "#FFCBA1",
    300: "#FFA968",
    400: "#FF8A3D",
    500: "#F76B1C",
    600: "#E3550E",
    700: "#BC420B",
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
};

const theme = createTheme({
  direction: "rtl",
  palette: {
    mode: "light",
    primary: {
      main: tokens.brand[500],
      light: tokens.brand[300],
      dark: tokens.brand[700],
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: tokens.ink[900],
    },
    success: { main: tokens.success },
    error: { main: tokens.danger },
    background: {
      default: tokens.surface.soft,
      paper: tokens.surface.DEFAULT,
    },
    text: {
      primary: tokens.ink[900],
      secondary: tokens.ink[500],
    },
    divider: tokens.surface.border,
  },
  typography: {
    fontFamily: "var(--font-vazirmatn), Tahoma, sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: { fontWeight: 600, textTransform: "none" },
  },
  shape: {
    borderRadius: 20,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          paddingTop: 12,
          paddingBottom: 12,
          fontSize: "0.95rem",
          boxShadow: "none",
        },
        containedPrimary: {
          boxShadow: "0 12px 24px -12px rgba(247,107,28,0.55)",
          "&:hover": {
            boxShadow: "0 16px 28px -12px rgba(247,107,28,0.6)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 24,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: tokens.surface.soft,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 999, fontWeight: 600 },
      },
    },
  },
});

export default theme;
