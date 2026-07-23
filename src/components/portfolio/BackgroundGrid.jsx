export default function BackgroundGrid() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,#160622 0%,#09050d 35%,#050505 82%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 45% at 12% 0%,rgba(168,85,247,.2),transparent 72%),radial-gradient(ellipse 55% 45% at 95% 26%,rgba(236,72,153,.11),transparent 70%)" }} />
      <div className="absolute inset-0 opacity-50" style={{ backgroundImage: "radial-gradient(1.5px 1.5px at 20px 30px,rgba(255,255,255,.85),transparent),radial-gradient(1px 1px at 90px 80px,rgba(255,255,255,.6),transparent),radial-gradient(1.2px 1.2px at 160px 120px,rgba(216,180,254,.8),transparent),radial-gradient(1px 1px at 280px 160px,rgba(255,255,255,.55),transparent)", backgroundSize: "360px 220px" }} />
      <div className="absolute -left-32 top-[35%] h-64 w-[60%] rotate-[-8deg] opacity-[.06] blur-2xl" style={{ background: "linear-gradient(90deg,transparent,#c084fc,transparent)", animation: "drift 12s ease-in-out infinite" }} />
      <div className="absolute bottom-0 left-1/2 h-72 w-[70%] -translate-x-1/2 rounded-full bg-violet-700/10 blur-[100px]" />
    </div>
  );
}
