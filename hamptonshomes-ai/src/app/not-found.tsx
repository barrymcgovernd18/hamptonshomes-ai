import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

const destinations = [
  { href: "/sales", label: "Portfolio", note: "Hedgerow listings and sales" },
  { href: "/market", label: "Market", note: "Research and village reports" },
  { href: "/about", label: "About", note: "Barry McGovern" },
  { href: "/contact", label: "Contact", note: "646-339-0154" },
];

export default function NotFound() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-5xl px-6 pb-28 pt-40 md:px-8 md:pb-36 md:pt-48">
        <p className="mb-6 text-[11px] uppercase tracking-[0.32em] text-ocean">404</p>
        <h1 className="font-serif text-5xl leading-tight text-ink md:text-7xl">
          This page has <br />
          <span className="font-normal italic text-ink-muted">moved on.</span>
        </h1>
        <p className="mt-8 max-w-xl text-[15px] leading-[1.9] text-ink-muted">
          The address may have changed. The rest of the East End is right where you left it.
        </p>
        <ul className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2">
          {destinations.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="group block h-full bg-paper p-7 transition-colors hover:bg-paper-soft">
                <span className="font-serif text-2xl text-ink group-hover:text-ocean">{item.label}</span>
                <span className="mt-2 block text-sm text-ink-faint">{item.note}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/" className="mt-12 inline-block border-b border-ocean pb-1 text-sm text-ocean hover:border-ink hover:text-ink">
          Return home <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
