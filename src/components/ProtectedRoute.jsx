import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { api, getToken } from "@/lib/api";

export default function ProtectedRoute() {
  const [state, setState] = useState("loading");
  useEffect(() => {
    if (!getToken()) return setState("guest");
    api("/api/auth/me").then(() => setState("ok")).catch(() => setState("guest"));
  }, []);
  if (state === "loading") return <div className="grid min-h-screen place-items-center bg-[#050505]"><div className="h-8 w-8 animate-spin rounded-full border-4 border-white/15 border-t-violet-400" /></div>;
  return state === "ok" ? <Outlet /> : <Navigate to="/login" replace />;
}
