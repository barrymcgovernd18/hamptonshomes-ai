import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical: `https://hamptonshomes.ai/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

// Simple markdown-like renderer for our blog content
function renderContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trimEnd();

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="font-serif text-2xl text-white mt-16 mb-6">
          {line.replace("## ", "")}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="font-serif text-xl text-gold/80 mt-10 mb-4">
          {line.replace("### ", "")}
        </h3>
      );
    } else if (line.startsWith("- **")) {
      elements.push(
        <li key={i} className="text-white/50 text-[15px] leading-[1.8] ml-4 mb-2" dangerouslySetInnerHTML={{
          __html: line.replace("- ", "").replace(/\*\*(.*?)\*\*/g, '<strong class="text-white/70">$1</strong>')
        }} />
      );
    } else if (line.startsWith("1. ") || line.startsWith("2. ") || line.startsWith("3. ") || line.startsWith("4. ")) {
      elements.push(
        <li key={i} className="text-white/50 text-[15px] leading-[1.8] ml-4 mb-2 list-decimal" dangerouslySetInnerHTML={{
          __html: line.replace(/^\d+\.\s/, "").replace(/\*\*(.*?)\*\*/g, '<strong class="text-white/70">$1</strong>')
        }} />
      );
    } else if (line.startsWith("---")) {
      elements.push(<hr key={i} className="border-white/5 my-12" />);
    } else if (line.startsWith("*") && line.endsWith("*") && !line.startsWith("**")) {
      elements.push(
        <p key={i} className="text-white/30 text-[13px] leading-[1.8] italic mt-8">
          {line.replace(/^\*|\*$/g, "")}
        </p>
      );
    } else if (line.trim() === "") {
      // skip
    } else {
      elements.push(
        <p key={i} className="text-white/50 text-[15px] leading-[1.9] mb-4" dangerouslySetInnerHTML={{
          __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white/70">$1</strong>')
        }} />
      );
    }
    i++;
  }
  return elements;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  // Article JSON-LD
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Barry McGovern",
      jobTitle: "Luxury Real Estate Broker | Oceanfront & Waterfront Specialist",
      worksFor: { "@type": "RealEstateAgent", name: "Hedgerow Exclusive Properties" },
    },
    publisher: {
      "@type": "Organization",
      name: "Hampton Homes AI",
      url: "https://hamptonshomes.ai",
    },
  };

  return (
    <div className="bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <article className="pt-32 pb-32">
        <div className="max-w-3xl mx-auto px-8">
          <Link
            href="/blog"
            className="text-white/20 text-[11px] tracking-[0.2em] uppercase hover:text-gold transition-colors duration-500 mb-10 block"
          >
            ← All Insights
          </Link>

          <p className="text-gold/60 text-[10px] tracking-[0.5em] uppercase mb-4">
            {post.category} · {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>

          <h1 className="font-serif text-3xl md:text-5xl text-white leading-tight mb-4">
            {post.title}
          </h1>

          <p className="text-white/30 text-[13px] mb-16">
            By {post.author} · Hedgerow Exclusive Properties
          </p>

          <div>{renderContent(post.content)}</div>

          {/* CTA */}
          <div className="border border-white/5 p-10 mt-16 text-center">
            <p className="font-serif text-xl text-white mb-3">Ready to discuss the market?</p>
            <p className="text-white/30 text-[14px] mb-6">Confidential consultations and complimentary valuations.</p>
            <Link
              href="/contact"
              className="inline-block border border-gold/40 text-gold text-[11px] tracking-[0.3em] uppercase px-8 py-3 hover:bg-gold/10 transition-all duration-500"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
