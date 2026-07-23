import { useState } from "react";
import { LogOut } from "lucide-react";
import AdminProjectsTab from "@/components/admin/AdminProjectsTab";
import AdminCategoriesTab from "@/components/admin/AdminCategoriesTab";
import AdminSettingsTab from "@/components/admin/AdminSettingsTab";
import { clearToken } from "@/lib/api";

const tabs = [["projects","Projects"],["categories","Categories"],["settings","Site Settings"]];
export default function Admin(){const [tab,setTab]=useState("projects"); const logout=()=>{clearToken();location.href="/login"}; return <div className="min-h-screen bg-[#07080c] text-slate-100"><div className="mx-auto max-w-6xl px-5 py-10"><div className="flex items-start justify-between gap-4"><div><h1 className="font-heading text-3xl font-black">VZNN Admin</h1><p className="mt-1 text-sm text-white/40">Manage projects, categories and public information.</p></div><button onClick={logout} className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-xs text-white/60 hover:text-white"><LogOut className="h-4 w-4"/> Log out</button></div><div className="mt-8 flex gap-1 overflow-x-auto border-b border-white/10">{tabs.map(([key,label])=><button key={key} onClick={()=>setTab(key)} className={`shrink-0 border-b-2 px-4 py-3 text-sm font-semibold ${tab===key?"border-violet-500 text-white":"border-transparent text-white/40 hover:text-white/70"}`}>{label}</button>)}</div><div className="mt-8">{tab==="projects"&&<AdminProjectsTab/>}{tab==="categories"&&<AdminCategoriesTab/>}{tab==="settings"&&<AdminSettingsTab/>}</div></div></div>}
