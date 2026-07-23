import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { usePortfolioCategories } from "@/hooks/usePortfolioCategories";
import { usePortfolioProjects } from "@/hooks/usePortfolioProjects";

const aspect = { wide: "md:col-span-2 aspect-[16/9]", square: "aspect-square", vertical: "aspect-[3/4]" };

export default function PortfolioGrid() {
  const { projects } = usePortfolioProjects();
  const { categories } = usePortfolioCategories();
  const [filter, setFilter] = useState("ALL");
  const [selected, setSelected] = useState(null);
  const sorted = useMemo(() => [...projects].sort((a,b) => (a.displayOrder||0)-(b.displayOrder||0)), [projects]);
  const filtered = filter === "ALL" ? sorted : sorted.filter((p) => p.category === filter);
  const count = (slug) => slug === "ALL" ? sorted.length : sorted.filter((p) => p.category === slug).length;
  const label = (slug) => categories.find((c) => c.slug === slug)?.name || slug;

  return (
    <section id="portfolio" className="relative z-10 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-end md:justify-between"><div><span className="text-xs uppercase tracking-[.3em] text-violet-400/80">002 — Portfolio</span><h2 className="mt-3 font-heading text-5xl font-black uppercase tracking-tighter md:text-7xl">Portfolio</h2></div><p className="max-w-sm text-sm leading-6 text-white/45">A selected collection of banners, logos, illustrations and design work. Filter by category to explore each discipline.</p></div>
        <div className="no-scrollbar mb-10 flex flex-nowrap gap-2 overflow-x-auto pb-2 md:flex-wrap">{["ALL", ...categories.map((c) => c.slug)].map((f) => <button key={f} onClick={() => setFilter(f)} className={`relative shrink-0 rounded-full border px-5 py-2.5 text-xs font-semibold uppercase tracking-wider ${filter === f ? "border-violet-400 bg-violet-500/10 text-violet-200" : "border-white/10 text-white/40 hover:border-white/30 hover:text-white/80"}`}>{f === "ALL" ? "ALL" : label(f)} <span className="ml-2 rounded-full bg-white/5 px-1.5 py-0.5 text-[10px]">{count(f)}</span></button>)}</div>
        {filtered.length === 0 ? <div className="rounded-2xl border border-dashed border-white/10 py-20 text-center text-sm text-white/35">No projects in this category yet.</div> : <motion.div layout className="grid grid-cols-1 gap-4 md:grid-cols-3"><AnimatePresence mode="popLayout">{filtered.map((art, i) => <motion.button layout key={art.id} initial={{ opacity:0,y:18,scale:.96 }} animate={{ opacity:1,y:0,scale:1 }} exit={{ opacity:0,scale:.96 }} transition={{ delay:i*.035 }} onClick={() => setSelected(art)} className={`group relative overflow-hidden rounded-xl border border-white/10 bg-[#111] text-left ${aspect[art.aspect] || aspect.wide}`}><img src={art.thumbnail || art.coverImage} alt={art.imageAltText || art.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]" loading="lazy"/><div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"/><div className="absolute bottom-0 left-0 right-0 p-4"><span className="text-[10px] font-bold uppercase tracking-[.2em] text-violet-200">[{label(art.category)}]</span><h3 className="mt-1 text-base font-bold">{art.title}</h3></div></motion.button>)}</AnimatePresence></motion.div>}
      </div>
      <AnimatePresence>{selected && <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setSelected(null)} className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-black/95 p-4 backdrop-blur-md"><button className="fixed right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/15" onClick={() => setSelected(null)}><X className="h-5 w-5"/></button><motion.div initial={{scale:.94,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:.94,opacity:0}} onClick={(e)=>e.stopPropagation()} className="my-10 grid max-h-[88vh] w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-[#090909] md:grid-cols-[1fr_310px]"><div className="overflow-y-auto bg-[#101010]">{selected.videoUrl ? <video src={selected.videoUrl} controls className="max-h-[70vh] w-full object-contain"/> : <img src={selected.coverImage} alt={selected.imageAltText || selected.title} className="max-h-[70vh] w-full object-contain"/>}{selected.galleryImages?.length > 0 && <div className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-3">{selected.galleryImages.map((img, idx)=><img key={img+idx} src={img} alt={`${selected.title} ${idx+1}`} className="aspect-square w-full rounded-lg object-cover"/>)}</div>}</div><aside className="overflow-y-auto border-t border-white/10 p-6 md:border-l md:border-t-0"><span className="text-[10px] font-bold uppercase tracking-[.2em] text-violet-200">[{label(selected.category)}]</span><h3 className="mt-2 font-heading text-3xl font-black">{selected.title}</h3>{selected.shortDescription && <p className="mt-3 text-sm leading-6 text-white/50">{selected.shortDescription}</p>}<div className="mt-8 space-y-4 text-xs">{selected.client && <Meta name="Client" value={selected.client}/>} {selected.year && <Meta name="Year" value={selected.year}/>} {selected.projectType && <Meta name="Type" value={selected.projectType}/>} {selected.software?.length > 0 && <Meta name="Software" value={selected.software.join(" · ")}/>}</div>{selected.fullDescription && <p className="mt-8 whitespace-pre-wrap text-xs leading-6 text-white/45">{selected.fullDescription}</p>}</aside></motion.div></motion.div>}</AnimatePresence>
    </section>
  );
}

function Meta({name,value}) { return <div><p className="uppercase tracking-wider text-white/25">{name}</p><p className="mt-1 text-white/75">{value}</p></div>; }
