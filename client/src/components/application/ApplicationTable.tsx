import React from "react";
import { Link } from "react-router";
import type { Application } from "../../types/application.types";
import { Button } from "../ui/Button";

interface ApplicationTableProps {
  applications: Application[];
  getStatusBadge: (status: string) => string;
  onDeleteConfirm: (id: string, companyName: string) => void;
  deletingId: string | null;
}

export const ApplicationTable: React.FC<ApplicationTableProps> = ({
  applications,
  getStatusBadge,
  onDeleteConfirm,
  deletingId,
}) => {
  return (
    <div className="hidden lg:block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50/50 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <th className="px-6 py-4">Company</th>
            <th className="px-6 py-4">Job Title</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Source</th>
            <th className="px-6 py-4">Applied Date</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm">
          {applications.map((app) => (
            <tr key={app.id} className="transition hover:bg-slate-50/80">
              <td className="px-6 py-4 font-semibold text-slate-900">
                <div className="flex items-center gap-2">
                  <span>{app.companyName}</span>
                  {app.jobUrl && (
                    <a
                      href={app.jobUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-indigo-600"
                      title="View Job Link"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              </td>
              <td className="px-6 py-4 text-slate-600">{app.jobTitle}</td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getStatusBadge(
                    app.status
                  )}`}
                >
                  {app.status}
                </span>
              </td>
              <td className="px-6 py-4 text-slate-500">{app.source}</td>
              <td className="px-6 py-4 text-slate-500">
                {new Date(app.applicationDate).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    to={`/applications/${app.id}/edit`}
                    className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-indigo-600 transition"
                    title="Edit Application"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </Link>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="!p-1.5 text-slate-500 hover:bg-rose-50 hover:text-rose-600"
                    isLoading={deletingId === app.id}
                    onClick={() => onDeleteConfirm(app.id, app.companyName)}
                    title="Delete Application"
                  >
                    {!deletingId && (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    )}
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};