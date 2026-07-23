import { useSiteSettings } from "@/hooks/useSiteSettings";

export default function Footer() {
  const { settings } = useSiteSettings();
  return <footer className="relative z-10 border-t border-white/10 bg-[#050505]"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row"><div className="flex items-center gap-2"><span className="relative flex h-2.5 w-2.5"><span className="absolute h-full w-full animate-ping rounded-full bg-violet-500 opacity-60"/><span className="relative h-2.5 w-2.5 rounded-full bg-violet-500"/></span><span className="text-xs font-semibold uppercase tracking-wider text-white/65">{settings.availableForCommissions ? "Available For Commissions" : "Currently Unavailable"}</span></div><p className="font-heading text-2xl font-black uppercase tracking-tighter text-white/15">{settings.footerText}</p><p className="text-xs uppercase tracking-wider text-white/25">Roblox Artist & Designer</p></div></footer>;
}
