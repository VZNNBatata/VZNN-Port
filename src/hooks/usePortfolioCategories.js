import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export function usePortfolioCategories({ all = false } = {}) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const load = async () => {
    try { setCategories(await api(`/api/categories${all ? "?all=1" : ""}`)); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, [all]);
  return { categories, loading, reload: load };
}
