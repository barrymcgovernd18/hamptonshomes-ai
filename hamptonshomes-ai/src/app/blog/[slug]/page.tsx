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
import BarChart from "@/components/BarChart";
import { OCEANFRONT_BY_VILLAGE, OCEANFRONT_BY_YEAR, formatMillions } from "@/lib/oceanfront";
import { OG_POSTS } from "@/lib/og-images";
import {
  BARRY_BLURB,
  COASTAL_ABOUT_URL,
  DEFAULT_OG_IMAGE,
  PLACE_SLUGS,
  absoluteUrl,
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
  const hasCard = OG_POSTS.includes(post.slug);
  const ogImage = hasCard ? absoluteUrl(`/og/blog/${post.slug}.jpg`) : postOgImageUrl(post.image);
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
        : [{ url: ogImage, alt: post.title, ...(hasCard ? { width: 1200, height: 630 } : {}) }],
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

function columnAlignments(row: string | undefined) {
  if (!row || !isSeparatorRow(row)) return [];
  return splitPipeRow(row).map((cell) => (/-:$/.test(cell.replace(/\s/g, "")) ? "right" : "left"));
}

function renderTable(rows: string[], key: number) {
  let header: string[] | null = null;
  let body = rows;
  const align = columnAlignments(rows[1]);
  if (rows.length >= 2 && isSeparatorRow(rows[1])) {
    header = splitPipeRow(rows[0]);
    body = rows.slice(2);
  }
  const bodyRows = body.filter((row) => !isSeparatorRow(row)).map(splitPipeRow);
  const columns = header?.length ?? bodyRows[0]?.length ?? 0;
  const cellAlign = (ci: number) => (align[ci] === "right" ? "text-right tabular-nums whitespace-nowrap" : "text-left");
  const headAlign = (ci: number) => (align[ci] === "right" ? "text-right" : "text-left");
  /** Short labels such as "Under $5M" or "Sep 30" stay on one line; longer text wraps. */
  const shortCell = (cell: string) => (cell.replace(/\*\*/g, "").length <= 22 ? "whitespace-nowrap" : "");

  return (
    <div key={key} className="article-table my-12 -mx-[var(--gutter)] overflow-x-auto px-[var(--gutter)] sm:mx-0 sm:px-0 lg:-mx-28">
      <table className={`w-full border-t border-ink/80 text-left ${columns >= 5 ? "min-w-[40rem]" : columns >= 4 ? "min-w-[32rem]" : ""}`}>
        {header && (
          <thead>
            <tr className="border-b border-line">
              {header.map((cell, ci) => (
                <th
                  key={ci}
                  scope="col"
                  className={`eyebrow px-3 py-4 align-bottom font-medium !leading-[1.5] text-ink first:pl-0 last:pr-0 ${headAlign(ci)}`}
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
                  className={`px-3 py-3.5 align-top text-[14px] leading-[1.55] text-ink-muted first:pl-0 first:text-ink last:pr-0 ${cellAlign(ci)} ${shortCell(cell)}`}
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

/** Charts that a post can place with a line such as {{chart:oceanfront-by-year}}. Data mirrors the post's own tables. */
function renderChart(name: string, key: number) {
  if (name === "oceanfront-by-year") {
    return (
      <BarChart
        key={key}
        className="my-14 lg:-mx-28"
        title="Median oceanfront sale price, by year"
        rows={OCEANFRONT_BY_YEAR.map((r) => ({ label: r.label, value: r.median, display: formatMillions(r.median), detail: `${r.sales} sales`, highlight: r.label.startsWith("2026") }))}
      />
    );
  }
  if (name === "oceanfront-by-village") {
    return (
      <BarChart
        key={key}
        className="my-14 lg:-mx-28"
        title="Median oceanfront sale price, by village, 2021 to 2026"
        rows={OCEANFRONT_BY_VILLAGE.map((r) => ({ label: r.label, value: r.median, display: formatMillions(r.median), detail: `${r.sales} sales`, href: `/${r.slug}` }))}
      />
    );
  }
  return null;
}

const SIGNOFF = /^Barry McGovern · Hedgerow Exclusive Properties ·/;

function longDate(date: string) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}

// Markdown-style renderer for article content
function renderContent(content: string, { dropCap: allowDropCap = true } = {}) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let dropCapUsed = !allowDropCap;

  while (i < lines.length) {
    const line = lines[i].trimEnd();

    if (/^## Key Takeaways\s*$/i.test(line)) {
      let j = i + 1;
      while (j < lines.length && !lines[j].startsWith("## ")) j++;
      elements.push(
        <aside key={i} aria-labelledby="key-takeaways" className="key-takeaways mb-4 border-y border-ink/80 bg-paper-soft px-6 py-9 sm:px-9 lg:-mx-12 lg:px-12">
          <h2 id="key-takeaways" className="eyebrow text-ocean">Key takeaways</h2>
          <div className="mt-6">{renderContent(lines.slice(i + 1, j).join("\n"), { dropCap: false })}</div>
        </aside>
      );
      i = j;
      continue;
    }

    const chart = /^\{\{chart:([a-z0-9-]+)\}\}$/.exec(line.trim());
    if (chart) {
      elements.push(renderChart(chart[1], i));
      i++;
      continue;
    }

    if (SIGNOFF.test(line)) {
      // The closing author card carries name, firm, and contact details.
      i++;
      continue;
    }

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
        <p key={i} className="my-8 font-serif text-[15px] italic leading-[1.7] text-ink-faint" dangerouslySetInnerHTML={{ __html: formatInline(line.replace(/^\*|\*$/g, "")) }} />
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
  const villages = post.about ?? [];

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
          <p className="eyebrow mt-12 text-ocean md:mt-16">
            {post.category} · <time dateTime={post.date}>{longDate(post.date)}</time>
            {post.dateModified && post.dateModified > post.date ? (
              <span className="text-ink-faint"> · Updated <time dateTime={post.dateModified}>{longDate(post.dateModified)}</time></span>
            ) : null}
          </p>
          <h1 className="display-2 mt-6 max-w-[17em] text-ink">
            {post.title}
          </h1>

          <div className="mt-10 border-t border-line pt-6 md:mt-14">
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
              <Image src={post.image} alt={post.title} fill priority fetchPriority="high" quality={80} sizes="(max-width: 1440px) 100vw, 1440px" className="photo-mono object-cover" />
            </div>
          </div>
        ) : null}

        <div className="frame">
          <div className="mx-auto mt-16 max-w-[42rem] md:mt-24 [&>h2:first-child]:mt-0 [&>h2:first-child]:border-t-0 [&>h2:first-child]:pt-0">{renderContent(post.content)}</div>

          <section aria-label="About the author" className="mx-auto mt-20 max-w-[42rem] border-t border-ink/80 pt-10">
            <div className="grid grid-cols-[72px_1fr] gap-6 sm:grid-cols-[96px_1fr] sm:gap-8">
              <Image
                src="/images/barry-mcgovern.jpg"
                alt="Barry McGovern"
                width={96}
                height={128}
                className="photo-mono h-[96px] w-[72px] object-cover sm:h-[128px] sm:w-[96px]"
              />
              <div>
                <p className="eyebrow text-ocean">About the author</p>
                <p className="mt-3 font-serif text-[1.6rem] font-light leading-tight text-ink">
                  <Link href="/about" className="transition-colors hover:text-ocean">{post.author}</Link>
                </p>
                <p className="mt-3 text-[14px] leading-[1.8] text-ink-muted">{BARRY_BLURB}</p>
                <p className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                  <a href="tel:+16463390154" className="link-line eyebrow text-ink">646.339.0154</a>
                  <a href="mailto:barry@hedgerowexclusive.com" className="link-line eyebrow text-ink">barry@hedgerowexclusive.com</a>
                </p>
              </div>
            </div>
          </section>

          <nav className="mx-auto mt-16 max-w-[42rem] border-t border-ink/80 pt-8" aria-label="Continue reading">
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
              {related.map((relatedPost) => (
                <li key={relatedPost.slug}>
                  <Link href={`/blog/${relatedPost.slug}`} className="group flex items-baseline justify-between gap-6 py-4 font-serif text-[1.3rem] text-ink transition-colors duration-500 hover:text-ocean">
                    {relatedPost.title}
                    <span aria-hidden="true" className="text-ink-faint transition-transform duration-500 group-hover:translate-x-1.5">→</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/sales" className="group flex items-baseline justify-between gap-6 py-4 font-serif text-[1.3rem] text-ink transition-colors duration-500 hover:text-ocean">
                  The Hedgerow portfolio: listings and sales
                  <span aria-hidden="true" className="text-ink-faint transition-transform duration-500 group-hover:translate-x-1.5">→</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="group flex items-baseline justify-between gap-6 py-4 font-serif text-[1.3rem] text-ink transition-colors duration-500 hover:text-ocean">
                  A confidential conversation
                  <span aria-hidden="true" className="text-ink-faint transition-transform duration-500 group-hover:translate-x-1.5">→</span>
                </Link>
              </li>
            </ul>
            {villages.length > 1 ? (
              <div className="mt-10">
                <p className="eyebrow text-ink-faint">Village reports</p>
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-serif text-[1.15rem] italic text-ink-muted">
                  {villages.map((name) => (
                    <li key={name}>
                      <Link href={`/${PLACE_SLUGS[name]}`} className="transition-colors hover:text-ocean">{name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <p className="mt-10 text-[13px] text-ink-faint">
              Also on{" "}
              <a href={COASTAL_ABOUT_URL} className="link-line text-ink-muted">Hamptons Coastal</a>
            </p>
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
