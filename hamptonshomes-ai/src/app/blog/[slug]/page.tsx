import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blog";
import JsonLd from "@/components/JsonLd";
import { articleJsonLd } from "@/lib/schema";

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

function formatInline(text: string) {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-ink">$1</strong>');
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
    <div key={key} className="overflow-x-auto my-10 border border-line">
      <table className="w-full text-left">
        {header && (
          <thead>
            <tr className="border-b border-line bg-paper-soft">
              {header.map((cell, ci) => (
                <th
                  key={ci}
                  className="font-serif text-ink text-[12px] tracking-[0.12em] uppercase font-normal px-4 py-3 whitespace-nowrap"
                  dangerouslySetInnerHTML={{ __html: formatInline(cell) }}
                />
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {bodyRows.map((cells, ri) => (
            <tr key={ri} className="border-b border-line last:border-0">
              {cells.map((cell, ci) => (
                <td
                  key={ci}
                  className="text-ink-muted text-[14px] leading-[1.6] px-4 py-3 whitespace-nowrap"
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

  while (i < lines.length) {
    const line = lines[i].trimEnd();

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="font-serif text-2xl text-ink mt-16 mb-6">
          {line.replace("## ", "")}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="font-serif text-xl text-ocean/80 mt-10 mb-4">
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
    } else if (line.startsWith("- **")) {
      elements.push(
        <li key={i} className="text-ink-muted text-[15px] leading-[1.8] ml-4 mb-2" dangerouslySetInnerHTML={{
          __html: formatInline(line.replace("- ", ""))
        }} />
      );
    } else if (line.startsWith("1. ") || line.startsWith("2. ") || line.startsWith("3. ") || line.startsWith("4. ")) {
      elements.push(
        <li key={i} className="text-ink-muted text-[15px] leading-[1.8] ml-4 mb-2 list-decimal" dangerouslySetInnerHTML={{
          __html: formatInline(line.replace(/^\d+\.\s/, ""))
        }} />
      );
    } else if (line.startsWith("---")) {
      elements.push(<hr key={i} className="border-line my-12" />);
    } else if (line.startsWith("*") && line.endsWith("*") && !line.startsWith("**")) {
      elements.push(
        <p key={i} className="text-ink-faint text-[13px] leading-[1.8] italic mt-8">
          {line.replace(/^\*|\*$/g, "")}
        </p>
      );
    } else if (line.trim() === "") {
      // skip
    } else {
      elements.push(
        <p key={i} className="text-ink-muted text-[15px] leading-[1.9] mb-4" dangerouslySetInnerHTML={{
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

  return (
    <div className="bg-paper">
      <JsonLd data={articleJsonLd(post)} />
      <article className="pt-32 pb-32">
        <div className="max-w-3xl mx-auto px-8">
          <Link
            href="/blog"
            className="text-ink-faint text-[11px] tracking-[0.2em] uppercase hover:text-ocean transition-colors duration-500 mb-10 block"
          >
            ← All Insights
          </Link>

          <p className="text-ocean/60 text-[10px] tracking-[0.5em] uppercase mb-4">
            {post.category} · {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>

          <h1 className="font-serif text-3xl md:text-5xl text-ink leading-tight mb-4">
            {post.title}
          </h1>

          <p className="text-ink-faint text-[13px] mb-16">
            By {post.author} · Hedgerow Exclusive Properties
          </p>

          <div>{renderContent(post.content)}</div>

          {/* CTA */}
          <div className="border border-line bg-paper-soft p-10 mt-16 text-center">
            <p className="font-serif text-xl text-ink mb-3">Ready to discuss the market?</p>
            <p className="text-ink-faint text-[14px] mb-6">Confidential consultations and complimentary valuations.</p>
            <Link
              href="/contact"
              className="inline-block border border-ocean/40 text-ocean text-[11px] tracking-[0.3em] uppercase px-8 py-3 hover:bg-ocean/10 transition-all duration-500"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
