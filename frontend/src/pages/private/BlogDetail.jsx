import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Clock,
  Eye,
  Heart,
  Bookmark,
  Share2,
  Sparkles,
  FileText,
  RefreshCw,
  Send,
} from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import { POSTS } from "../../data/posts";

// ─── Mock full article content keyed by post id ──────────────────────────────
const ARTICLE_BODY = {
  1: [
    {
      type: "heading",
      text: "The shift is already here",
    },
    {
      type: "paragraph",
      text: "Artificial intelligence has quietly moved from research labs into the tools we use every day. What used to take a team of specialists now happens in a single prompt.",
    },
    {
      type: "quote",
      text: '"The best way to predict the future is to build it." — and increasingly, to *generate* it.',
    },
    {
      type: "heading",
      text: "Why it matters for writers",
    },
    {
      type: "list",
      items: [
        "**Speed** — draft in minutes, not hours.",
        "**Range** — explore tones and angles instantly.",
        "**Polish** — let AI handle grammar and SEO while you focus on ideas.",
      ],
    },
    {
      type: "paragraph",
      text: "The goal isn't to replace human creativity, but to amplify it. Pair your voice with the machine's tireless throughput and you get the best of both worlds.",
    },
    {
      type: "heading",
      text: "Getting started",
    },
    {
      type: "paragraph",
      text: "Begin small. Use AI to outline, then write the parts that need your unique perspective. Over time you'll develop a rhythm that feels less like delegation and more like collaboration.",
    },
  ],
};

const FALLBACK_BODY = [
  {
    type: "heading",
    text: "Introduction",
  },
  {
    type: "paragraph",
    text: "This article explores one of the most compelling ideas in the field today — a concept that has been quietly reshaping how professionals think, work, and create.",
  },
  {
    type: "quote",
    text: '"Ideas are the currency of the future. The faster you can generate, refine, and ship them, the further ahead you get."',
  },
  {
    type: "heading",
    text: "Why this matters",
  },
  {
    type: "list",
    items: [
      "**Clarity** — understand the core concepts quickly.",
      "**Speed** — apply what you learn in days, not months.",
      "**Impact** — create work that resonates with your audience.",
    ],
  },
  {
    type: "paragraph",
    text: "The principles outlined here are not theoretical. They are drawn from real-world examples and practical experiments carried out by practitioners across the industry.",
  },
  {
    type: "heading",
    text: "Where to go from here",
  },
  {
    type: "paragraph",
    text: "Start with the fundamentals, then layer in complexity as you grow comfortable. Every expert was once a beginner who simply kept going.",
  },
];

const INITIAL_COMMENTS = [
  {
    id: 1,
    author: "Sam",
    avatar:
      "https://api.dicebear.com/9.x/avataaars/svg?seed=Sam&backgroundColor=9B3E8A",
    date: "2025-06-19",
    text: "This perfectly captures my workflow!",
  },
  {
    id: 2,
    author: "Lena",
    avatar:
      "https://api.dicebear.com/9.x/avataaars/svg?seed=Lena&backgroundColor=1D4ED8",
    date: "2025-06-20",
    text: "Great read, sharing with my team.",
  },
];

const TAGS = ["#AI", "#Writing", "#Productivity", "#GPT"];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function renderInline(text) {
  // Bold **text**
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-[#F1ECE2]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    // Italic *text*
    return part.split(/(\*[^*]+\*)/g).map((p, j) => {
      if (p.startsWith("*") && p.endsWith("*")) {
        return (
          <em key={j} className="italic">
            {p.slice(1, -1)}
          </em>
        );
      }
      return p;
    });
  });
}

