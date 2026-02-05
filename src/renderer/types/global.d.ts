export {};

import type { AppState } from "../../shared/app-state";

declare global {
  interface Window {
    electron?: {
      versions: NodeJS.ProcessVersions;
    };
    skillsHub?: {
      getState: () => Promise<AppState>;
      setActiveProfile: (profileId: string) => Promise<AppState>;
    };
  }
}
