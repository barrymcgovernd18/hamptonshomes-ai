import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Press",
  description:
    "Barry McGovern and Hedgerow Exclusive Properties in the press. Forbes, Wall Street Journal, Architectural Digest, Vogue, The Real Deal, Robb Report, and more.",
  alternates: { canonical: "https://hamptonshomes.ai/press" },
};

interface PressItem {
  outlet: string;
  title: string;
  url: string;
  image?: string;
  featured?: boolean;
  barry?: boolean;
}

const pressItems: PressItem[] = [
  // Barry-specific
  {
    outlet: "27East",
    title: "Hamptons Real Estate Roundtable, Barry McGovern: \"Close to $200M in trades just this quarter\"",
    url: "https://www.27east.com/residence/real-estate-news/article_5886f122-abda-5769-ab77-b503e0045269.html",
    featured: true,
    barry: true,
  },
  {
    outlet: "27East",
    title: "Taking the Pulse of the Hamptons Real Estate Market. Panelist: Barry McGovern",
    url: "https://www.27east.com/real-estate-news/taking-the-pulse-of-the-market-2341562/",
    barry: true,
  },
  {
    outlet: "James Lane Post",
    title: "Inside The Vision: A Deep Dive With Hedgerow Exclusive Founders & Their Team",
    url: "https://jameslanepost.com/inside-the-vision-a-deep-dive-with-hedgerow-exclusive-founders-gary-cooper-preston-kaye-and-their-elite-team/07/29/2024/Hamptons-News-Happenings",
    barry: true,
  },
  // Hedgerow major press
  {
    outlet: "Forbes",
    title: "Behind Hedgerow, The New And Exclusive Hamptons Real Estate Firm",
    url: "https://www.forbes.com/sites/emmareynolds/2024/12/19/behind-hedgerow-the-most-exclusive-hamptons-real-estate-firm/",
    featured: true,
  },
  {
    outlet: "The Wall Street Journal",
    title: "The Hamptons Luxury Housing Market Is Staging a Comeback for the Ages",
    url: "https://hedgerowexclusive.com/press/the-hamptons-luxury-housing-market-is-staging-a-comeback-for-the-ages/",
    image: "/images/press/wsj-comeback.jpg",
    featured: true,
  },
  {
    outlet: "The Wall Street Journal",
    title: "Asking $120 Million: An Oceanfront Estate Near One of the Hamptons' Most Expensive Streets",
    url: "https://hedgerowexclusive.com/press/asking-120-million-an-oceanfront-estate-near-one-of-the-hamptons-most-expensive-streets/",
    image: "/images/press/wsj-120m.jpg",
  },
  {
    outlet: "The Wall Street Journal",
    title: "Late McKinsey Exec's East Hampton Compound Lists for $41.9 Million",
    url: "https://hedgerowexclusive.com/press/late-mckinsey-execs-east-hampton-compound-lists-for-41-9-million/",
  },
  {
    outlet: "Architectural Digest",
    title: "The Most Expensive Hamptons Rental Is Going for $1 Million per Month",
    url: "https://hedgerowexclusive.com/press/the-most-expensive-hamptons-rental-is-going-for-1-million-per-month/",
    image: "/images/press/ad-rental.jpg",
    featured: true,
  },
  {
    outlet: "Vogue",
    title: "Naomi Watts, Camila Morrone, and More Joined Chef Francis Mallmann's Hamptons Summer Barbecue",
    url: "https://hedgerowexclusive.com/press/naomi-watts-camila-morrone-and-more-joined-chef-francis-mallmanns-hamptons-summer-barbecue/",
    image: "/images/press/vogue-mallmann.jpg",
  },
  {
    outlet: "Robb Report",
    title: "This $19 Million Hamptons Estate Is a One-Acre Manicured Paradise",
    url: "https://hedgerowexclusive.com/press/this-19-million-hamptons-estate-is-a-one-acre-manicured-paradise/",
    image: "/images/press/robb-19m.jpg",
  },
  {
    outlet: "Robb Report",
    title: "Two Restored Barns Add to the Bucolic Charm of This $12.5 Million Hamptons Farmhouse",
    url: "https://hedgerowexclusive.com/press/two-restored-barns-add-to-the-bucolic-charm-of-this-12-5-million-hamptons-farmhouse/",
  },
  {
    outlet: "The Hollywood Reporter",
    title: "Who's Buying What in the Big Apple? Ask NYC's Top Realtors",
    url: "https://hedgerowexclusive.com/press/whos-buying-what-in-the-big-apple-ask-nycs-top-realtors/",
  },
  {
    outlet: "The Hollywood Reporter",
    title: "New York Power Broker Awards Nominees, Hedgerow Exclusive Properties",
    url: "https://hedgerowexclusive.com/press/the-hollywood-reporter-announces-new-york-power-broker-awards-nominees/",
  },
  {
    outlet: "Mansion Global",
    title: "$85 Million Hamptons Home With Ties to F. Scott Fitzgerald and Jackie Kennedy Finds a Buyer",
    url: "https://hedgerowexclusive.com/press/85-milliom-hamptons-home-with-ties-to-f-scott-fitgerald-and-jackie-kennedy-finds-a-buyer/",
  },
  {
    outlet: "The Real Deal",
    title: "The 10 Priciest Residential Deals in the Hamptons in 2025",
    url: "https://hedgerowexclusive.com/press/the-10-priciest-residential-deals-in-the-hamptons-in-2025/",
  },
  {
    outlet: "The Real Deal",
    title: "Video Game Mogul Drops $32M on East Hampton Oceanfront Estate",
    url: "https://hedgerowexclusive.com/press/video-game-mogul-drops-32m-on-east-hampton-oceanfront-estate/",
    image: "/images/press/realdeal-lilypond.jpg",
  },
  {
    outlet: "The Real Deal",
    title: "Boston Celtics Co-Owner Buys Bridgehampton Mansion for $58M",
    url: "https://hedgerowexclusive.com/press/boston-celtics-co-owner-buys-bridgehampton-mansion-for-58m/",
    image: "/images/press/celtics-bridgehampton.jpg",
  },
  {
    outlet: "The Real Deal",
    title: "Hamptons' Top Brokerages Navigate Dragging Market, Uptick in Competition",
    url: "https://hedgerowexclusive.com/press/hamptons-top-brokerages-navigate-dragging-market-uptick-in-competition/",
  },
  {
    outlet: "New York Post",
    title: "Fashion Titan Reed Krakoff Asks $49.5M For His Glassy Oceanfront Hamptons Estate",
    url: "https://hedgerowexclusive.com/press/fashion-titan-reed-krakoff-asks-49-5m-for-his-glassy-oceanfront-hamptons-estate/",
    image: "/images/press/krakoff-dunes.webp",
  },
  {
    outlet: "New York Post",
    title: "Truman Capote Often Visited This $16.49M Hamptons Home",
    url: "https://hedgerowexclusive.com/press/truman-capote-often-visited-this-16-49m-hamptons-home-which-features-his-red-mustang-for-an-extra-price/",
    image: "/images/press/capote-sagharbor.jpg",
  },
  {
    outlet: "New York Post",
    title: "Billionaire's Row Penthouse Sells for $70.5M in Biggest Deal of the Year",
    url: "https://hedgerowexclusive.com/press/billionaires-row-pent",
  },
  {
    outlet: "Galerie",
    title: "A Sag Harbor Home Frequented by Truman Capote Hits the Market for $16.5 Million",
    url: "https://hedgerowexclusive.com/press/a-sag-harbor-home-frequented-by-truman-capote-hits-the-market-for-16-5-million/",
  },
  {
    outlet: "Cottages & Gardens",
    title: "Tour a Waterfront East Hampton Estate Once Owned by Lee Radziwill and Asking $95M",
    url: "https://hedgerowexclusive.com/press/tour-a-waterfront-east-hampton-estate-once-owned-by-lee-radziwill-and-asking-95m/",
    image: "/images/press/radziwill-95m.webp",
  },
  {
    outlet: "Entrepreneur",
    title: "Dom Perignon Hosts First-Ever Public Ticketed Event at Lavish $99 Million Hamptons Estate",
    url: "https://hedgerowexclusive.com/press/dom-perignon-hosts-first-ever-public-ticketed-event-for-3000-a-person-at-lavish-99-million-hamptons-estate/",
    image: "/images/press/dom-perignon.png",
  },
  {
    outlet: "Behind The Hedges",
    title: "Oceanfront Bridgehampton Home With Storied Past Sells for $50 Million in Off-Market Deal",
    url: "https://hedgerowexclusive.com/press/oceanfront-bridgehampton-home-with-storied-past-sells-for-50-million-in-off-market-deal/",
    image: "/images/press/bridgehampton-50m.jpg",
  },
];

