import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Market Insights & Reports",
  description:
    "Hamptons real estate market reports, oceanfront insights, and luxury market analysis by Barry McGovern at Hedgerow Exclusive Properties.",
  alternates: { canonical: "https://hamptonshomes.ai/blog" },
};

export default function BlogPage() {
  const [latest, ...rest] = blogPosts;

  return (
    <div className="bg-paper">
      <section className="bg-paper-deep pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-ocean/60 text-[10px] tracking-[0.5em] uppercase mb-4">Insights</p>
          <h1 className="font-serif text-5xl md:text-7xl text-ink leading-tight">
            Market
            <br />
            <span className="italic font-normal text-ink-muted">Intelligence</span>
          </h1>
        </div>
      </section>

      {/* Featured post */}
      {latest && (
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-8">
            <Link
              href={`/blog/${latest.slug}`}
              className="block border border-line bg-paper-soft hover:border-ocean/60 transition-all duration-700 group overflow-hidden"
            >
              {latest.image && (
                <div className="relative h-64 md:h-96 overflow-hidden">
                  <Image
                    src={latest.image}
                    alt={latest.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 1200px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-12 md:p-16">
                    <p className="text-ocean text-[10px] tracking-[0.4em] uppercase mb-4">
                      {latest.category} · {new Date(latest.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                    </p>
                    <h2 className="font-serif text-2xl md:text-4xl text-paper group-hover:text-ocean transition-colors duration-500 leading-snug mb-4">
                      {latest.title}
                    </h2>
                    <p className="text-paper/70 text-[15px] leading-relaxed max-w-2xl hidden md:block">
                      {latest.excerpt}
                    </p>
                    <p className="text-paper/55 text-[11px] tracking-[0.2em] uppercase mt-6 group-hover:text-ocean/50 transition-colors duration-500">
                      Read Report →
                    </p>
                  </div>
                </div>
              )}
              {!latest.image && (
                <div className="p-12 md:p-16">
                  <p className="text-ocean text-[10px] tracking-[0.4em] uppercase mb-4">
                    {latest.category} · {new Date(latest.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </p>
                  <h2 className="font-serif text-2xl md:text-4xl text-ink group-hover:text-ocean transition-colors duration-500 leading-snug mb-6">
                    {latest.title}
                  </h2>
                  <p className="text-ink-muted text-[15px] leading-relaxed max-w-2xl">
                    {latest.excerpt}
                  </p>
                  <p className="text-ink-faint text-[11px] tracking-[0.2em] uppercase mt-8 group-hover:text-ocean/50 transition-colors duration-500">
                    Read Report →
                  </p>
                </div>
              )}
            </Link>
          </div>
        </section>
      )}

      {/* Other posts */}
      {rest.length > 0 && (
        <section className="pb-32">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid md:grid-cols-2 gap-5">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block border border-line bg-paper-soft hover:border-ocean/60 transition-all duration-700 group overflow-hidden"
                >
                  {post.image && (
                    <div className="relative h-48 md:h-56 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent" />
                    </div>
                  )}
                  <div className="p-10">
                    <p className="text-ocean/50 text-[10px] tracking-[0.4em] uppercase mb-4">
                      {post.category}
                    </p>
                    <h3 className="font-serif text-xl text-ink group-hover:text-ocean transition-colors duration-500 leading-snug mb-4">
                      {post.title}
                    </h3>
                    <p className="text-ink-muted text-[14px] leading-relaxed">
                      {post.excerpt}
                    </p>
                    <p className="text-ink-faint text-[11px] tracking-[0.2em] uppercase mt-6 group-hover:text-ocean/40 transition-colors duration-500">
                      Read →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
