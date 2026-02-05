import { useEffect, useState } from "react";
import AppShell from "@/app/layout/app-shell";

const PRIMARY_COLOR_KEY = "primaryColor";
const THEME_KEY = "theme";

const hexToHsl = (hex: string) => {
  const normalized = hex.replace("#", "");
  const bigint = parseInt(normalized, 16);
  const r = ((bigint >> 16) & 255) / 255;
  const g = ((bigint >> 8) & 255) / 255;
  const b = (bigint & 255) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
};

const applyPrimaryColor = (hex: string) => {
  const { h, s, l } = hexToHsl(hex);
  document.documentElement.style.setProperty("--primary", `${h} ${s}% ${l}%`);
  document.documentElement.style.setProperty("--ring", `${h} ${s}% ${l}%`);
};

const applyTheme = (theme: "light" | "dark") => {
  document.documentElement.classList.toggle("dark", theme === "dark");
};

const App = () => {
  const [theme, setTheme] = useState<"light" | "dark">(
    (localStorage.getItem(THEME_KEY) as "light" | "dark") ?? "light"
  );
  const [primaryColor, setPrimaryColor] = useState(
    localStorage.getItem(PRIMARY_COLOR_KEY) ?? "#4f46e5"
  );

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    applyPrimaryColor(primaryColor);
    localStorage.setItem(PRIMARY_COLOR_KEY, primaryColor);
  }, [primaryColor]);

  return (
    <AppShell
      theme={theme}
      onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
      primaryColor={primaryColor}
      onChangePrimaryColor={setPrimaryColor}
    />
  );
};

export default App;
