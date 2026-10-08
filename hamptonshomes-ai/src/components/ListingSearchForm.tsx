"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export type Option = { value: string; label: string };
export type SearchField = { name: string; label: string; options: Option[]; value: string; wide?: boolean };

const selectClass =
  "mt-2 block w-full appearance-none rounded-none border border-line bg-paper-soft py-3 pl-3.5 pr-9 text-[15px] text-ink transition-[border-color,box-shadow] duration-300 hover:border-ink-faint/60 focus:border-ocean-deep focus:shadow-[0_0_0_1px_var(--color-ocean-deep)] focus:outline-none";

/**
 * A plain GET form: without JavaScript it submits natively to /listings?... and the server renders the results.
 * With JavaScript it drops empty and default values from the URL and navigates without a full reload.
 */
export default function ListingSearchForm({ fields }: { fields: SearchField[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = new URLSearchParams();
    for (const [k, v] of new FormData(e.currentTarget)) {
      if (typeof v === "string" && v && !(k === "sort" && v === "price-desc")) q.set(k, v);
    }
    const qs = q.toString();
    startTransition(() => router.push(`/listings${qs ? `?${qs}` : ""}`, { scroll: false }));
  }

  return (
    <form method="get" action="/listings#results" onSubmit={onSubmit} role="search" aria-label="Search listings">
      <div className="grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-4 lg:grid-cols-8 lg:gap-x-3">
        {fields.map((f) => (
          <div key={f.name} className={f.wide ? "col-span-2 md:col-span-1 lg:col-span-1" : ""}>
            <label htmlFor={`ls-${f.name}`} className="eyebrow block text-[10.5px] text-ink-muted">
              {f.label}
            </label>
            <div className="relative">
              <select id={`ls-${f.name}`} name={f.name} defaultValue={f.value} className={selectClass}>
                {f.options.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <svg aria-hidden="true" viewBox="0 0 10 6" className="pointer-events-none absolute right-3.5 top-1/2 mt-1 h-1.5 w-2.5 text-ink-muted">
                <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
        <button
          type="submit"
          disabled={pending}
          className="eyebrow inline-flex items-center justify-center gap-3 bg-ocean-deep px-9 py-4 text-[12px] text-paper transition-colors duration-300 hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ocean-deep disabled:opacity-70 max-sm:w-full"
        >
          {pending ? "Searching" : "Search listings"}
          <span aria-hidden="true">→</span>
        </button>
        <Link href="/listings" scroll={false} className="link-line eyebrow text-ink-muted hover:text-ink">
          Clear all
        </Link>
      </div>
    </form>
  );
}
