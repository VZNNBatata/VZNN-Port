import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { DEFAULT_SETTINGS } from "@/lib/defaults";

export function useSiteSettings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const row = await api("/api/settings");
      setSettings({ ...DEFAULT_SETTINGS, ...row });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);
  return { settings, loading, reload: load };
}
