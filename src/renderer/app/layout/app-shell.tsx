import { NAV_ITEMS, type NavId } from "@/app/nav";
import DashboardPage from "@/app/pages/dashboard-page";
import DoctorPage from "@/app/pages/doctor-page";
import LogsPage from "@/app/pages/logs-page";
import MarketPage from "@/app/pages/market-page";
import McpServersPage from "@/app/pages/mcp-servers-page";
import ProfilesPage from "@/app/pages/profiles-page";
import ProjectsPage from "@/app/pages/projects-page";
import SkillsPage from "@/app/pages/skills-page";
import SidebarNav from "@/app/layout/sidebar-nav";
import TopBar from "@/app/layout/top-bar";
import { useAppState } from "@/app/state/use-app-state";
import { useMemo, useState } from "react";

const ACTIVE_NAV_KEY = "activeNav";

const isNavId = (value: string | null): value is NavId => {
  return (
    value === "dashboard" ||
    value === "skills" ||
    value === "mcpServers" ||
    value === "projects" ||
    value === "profiles" ||
    value === "market" ||
    value === "doctor" ||
    value === "logs"
  );
};

interface AppShellProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
  primaryColor: string;
  onChangePrimaryColor: (value: string) => void;
}

const AppShell = ({
  theme,
  onToggleTheme,
  primaryColor,
  onChangePrimaryColor
}: AppShellProps) => {
  const { state, error, setActiveProfile } = useAppState();
  const [activeNav, setActiveNav] = useState<NavId>(() => {
    const raw = localStorage.getItem(ACTIVE_NAV_KEY);
    return isNavId(raw) ? raw : "dashboard";
  });

  const CurrentPage = useMemo(() => {
    switch (activeNav) {
      case "dashboard":
        return (
          <DashboardPage activeProfileId={state.activeProfileId} profiles={state.profiles} />
        );
      case "skills":
        return <SkillsPage />;
      case "mcpServers":
        return <McpServersPage />;
      case "projects":
        return <ProjectsPage />;
      case "profiles":
        return <ProfilesPage />;
      case "market":
        return <MarketPage />;
      case "doctor":
        return <DoctorPage />;
      case "logs":
        return <LogsPage />;
      default:
        return null;
    }
  }, [activeNav]);

  const handleSelect = (id: NavId) => {
    setActiveNav(id);
    localStorage.setItem(ACTIVE_NAV_KEY, id);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen w-full">
        <aside className="flex w-60 flex-col border-r border-border bg-card">
          <div className="px-4 py-4">
            <div className="text-sm font-semibold tracking-tight">Skills Hub</div>
            <div className="text-xs text-muted-foreground">Client</div>
          </div>
          <SidebarNav items={NAV_ITEMS} activeId={activeNav} onSelect={handleSelect} />
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar
            theme={theme}
            onToggleTheme={onToggleTheme}
            primaryColor={primaryColor}
            onChangePrimaryColor={onChangePrimaryColor}
            profiles={state.profiles}
            activeProfileId={state.activeProfileId}
            onChangeActiveProfile={setActiveProfile}
          />
          {error ? (
            <div className="border-b border-border bg-accent px-6 py-3 text-sm text-accent-foreground">
              {error}
            </div>
          ) : null}
          <main className="min-h-0 flex-1 overflow-auto">{CurrentPage}</main>
        </div>
      </div>
    </div>
  );
};

export default AppShell;
