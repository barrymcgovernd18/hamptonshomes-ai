import LeadForm from "@/components/LeadForm";
import { SectionLabel, revealDelay } from "@/components/Editorial";

/** Home valuation and oceanfront study signup, side by side. Used on the homepage, village pages and articles. */
export default function LeadBand({ n, place, className = "" }: { n?: string; place?: string; className?: string }) {
  return (
    <section aria-label="Valuation and research" className={`defer-render border-t border-line bg-paper py-24 md:py-32 ${className}`}>
      <div className="frame grid gap-20 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-6 md:pr-10 lg:pr-16">
          <SectionLabel n={n}>Valuation</SectionLabel>
          <h2 data-reveal style={revealDelay(80)} className="display-3 mt-6 font-light text-ink">
            What&apos;s my home worth?
          </h2>
          <p className="body-copy mt-5 text-ink-muted">
            A confidential valuation{place ? ` for your ${place} property` : ""}, based on recent sales, active competition and the private market. No obligation.
          </p>
          <div className="mt-10">
            <LeadForm kind="valuation" />
          </div>
        </div>
        <div className="md:col-span-5 md:col-start-8 md:border-l md:border-line md:pl-12">
          <SectionLabel>Research</SectionLabel>
          <h2 data-reveal style={revealDelay(80)} className="display-3 mt-6 font-light text-ink">
            Get the oceanfront study
          </h2>
          <p className="body-copy mt-5 text-ink-muted">
            Eighty-seven oceanfront sales from Southampton to Montauk since 2021, with medians by year and village and price per foot of frontage. Plus new listings before they reach the market.
          </p>
          <div className="mt-10">
            <LeadForm kind="signup" compact />
          </div>
        </div>
      </div>
    </section>
  );
}
