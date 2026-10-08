import Link from "next/link";

type Row = { label: string; value: number; display: string; detail?: string; href?: string; highlight?: boolean };

/**
 * Accessible horizontal bar chart in plain HTML. Each row reads naturally to assistive tech
 * ("2021, median $22.5M, 21 sales"); the bars themselves are decorative.
 */
export default function BarChart({
  title,
  caption,
  rows,
  tone = "light",
  className = "",
}: {
  title: string;
  caption?: React.ReactNode;
  rows: Row[];
  tone?: "light" | "dark";
  className?: string;
}) {
  const max = Math.max(...rows.map((r) => r.value));
  const dark = tone === "dark";
  return (
    <figure className={className}>
      <figcaption className={`eyebrow ${dark ? "text-paper/80" : "text-ocean"}`}>{title}</figcaption>
      <ol className={`mt-6 border-t ${dark ? "border-paper/20" : "border-ink/80"}`}>
        {rows.map((row) => {
          const inner = (
            <>
              <span className={`text-[13px] leading-tight ${dark ? "text-paper/85" : "text-ink"}`}>{row.label}</span>
              <span aria-hidden="true" className={`relative block h-[10px] ${dark ? "bg-paper/10" : "bg-ink/[0.06]"}`}>
                <span
                  className={`absolute inset-y-0 left-0 block ${row.highlight ? (dark ? "bg-paper" : "bg-ocean") : dark ? "bg-paper/55" : "bg-ocean/55"}`}
                  style={{ width: `${Math.max(4, (row.value / max) * 100)}%` }}
                />
              </span>
              <span className="text-right">
                <span className={`block font-serif text-[1.25rem] leading-none ${dark ? "text-paper" : "text-ink"}`}>
                  <span className="sr-only">median </span>
                  {row.display}
                </span>
                {row.detail ? <span className={`mt-1 block text-[11px] ${dark ? "text-paper/70" : "text-ink-faint"}`}>{row.detail}</span> : null}
              </span>
            </>
          );
          const cls = `grid grid-cols-[6.5rem_1fr_5.5rem] items-center gap-4 border-b py-3 sm:grid-cols-[8rem_1fr_6.5rem] sm:gap-6 ${dark ? "border-paper/15" : "border-line"}`;
          return (
            <li key={row.label}>
              {row.href ? (
                <Link href={row.href} className={`${cls} transition-colors duration-500 ${dark ? "hover:bg-paper/5" : "hover:bg-paper-soft"}`}>
                  {inner}
                </Link>
              ) : (
                <div className={cls}>{inner}</div>
              )}
            </li>
          );
        })}
      </ol>
      {caption ? <p className={`mt-4 text-[12px] leading-relaxed ${dark ? "text-paper/70" : "text-ink-faint"}`}>{caption}</p> : null}
    </figure>
  );
}
