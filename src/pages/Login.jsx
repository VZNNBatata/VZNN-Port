import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, LogIn, Mail } from "lucide-react";
import { api, setToken } from "@/lib/api";
import { Button, Field, Input } from "@/components/ui";

export default function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const submit = async (e) => { e.preventDefault(); setError(""); setLoading(true); try { const data = await api("/api/auth/login", {method:"POST",body:JSON.stringify({email,password})}); setToken(data.token); navigate("/admin"); } catch(err){ setError(err.message); } finally { setLoading(false); } };
  return <div className="grid min-h-screen place-items-center bg-[#07040b] px-4 text-white"><div className="w-full max-w-md"><div className="mb-8 text-center"><div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500"><LogIn className="h-6 w-6"/></div><h1 className="font-heading text-3xl font-black">VZNN Admin</h1><p className="mt-2 text-sm text-white/40">Sign in to manage the portfolio.</p></div><form onSubmit={submit} className="space-y-5 rounded-2xl border border-white/10 bg-white/[.035] p-7 shadow-2xl"><Field label="Email"><div className="relative"><Mail className="absolute left-3 top-3 h-4 w-4 text-white/30"/><Input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="pl-10" required/></div></Field><Field label="Password"><div className="relative"><Lock className="absolute left-3 top-3 h-4 w-4 text-white/30"/><Input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="pl-10" required/></div></Field>{error && <p className="rounded-lg bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}<Button className="h-11 w-full" disabled={loading}>{loading ? "Signing in..." : "Sign In"}</Button><a href="/" className="block text-center text-xs text-white/35 hover:text-white">Back to portfolio</a></form></div></div>;
}
