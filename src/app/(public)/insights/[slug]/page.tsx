import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, ArrowUpRight, User } from "lucide-react";
import { getPosts, getPostBySlug } from "@/services/blogService";
import { Button } from "@/components/ui/Button";
import { ShareButton } from "@/components/ui/ShareButton";
import { NewsletterSignup } from "@/components/sections/NewsletterSignup";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateStaticParams() {
  const articles = await getPosts();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const article = await getPostBySlug(resolvedParams.slug);
  if (!article) return {};

  return {
    title: `${article.title} | LEE Investment Handlers`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: new Date(article.date).toISOString(),
      images: [
        {
          url: article.image,
          alt: article.title,
        },
      ],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const resolvedParams = await params;
  const article = await getPostBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  // Fetch all articles to compute recommended reads (fallback logic preserved)
  const allArticles = await getPosts();
  const recommendedArticles = allArticles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 2);

  return (
    <main className="min-h-screen bg-brand-bg-primary text-brand-primary">
      {/* Article Content Section */}
      <article className="pt-28 md:pt-36 pb-20 md:pb-24">
        <div className="max-w-[1200px] mx-auto px-5 md:px-7">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 mb-8 text-xs font-body font-medium tracking-wider uppercase text-brand-secondary/70">
            <Link href="/" className="hover:text-brand-alternate transition-colors duration-200">
              Home
            </Link>
            <span className="text-brand-border">/</span>
            <Link href="/insights" className="hover:text-brand-alternate transition-colors duration-200">
              Insights
            </Link>
            <span className="text-brand-border">/</span>
            <span className="text-brand-primary truncate max-w-[200px] sm:max-w-none">
              {article.title}
            </span>
          </nav>

          {/* Eyebrow / Metas */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-brand-alternate/10 text-brand-primary text-xs font-semibold tracking-wider uppercase font-body rounded-[2px]">
              {article.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs font-body text-brand-secondary">
              <Clock size={13} className="text-brand-alternate" />
              <span>{article.readTime || "5 min read"}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-body text-brand-secondary">
              <Calendar size={13} className="text-brand-alternate" />
              <span>{article.date}</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="font-heading text-3xl md:text-[50px] font-normal leading-[1.15] tracking-tight text-brand-primary mb-8 max-w-[900px]">
            {article.title}
          </h1>

          {/* Author info & Share button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-6 border-y border-brand-border/60 mb-12 select-none">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-brand-bg-secondary rounded-full flex items-center justify-center text-brand-secondary border border-brand-border/60">
                <User size={18} />
              </div>
              <div>
                <span className="block text-xs font-body text-brand-secondary uppercase tracking-wider font-semibold">
                  Written By
                </span>
                <span className="text-sm font-body text-brand-primary font-medium">
                  {article.author}
                </span>
              </div>
            </div>
            
            <div>
              <ShareButton />
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] mb-12 rounded-[6px] overflow-hidden bg-brand-bg-secondary shadow-[0px_4px_20px_rgba(0,0,0,0.02)] border border-brand-border/50 select-none">
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />
          </div>

          {/* Article Text Content Body (strict design instructions: no animations on body text) */}
          <div className="font-body text-brand-secondary text-base md:text-lg leading-[1.65] max-w-[720px] mx-auto select-text">
            {article.content && (
              typeof article.content === "string" ? (
                <div 
                  className="prose prose-brand max-w-none select-text text-brand-secondary font-body prose-headings:font-heading prose-headings:font-normal prose-headings:text-brand-primary prose-a:text-brand-alternate hover:prose-a:underline"
                  dangerouslySetInnerHTML={{ __html: article.content }} 
                />
              ) : (
                <>
                  {/* Introductory Bold Lead Paragraph */}
                  {article.content.length > 0 && (
                    <p className="font-medium text-brand-primary text-lg md:text-xl leading-relaxed mb-8">
                      {article.content[0]}
                    </p>
                  )}

                  {/* Remaining Paragraphs */}
                  {article.content.slice(1).map((paragraph, index) => (
                    <p key={index} className="mb-6">
                      {paragraph}
                    </p>
                  ))}
                </>
              )
            )}
          </div>

          {/* Action Row */}
          <div className="mt-16 pt-8 border-t border-brand-border/60 flex items-center justify-between">
            <Button
              variant="secondary"
              href="/insights"
              className="group rounded-[4px] px-6 h-[44px] text-xs font-semibold uppercase tracking-wider gap-2"
            >
              <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
              <span>Back to Insights</span>
            </Button>
          </div>
        </div>
      </article>

      {/* Recommended Reading Section */}
      {recommendedArticles.length > 0 && (
        <section className="bg-brand-bg-secondary py-16 md:py-20 border-t border-brand-border/60">
          <div className="max-w-[1200px] mx-auto px-5 md:px-7">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <span className="text-xs font-body font-medium tracking-[0.2em] uppercase text-brand-alternate mb-2 block">
                  More Analysis
                </span>
                <h2 className="font-heading text-2xl md:text-3xl font-normal tracking-tight text-brand-primary">
                  Recommended Reading
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {recommendedArticles.map((item) => (
                <Link
                  href={`/insights/${item.slug}`}
                  key={item.id}
                  className="group flex flex-col bg-brand-bg-primary border border-brand-border/50 hover:border-brand-primary/20 rounded-[6px] overflow-hidden hover:shadow-[0px_8px_24px_rgba(0,0,0,0.03)] hover:-translate-y-0.5 transition-all duration-300 min-h-[360px]"
                >
                  {/* Cover Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-bg-secondary">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 500px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>

                  {/* Body Content */}
                  <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                    <h3 className="font-heading text-lg font-normal text-brand-primary leading-snug group-hover:text-brand-alternate transition-colors duration-200">
                      {item.title}
                    </h3>
                    
                    <div className="mt-6 pt-4 border-t border-brand-border/40 flex items-center justify-between text-xs font-body text-brand-secondary">
                      <span>{item.date}</span>
                      <div className="h-7 w-7 inline-flex items-center justify-center bg-brand-bg-secondary border border-brand-border/60 rounded-[2px] text-brand-secondary group-hover:bg-brand-alternate group-hover:text-brand-primary group-hover:border-transparent transition-all duration-300">
                        <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Signup Banner */}
      <NewsletterSignup />
    </main>
  );
}
