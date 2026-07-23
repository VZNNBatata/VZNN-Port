import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export function usePortfolioProjects({ all = false } = {}) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const load = async () => {
    try { setProjects(await api(`/api/projects${all ? "?all=1" : ""}`)); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, [all]);
  return { projects, loading, reload: load };
}
