import Link from "next/link";
import { areas } from "@/lib/areas";
import { ALSO_ON } from "@/lib/seo-copy";

const FAIR_HOUSING_NOTICE =
  "https://dos.ny.gov/system/files/documents/2025/03/nys-housing-and-anti-discrimination-notice_02.2025.pdf";

const explore = [
  { href: "/sales", label: "Portfolio" },
  { href: "/listings", label: "Listings" },
  { href: "/market", label: "Market" },
  { href: "/press", label: "Press" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-paper/10 bg-ocean-deep text-paper">
      <div className="frame pb-14 pt-24 md:pt-32">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="font-serif text-[64px] font-light leading-none tracking-[0.04em] md:text-[88px]">BM</p>
            <p className="display-3 mt-8 max-w-sm font-light text-paper/90">
              Oceanfront, waterfront, and estate real estate, <em className="italic">from Southampton to Montauk.</em>
            </p>
            <Link href="/contact" className="eyebrow link-line mt-10 inline-block text-paper">
              Begin a conversation
            </Link>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:col-span-7 lg:pt-3">
            <div>
              <p className="eyebrow mb-6 text-paper/60">Explore</p>
              <ul className="space-y-3 text-[14px]">
                {explore.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-paper/85 transition-colors hover:text-paper">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-6 text-paper/60">Villages</p>
              <ul className="space-y-3 text-[14px]">
                {areas.map((area) => (
                  <li key={area.slug}>
                    <Link href={`/${area.slug}`} className="text-paper/85 transition-colors hover:text-paper">{area.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="eyebrow mb-6 text-paper/60">Contact</p>
              <ul className="space-y-3 text-[14px]">
                <li><a href="tel:+16463390154" className="text-paper/85 transition-colors hover:text-paper">646.339.0154</a></li>
                <li><a href="mailto:barry@hedgerowexclusive.com" className="break-all text-paper/85 transition-colors hover:text-paper">barry@hedgerowexclusive.com</a></li>
              </ul>
              <p className="eyebrow mb-4 mt-10 text-paper/60">{ALSO_ON.label}</p>
              <ul className="space-y-3 text-[14px]">
                {ALSO_ON.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} target="_blank" rel="noopener" className="text-paper/85 transition-colors hover:text-paper">{link.label}</a>
                  </li>
                ))}
                <li>
                  <a href="https://www.linkedin.com/in/barry-mcgovern-9346133b/" target="_blank" rel="noopener" className="text-paper/85 transition-colors hover:text-paper">LinkedIn</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-24 border-t border-paper/15 pt-8 text-[11.5px] leading-relaxed text-paper/70">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="space-y-1.5 lg:col-span-9">
              <p>
                Barry McGovern, Licensed Real Estate Salesperson, NY License #10401353717.{" "}
                <a href="https://hedgerowexclusive.com/" target="_blank" rel="noopener" className="underline decoration-paper/30 underline-offset-4 hover:text-paper">
                  Hedgerow Exclusive Properties
                </a>
                , 2495 Montauk Highway, Bridgehampton, NY 11932.
              </p>
              <p>&copy; {new Date().getFullYear()} Barry McGovern · Equal Housing Opportunity</p>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 lg:col-span-3 lg:justify-end">
              <li><a href={FAIR_HOUSING_NOTICE} target="_blank" rel="noopener" className="eyebrow text-[9.5px] text-paper/75 hover:text-paper">Fair Housing Notice</a></li>
              <li><Link href="/privacy" className="eyebrow text-[9.5px] text-paper/75 hover:text-paper">Privacy</Link></li>
              <li><Link href="/terms" className="eyebrow text-[9.5px] text-paper/75 hover:text-paper">Terms</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
