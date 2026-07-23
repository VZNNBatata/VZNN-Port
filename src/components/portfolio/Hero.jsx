import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { usePortfolioProjects } from "@/hooks/usePortfolioProjects";

const words = [["4 YEARS", "DESIGNER"], ["MANY CLIENTS"], ["BANNERS"], ["LOGOS"], ["DISCORD", "DESIGN"], ["ILLUSTRATIONS"]];

export default function Hero() {
  const tickerRef = useRef(null);
  const { settings } = useSiteSettings();
  const { projects } = usePortfolioProjects();
  useEffect(() => {
    const el = tickerRef.current;
    if (!el) return;
    let y = 0, id;
    const tick = () => { y -= .42; const h = el.scrollHeight / 3; if (Math.abs(y) >= h) y = 0; el.style.transform = `translateY(${y}px)`; id = requestAnimationFrame(tick); };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  const featured = projects.find((p) => p.featured) || projects[0];
  const useFeatured = settings.heroContentMode === "featuredProject" && featured;
  const image = useFeatured ? featured.coverImage : settings.heroImage;
  const alt = useFeatured ? featured.imageAltText || featured.title : settings.heroImageAlt;

  return (
    <section className="relative z-10 min-h-screen overflow-hidden">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-16 pt-28 md:grid-cols-[.72fr_1.15fr_.92fr] md:gap-6 md:pt-20">
        <div className="relative hidden h-[62vh] overflow-hidden border-r border-white/5 md:block">
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-[#09050d] via-transparent to-[#050505]" />
          <div ref={tickerRef} className="flex flex-col gap-10 pr-6 will-change-transform">
            {[...words, ...words, ...words].map((lines, i) => <div key={i}>{lines.map((line) => <div key={line} className="whitespace-nowrap font-heading text-[clamp(1.5rem,3vw,3.6rem)] font-black uppercase leading-[.92] tracking-tight text-white/[.065]">{line}</div>)}</div>)}
          </div>
        </div>

        <div className="flex flex-col justify-center md:px-4">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mb-4 flex items-center gap-3"><span className="h-2 w-2 animate-pulse rounded-full bg-violet-500" /><span className="text-xs uppercase tracking-[.3em] text-white/40">{settings.artistTitle}</span></motion.div>
          <motion.h1 initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .08 }} className="bg-gradient-to-br from-white via-[#eadcff] to-[#a855f7] bg-clip-text font-heading text-[24vw] font-black uppercase leading-[.8] tracking-tighter text-transparent sm:text-[18vw] md:text-[7.2rem]">{settings.artistName}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .18 }} className="mt-6 max-w-md text-sm leading-7 text-white/50 md:text-base">{settings.heroDescription}</motion.p>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .26 }} className="mt-8 flex flex-wrap gap-x-8 gap-y-5">
            <div className="flex items-center gap-3"><strong className="font-heading text-3xl text-violet-400 md:text-4xl">{settings.yearsExperience} YEARS</strong><span className="text-[10px] uppercase leading-4 tracking-wider text-white/35">Design<br/>Experience</span></div>
            <div className="flex items-center gap-3"><strong className="font-heading text-3xl text-pink-400 md:text-4xl">{settings.satisfiedClients}</strong><span className="text-[10px] uppercase leading-4 tracking-wider text-white/35">Satisfied<br/>Clients</span></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .34 }} className="mt-10 flex flex-wrap gap-4"><a href="#portfolio" className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 px-7 py-3.5 text-xs font-bold uppercase tracking-wider">View Portfolio <ArrowDownRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:translate-y-0.5" /></a><a href="#contact" className="rounded-full border border-white/15 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white/75 transition hover:border-white/35 hover:text-white">Commission Me</a></motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .25, duration: .7 }} className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_70px_rgba(168,85,247,.12)]">
          <img src={image || "/images/hero-default.png"} alt={alt || "Featured artwork"} className="h-full w-full object-cover" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between"><span className="text-[10px] uppercase tracking-[.25em] text-white/55">{useFeatured ? featured.title : "Featured Work"}</span><span className="rounded bg-violet-500/20 px-2 py-1 text-[9px] font-bold uppercase text-violet-200">Featured</span></div>
        </motion.div>
      </div>
    </section>
  );
}
