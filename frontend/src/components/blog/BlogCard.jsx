import { useState } from "react";
import { Clock, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Reusable blog card used on both Dashboard and Explore pages.
 *
 * Props:
 *  - post: { id, category, isAI, image, title, excerpt, author, readTime, likes }
 *  - titleColor: "white" | "purple" (default "white") — purple for AI posts on Dashboard
 */
export default function BlogCard({ post, titleColor = "white" }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const titleClass =
    titleColor === "purple"
      ? "text-[#8B7CFF] group-hover:text-[#A79BFF]"
      : "text-[#F1ECE2] group-hover:text-white";

  return (
    <Link
      to={`/blog/${post.id}`}
      className="group relative flex flex-col rounded-2xl overflow-hidden border border-[#1E262F] bg-[#0F1419] hover:border-[#6D5EF5]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#6D5EF5]/10 hover:-translate-y-1 cursor-pointer"
    >
      {/* Cover image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1419] via-[#0F1419]/10 to-transparent" />

        {/* Category badge — top left */}
        <span className="absolute top-3 left-3 rounded-full bg-[#0B0F14]/80 backdrop-blur-sm border border-[#2A323C]/60 px-3 py-1 text-xs font-medium text-[#D7D1C4]">
          {post.category}
        </span>

        {/* AI badge — top right */}
        {post.isAI && (
          <span
            className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white"
            style={{
              background: "linear-gradient(135deg, #6D5EF5 0%, #9B8AFB 100%)",
            }}
          >
            <Sparkles className="h-3 w-3" />
            AI
          </span>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5">
        <h2
          className={`text-base font-semibold leading-snug mb-2 transition-colors line-clamp-2 ${titleClass}`}
          style={{ fontFamily: "'Fraunces', Georgia, serif" }}
        >
          {post.title}
        </h2>
        <p className="text-sm text-[#8A94A3] leading-relaxed line-clamp-2 flex-1">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between">
          {/* Author */}
          <div className="flex items-center gap-2">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="h-7 w-7 rounded-full border border-[#2A323C]"
            />
            <span className="text-xs font-medium text-[#D7D1C4]">
              {post.author.name}
            </span>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-[#5C6573]">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 transition-colors ${
                liked ? "text-rose-400" : "hover:text-rose-400"
              }`}
              aria-label="Like post"
            >
              <Heart
                className={`h-3.5 w-3.5 transition-all ${
                  liked ? "fill-rose-400 text-rose-400 scale-110" : ""
                }`}
              />
              {likeCount}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
