import { contextBridge, ipcRenderer } from "electron";
import type { AppState } from "../shared/app-state";
import { IPC_GET_STATE, IPC_SET_ACTIVE_PROFILE } from "../shared/ipc";

contextBridge.exposeInMainWorld("electron", {
  versions: process.versions
});

const api = {
  getState: () => ipcRenderer.invoke(IPC_GET_STATE) as Promise<AppState>,
  setActiveProfile: (profileId: string) =>
    ipcRenderer.invoke(IPC_SET_ACTIVE_PROFILE, profileId) as Promise<AppState>
};

contextBridge.exposeInMainWorld("skillsHub", api);
