import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (matchMedia("(hover:none)").matches) return;
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
      setHover(Boolean(e.target.closest("a,button,[data-cursor='hover']")));
    };
    const leave = () => setVisible(false);
    addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => { removeEventListener("mousemove", move); document.removeEventListener("mouseleave", leave); };
  }, []);
  return <motion.div aria-hidden className="pointer-events-none fixed z-[9999] hidden md:block" animate={{ x: pos.x - (hover ? 26 : 10), y: pos.y - (hover ? 26 : 10), opacity: visible ? 1 : 0, scale: visible ? 1 : 0 }} transition={{ type: "spring", mass: .15, stiffness: 700, damping: 40 }}><div className="rounded-full border transition-all" style={{ width: hover ? 52 : 20, height: hover ? 52 : 20, borderColor: hover ? "#a855f7" : "rgba(255,255,255,.55)", background: hover ? "rgba(168,85,247,.08)" : "transparent", boxShadow: hover ? "0 0 24px rgba(168,85,247,.35)" : "none" }} /></motion.div>;
}
