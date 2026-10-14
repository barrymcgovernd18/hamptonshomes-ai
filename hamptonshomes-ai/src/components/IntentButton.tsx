"use client";

import { INTENT_EVENT, type Intent } from "@/lib/intent";

/** A link that opens the intent form (falls back to /contact without JavaScript). */
export default function IntentButton({ intent, village, source, className, children }: { intent?: Intent; village?: string; source: string; className?: string; children: React.ReactNode }) {
  return (
    <a
      href="/contact"
      onClick={(e) => {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent(INTENT_EVENT, { detail: { intent, village, source } }));
      }}
      className={className}
    >
      {children}
    </a>
  );
}
