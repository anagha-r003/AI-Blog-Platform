import { useState } from "react";
import { Feather, Mail, Lock, User, Eye, EyeOff, Sparkles, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/authApi";

// MindQuill — Create account
// Theme: "Ink & Nib" — near-black ink surface, parchment text, a single
// warm gold-leaf gradient reserved for the brand mark and the primary action.

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});   // server field-level errors
  const [generalError, setGeneralError] = useState(""); // non-field errors
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear that field's error as the user starts typing
    if (fieldErrors[e.target.name]) {
      setFieldErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  const passwordsMismatch =
    form.confirm_password.length > 0 && form.password !== form.confirm_password;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});
    setGeneralError("");

    if (passwordsMismatch) return; // client-side guard

    setLoading(true);
    try {
      await registerUser(form);
      setSuccess(true);
      // Redirect to login after a short moment so the user sees the success message
      setTimeout(() => navigate("/login"), 1800);
    } catch (err) {
      const data = err.response?.data;
      if (data && typeof data === "object") {
        // Separate field-level errors from non-field errors
        const { non_field_errors, ...fields } = data;
        setFieldErrors(fields);
        if (non_field_errors) {
          setGeneralError(non_field_errors.join(" "));
        }
      } else {
        setGeneralError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Helper: render first error for a field (server errors are arrays)
  const fieldError = (key) => {
    const err = fieldErrors[key];
    return err ? (Array.isArray(err) ? err[0] : err) : null;
  };

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

          {/* ── Success banner ── */}
          {success && (
            <div className="mt-6 flex items-center gap-2.5 rounded-xl border border-[#2F6F62]/50 bg-[#2F6F62]/15 px-4 py-3">
              <CheckCircle className="h-4 w-4 shrink-0 text-[#4CAF8E]" />
              <p className="text-sm text-[#4CAF8E]">
                Account created! Redirecting to sign-in…
              </p>
            </div>
          )}

          {/* ── General error banner ── */}
          {generalError && !success && (
            <div className="mt-6 rounded-xl border border-[#E2574C]/40 bg-[#E2574C]/10 px-4 py-3">
              <p className="text-sm text-[#E2574C]">{generalError}</p>
            </div>
          )}

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-[#232B33]" />
            <span className="text-xs text-[#5C6573]">sign up with email</span>
            <span className="h-px flex-1 bg-[#232B33]" />
          </div>

          {/* ── Form ── */}
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>

            {/* Username */}
            <Field
              id="username"
              label="Username"
              icon={<User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5C6573]" />}
              error={fieldError("username")}
            >
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                value={form.username}
                onChange={handleChange}
                placeholder="e.g. johndoe"
                required
                className={inputCls(fieldError("username"))}
              />
            </Field>

            {/* First name + Last name side by side */}
            <div className="grid grid-cols-2 gap-3">
              <Field
                id="first_name"
                label="First name"
                icon={<User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5C6573]" />}
                error={fieldError("first_name")}
              >
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  autoComplete="given-name"
                  value={form.first_name}
                  onChange={handleChange}
                  placeholder="John"
                  required
                  className={inputCls(fieldError("first_name"))}
                />
              </Field>

              <Field
                id="last_name"
                label="Last name"
                icon={<User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5C6573]" />}
                error={fieldError("last_name")}
              >
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  autoComplete="family-name"
                  value={form.last_name}
                  onChange={handleChange}
                  placeholder="Doe"
                  required
                  className={inputCls(fieldError("last_name"))}
                />
              </Field>
            </div>

            {/* Email */}
            <Field
              id="email"
              label="Email"
              icon={<Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5C6573]" />}
              error={fieldError("email")}
            >
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className={inputCls(fieldError("email"))}
              />
            </Field>

            {/* Password */}
            <Field
              id="password"
              label="Password"
              icon={<Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5C6573]" />}
              error={fieldError("password")}
            >
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className={inputCls(fieldError("password"), "pr-10")}
              />
              <ToggleVisibility show={showPassword} onToggle={() => setShowPassword((s) => !s)} />
            </Field>

            {/* Confirm password */}
            <Field
              id="confirm_password"
              label="Confirm password"
              icon={<Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5C6573]" />}
              error={passwordsMismatch ? "Passwords don't match." : fieldError("confirm_password")}
            >
              <input
                id="confirm_password"
                name="confirm_password"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                value={form.confirm_password}
                onChange={handleChange}
                placeholder="••••••••"
                aria-invalid={passwordsMismatch}
                required
                className={inputCls(
                  passwordsMismatch || fieldError("confirm_password"),
                  "pr-10"
                )}
              />
              <ToggleVisibility show={showConfirmPassword} onToggle={() => setShowConfirmPassword((s) => !s)} />
            </Field>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || success}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/30 transition-all hover:-translate-y-0.5 hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C6CFF]/60 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
              style={{
                background: "linear-gradient(135deg, #6D5EF5 0%, #9B8AFB 100%)",
              }}
            >
              <Feather className="h-4 w-4" />
              {loading ? "Creating account…" : "Create account"}
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

// ── Small helper components ────────────────────────────────────────────────

function Field({ id, label, icon, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-[#D7D1C4]">
        {label}
      </label>
      <div className="relative">
        {icon}
        {children}
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-[#E2574C]">{error}</p>
      )}
    </div>
  );
}

function ToggleVisibility({ show, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5C6573] hover:text-[#8A94A3] focus-visible:outline-none"
      aria-label={show ? "Hide password" : "Show password"}
    >
      {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </button>
  );
}

function inputCls(hasError, extra = "") {
  const base =
    "w-full rounded-xl border bg-[#0F1419] py-2.5 pl-10 text-sm text-[#F1ECE2] placeholder:text-[#5C6573] focus-visible:outline-none focus-visible:ring-2";
  const err =
    "border-[#E2574C]/60 focus-visible:ring-[#E2574C]/50 focus-visible:border-[#E2574C]/60";
  const ok =
    "border-[#2A323C] focus-visible:ring-[#7C6CFF]/60 focus-visible:border-[#7C6CFF]/60";
  return `${base} ${hasError ? err : ok} ${extra}`.trim();
}

