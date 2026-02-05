import { LanguageSwitch } from "@/components/language-switch";
import { PrimaryColorPicker } from "@/components/primary-color-picker";
import { ThemeControls } from "@/components/theme-controls";
import { cn } from "@/lib/utils";
import type { Profile } from "@shared/app-state";
import { useTranslation } from "react-i18next";

interface TopBarProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
  primaryColor: string;
  onChangePrimaryColor: (value: string) => void;
  profiles: Profile[];
  activeProfileId: string;
  onChangeActiveProfile: (profileId: string) => void;
  className?: string;
}

const TopBar = ({
  theme,
  onToggleTheme,
  primaryColor,
  onChangePrimaryColor,
  profiles,
  activeProfileId,
  onChangeActiveProfile,
  className
}: TopBarProps) => {
  const { t } = useTranslation();

  return (
    <header
      className={cn(
        "flex w-full items-center justify-between gap-4 border-b border-border bg-card px-4 py-3",
        className
      )}
    >
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex min-w-0 flex-col">
          <span className="text-sm font-medium leading-5">{t("app.title")}</span>
          <span className="text-xs text-muted-foreground">{t("app.activeProfile")}</span>
        </div>
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="sr-only">{t("app.activeProfile")}</span>
          <select
            value={activeProfileId}
            onChange={(event) => onChangeActiveProfile(event.target.value)}
            className="h-9 rounded-md border border-input bg-background px-2 text-sm text-foreground shadow-sm outline-none focus:ring-2 focus:ring-ring"
          >
            {profiles.map((profile) => (
              <option key={profile.id} value={profile.id}>
                {profile.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="flex flex-wrap items-center justify-end gap-4">
        <ThemeControls theme={theme} onToggle={onToggleTheme} />
        <LanguageSwitch />
        <PrimaryColorPicker color={primaryColor} onChange={onChangePrimaryColor} />
      </div>
    </header>
  );
};

export default TopBar;
