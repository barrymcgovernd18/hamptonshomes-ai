"use client";

import { useRef } from "react";

/**
 * A GET filter form that applies itself when any select changes. Without JavaScript it still works through its submit
 * button, so filtering stays server-rendered and every state has a shareable URL. Empty values and the default sort are
 * dropped so URLs stay clean (?village=montauk rather than ?village=montauk&price=&year=).
 */
export default function AutoSubmitForm({
  action,
  className,
  label,
  defaults = {},
  children,
}: {
  action: string;
  className?: string;
  label: string;
  /** Param values that are the default and can be left out of the URL, e.g. { sort: "newest" }. */
  defaults?: Record<string, string>;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLFormElement>(null);
  const go = () => {
    const form = ref.current;
    if (!form) return;
    const q = new URLSearchParams();
    for (const [k, v] of new FormData(form).entries()) {
      if (typeof v === "string" && v && defaults[k] !== v) q.set(k, v);
    }
    const qs = q.toString();
    window.location.assign(`${action}${qs ? `?${qs}` : ""}#results`);
  };
  return (
    <form
      ref={ref}
      method="get"
      action={action}
      role="search"
      aria-label={label}
      className={className}
      onChange={(e) => {
        if (e.target instanceof HTMLSelectElement) go();
      }}
      onSubmit={(e) => {
        e.preventDefault();
        go();
      }}
    >
      {children}
    </form>
  );
}
