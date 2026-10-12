import Link from "next/link";

type Row = { label: string; value: number; display: string; detail?: string; href?: string; highlight?: boolean; prefix?: string };

export type ChartKind = "trend" | "columns" | "bars";

/**
 * Price trend as a line. Counts and category medians as columns.
 * Long rankings, and any chart with kind "bars", use a shared horizontal scale.
 * The drawing is decorative. The same figures sit in a table for assistive tech.
 */
export default function BarChart({
  title,
  caption,
  rows,
  tone = "light",
  kind = "columns",
  className = "",
}: {
  title: string;
  caption?: React.ReactNode;
  rows: Row[];
  tone?: "light" | "dark";
  kind?: ChartKind;
  className?: string;
}) {
  const dark = tone === "dark";
  const muted = dark ? "text-paper/70" : "text-ink-faint";
  const line = dark ? "border-paper/20" : "border-ink/15";
  const wide = kind === "bars" || (kind === "columns" && rows.length > 6);

  return (
    <figure className={className}>
      <figcaption className={`eyebrow ${dark ? "text-paper/80" : "text-ocean"}`}>{title}</figcaption>
      <div className="mt-8" aria-hidden="true">
        {kind === "trend" ? <Trend rows={rows} dark={dark} /> : wide ? <Horizontal rows={rows} dark={dark} /> : <Columns rows={rows} dark={dark} />}
      </div>
      <table className="sr-only">
        <caption>{title}</caption>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              <td>
                {row.prefix !== "" ? `${row.prefix ?? "median"} ` : ""}
                {row.display}
              </td>
              {row.detail ? <td>{row.detail}</td> : null}
            </tr>
          ))}
        </tbody>
      </table>
      {caption ? <p className={`mt-6 border-t pt-4 text-[12px] leading-relaxed ${line} ${muted}`}>{caption}</p> : null}
    </figure>
  );
}

function showDetail(row: Row) {
  if (!row.detail) return false;
  return row.detail !== `${row.display} sales` && row.detail !== `${row.display} sale` && row.detail !== "0 sales";
}

