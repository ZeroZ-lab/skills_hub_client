import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "zh-CN": {
    translation: {
      title: "Skills Hub 客户端",
      subtitle: "Electron + Vite + TypeScript",
      description: "使用 shadcn/ui 与 Tailwind CSS，支持 i18n、主题模式与自定义主色。",
      theme: "主题模式",
      light: "亮色",
      dark: "暗黑",
      language: "语言",
      primaryColor: "主题色",
      button: "开始使用"
    }
  },
  en: {
    translation: {
      title: "Skills Hub Client",
      subtitle: "Electron + Vite + TypeScript",
      description: "Built with shadcn/ui and Tailwind CSS, with i18n, theme modes, and custom primary color.",
      theme: "Theme",
      light: "Light",
      dark: "Dark",
      language: "Language",
      primaryColor: "Primary color",
      button: "Get started"
    }
  }
};

const defaultLanguage =
  localStorage.getItem("locale") ??
  (navigator.language.startsWith("zh") ? "zh-CN" : "en");

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
