import type { NavId, NavItem } from "@/app/nav";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface SidebarNavProps {
  items: NavItem[];
  activeId: NavId;
  onSelect: (id: NavId) => void;
}

const SidebarNav = ({ items, activeId, onSelect }: SidebarNavProps) => {
  const { t } = useTranslation();

  return (
    <nav className="flex flex-col gap-1 p-2">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={cn(
              "flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors",
              isActive
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon size={16} className={cn(isActive ? "opacity-100" : "opacity-70")} />
            <span className="truncate">{t(item.labelKey)}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default SidebarNav;

