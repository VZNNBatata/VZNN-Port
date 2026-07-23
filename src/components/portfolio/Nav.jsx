import { Star, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  ["Home", "/#top"],
  ["Portfolio", "/#portfolio"],
  ["Contact", "/#contact"],
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(scrollY > 40);
    addEventListener("scroll", fn);
    return () => removeEventListener("scroll", fn);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition ${scrolled ? "border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl" : "bg-transparent"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="/#top" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-md border border-white/20"><Star className="h-4 w-4 fill-white" /></span>
          <span className="font-heading text-sm font-black tracking-[.25em]">VZNN</span>
        </a>
        <nav className="hidden gap-8 md:flex">
          {links.map(([label, href]) => <a key={href} href={href} className="text-xs uppercase tracking-wider text-white/50 transition hover:text-white">{label}</a>)}
        </nav>
        <div className="flex items-center gap-2">
          <a href="/#contact" className="hidden rounded-full bg-gradient-to-r from-violet-500 to-pink-500 px-5 py-2 text-xs font-semibold uppercase tracking-wider sm:block">Commission Me</a>
          <button onClick={() => setOpen(!open)} className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 md:hidden">{open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}</button>
        </div>
      </div>
      {open && <div className="border-t border-white/10 bg-[#070509]/95 px-6 py-4 backdrop-blur-xl md:hidden">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="block py-3 text-sm uppercase tracking-wider text-white/70">{label}</a>)}<a href="/#contact" onClick={() => setOpen(false)} className="mt-2 block rounded-lg bg-gradient-to-r from-violet-500 to-pink-500 px-4 py-3 text-center text-xs font-bold uppercase">Commission Me</a></div>}
    </header>
  );
}
