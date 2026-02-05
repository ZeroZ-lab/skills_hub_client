import { ipcMain } from "electron";
import { IPC_GET_STATE, IPC_SET_ACTIVE_PROFILE } from "../shared/ipc";
import { getAppState, setActiveProfile } from "./state/app-state-store";

export const registerIpcHandlers = () => {
  ipcMain.handle(IPC_GET_STATE, async () => {
    return await getAppState();
  });

  ipcMain.handle(IPC_SET_ACTIVE_PROFILE, async (_event, profileId: string) => {
    return await setActiveProfile(profileId);
  });
};

