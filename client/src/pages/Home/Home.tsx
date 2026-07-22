import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import { Button } from "../../components/ui/Button";
import { ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react";

export const CareerTrackLogo = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Dynamic stair-step / trendline representing career growth */}
    <path
      d="M4 22L12 14L18 20L28 8"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 8H28V16"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="14" r="2.5" fill="currentColor" />
    <circle cx="18" cy="20" r="2.5" fill="currentColor" />
  </svg>
);

const features = [
  {
    title: "Track Applications",
    description:
      "Save every job opportunity, company detail, and custom notes in one sleek dashboard.",
    icon: (
      <svg
        className="h-6 w-6 text-indigo-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),
    badgeBg: "bg-indigo-50 border-indigo-100",
    hoverBorder: "hover:border-indigo-300 hover:shadow-indigo-100",
  },
  {
    title: "Dashboard Overview",
    description:
      "Visualize your recruitment pipeline with real-time stats, interview counts, and offers.",
    icon: (
      <svg
        className="h-6 w-6 text-violet-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    badgeBg: "bg-violet-50 border-violet-100",
    hoverBorder: "hover:border-violet-300 hover:shadow-violet-100",
  },
  {
    title: "Search & Filter",
    description:
      "Find any job submission in seconds with quick search, status tags, and sorting options.",
    icon: (
      <svg
        className="h-6 w-6 text-amber-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
    badgeBg: "bg-amber-50 border-amber-100",
    hoverBorder: "hover:border-amber-300 hover:shadow-amber-100",
  },
  {
    title: "Secure Authentication",
    description:
      "JWT-based authentication keeps your account and application data protected.",
    icon: (
      <svg
        className="h-6 w-6 text-emerald-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
    badgeBg: "bg-emerald-50 border-emerald-100",
    hoverBorder: "hover:border-emerald-300 hover:shadow-emerald-100",
  },
];

const Home = () => {
  const { token, user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-800 selection:bg-indigo-500 selection:text-white flex flex-col justify-between">
      {/* Top Navbar / Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-slate-200/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-500/20">
              <CareerTrackLogo></CareerTrackLogo>
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              CareerTrack{" "}
              <span className="text-indigo-600 font-semibold">Lite</span>
            </span>
          </div>

          {/* Navigation Actions */}
          <div>
            {token ? (
              <div className="flex items-center gap-2.5">
                <Link to="/dashboard">
                  <Button
                    size="sm"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm"
                  >
                    Go to Dashboard
                  </Button>
                </Link>
                <Button
                  onClick={logout}
                  variant="outline"
                  size="sm"
                  className="border-slate-300 text-slate-700 hover:bg-slate-100"
                >
                  Log Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link to="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  >
                    Log in
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    size="sm"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Container with Background Soft Lighting */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-125 w-225 -translate-x-1/2 rounded-full bg-linear-to-tr from-indigo-200/50 via-purple-100/40 to-blue-100/30 blur-3xl" />

        {/* Hero Section */}
        <section className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 pt-16 pb-20 text-center sm:pt-24 sm:pb-28">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-white/80 px-4 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm backdrop-blur-md mb-6">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
            Smart Job Application Tracker
          </div>

          {/* Heading */}
          <h1 className="max-w-4xl text-4xl font-black tracking-tight text-slate-900 sm:text-6xl lg:text-7xl leading-[1.12]">
            Organize Your Job Search <br className="hidden sm:inline" />
            <span className="bg-linear-to-r from-indigo-600 via-violet-600 to-indigo-800 bg-clip-text text-transparent">
              From Application to Offer
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-2xl text-base text-slate-600 sm:text-lg leading-relaxed">
            CareerTrack Lite helps you manage job applications, monitor
            interview progress, and stay organized throughout your job search
            journey.
          </p>

          {/* Main Action Buttons */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
            {token ? (
              <Link to="/dashboard" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-600/20"
                >
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/register" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-600/20"
                  >
                    Get Started Free
                  </Button>
                </Link>

                <Link to="/login" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto px-8 border-slate-300 bg-white hover:bg-slate-50 text-slate-700 shadow-sm"
                  >
                    Log In
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* User Welcome Pill */}
          {token && (
            <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 shadow-sm">
              <span className="text-sm">👋</span>
              <span>
                Welcome back
                {user?.name ? (
                  <>
                    ,{" "}
                    <strong className="font-semibold text-indigo-600">
                      {user.name}
                    </strong>
                  </>
                ) : null}
                !
              </span>
            </div>
          )}
        </section>
      </div>

      {/* Features Section */}
      <section className="mx-auto max-w-7xl px-6 pb-24 sm:pb-32">
        <div className="mb-14 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Everything You Need
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-lg mx-auto">
            A simple and modern way to keep your job search structured and
            clear.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${feature.hoverBorder}`}
            >
              <div>
                <div
                  className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border ${feature.badgeBg} transition-transform duration-300 group-hover:scale-105`}
                >
                  {feature.icon}
                </div>

                <h3 className="mb-2 text-base font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="text-xs leading-relaxed text-slate-500">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section (Only for logged out users) */}
      {!token && (
        <section className="relative overflow-hidden bg-linear-to-br from-indigo-700 via-indigo-600 to-slate-900 py-20 text-white shadow-2xl">
          {/* Ambient Glows */}
          <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-violet-600/30 blur-3xl" />

          {/* Subtle Grid Pattern Overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
            {/* Feature Pills */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-indigo-100 backdrop-blur-md ring-1 ring-white/20 mb-6">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span>100% Free • No Credit Card Required</span>
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight">
              Ready to organize your job search?
            </h2>

            <p className="mt-4 text-sm sm:text-lg text-indigo-100/90 max-w-xl mx-auto leading-relaxed">
              Create your free account and start tracking applications,
              interview dates, and AI insights today.
            </p>

            {/* Micro Feature Highlights */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-indigo-200 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400" /> Application
                Board
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-amber-300" /> AI Resume Keywords
              </span>
            </div>

            <div className="mt-10 flex justify-center">
              <Link to="/register">
                <Button
                  size="lg"
                  className="group relative inline-flex items-center gap-2.5 rounded-xl bg-white px-8 py-3.5 text-sm sm:text-base font-bold text-indigo-900 shadow-xl transition-all duration-200 hover:bg-indigo-50 hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span className="text-indigo-600 hover:text-white">Create Account Free</span>
                  <ArrowRight className="h-4 w-4 text-indigo-600 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-slate-50/50 py-12">
        <div className="mx-auto max-w-7xl px-6 text-center text-xs text-slate-500">
          {/* Logo & Name */}
          <div className="flex items-center justify-center gap-2.5 mb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/20 ring-1 ring-indigo-500/30">
              <CareerTrackLogo className="h-5 w-5 text-white" />
            </div>
            <span className="font-extrabold text-slate-900 text-base tracking-tight">
              CareerTrack{" "}
              <span className="text-indigo-600 font-semibold">Lite</span>
            </span>
          </div>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap justify-center items-center gap-1.5 max-w-xl mx-auto my-4 text-[11px] font-medium text-slate-600">
            {[
              "React",
              "TypeScript",
              "Express.js",
              "Prisma ORM",
              "PostgreSQL",
              "Tailwind CSS",
            ].map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-white border border-slate-200/80 px-2 py-0.5 text-slate-500 shadow-2xs"
              >
                {tech}
              </span>
            ))}
          </div>

          <p className="mt-6 text-slate-400 text-xs">
            © {new Date().getFullYear()} CareerTrack Lite. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
