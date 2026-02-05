import type { AppState } from "@shared/app-state";
import { createDefaultState } from "@shared/app-state";
import { useCallback, useEffect, useState } from "react";

export const useAppState = () => {
  const [state, setState] = useState<AppState>(() => createDefaultState());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      setError(err instanceof Error ? err.message : String(err));
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

