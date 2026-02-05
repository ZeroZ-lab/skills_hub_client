import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Boxes,
  Bug,
  Home,
  PackageSearch,
  Puzzle,
  Server,
  Users
} from "lucide-react";

export type NavId =
  | "dashboard"
  | "skills"
  | "mcpServers"
  | "projects"
  | "profiles"
  | "market"
  | "doctor"
  | "logs";

export interface NavItem {
  id: NavId;
  icon: LucideIcon;
  labelKey: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", icon: Home, labelKey: "nav.dashboard" },
  { id: "skills", icon: Puzzle, labelKey: "nav.skills" },
  { id: "mcpServers", icon: Server, labelKey: "nav.mcpServers" },
  { id: "projects", icon: Boxes, labelKey: "nav.projects" },
  { id: "profiles", icon: Users, labelKey: "nav.profiles" },
  { id: "market", icon: PackageSearch, labelKey: "nav.market" },
  { id: "doctor", icon: Bug, labelKey: "nav.doctor" },
  { id: "logs", icon: Activity, labelKey: "nav.logs" }
];

