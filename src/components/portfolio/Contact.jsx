import { motion } from "framer-motion";
import { ArrowUpRight, Instagram, Mail, MessageCircle, Twitter } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const hrefFor = (value, type) => {
  if (!value) return "#";
  if (type === "email") return `mailto:${value}`;
  return /^https?:\/\//i.test(value) ? value : "#";
};

export default function Contact() {
  const { settings } = useSiteSettings();
  const cards = [
    ["Email", "Email Me", settings.contactEmail, Mail, "email"],
    ["Discord", "Add On Discord", settings.contactDiscord, MessageCircle, "url"],
    ["Instagram", "Follow Me", settings.contactInstagram, Instagram, "url"],
    ["Twitter / X", "Follow Me", settings.contactTwitter, Twitter, "url"],
  ];
  return <section id="contact" className="relative z-10 px-6 py-24 md:py-32"><div className="mx-auto max-w-5xl"><div className="border-t border-white/10 pt-8"><span className="text-xs uppercase tracking-[.3em] text-violet-400/80">003 — Get In Touch</span></div><motion.h2 initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="mt-6 font-heading text-[12vw] font-black uppercase leading-[.84] tracking-tighter md:text-[5rem]">Let's Create<br/>Something <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">Unique.</span></motion.h2><p className="mt-5 max-w-xl text-sm leading-6 text-white/45">Available for commissions, collaborations and creative projects.</p><div className="mt-12 grid gap-4 md:grid-cols-2">{cards.map(([label,title,value,Icon,type]) => <a key={label} href={hrefFor(value,type)} target={type === "url" && value?.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={`group flex items-center justify-between rounded-2xl border border-white/10 bg-[#0c0c0c] p-7 transition hover:border-violet-400/40 ${!value ? "pointer-events-none opacity-45" : ""}`}><div><div className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-violet-500/10 text-violet-200"><Icon className="h-5 w-5"/></div><p className="text-[10px] uppercase tracking-wider text-white/35">{label}</p><p className="mt-1 text-xl font-bold">{title}</p><p className="mt-1 break-all text-xs text-white/35">{value || "Not configured"}</p></div><ArrowUpRight className="h-5 w-5 text-white/25 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-violet-200"/></a>)}</div></div></section>;
}
