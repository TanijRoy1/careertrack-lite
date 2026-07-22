import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { AuthService } from "../../services/auth.service";
import type { RegisterFormData } from "../../types/auth.types";
import { AxiosError } from "axios";
import { showSuccess } from "../../utils/toast";
import { CareerTrackLogo } from "../Home/Home";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit: handleRegistration,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setLoading(true);
      setApiError(null);

      await AuthService.registerUser(data);
      reset();
      showSuccess("Account created successfully.");
      navigate("/login");
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof AxiosError) {
        setApiError(
          error.response?.data?.message ??
            "Registration failed. Please try again.",
        );
      } else {
        setApiError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      {/* Left Banner Section (Hidden on small screens) */}
      <div className="hidden w-1/2 flex-col justify-between bg-linear-to-br from-indigo-600 via-indigo-700 to-blue-800 p-12 text-white lg:flex">
        <Link to={"/"} className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-sm">
            <CareerTrackLogo></CareerTrackLogo>
          </div>
          <span className="text-xl font-bold tracking-tight">
            CareerTrack <span className="text-sm text-indigo-200">Lite</span>
          </span>
        </Link>

        <div className="max-w-md space-y-4">
          <h1 className="text-4xl font-extrabold leading-tight">
            Take control of your job search.
          </h1>
          <p className="text-indigo-100 text-lg">
            Track applications, schedule interviews, and land your dream offer
            with our streamlined dashboard.
          </p>

          <div className="pt-4 space-y-3">
            {[
              "Kanban-style application pipeline",
              "Automated status tracking & reminders",
              "Interview preparation & notes hub",
            ].map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 text-indigo-100"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/40 text-white text-xs">
                  ✓
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-indigo-200">
          © {new Date().getFullYear()} CareerTrack Lite Inc. All rights
          reserved.
        </p>
      </div>

      {/* Right Form Section */}
      <div className="flex w-full items-center justify-center p-6 sm:p-12 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center lg:text-left">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 lg:hidden">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Start organizing your job applications in minutes.
            </p>
          </div>

          {/* API Error Alert */}
          {apiError && (
            <div className="rounded-xl bg-red-50 p-4 border border-red-200 flex items-start gap-3">
              <svg
                className="h-5 w-5 text-red-500 shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm font-medium text-red-800">{apiError}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleRegistration(onSubmit)} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className={`w-full rounded-xl border px-4 py-3 text-sm transition focus:outline-none focus:ring-2 ${
                  errors.name
                    ? "border-red-300 bg-red-50/30 focus:border-red-500 focus:ring-red-200"
                    : "border-slate-200 bg-white focus:border-indigo-500 focus:ring-indigo-200"
                }`}
                {...register("name", {
                  required: "Full name is required",
                })}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Work or Personal Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className={`w-full rounded-xl border px-4 py-3 text-sm transition focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-300 bg-red-50/30 focus:border-red-500 focus:ring-red-200"
                    : "border-slate-200 bg-white focus:border-indigo-500 focus:ring-indigo-200"
                }`}
                {...register("email", {
                  required: "Email address is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 6 characters"
                  className={`w-full rounded-xl border px-4 py-3 pr-10 text-sm transition focus:outline-none focus:ring-2 ${
                    errors.password
                      ? "border-red-300 bg-red-50/30 focus:border-red-500 focus:ring-red-200"
                      : "border-slate-200 bg-white focus:border-indigo-500 focus:ring-indigo-200"
                  }`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-slate-600 text-xs font-semibold"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center rounded-xl cursor-pointer bg-indigo-600 px-4 py-3.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Creating Account...</span>
                </div>
              ) : (
                "Get Started Free"
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-slate-600">
            Already registered?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline"
            >
              Log in to your account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
