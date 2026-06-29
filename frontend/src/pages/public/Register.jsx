import { useState } from "react";
import { Feather, Mail, Lock, User, Eye, EyeOff, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
// MindQuill — Create account
// Theme: "Ink & Nib" — near-black ink surface, parchment text, a single
// warm gold-leaf gradient reserved for the brand mark and the primary action.
// Mirrors Login.jsx structurally; adds Name + Confirm password.

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordsMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0B0F14] px-4 py-10 sm:px-6 relative overflow-hidden">
      {/* Ambient ink glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-xl -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(109,94,245,0.35) 0%, rgba(109,94,245,0) 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-24 h-80 w-80 rounded-full opacity-[0.12] blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(47,111,98,0.6) 0%, rgba(47,111,98,0) 70%)",
        }}
      />

      <div className="relative w-full max-w-md">
        <div className="rounded-2xl border border-[#232B33] bg-[#13181F] shadow-2xl shadow-black/40 px-6 py-8 sm:px-9 sm:py-10">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-md"
              style={{
                background: "linear-gradient(135deg, #6D5EF5 0%, #9B8AFB 100%)",
              }}
            >
              <Feather className="h-5 w-5 text-[#0B0F14]" strokeWidth={2.25} />
            </div>
            <h1
              className="text-xl sm:text-[1.35rem] tracking-tight"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              <span className="text-[#F1ECE2] font-semibold">Mind</span>
              <span
                className="font-semibold"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #6D5EF5 0%, #9B8AFB 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Quill
              </span>
            </h1>
          </div>

          {/* Badge */}
          <div className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-[#6D5EF5]/35 bg-[#6D5EF5]/10 px-3 py-1">
            <Sparkles className="h-3.5 w-3.5 text-[#8B7CFF]" />
            <span className="text-xs font-medium text-[#8B7CFF]">
              AI-powered blogging
            </span>
          </div>

          {/* Heading */}
          <div className="mt-5">
            <h2
              className="text-2xl sm:text-[1.75rem] text-[#F1ECE2] leading-snug"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              Create your account
            </h2>
            <p className="mt-1.5 text-sm text-[#8A94A3]">
              Start generating in minutes.
            </p>
          </div>

          {/* Google */}
          <button
            type="button"
            className="mt-7 flex w-full items-center justify-center gap-3 rounded-xl border border-[#2A323C] bg-[#171D25] py-2.5 text-sm font-medium text-[#F1ECE2] transition-colors hover:bg-[#1C232C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C6CFF]/60"
          >
            <GoogleMark />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-[#232B33]" />
            <span className="text-xs text-[#5C6573]">
              or sign up with email
            </span>
            <span className="h-px flex-1 bg-[#232B33]" />
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-[#D7D1C4]"
              >
                Name
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5C6573]" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-[#2A323C] bg-[#0F1419] py-2.5 pl-10 pr-3 text-sm text-[#F1ECE2] placeholder:text-[#5C6573] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C6CFF]/60
focus-visible:border-[#7C6CFF]/60"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-[#D7D1C4]"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5C6573]" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-[#2A323C] bg-[#0F1419] py-2.5 pl-10 pr-3 text-sm text-[#F1ECE2] placeholder:text-[#5C6573] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C6CFF]/60
focus-visible:border-[#7C6CFF]/60"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-[#D7D1C4]"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5C6573]" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-[#2A323C] bg-[#0F1419] py-2.5 pl-10 pr-10 text-sm text-[#F1ECE2] placeholder:text-[#5C6573] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C6CFF]/60
focus-visible:border-[#7C6CFF]/60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5C6573] hover:text-[#8A94A3] focus-visible:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="mb-1.5 block text-sm font-medium text-[#D7D1C4]"
              >
                Confirm password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5C6573]" />
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  aria-invalid={passwordsMismatch}
                  className={`w-full rounded-xl border bg-[#0F1419] py-2.5 pl-10 pr-10 text-sm text-[#F1ECE2] placeholder:text-[#5C6573] focus-visible:outline-none focus-visible:ring-2 ${
                    passwordsMismatch
                      ? "border-[#E2574C]/60 focus-visible:ring-[#E2574C]/50 focus-visible:border-[#E2574C]/60"
                      : "border-[#2A323C] focus-visible:ring-[#7C6CFF]/60 focus-visible:border-[#7C6CFF]/60"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5C6573] hover:text-[#8A94A3] focus-visible:outline-none"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {passwordsMismatch && (
                <p className="mt-1.5 text-xs text-[#E2574C]">
                  Passwords don't match.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/30 transition-transform hover:-translate-y-0.5 hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C6CFF]/60"
              style={{
                background: "linear-gradient(135deg, #6D5EF5 0%, #9B8AFB 100%)",
              }}
            >
              <Feather className="h-4 w-4" />
              Create account
            </button>
          </form>

          {/* Footer */}
          <p className="mt-7 text-center text-sm text-[#8A94A3]">
            Already have an account?{" "}
            <Link
              to="/login"
             className="font-medium text-[#8B7CFF] hover:text-[#A79BFF]"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function GoogleMark() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.3 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 16 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 7.3 29.6 5 24 5c-7.6 0-14.2 4.3-17.7 10.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.5 0 10.4-2.1 14.1-5.6l-6.5-5.4C29.4 34.9 26.8 36 24 36c-5.3 0-9.7-3.1-11.3-7.6l-6.6 5.1C9.7 39.7 16.3 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.7l6.5 5.4C41.5 36 44 30.5 44 24c0-1.3-.1-2.7-.4-3.5z"
      />
    </svg>
  );
}
