import { ALSO_ON } from "@/lib/seo-copy";

export default function AlsoOnStrip({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-ocean">{ALSO_ON.label}</p>
      <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-ink-muted">
        {ALSO_ON.links.map((link) => (
          <li key={link.href}>
            <a href={link.href} target="_blank" rel="noopener" className="hover:text-ocean">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
