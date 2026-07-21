import React from "react";
import { Link } from "react-router";
import type { Application } from "../../types/application.types";

interface RecentApplicationsProps {
  applications: Application[];
}

export const RecentApplications: React.FC<RecentApplicationsProps> = ({
  applications,
}) => {
  // Status Badge Helper matching the design system
  const getStatusBadge = (status: string) => {
    const normalized = status.toUpperCase();
    switch (normalized) {
      case "OFFER":
      case "ACCEPTED":
      case "HIRED":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/80";
      case "INTERVIEW":
      case "INTERVIEWING":
        return "bg-amber-50 text-amber-700 border-amber-200/80";
      case "REJECTED":
      case "DECLINED":
        return "bg-rose-50 text-rose-700 border-rose-200/80";
      case "APPLIED":
      default:
        return "bg-blue-50 text-blue-700 border-blue-200/80";
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Recent Applications
          </h2>
          <p className="text-xs text-slate-500">
            Your most recently tracked job opportunities
          </p>
        </div>

        <Link
          to="/applications"
          className="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition"
        >
          View all
          <svg
            className="ml-1 h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>

      {/* List Container */}
      <div className="mt-4 space-y-3">
        {applications.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-sm font-medium text-slate-500">
              No recent applications found.
            </p>
            <Link
              to="/applications/new"
              className="mt-2 inline-block text-xs font-semibold text-indigo-600 hover:underline"
            >
              + Add your first application
            </Link>
          </div>
        ) : (
          applications.map((app) => (
            <div
              key={app.id}
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/40 p-3.5 transition-all duration-200 hover:border-slate-200 hover:bg-slate-50 hover:shadow-xs"
            >
              {/* Left Side: Avatar & Details */}
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Company Logo/Initial Placeholder */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 font-bold text-indigo-600 text-sm border border-indigo-100/60 uppercase">
                  {app.companyName.charAt(0)}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {app.companyName}
                    </h3>
                    {app.jobUrl && (
                      <a
                        href={app.jobUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-indigo-600 shrink-0"
                        title="Open posting"
                      >
                        <svg
                          className="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    )}
                  </div>

                  <p className="truncate text-xs font-medium text-slate-500">
                    {app.jobTitle}
                  </p>
                </div>
              </div>

              {/* Right Side: Status Badge & Applied Date */}
              <div className="flex items-center justify-between sm:justify-end gap-3 pl-13 sm:pl-0">
                <span className="text-[11px] font-medium text-slate-400 shrink-0">
                  {new Date(app.applicationDate).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
                </span>

                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getStatusBadge(
                    app.status,
                  )}`}
                >
                  {app.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
