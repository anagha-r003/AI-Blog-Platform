import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import BlogCard from "../../components/blog/BlogCard";
import { POSTS, CATEGORIES } from "../../data/posts";

const ALL_CATEGORIES = ["All", ...CATEGORIES];
const SORT_OPTIONS = ["Newest", "Most Liked", "Trending", "Oldest"];

// ─── SortDropdown ────────────────────────────────────────────────────────────
function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-xl border border-[#2A323C] bg-[#13181F] px-4 py-2 text-sm text-[#D7D1C4] hover:border-[#6D5EF5]/40 hover:bg-[#171D25] transition-colors"
      >
        {value}
        <ChevronDown
          className={`h-4 w-4 text-[#5C6573] transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 z-20 min-w-[140px] rounded-xl border border-[#2A323C] bg-[#13181F] shadow-2xl shadow-black/50 overflow-hidden">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-[#1C232C] ${
                opt === value
                  ? "text-[#8B7CFF] font-medium"
                  : "text-[#D7D1C4]"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Explore Page ─────────────────────────────────────────────────────────────
export default function Explore() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort] = useState("Newest");
  const [localSearch, setLocalSearch] = useState("");

  const filtered = POSTS.filter((p) => {
    const matchCat =
      activeCategory === "All" || p.category === activeCategory;
    const matchSearch =
      !localSearch ||
      p.title.toLowerCase().includes(localSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(localSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "Most Liked") return b.likes - a.likes;
    if (sort === "Oldest") return a.id - b.id;
    if (sort === "Trending") return b.likes * 0.7 - a.likes * 0.7;
    return b.id - a.id; // Newest
  });

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#F1ECE2]">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-8">
          <h1
            className="text-4xl font-bold text-[#F1ECE2] mb-2"
            style={{ fontFamily: "'Fraunces', Georgia, serif" }}
          >
            Explore
          </h1>
          <p className="text-[#8A94A3] text-sm">
            Discover fresh ideas from the community and your AI co-author.
          </p>
        </div>

        {/* Search + Sort row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-5">
          <div className="relative flex-1 w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5C6573]" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search articles or tags..."
              className="w-full rounded-xl border border-[#2A323C] bg-[#13181F] py-2.5 pl-10 pr-3 text-sm text-[#F1ECE2] placeholder:text-[#5C6573] focus:outline-none focus:ring-2 focus:ring-[#6D5EF5]/50 focus:border-[#6D5EF5]/50 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              className="flex items-center justify-center h-9 w-9 rounded-xl border border-[#2A323C] bg-[#13181F] text-[#8A94A3] hover:text-[#F1ECE2] hover:border-[#6D5EF5]/40 transition-colors"
              aria-label="Advanced filters"
            >
              <SlidersHorizontal className="h-4 w-4" />
            </button>
            <SortDropdown value={sort} onChange={setSort} />
          </div>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "text-white shadow-lg shadow-[#6D5EF5]/30"
                  : "border border-[#2A323C] bg-[#13181F] text-[#8A94A3] hover:text-[#F1ECE2] hover:border-[#6D5EF5]/40"
              }`}
              style={
                activeCategory === cat
                  ? {
                      background:
                        "linear-gradient(135deg, #6D5EF5 0%, #9B8AFB 100%)",
                    }
                  : {}
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-xs text-[#5C6573] mb-5">
          {sorted.length} article{sorted.length !== 1 ? "s" : ""} found
        </p>

        {/* Blog grid */}
        {sorted.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {sorted.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                titleColor={post.isAI ? "purple" : "white"}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl mb-4"
              style={{
                background:
                  "linear-gradient(135deg, #6D5EF5 0%, #9B8AFB 100%)",
              }}
            >
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <h3
              className="text-lg font-semibold text-[#F1ECE2] mb-1"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              No articles found
            </h3>
            <p className="text-sm text-[#8A94A3]">
              Try a different search term or category.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
