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
  { href: "/contact", label: "Contact", note: "646.339.0154" },
];

export default function NotFound() {
  return (
    <section className="bg-paper">
      <div className="frame pb-28 pt-40 md:pb-40 md:pt-52">
        <div className="grid gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="eyebrow text-ocean">404</p>
            <h1 className="display-1 mt-6 text-ink">
              This page has <em className="block italic text-ink-muted">moved on.</em>
            </h1>
          </div>
          <p className="body-copy text-ink-muted md:col-span-4">
            The address may have changed. The rest of the East End is right where you left it.
          </p>
        </div>
        <ul className="mt-16 grid border-t border-ink/80 sm:grid-cols-2 md:mt-24 lg:grid-cols-4">
          {destinations.map((item, i) => (
            <li key={item.href} className={`border-b border-line ${["", "sm:border-l", "lg:border-l", "sm:border-l"][i] ?? ""}`}>
              <Link href={item.href} className="group block h-full py-8 transition-colors duration-500 hover:bg-paper-soft sm:px-7">
                <span className="eyebrow text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
                <span className="mt-6 block font-serif text-[2rem] font-light leading-none text-ink transition-colors duration-500 group-hover:text-ocean">{item.label}</span>
                <span className="mt-3 block text-[13px] text-ink-faint">{item.note}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/" className="link-line eyebrow mt-14 inline-block text-ocean">
          Return home <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
