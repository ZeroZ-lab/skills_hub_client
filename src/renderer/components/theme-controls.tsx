import { Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

interface ThemeControlsProps {
  theme: "light" | "dark";
  onToggle: () => void;
}

export const ThemeControls = ({ theme, onToggle }: ThemeControlsProps) => {
  const { t } = useTranslation();
  const isDark = theme === "dark";

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">{t("theme")}</span>
      <Button variant="outline" size="sm" onClick={onToggle}>
        {isDark ? <Moon size={16} /> : <Sun size={16} />}
        {isDark ? t("dark") : t("light")}
      </Button>
    </div>
  );
};
