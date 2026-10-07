import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  SEO_TITLES,
  blogPosts,
  extractFaqsFromContent,
  inferTownFromPost,
  relatedBlogPosts,
} from "@/lib/blog";
import JsonLd from "@/components/JsonLd";
import { ClosingInvitation } from "@/components/Editorial";
import {
  COASTAL_ABOUT_URL,
  DEFAULT_OG_IMAGE,
  articleJsonLd,
  breadcrumbListJsonLd,
  faqPageJsonLd,
  postOgImageUrl,
  shareImages,
} from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  const canonical = `https://hamptonshomes.ai/blog/${post.slug}`;
  const ogImage = postOgImageUrl(post.image);
  const usesShareImage = ogImage === DEFAULT_OG_IMAGE;
  const seoTitle = SEO_TITLES[post.slug];
  return {
    title: seoTitle ? { absolute: seoTitle } : post.title,
    description: post.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: canonical,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.dateModified ?? post.date,
      authors: [post.author],
      images: usesShareImage
        ? shareImages(post.title)
        : [{ url: ogImage, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: [ogImage],
    },
  };
}

function formatInline(text: string) {
  return text
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-ocean underline decoration-ocean/35 decoration-1 underline-offset-[5px] transition-colors hover:text-ocean-deep hover:decoration-ocean">$1</a>'
    )
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-ink">$1</strong>');
}

function isPipeRow(line: string) {
  const trimmed = line.trim();
  return trimmed.startsWith("|") && trimmed.includes("|", 1);
}

function splitPipeRow(line: string) {
  let value = line.trim();
  if (value.startsWith("|")) value = value.slice(1);
  if (value.endsWith("|")) value = value.slice(0, -1);
  return value.split("|").map((cell) => cell.trim());
}

function isSeparatorRow(line: string) {
  const cells = splitPipeRow(line);
  return cells.length > 0 && cells.every((cell) => /^:?-{3,}:?$/.test(cell.replace(/\s/g, "")));
}