export default function PressPage() {
  const featured = pressItems.filter((p) => p.featured);
  const barryPress = pressItems.filter((p) => p.barry && !p.featured);

  // Split remaining into those with images and those without
  const remaining = pressItems.filter((p) => !p.featured && !p.barry);
  const withImages = remaining.filter((p) => p.image);
  const textOnly = remaining.filter((p) => !p.image);

  return (
    <div className="bg-black">
      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-gold/60 text-[10px] tracking-[0.5em] uppercase mb-4">Press</p>
          <h1 className="font-serif text-5xl md:text-7xl text-white leading-tight">
            In the
            <br />
            <span className="italic font-normal text-white/60">Headlines</span>
          </h1>
        </div>
      </section>

      {/* Featured (with images where available) */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-5">
            {featured.map((item, i) => (
              <a
                key={i}
                href={item.url}
                target="_blank"
                rel="noopener"
                className="border border-white/5 hover:border-gold/30 transition-all duration-700 group block overflow-hidden"
              >
                {item.image && (
                  <div className="relative h-56 md:h-64 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <p className="absolute bottom-4 left-6 text-gold text-[10px] tracking-[0.4em] uppercase">
                      {item.outlet}
                    </p>
                  </div>
                )}
                <div className="p-10">
                  {!item.image && (
                    <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-4">
                      {item.outlet}
                    </p>
                  )}
                  <h2 className="font-serif text-xl md:text-2xl text-white group-hover:text-gold transition-colors duration-500 leading-snug">
                    {item.title}
                  </h2>
                  <p className="text-white/20 text-[11px] tracking-[0.2em] uppercase mt-6 group-hover:text-gold/50 transition-colors duration-500">
                    Read Article →
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Barry press */}
      {barryPress.length > 0 && (
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-8">
            <p className="text-gold/60 text-[10px] tracking-[0.5em] uppercase mb-10">
              Featuring Barry McGovern
            </p>
            <div className="space-y-px">
              {barryPress.map((item, i) => (
                <a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noopener"
                  className="flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-white/5 hover:border-gold/20 transition-all duration-500 group block"
                >
                  <div className="flex-1">
                    <p className="text-white/60 group-hover:text-white transition-colors duration-500 text-[15px]">
                      {item.title}
                    </p>
                  </div>
                  <p className="text-gold/40 text-[11px] tracking-[0.2em] uppercase mt-2 md:mt-0 md:ml-8 shrink-0">
                    {item.outlet}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Photo Grid: Articles with images */}
      {withImages.length > 0 && (
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-8">
            <p className="text-gold/60 text-[10px] tracking-[0.5em] uppercase mb-10">
              In the Press
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              {withImages.map((item, i) => (
                <a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noopener"
                  className="group block overflow-hidden border border-white/5 hover:border-gold/20 transition-all duration-500"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={item.image!}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  </div>
                  <div className="p-6">
                    <p className="text-gold/50 text-[9px] tracking-[0.4em] uppercase mb-3">
                      {item.outlet}
                    </p>
                    <p className="text-white/70 group-hover:text-white text-[14px] leading-relaxed transition-colors duration-500">
                      {item.title}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Text-only articles */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-gold/60 text-[10px] tracking-[0.5em] uppercase mb-10">
            More Coverage
          </p>
          <div className="space-y-px">
            {textOnly.map((item, i) => (
              <a
                key={i}
                href={item.url}
                target="_blank"
                rel="noopener"
                className="flex flex-col md:flex-row md:items-center justify-between py-5 border-b border-white/5 hover:border-gold/20 transition-all duration-500 group block"
              >
                <div className="flex-1">
                  <p className="text-white/40 group-hover:text-white/70 transition-colors duration-500 text-[14px]">
                    {item.title}
                  </p>
                </div>
                <p className="text-white/15 text-[10px] tracking-[0.2em] uppercase mt-2 md:mt-0 md:ml-8 shrink-0">
                  {item.outlet}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
