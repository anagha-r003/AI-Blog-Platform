import { useState } from "react";
import { Sparkles, PenLine, ArrowRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import BlogCard from "../../components/blog/BlogCard";
import { POSTS, CATEGORIES } from "../../data/posts";

// ─── Featured Card ───────────────────────────────────────────────────────────
function FeaturedCard({ post }) {
  return (
    <div className="relative flex flex-col sm:flex-row rounded-2xl overflow-hidden border border-[#1E262F] bg-[#0F1419] hover:border-[#6D5EF5]/40 transition-all duration-300 hover:shadow-2xl hover:shadow-[#6D5EF5]/15 group cursor-pointer">
      {/* Image — left half */}
      <div className="relative sm:w-1/2 h-56 sm:h-auto overflow-hidden shrink-0">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0F1419]/40 hidden sm:block" />
      </div>

      {/* Content — right half */}
      <div className="flex flex-col justify-center p-6 sm:p-8 gap-3">
        {/* Badges */}
        <div className="flex items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white"
            style={{
              background: "linear-gradient(135deg, #6D5EF5 0%, #9B8AFB 100%)",
            }}
          >
            <TrendingUp className="h-3 w-3" />
            Featured
          </span>
          <span className="rounded-full bg-[#1C232C] border border-[#2A323C] px-3 py-1 text-xs font-medium text-[#D7D1C4]">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h2
          className="text-xl sm:text-2xl font-bold text-[#8B7CFF] leading-snug group-hover:text-[#A79BFF] transition-colors"
          style={{ fontFamily: "'Fraunces', Georgia, serif" }}
        >
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-sm text-[#8A94A3] leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>

        {/* Read article */}
        <Link
          to={`/blog/${post.id}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#8B7CFF] hover:text-[#A79BFF] transition-colors mt-1"
        >
          Read article
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

// ─── Dashboard ───────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [activeCategory, setActiveCategory] = useState(null);

  const featuredPost = POSTS.find((p) => p.featured);
  const latestPosts = POSTS.filter((p) => !p.featured).slice(0, 4);

  const filteredLatest = activeCategory
    ? latestPosts.filter((p) => p.category === activeCategory)
    : latestPosts;

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#F1ECE2]">
      <Navbar />

      <main>
        {/* ── Hero Section ─────────────────────────────────────────────── */}
        <section className="relative flex flex-col items-center justify-center text-center px-4 py-20 sm:py-28 overflow-hidden">
          {/* Grid background */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(109,94,245,0.06) 1px, transparent 1px),
                linear-gradient(90deg, rgba(109,94,245,0.06) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
          {/* Purple top glow */}
          <div
            className="pointer-events-none absolute -top-32 left-1/2 h-96 w-2xl -translate-x-1/2 rounded-full opacity-25 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(109,94,245,0.5) 0%, rgba(109,94,245,0) 70%)",
            }}
          />

          <div className="relative z-10 max-w-3xl mx-auto">
            {/* AI badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#6D5EF5]/40 bg-[#6D5EF5]/10 px-4 py-1.5 mb-7">
              <Sparkles className="h-3.5 w-3.5 text-[#8B7CFF]" />
              <span className="text-xs font-medium text-[#8B7CFF]">
                Now with AI generation, rewrite &amp; SEO
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F1ECE2] leading-tight mb-5"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              Write smarter with your{" "}
              <span
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #6D5EF5 0%, #9B8AFB 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                AI co-author
              </span>
            </h1>

            {/* Sub-heading */}
            <p className="text-sm sm:text-base text-[#8A94A3] leading-relaxed max-w-xl mx-auto mb-9">
              Generate full drafts, rewrite paragraphs, summarize research, and
              optimize for search — all in one beautiful workspace.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#6D5EF5]/30 transition-all hover:-translate-y-0.5 hover:shadow-[#6D5EF5]/50 focus:outline-none focus:ring-2 focus:ring-[#6D5EF5]/60"
                style={{
                  background:
                    "linear-gradient(135deg, #6D5EF5 0%, #9B8AFB 100%)",
                }}
              >
                <Sparkles className="h-4 w-4" />
                Generate a post
              </button>
              <button className="flex items-center gap-2 rounded-xl border border-[#2A323C] bg-[#13181F] px-6 py-3 text-sm font-semibold text-[#F1ECE2] transition-all hover:bg-[#1C232C] hover:border-[#6D5EF5]/40 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#6D5EF5]/60">
                <PenLine className="h-4 w-4" />
                Start writing
              </button>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-16 space-y-12">
          {/* ── Category Pills ─────────────────────────────────────────── */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  setActiveCategory((prev) => (prev === cat ? null : cat))
                }
                className={`rounded-full px-4 py-2 text-sm font-medium border transition-all duration-200 ${
                  activeCategory === cat
                    ? "border-[#6D5EF5]/60 bg-[#6D5EF5]/15 text-[#8B7CFF]"
                    : "border-[#2A323C] bg-[#13181F] text-[#8A94A3] hover:text-[#F1ECE2] hover:border-[#6D5EF5]/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ── Featured Article ───────────────────────────────────────── */}
          {featuredPost && !activeCategory && (
            <FeaturedCard post={featuredPost} />
          )}

          {/* ── Latest Articles ────────────────────────────────────────── */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2
                className="text-xl font-bold text-[#F1ECE2]"
                style={{ fontFamily: "'Fraunces', Georgia, serif" }}
              >
                Latest articles
              </h2>
              <Link
                to="/explore"
                className="inline-flex items-center gap-1 text-sm font-medium text-[#8B7CFF] hover:text-[#A79BFF] transition-colors"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {filteredLatest.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredLatest.map((post) => (
                  <BlogCard
                    key={post.id}
                    post={post}
                    titleColor={post.isAI ? "purple" : "white"}
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#5C6573] py-10 text-center">
                No articles found for this category.
              </p>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
