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
      button: "开始使用",
      app: {
        title: "Skills Hub Client",
        activeProfile: "当前 Profile"
      },
      nav: {
        dashboard: "Dashboard",
        skills: "Skills",
        mcpServers: "MCP Servers",
        projects: "Projects",
        profiles: "Profiles",
        market: "Market",
        doctor: "Doctor",
        logs: "Logs"
      },
      pages: {
        dashboard: {
          title: "Dashboard",
          description: "概览当前 Profile、近期项目、待处理事项与市场连接状态。"
        },
        skills: {
          title: "Skills",
          description: "安装、启停、版本切换、来源与变更记录（MVP 占位）。"
        },
        mcpServers: {
          title: "MCP Servers",
          description: "连接测试、能力发现（tools/resources/prompts）与健康状态（MVP 占位）。"
        },
        projects: {
          title: "Projects",
          description: "项目扫描、接管/释放、manifest/lock 管理（MVP 占位）。"
        },
        profiles: {
          title: "Profiles",
          description: "角色配置集管理与一键切换（MVP 占位）。"
        },
        market: {
          title: "Market",
          description: "多源市场接入、搜索、安装与版本通道（MVP 占位）。"
        },
        doctor: {
          title: "Doctor",
          description: "冲突/失效路径/协议不兼容诊断与修复建议（MVP 占位）。"
        },
        logs: {
          title: "Logs",
          description: "调用日志、失败归因与审计追踪（MVP 占位）。"
        }
      },
      dashboard: {
        currentProfile: "当前激活 Profile",
        currentProfileHint: "后续可在 Profiles 页面切换；本阶段使用占位数据。",
        activeProfile: "Active",
        quickActions: "快捷动作",
        quickActionsHint: "常用操作入口（MVP 占位，不执行真实逻辑）。",
        recentProjects: "最近项目",
        recentProjectsHint: "展示最近打开/接管的项目（MVP 占位）。",
        marketStatus: "市场连接状态",
        marketStatusHint: "外部/私有市场连接状态（MVP 占位）。"
      },
      actions: {
        install: "安装",
        sync: "同步",
        takeover: "接管",
        rollback: "回滚"
      },
      common: {
        placeholder: "即将上线（占位）"
      }
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
      button: "Get started",
      app: {
        title: "Skills Hub Client",
        activeProfile: "Active profile"
      },
      nav: {
        dashboard: "Dashboard",
        skills: "Skills",
        mcpServers: "MCP Servers",
        projects: "Projects",
        profiles: "Profiles",
        market: "Market",
        doctor: "Doctor",
        logs: "Logs"
      },
      pages: {
        dashboard: {
          title: "Dashboard",
          description: "Overview of the active profile, recent projects, pending items, and market status."
        },
        skills: {
          title: "Skills",
          description: "Install, enable/disable, switch versions, and review change history (MVP placeholder)."
        },
        mcpServers: {
          title: "MCP Servers",
          description: "Connectivity checks, capability discovery, and health status (MVP placeholder)."
        },
        projects: {
          title: "Projects",
          description: "Scan projects, takeover/eject, and manage manifest/lock files (MVP placeholder)."
        },
        profiles: {
          title: "Profiles",
          description: "Manage role-based configs and switch profiles (MVP placeholder)."
        },
        market: {
          title: "Market",
          description: "Connect multiple sources, search, install, and manage channels (MVP placeholder)."
        },
        doctor: {
          title: "Doctor",
          description: "Detect conflicts, broken paths, and incompatibilities (MVP placeholder)."
        },
        logs: {
          title: "Logs",
          description: "Invocation logs, attribution, and audit trails (MVP placeholder)."
        }
      },
      dashboard: {
        currentProfile: "Active profile",
        currentProfileHint: "Switch profiles later in the Profiles page; using placeholder data for now.",
        activeProfile: "Active",
        quickActions: "Quick actions",
        quickActionsHint: "Common entry points (MVP placeholder; no real logic yet).",
        recentProjects: "Recent projects",
        recentProjectsHint: "Show recently opened/taken-over projects (MVP placeholder).",
        marketStatus: "Market status",
        marketStatusHint: "External/private market connectivity status (MVP placeholder)."
      },
      actions: {
        install: "Install",
        sync: "Sync",
        takeover: "Take over",
        rollback: "Rollback"
      },
      common: {
        placeholder: "Coming soon (placeholder)"
      }
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
