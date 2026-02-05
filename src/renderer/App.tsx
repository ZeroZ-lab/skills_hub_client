import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ThemeControls } from "@/components/theme-controls";
import { LanguageSwitch } from "@/components/language-switch";
import { PrimaryColorPicker } from "@/components/primary-color-picker";

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
  const { t } = useTranslation();
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

  const themeLabel = useMemo(() => (theme === "dark" ? t("dark") : t("light")), [
    theme,
    t
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-12">
        <header className="flex flex-col gap-4">
          <p className="text-sm font-medium text-muted-foreground">
            {t("subtitle")}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
          <p className="text-base text-muted-foreground">{t("description")}</p>
        </header>

        <section className="grid gap-4 rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <ThemeControls
              theme={theme}
              onToggle={() => setTheme(theme === "dark" ? "light" : "dark")}
            />
            <LanguageSwitch />
          </div>
          <div className="flex flex-col gap-4">
            <PrimaryColorPicker
              color={primaryColor}
              onChange={(value) => setPrimaryColor(value)}
            />
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>当前主题：</span>
              <span className="font-medium text-foreground">{themeLabel}</span>
            </div>
          </div>
          <div>
            <Button>{t("button")}</Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;