// ─── Article renderer ─────────────────────────────────────────────────────────
function ArticleBody({ blocks }) {
  return (
    <div className="space-y-5 text-[#C8C2B8] text-[15px] leading-8">
      {blocks.map((block, i) => {
        if (block.type === "heading") {
          return (
            <h2
              key={i}
              className="text-xl font-bold text-[#F1ECE2] mt-8 mb-1"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "paragraph") {
          return (
            <p key={i}>{renderInline(block.text)}</p>
          );
        }
        if (block.type === "quote") {
          return (
            <blockquote
              key={i}
              className="border-l-4 border-[#6D5EF5] pl-4 italic text-[#9A93AB]"
            >
              {renderInline(block.text)}
            </blockquote>
          );
        }
        if (block.type === "list") {
          return (
            <ol key={i} className="list-decimal list-inside space-y-1.5 pl-1">
              {block.items.map((item, j) => (
                <li key={j}>{renderInline(item)}</li>
              ))}
            </ol>
          );
        }
        return null;
      })}
    </div>
  );
}

// ─── BlogDetail ───────────────────────────────────────────────────────────────
export default function BlogDetail() {
  const { id } = useParams();
  const post = POSTS.find((p) => String(p.id) === String(id)) ?? POSTS[0];

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [saved, setSaved] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const [aiToolsOpen, setAiToolsOpen] = useState(false);

  const body = ARTICLE_BODY[post.id] ?? FALLBACK_BODY;
  const relatedPosts = POSTS.filter(
    (p) => p.id !== post.id && p.category === post.category
  ).slice(0, 2);

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handlePost = () => {
    const trimmed = commentText.trim();
    if (!trimmed) return;
    setComments((prev) => [
      ...prev,
      {
        id: Date.now(),
        author: "You",
        avatar:
          "https://api.dicebear.com/9.x/avataaars/svg?seed=MindQuill&backgroundColor=6D5EF5",
        date: new Date().toISOString().slice(0, 10),
        text: trimmed,
      },
    ]);
    setCommentText("");
  };

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#F1ECE2]">
      <Navbar />

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        {/* ── Badges ───────────────────────────────────────────────────── */}
        <div className="flex items-center gap-2 mb-4">
          <span className="rounded-full border border-[#2A323C] bg-[#13181F] px-3 py-1 text-xs font-medium text-[#D7D1C4]">
            {post.category}
          </span>
          {post.isAI && (
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white"
              style={{
                background:
                  "linear-gradient(135deg, #6D5EF5 0%, #9B8AFB 100%)",
              }}
            >
              <Sparkles className="h-3 w-3" />
              AI assisted
            </span>
          )}
        </div>

        {/* ── Title ────────────────────────────────────────────────────── */}
        <h1
          className="text-3xl sm:text-4xl font-bold text-[#F1ECE2] leading-tight mb-5"
          style={{ fontFamily: "'Fraunces', Georgia, serif" }}
        >
          {post.title}
        </h1>

        {/* ── Author + meta ─────────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-7">
          <div className="flex items-center gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="h-10 w-10 rounded-full border border-[#2A323C]"
            />
            <div>
              <p className="text-sm font-semibold text-[#F1ECE2]">
                {post.author.name}
              </p>
              <p className="text-xs text-[#5C6573]">June 18, 2025</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-[#5C6573]">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime} min
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="h-3.5 w-3.5" />
              12,480
            </span>
          </div>
        </div>

        {/* ── Cover image ───────────────────────────────────────────────── */}
        <div className="rounded-2xl overflow-hidden mb-7">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-72 sm:h-80 object-cover"
          />
        </div>

        {/* ── AI Tools bar ──────────────────────────────────────────────── */}
        <div className="flex items-center gap-2 rounded-2xl border border-[#1E262F] bg-[#0F1419] px-5 py-3 mb-8">
          <button
            onClick={() => setAiToolsOpen((v) => !v)}
            className="flex items-center gap-2 text-sm font-medium text-[#8B7CFF] hover:text-[#A79BFF] transition-colors mr-3"
          >
            <Sparkles className="h-4 w-4" />
            AI tools
          </button>

          <div className="h-4 w-px bg-[#2A323C]" />

          <button className="flex items-center gap-2 rounded-xl border border-[#2A323C] bg-[#13181F] px-4 py-1.5 text-sm font-medium text-[#D7D1C4] hover:border-[#6D5EF5]/40 hover:text-[#F1ECE2] transition-colors">
            <FileText className="h-3.5 w-3.5" />
            Summarize
          </button>
          <button className="flex items-center gap-2 rounded-xl border border-[#2A323C] bg-[#13181F] px-4 py-1.5 text-sm font-medium text-[#D7D1C4] hover:border-[#6D5EF5]/40 hover:text-[#F1ECE2] transition-colors">
            <RefreshCw className="h-3.5 w-3.5" />
            Rewrite
          </button>
        </div>

        {/* ── Article body ──────────────────────────────────────────────── */}
        <ArticleBody blocks={body} />

        {/* ── Tags ──────────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 mt-10">
          {TAGS.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#2A323C] bg-[#13181F] px-3 py-1 text-xs font-medium text-[#8A94A3] cursor-pointer hover:border-[#6D5EF5]/40 hover:text-[#8B7CFF] transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* ── Action row ────────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 mt-6 mb-10">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-all ${
              liked
                ? "border-rose-500/40 bg-rose-500/10 text-rose-400"
                : "border-[#2A323C] bg-[#13181F] text-[#D7D1C4] hover:border-rose-500/40 hover:text-rose-400"
            }`}
          >
            <Heart
              className={`h-4 w-4 transition-all ${liked ? "fill-rose-400" : ""}`}
            />
            {likeCount}
          </button>

          <button
            onClick={() => setSaved((v) => !v)}
            className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-all ${
              saved
                ? "border-[#6D5EF5]/50 bg-[#6D5EF5]/10 text-[#8B7CFF]"
                : "border-[#2A323C] bg-[#13181F] text-[#D7D1C4] hover:border-[#6D5EF5]/40 hover:text-[#8B7CFF]"
            }`}
          >
            <Bookmark
              className={`h-4 w-4 ${saved ? "fill-[#8B7CFF]" : ""}`}
            />
            Save
          </button>

          <button className="flex items-center justify-center h-9 w-9 rounded-xl border border-[#2A323C] bg-[#13181F] text-[#8A94A3] hover:text-[#F1ECE2] hover:border-[#6D5EF5]/40 transition-colors">
            <Share2 className="h-4 w-4" />
          </button>
        </div>

        {/* ── Divider ───────────────────────────────────────────────────── */}
        <div className="h-px bg-[#1E262F] mb-8" />

        {/* ── Comments ──────────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2
            className="text-lg font-bold text-[#F1ECE2] mb-5"
            style={{ fontFamily: "'Fraunces', Georgia, serif" }}
          >
            Comments ({comments.length})
          </h2>

          {/* Comment input */}
          <div className="flex gap-3 mb-7">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handlePost();
              }}
              placeholder="Share your thoughts..."
              rows={3}
              className="flex-1 resize-none rounded-2xl border border-[#2A323C] bg-[#0F1419] px-4 py-3 text-sm text-[#F1ECE2] placeholder:text-[#5C6573] focus:outline-none focus:ring-2 focus:ring-[#6D5EF5]/50 focus:border-[#6D5EF5]/50 transition-all"
            />
            <button
              onClick={handlePost}
              disabled={!commentText.trim()}
              className="self-end flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#6D5EF5]/20 transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#6D5EF5]/60"
              style={{
                background:
                  "linear-gradient(135deg, #6D5EF5 0%, #9B8AFB 100%)",
              }}
            >
              <Send className="h-4 w-4" />
              Post
            </button>
          </div>

          {/* Comment list */}
          <div className="space-y-5">
            {comments.map((c) => (
              <div key={c.id} className="flex gap-3">
                <img
                  src={c.avatar}
                  alt={c.author}
                  className="h-8 w-8 rounded-full border border-[#2A323C] shrink-0 mt-0.5"
                />
                <div>
                  <p className="text-sm">
                    <span className="font-semibold text-[#D7D1C4]">
                      {c.author}
                    </span>
                    <span className="ml-2 text-xs text-[#5C6573]">
                      · {c.date}
                    </span>
                  </p>
                  <p className="text-sm text-[#8A94A3] mt-0.5">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Related reads ─────────────────────────────────────────────── */}
        {relatedPosts.length > 0 && (
          <section>
            <h2
              className="text-lg font-bold text-[#F1ECE2] mb-4"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              Related reads
            </h2>
            <div className="space-y-3">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.id}
                  to={`/blog/${rp.id}`}
                  className="flex items-center gap-4 rounded-2xl border border-[#1E262F] bg-[#0F1419] p-3 hover:border-[#6D5EF5]/40 transition-all group"
                >
                  <img
                    src={rp.image}
                    alt={rp.title}
                    className="h-16 w-24 rounded-xl object-cover shrink-0"
                  />
                  <p className="text-sm font-medium text-[#D7D1C4] group-hover:text-[#F1ECE2] transition-colors line-clamp-2">
                    {rp.title}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
