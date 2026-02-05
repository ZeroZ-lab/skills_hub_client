export interface Profile {
  id: string;
  name: string;
  description?: string;
}

export type SkillMode = "snapshot" | "symlink";

export interface SkillRecord {
  id: string;
  name: string;
  source: "official" | "enterprise" | "personal" | "local";
  version: string;
  mode: SkillMode;
  enabled: boolean;
  installedAt: string;
}

export interface ProjectRecord {
  id: string;
  name: string;
  rootPath: string;
  managed: boolean;
  lastOpenedAt?: string;
}

export type McpTransport = "stdio" | "sse" | "streamable-http";

export interface McpServerRecord {
  id: string;
  name: string;
  transport: McpTransport;
  scope: "user" | "project";
  enabled: boolean;
  url?: string;
  command?: string;
  args?: string[];
}

export interface AppState {
  version: 1;
  updatedAt: string;
  activeProfileId: string;
  profiles: Profile[];
  skills: SkillRecord[];
  projects: ProjectRecord[];
  mcpServers: McpServerRecord[];
}

export const createDefaultState = (): AppState => {
  const now = new Date().toISOString();
  return {
    version: 1,
    updatedAt: now,
    activeProfileId: "dev",
    profiles: [
      { id: "dev", name: "dev", description: "Developer" },
      { id: "accountant", name: "accountant", description: "Accounting" },
      { id: "legal", name: "legal", description: "Legal" }
    ],
    skills: [],
    projects: [],
    mcpServers: []
  };
};