function Columns({ rows, dark }: { rows: Row[]; dark: boolean }) {
  const max = Math.max(...rows.map((row) => row.value), 0);
  const safeMax = max <= 0 ? 1 : max;
  const ink = dark ? "text-paper" : "text-ink";
  const muted = dark ? "text-paper/65" : "text-ink-faint";
  const grid = dark ? "border-paper/15" : "border-ink/10";
  const fill = (row: Row) => (row.highlight ? (dark ? "bg-paper" : "bg-ocean") : dark ? "bg-paper/40" : "bg-ocean/35");

  return (
    <div>
      <div className={`relative h-60 border-b ${grid}`}>
        {[1, 2, 3].map((step) => (
          <span key={step} className={`pointer-events-none absolute inset-x-0 border-t ${grid}`} style={{ bottom: `${(step / 3) * 100}%` }} />
        ))}
        <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${rows.length}, minmax(0, 1fr))` }}>
          {rows.map((row) => {
            const pct = (row.value / safeMax) * 76;
            return (
              <div key={row.label} className="relative">
                <div
                  className={`absolute inset-x-[22%] bottom-0 sm:inset-x-[28%] ${fill(row)} ${row.highlight ? "shadow-[inset_0_2px_0_#c9a96e]" : ""}`}
                  style={{ height: `${row.value <= 0 ? 0 : Math.max(pct, 1.5)}%` }}
                />
                <span
                  className={`absolute inset-x-0 text-center font-serif text-[1.05rem] leading-none sm:text-[1.3rem] ${ink}`}
                  style={{ bottom: `calc(${pct}% + 0.7rem)` }}
                >
                  {row.display}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="grid" style={{ gridTemplateColumns: `repeat(${rows.length}, minmax(0, 1fr))` }}>
        {rows.map((row) => (
          <div key={row.label} className="px-1 pt-3 text-center">
            <span className={`block text-[11px] leading-snug sm:text-[12px] ${ink}`}>{row.label}</span>
            {showDetail(row) ? <span className={`mt-1 block text-[10.5px] leading-snug ${muted}`}>{row.detail}</span> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function Horizontal({ rows, dark }: { rows: Row[]; dark: boolean }) {
  const max = Math.max(...rows.map((row) => row.value), 0);
  const safeMax = max <= 0 ? 1 : max;
  const ink = dark ? "text-paper" : "text-ink";
  const muted = dark ? "text-paper/65" : "text-ink-faint";
  const grid = dark ? "border-paper/15" : "border-ink/10";
  const track = dark ? "bg-paper/10" : "bg-ink/[0.05]";
  const fill = (row: Row) => (row.highlight ? (dark ? "bg-paper" : "bg-ocean") : dark ? "bg-paper/45" : "bg-ocean/40");
  const longLabel = rows.some((row) => row.label.length > 28);
  const columns = longLabel
    ? "grid-cols-[minmax(0,9.5rem)_minmax(0,1fr)_max-content] gap-3 sm:grid-cols-[minmax(0,18rem)_minmax(0,1fr)_max-content] sm:gap-5"
    : "grid-cols-[minmax(0,7.6rem)_minmax(0,1fr)_max-content] gap-3 sm:grid-cols-[12.75rem_minmax(0,1fr)_max-content] sm:gap-5";

  return (
    <div className="relative">
      <ol className="space-y-4">
        {rows.map((row) => {
          const pct = (row.value / safeMax) * 100;
          const bar = (
            <span className={`relative block h-3.5 ${track}`}>
              {[25, 50, 75].map((mark) => (
                <span key={mark} className={`absolute inset-y-0 border-l ${grid}`} style={{ left: `${mark}%` }} />
              ))}
              <span className={`absolute inset-y-0 left-0 ${fill(row)}`} style={{ width: `${row.value <= 0 ? 0 : Math.max(pct, 1.5)}%` }} />
            </span>
          );
          return (
            <li key={row.label} className={`grid items-center ${columns}`}>
              {row.href ? (
                <Link href={row.href} className={`text-[13px] leading-tight transition-colors hover:text-ocean ${ink}`}>
                  {row.label}
                </Link>
              ) : (
                <span className={`text-[13px] leading-tight ${ink}`}>{row.label}</span>
              )}
              {bar}
              <span className="text-right">
                <span className={`block whitespace-nowrap font-serif text-[1.15rem] leading-none sm:text-[1.35rem] ${ink}`}>{row.display}</span>
                {showDetail(row) ? <span className={`mt-1 block whitespace-nowrap text-right text-[10.5px] ${muted}`}>{row.detail}</span> : null}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function Trend({ rows, dark }: { rows: Row[]; dark: boolean }) {
  const max = Math.max(...rows.map((row) => row.value), 0);
  const yMax = max <= 0 ? 1 : max * 1.12;
  const n = rows.length;
  const xOf = (index: number) => ((index + 0.5) / Math.max(n, 1)) * 100;
  const yOf = (value: number) => (value / yMax) * 100;
  const line = rows.map((row, index) => `${xOf(index)},${100 - yOf(row.value)}`).join(" ");
  const area =
    n > 0
      ? `M ${xOf(0)} 100 L ${rows.map((row, index) => `${xOf(index)} ${100 - yOf(row.value)}`).join(" L ")} L ${xOf(n - 1)} 100 Z`
      : "";
  const stroke = dark ? "#f4f0e8" : "#1f3a44";
  const ink = dark ? "text-paper" : "text-ink";
  const muted = dark ? "text-paper/65" : "text-ink-faint";
  const grid = dark ? "border-paper/15" : "border-ink/10";

  return (
    <div>
      <div className={`relative h-52 border-b ${grid}`}>
        {[1, 2].map((step) => (
          <span key={step} className={`pointer-events-none absolute inset-x-0 border-t ${grid}`} style={{ bottom: `${(step / 3) * 100}%` }} />
        ))}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <path d={area} fill={dark ? "rgba(244,240,232,0.14)" : "rgba(31,58,68,0.10)"} />
          <polyline
            points={line}
            fill="none"
            stroke={stroke}
            strokeWidth="1.75"
            vectorEffect="non-scaling-stroke"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
        {rows.map((row, index) => (
          <span
            key={row.label}
            className={`absolute h-[9px] w-[9px] -translate-x-1/2 translate-y-1/2 rounded-full ${row.highlight ? "bg-gold" : dark ? "bg-paper" : "bg-ocean"}`}
            style={{ left: `${xOf(index)}%`, bottom: `${yOf(row.value)}%` }}
          />
        ))}
      </div>
      <div className="mt-3 grid" style={{ gridTemplateColumns: `repeat(${Math.max(n, 1)}, minmax(0, 1fr))` }}>
        {rows.map((row) => (
          <div key={row.label} className="px-0.5 text-center">
            <span className={`block text-[11px] leading-tight ${muted}`}>{row.label}</span>
            <span className={`mt-1 block font-serif text-[0.95rem] leading-none sm:text-[1.15rem] ${ink}`}>{row.display}</span>
            {row.detail ? <span className={`mt-1 block text-[10px] leading-tight sm:text-[10.5px] ${muted}`}>{row.detail}</span> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