function renderTable(rows: string[], key: number) {
  let header: string[] | null = null;
  let body = rows;
  if (rows.length >= 2 && isSeparatorRow(rows[1])) {
    header = splitPipeRow(rows[0]);
    body = rows.slice(2);
  }
  const bodyRows = body.filter((row) => !isSeparatorRow(row)).map(splitPipeRow);

  return (
    <div key={key} className="my-12 overflow-x-auto lg:-mx-16">
      <table className="w-full border-t border-ink/80 text-left">
        {header && (
          <thead>
            <tr className="border-b border-line">
              {header.map((cell, ci) => (
                <th
                  key={ci}
                  className="eyebrow whitespace-nowrap px-4 py-4 font-medium text-ink first:pl-0"
                  dangerouslySetInnerHTML={{ __html: formatInline(cell) }}
                />
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {bodyRows.map((cells, ri) => (
            <tr key={ri} className="border-b border-line transition-colors duration-300 hover:bg-paper-soft">
              {cells.map((cell, ci) => (
                <td
                  key={ci}
                  className="whitespace-nowrap px-4 py-3.5 text-[14px] leading-[1.6] text-ink-muted first:pl-0 first:text-ink"
                  dangerouslySetInnerHTML={{ __html: formatInline(cell) }}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Simple markdown-like renderer for our blog content
function renderContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let dropCapUsed = false;

  while (i < lines.length) {
    const line = lines[i].trimEnd();

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="display-3 mb-7 mt-20 border-t border-line pt-10 font-light text-ink">
          {line.replace("## ", "")}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="mb-4 mt-12 font-serif text-[1.55rem] italic leading-snug text-ocean">
          {line.replace("### ", "")}
        </h3>
      );
    } else if (isPipeRow(line)) {
      const tableLines = [line];
      let j = i + 1;
      while (j < lines.length && isPipeRow(lines[j].trimEnd())) {
        tableLines.push(lines[j].trimEnd());
        j++;
      }
      elements.push(renderTable(tableLines, i));
      i = j;
      continue;
    } else if (line.startsWith("- ") || /^\d+\.\s/.test(line)) {
      const ordered = !line.startsWith("- ");
      const items: string[] = [];
      let j = i;
      while (j < lines.length) {
        const next = lines[j].trimEnd();
        if (ordered ? !/^\d+\.\s/.test(next) : !next.startsWith("- ")) break;
        items.push(ordered ? next.replace(/^\d+\.\s/, "") : next.slice(2));
        j++;
      }
      const ListTag = ordered ? "ol" : "ul";
      elements.push(
        <ListTag key={i} className={`mb-8 ml-5 space-y-3 ${ordered ? "list-decimal marker:font-serif marker:text-ocean" : "list-disc marker:text-ocean"}`}>
          {items.map((item, k) => (
            <li key={k} className="pl-2 text-[16px] leading-[1.8] text-ink-muted md:text-[17px]" dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
          ))}
        </ListTag>
      );
      i = j;
      continue;
    } else if (line.startsWith("---")) {
      elements.push(<hr key={i} className="mx-auto my-16 w-16 border-ink/40" />);
    } else if (line.startsWith("*") && line.endsWith("*") && !line.startsWith("**")) {
      elements.push(
        <p key={i} className="mt-10 font-serif text-[16px] italic leading-[1.7] text-ink-faint">
          {line.replace(/^\*|\*$/g, "")}
        </p>
      );
    } else if (line.trim() === "") {
      // skip
    } else {
      const dropCap = !dropCapUsed && /^[A-Za-z]/.test(line);
      if (dropCap) dropCapUsed = true;
      elements.push(
        <p key={i} className={`mb-6 text-[16px] leading-[1.9] text-ink-muted md:text-[17px]${dropCap ? " drop-cap" : ""}`} dangerouslySetInnerHTML={{
          __html: formatInline(line)
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

  const faqs = extractFaqsFromContent(post.content);
  const town = inferTownFromPost(post);
  const related = relatedBlogPosts(post, 2);

  return (
    <div className="bg-paper">
      <JsonLd data={articleJsonLd(post)} />
      <JsonLd
        data={breadcrumbListJsonLd([
          { name: "Home", path: "/" },
          { name: "Market", path: "/market" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      {faqs.length > 0 && <JsonLd data={faqPageJsonLd(faqs)} />}
      <article className="pb-24 pt-36 md:pb-32 md:pt-48">
        <header className="frame">
          <Link href="/market" className="eyebrow link-line text-ink-faint transition-colors duration-500 hover:text-ocean">
            ← Market research
          </Link>
          <p className="eyebrow hero-rise mt-12 text-ocean md:mt-16" style={{ animationDelay: "120ms" }}>
            {post.category} · {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}
          </p>
          <h1 className="display-2 hero-rise mt-6 max-w-[17em] text-ink" style={{ animationDelay: "220ms" }}>
            {post.title}
          </h1>

          <div className="hero-rise mt-10 border-t border-line pt-6 md:mt-14" style={{ animationDelay: "380ms" }}>
            {post.authorBox ? (
              <div className="flex items-center gap-5">
                <Image
                  src="/images/barry-mcgovern.jpg"
                  alt="Barry McGovern, Licensed Real Estate Salesperson, Hedgerow Exclusive Properties"
                  width={54}
                  height={72}
                  className="photo-mono h-[72px] w-[54px] object-cover"
                />
                <p className="text-[13px] leading-[1.7] text-ink-faint">
                  <span className="block font-serif text-[18px] text-ink">{post.author}</span>
                  Licensed Real Estate Salesperson, Hedgerow Exclusive Properties
                </p>
              </div>
            ) : (
              <p className="text-[13px] text-ink-faint">By {post.author} · Hedgerow Exclusive Properties</p>
            )}
          </div>
        </header>

        {post.image ? (
          <div className="frame mt-12 md:mt-16">
            <div className="relative aspect-[4/3] overflow-hidden bg-paper-deep md:aspect-[21/9]">
              <Image src={post.image} alt={post.title} fill priority fetchPriority="high" quality={80} sizes="(max-width: 1440px) 100vw, 1440px" className="hero-img photo-mono object-cover" />
            </div>
          </div>
        ) : null}

        <div className="frame">
          <div className="mx-auto mt-16 max-w-[42rem] md:mt-24 [&>h2:first-child]:mt-0 [&>h2:first-child]:border-t-0 [&>h2:first-child]:pt-0">{renderContent(post.content)}</div>

          <nav className="mx-auto mt-24 max-w-[42rem] border-t border-ink/80 pt-8" aria-label="Continue reading">
            <p className="eyebrow mb-4 text-ocean">Continue reading</p>
            <ul className="divide-y divide-line">
              {town && (
                <li>
                  <Link href={`/${town.slug}`} className="group flex items-baseline justify-between gap-6 py-4 font-serif text-[1.3rem] text-ink transition-colors duration-500 hover:text-ocean">
                    Explore {town.name} luxury real estate
                    <span aria-hidden="true" className="text-ink-faint transition-transform duration-500 group-hover:translate-x-1.5">→</span>
                  </Link>
                </li>
              )}
              <li>
                <a href={COASTAL_ABOUT_URL} className="group flex items-baseline justify-between gap-6 py-4 font-serif text-[1.3rem] text-ink transition-colors duration-500 hover:text-ocean">
                  About Barry McGovern on Hamptons Coastal
                  <span aria-hidden="true" className="text-ink-faint transition-transform duration-500 group-hover:translate-x-1.5">→</span>
                </a>
              </li>
              <li>
                <Link href="/contact" className="group flex items-baseline justify-between gap-6 py-4 font-serif text-[1.3rem] text-ink transition-colors duration-500 hover:text-ocean">
                  Confidential consultation
                  <span aria-hidden="true" className="text-ink-faint transition-transform duration-500 group-hover:translate-x-1.5">→</span>
                </Link>
              </li>
              {related.map((relatedPost) => (
                <li key={relatedPost.slug}>
                  <Link href={`/blog/${relatedPost.slug}`} className="group flex items-baseline justify-between gap-6 py-4 font-serif text-[1.3rem] text-ink transition-colors duration-500 hover:text-ocean">
                    {relatedPost.title}
                    <span aria-hidden="true" className="text-ink-faint transition-transform duration-500 group-hover:translate-x-1.5">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </article>

      {!post.hideCta && (
        <ClosingInvitation
          label="Private inquiries"
          title="Ready to discuss the market?"
          body="Confidential consultations and complimentary valuations."
          cta="Get in Touch"
        />
      )}
    </div>
  );
}
