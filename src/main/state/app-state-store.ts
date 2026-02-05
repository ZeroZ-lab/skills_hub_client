import { app } from "electron";
import fs from "node:fs/promises";
import path from "node:path";
import { createDefaultState, type AppState } from "../../shared/app-state";

const STATE_FILENAME = "skills-hub-state.v1.json";

let cachedState: AppState | null = null;

const stateFilePath = () => {
  return path.join(app.getPath("userData"), STATE_FILENAME);
};

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isAppState = (value: unknown): value is AppState => {
  if (!isObject(value)) return false;
  if (value.version !== 1) return false;
  if (typeof value.updatedAt !== "string") return false;
  if (typeof value.activeProfileId !== "string") return false;
  if (!Array.isArray(value.profiles)) return false;
  if (!Array.isArray(value.skills)) return false;
  if (!Array.isArray(value.projects)) return false;
  if (!Array.isArray(value.mcpServers)) return false;
  return true;
};

const loadStateFromDisk = async (): Promise<AppState> => {
  try {
    const raw = await fs.readFile(stateFilePath(), "utf-8");
    const parsed: unknown = JSON.parse(raw);
    if (isAppState(parsed)) return parsed;
    return createDefaultState();
  } catch {
    return createDefaultState();
  }
};

export const getAppState = async (): Promise<AppState> => {
  if (cachedState) return cachedState;
  cachedState = await loadStateFromDisk();
  return cachedState;
};

const persistStateToDisk = async (next: AppState) => {
  cachedState = next;
  const filePath = stateFilePath();
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(next, null, 2), "utf-8");
};

export const setActiveProfile = async (profileId: string): Promise<AppState> => {
  const current = await getAppState();
  const exists = current.profiles.some((profile) => profile.id === profileId);
  if (!exists) {
    throw new Error(`Unknown profileId: ${profileId}`);
  }

  const next: AppState = {
    ...current,
    activeProfileId: profileId,
    updatedAt: new Date().toISOString()
  };

  await persistStateToDisk(next);
  return next;
};

