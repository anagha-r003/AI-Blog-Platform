import { useState } from "react";
import { Menu, Search, Bell, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar({ onMenuClick }) {
  const [query, setQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 flex items-center gap-3 px-4 py-3 bg-[#0B0F14]/95 backdrop-blur-md border-b border-[#1E262F]">
      {/* Hamburger */}
      <button
        onClick={onMenuClick}
        className="flex items-center justify-center h-9 w-9 rounded-lg text-[#8A94A3] hover:text-[#F1ECE2] hover:bg-[#1C232C] transition-colors"
        aria-label="Toggle menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Search bar */}
      <div className="flex-1 relative max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5C6573]" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles, tags, authors..."
          className="w-full rounded-full border border-[#2A323C] bg-[#13181F] py-2 pl-10 pr-4 text-sm text-[#F1ECE2] placeholder:text-[#5C6573] focus:outline-none focus:ring-2 focus:ring-[#6D5EF5]/50 focus:border-[#6D5EF5]/50 transition-all"
        />
      </div>

      {/* Right actions */}
      <div className="ml-auto flex items-center gap-2">
        {/* AI icon */}
        <button
          className="flex items-center justify-center h-9 w-9 rounded-lg text-[#8B7CFF] hover:bg-[#6D5EF5]/15 transition-colors"
          aria-label="AI assistant"
        >
          <Sparkles className="h-5 w-5" />
        </button>

        {/* Bell */}
        <button
          className="flex items-center justify-center h-9 w-9 rounded-lg text-[#8A94A3] hover:text-[#F1ECE2] hover:bg-[#1C232C] transition-colors relative"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#6D5EF5] ring-2 ring-[#0B0F14]" />
        </button>

        {/* Avatar */}
        <Link to="/profile">
          <img
            src="https://api.dicebear.com/9.x/avataaars/svg?seed=MindQuill&backgroundColor=6D5EF5"
            alt="Profile"
            className="h-9 w-9 rounded-full object-cover ring-2 ring-[#2A323C] hover:ring-[#6D5EF5]/60 transition-all"
          />
        </Link>
      </div>
    </header>
  );
}
