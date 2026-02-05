import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export const LanguageSwitch = () => {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const nextLanguage = i18n.language === "zh-CN" ? "en" : "zh-CN";
    i18n.changeLanguage(nextLanguage);
    localStorage.setItem("locale", nextLanguage);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">{t("language")}</span>
      <Button variant="outline" size="sm" onClick={toggleLanguage}>
        {i18n.language === "zh-CN" ? "EN" : "中文"}
      </Button>
    </div>
  );
};
