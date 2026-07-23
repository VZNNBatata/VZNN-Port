export function Button({ className = "", variant = "primary", ...props }) {
  const variants = {
    primary: "bg-gradient-to-r from-[#A855F7] to-[#EC4899] text-white hover:shadow-[0_0_28px_rgba(168,85,247,.35)]",
    outline: "border border-white/15 bg-transparent text-white/80 hover:border-white/35 hover:text-white",
    ghost: "bg-transparent text-white/65 hover:bg-white/5 hover:text-white",
    danger: "bg-red-500/10 text-red-300 hover:bg-red-500/20",
  };
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition disabled:pointer-events-none disabled:opacity-50 ${variants[variant] || variants.primary} ${className}`}
      {...props}
    />
  );
}

export function Input({ className = "", ...props }) {
  return <input className={`h-10 w-full rounded-lg border border-white/10 bg-white/[.035] px-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-violet-400/60 ${className}`} {...props} />;
}

export function Textarea({ className = "", ...props }) {
  return <textarea className={`min-h-24 w-full rounded-lg border border-white/10 bg-white/[.035] px-3 py-2 text-sm text-white outline-none placeholder:text-white/25 focus:border-violet-400/60 ${className}`} {...props} />;
}

export function Label({ className = "", ...props }) {
  return <label className={`mb-1 block text-xs font-semibold uppercase tracking-wider text-white/50 ${className}`} {...props} />;
}

export function Select({ className = "", children, ...props }) {
  return <select className={`h-10 w-full rounded-lg border border-white/10 bg-[#111] px-3 text-sm text-white outline-none focus:border-violet-400/60 ${className}`} {...props}>{children}</select>;
}

export function Switch({ checked, onChange, label }) {
  return (
    <label className="inline-flex items-center gap-3 text-sm text-white/70">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="peer sr-only" />
      <span className="relative h-5 w-9 rounded-full bg-white/15 transition peer-checked:bg-violet-500 after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition peer-checked:after:translate-x-4" />
      {label}
    </label>
  );
}

export function Field({ label, children }) {
  return <div><Label>{label}</Label>{children}</div>;
}
