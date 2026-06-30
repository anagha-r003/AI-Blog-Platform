import { useState } from "react";
import { Sparkles, Menu, Search, Bell, ChevronDown } from "lucide-react";

export default function AIGeneration() {
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("Professional");
  const [length, setLength] = useState("Medium");
  const [category, setCategory] = useState("AI & ML");

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#F1ECE2] font-sans flex flex-col">
      {/* Navbar */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[#232B33] bg-[#0B0F14] sticky top-0 z-10">
        <div className="flex items-center gap-4 flex-1">
          <button className="text-[#8A94A3] hover:text-[#F1ECE2] transition-colors">
            <Menu className="h-5 w-5" />
          </button>
          <div className="relative w-full max-w-md hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5C6573]" />
            <input
              type="text"
              placeholder="Search articles, tags, authors..."
              className="w-full bg-[#13181F] border border-[#232B33] rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:border-[#6D5EF5]/50 focus:ring-1 focus:ring-[#6D5EF5]/50 placeholder:text-[#5C6573] transition-all"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-[#8B7CFF] hover:text-[#A79BFF] transition-colors">
            <Sparkles className="h-5 w-5" />
          </button>
          <button className="text-[#8A94A3] hover:text-[#F1ECE2] transition-colors">
            <Bell className="h-5 w-5" />
          </button>
          <div className="h-8 w-8 rounded-full overflow-hidden bg-[#232B33] border border-[#2A323C] cursor-pointer">
            <img src="https://i.pravatar.cc/150?img=33" alt="Avatar" className="h-full w-full object-cover" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#6D5EF5]/35 bg-[#6D5EF5]/10 px-3 py-1 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-[#8B7CFF]" />
            <span className="text-xs font-medium text-[#8B7CFF]">AI Studio</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Generate a blog post</h1>
          <p className="text-[#8A94A3]">Describe your idea and let AI draft a complete, structured article.</p>
        </div>

        {/* Input Card */}
        <div className="bg-[#13181F] border border-[#232B33] rounded-2xl p-6 sm:p-8 mb-6 shadow-xl shadow-black/20">
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#D7D1C4] mb-2">Topic / prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. How AI is transforming healthcare diagnostics"
              className="w-full bg-[#0B0F14] border border-[#2A323C] rounded-xl p-4 text-sm min-h-[120px] resize-y focus:outline-none focus:border-[#6D5EF5]/50 focus:ring-1 focus:ring-[#6D5EF5]/50 placeholder:text-[#5C6573] transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-[#D7D1C4] mb-2">Tone</label>
              <div className="relative">
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full appearance-none bg-[#0B0F14] border border-[#2A323C] rounded-xl py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:border-[#6D5EF5]/50 focus:ring-1 focus:ring-[#6D5EF5]/50 transition-all cursor-pointer"
                >
                  <option>Professional</option>
                  <option>Conversational</option>
                  <option>Enthusiastic</option>
                  <option>Informative</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5C6573] pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#D7D1C4] mb-2">Length</label>
              <div className="relative">
                <select
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full appearance-none bg-[#0B0F14] border border-[#2A323C] rounded-xl py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:border-[#6D5EF5]/50 focus:ring-1 focus:ring-[#6D5EF5]/50 transition-all cursor-pointer"
                >
                  <option>Short (~500 words)</option>
                  <option>Medium (~1000 words)</option>
                  <option>Long (~1500 words)</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5C6573] pointer-events-none" />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-[#D7D1C4] mb-2">Category</label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full appearance-none bg-[#0B0F14] border border-[#2A323C] rounded-xl py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:border-[#6D5EF5]/50 focus:ring-1 focus:ring-[#6D5EF5]/50 transition-all cursor-pointer"
                >
                  <option>AI & ML</option>
                  <option>Technology</option>
                  <option>Design</option>
                  <option>Development</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5C6573] pointer-events-none" />
              </div>
            </div>
          </div>

          <button
            className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#6D5EF5]/20 transition-all hover:opacity-95 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C6CFF]/60"
            style={{
              background: "linear-gradient(135deg, #6D5EF5 0%, #9B8AFB 100%)",
            }}
          >
            <Sparkles className="h-4 w-4" />
            Generate draft
          </button>
          
          <p className="text-center text-xs text-[#5C6573] mt-4">
            Demo output. Connect AI for live generation.
          </p>
        </div>

        {/* Empty State / Output Area */}
        <div className="bg-[#13181F] border border-[#232B33] rounded-2xl p-12 flex flex-col items-center justify-center text-center shadow-xl shadow-black/20 min-h-[300px]">
          <div className="h-12 w-12 rounded-2xl bg-[#0B0F14] border border-[#2A323C] flex items-center justify-center mb-4">
            <Sparkles className="h-6 w-6 text-[#4F5B6D]" />
          </div>
          <p className="text-[#8A94A3] text-sm">Your AI-generated draft will appear here.</p>
        </div>

      </main>
    </div>
  );
}
