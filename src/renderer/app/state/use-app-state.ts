import type { AppState } from "@shared/app-state";
import { createDefaultState } from "@shared/app-state";
import { useCallback, useEffect, useState } from "react";

export const useAppState = () => {
  const [state, setState] = useState<AppState>(() => createDefaultState());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const normalizeError = (err: unknown) => {
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes("No handler registered for 'skillsHub:getState'")) {
      return "IPC handler is not registered. If you're in dev, restart `pnpm run dev` (main/preload changes require an Electron restart).";
    }
    return message;
  };

  const refresh = useCallback(async () => {
    const api = window.skillsHub;
    if (!api) {
      setError("skillsHub API is not available");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const next = await api.getState();
      setState(next);
      setError(null);
    } catch (err) {
      setError(normalizeError(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const setActiveProfile = useCallback(async (profileId: string) => {
    const api = window.skillsHub;
    if (!api) return;
    const next = await api.setActiveProfile(profileId);
    setState(next);
  }, []);

  return { state, loading, error, refresh, setActiveProfile };
};
