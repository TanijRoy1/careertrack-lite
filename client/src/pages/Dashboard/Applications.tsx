import { useEffect, useState, useMemo, useCallback } from "react";
import { Link } from "react-router";
import { AxiosError } from "axios";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import { ApplicationService } from "../../services/application.service";

import type { Application } from "../../types/application.types";

interface ApiErrorResponse {
  message: string;
}

const Applications = () => {
  const axiosSecure = useAxiosSecure();

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [apiError, setApiError] = useState("");

  // Delete Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedAppToDelete, setSelectedAppToDelete] = useState<{
    id: string;
    companyName: string;
  } | null>(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  // Fetch Applications
  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      const response = await ApplicationService.getApplications(axiosSecure);
      setApplications(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        setApiError(
          axiosError.response?.data.message ?? "Failed to load applications.",
        );
      } else {
        setApiError("An unexpected error occurred while fetching data.");
      }
    } finally {
      setLoading(false);
    }
  }, [axiosSecure]);

  useEffect(() => {
    const loadApplications = async () => {
      await fetchApplications();
    };

    loadApplications();
  }, [fetchApplications]);
  // Open confirmation modal
  const confirmDelete = (id: string, companyName: string) => {
    setSelectedAppToDelete({ id, companyName });
    setDeleteModalOpen(true);
  };

  // Perform actual deletion
  const handleDelete = async () => {
    if (!selectedAppToDelete) return;

    const { id } = selectedAppToDelete;

    try {
      setDeletingId(id);
      await ApplicationService.deleteApplication(axiosSecure, id);

      // Close modal and refresh list
      setDeleteModalOpen(false);
      setSelectedAppToDelete(null);
      await fetchApplications();
    } catch (error) {
      if (error instanceof AxiosError) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        setApiError(
          axiosError.response?.data.message ?? "Failed to delete application.",
        );
      } else {
        setApiError("Delete failed. Please try again.");
      }
    } finally {
      setDeletingId(null);
    }
  };

  // Status Badge Colors Helper
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

  // Filtered applications based on search & dropdown
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        app.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatus === "ALL" ||
        app.status.toUpperCase() === selectedStatus.toUpperCase();

      return matchesSearch && matchesStatus;
    });
  }, [applications, searchQuery, selectedStatus]);

  // Skeleton Loader Component
  const renderSkeletons = () => (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="h-16 w-full animate-pulse rounded-2xl bg-slate-100"
        />
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Job Applications
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage, filter, and track all your ongoing application pipelines.
          </p>
        </div>

        <Link
          to="/applications/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-100 transition hover:bg-indigo-700 active:scale-[0.99] self-start sm:self-auto"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Application
        </Link>
      </div>

      {/* API Error Banner */}
      {apiError && (
        <div className="flex items-start justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">
          <div className="flex items-start gap-3">
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
            <p className="text-sm font-medium">{apiError}</p>
          </div>
          <button
            onClick={() => setApiError("")}
            className="text-red-500 hover:text-red-700 font-bold text-sm"
          >
            ✕
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      {!loading && applications.length > 0 && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <svg
              className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
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
            <input
              type="text"
              placeholder="Search by company or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          {/* Status Filter */}
          <div className="w-full sm:w-48">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            >
              <option value="ALL">All Statuses</option>
              <option value="APPLIED">Applied</option>
              <option value="INTERVIEW">Interviewing</option>
              <option value="OFFER">Offer</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>
      )}

      {/* Content Area */}
      {loading ? (
        renderSkeletons()
      ) : applications.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 mb-4">
            <svg
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-800">
            No applications yet
          </h3>
          <p className="mt-1 text-sm text-slate-500 max-w-sm">
            Start tracking your job search by adding your first application.
          </p>
          <Link
            to="/applications/new"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
          >
            + Add First Application
          </Link>
        </div>
      ) : filteredApplications.length === 0 ? (
        /* Search No Results */
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
          No applications match your filter criteria.
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
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
                {filteredApplications.map((app) => (
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
                            <svg
                              className="h-4 w-4"
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
                    </td>
                    <td className="px-6 py-4 text-slate-600">{app.jobTitle}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getStatusBadge(app.status)}`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{app.source}</td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(app.applicationDate).toLocaleDateString(
                        undefined,
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        },
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Edit Link */}
                        <Link
                          to={`/applications/${app.id}/edit`}
                          className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-indigo-600 transition"
                          title="Edit Application"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </Link>

                        {/* Delete Button */}
                        <button
                          onClick={() => confirmDelete(app.id, app.companyName)}
                          disabled={deletingId === app.id}
                          className="rounded-lg p-1.5 cursor-pointer text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition disabled:opacity-50"
                          title="Delete Application"
                        >
                          {deletingId === app.id ? (
                            <svg
                              className="h-4 w-4 animate-spin text-rose-600"
                              viewBox="0 0 24 24"
                            >
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
                          ) : (
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards View */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
            {filteredApplications.map((app) => (
              <div
                key={app.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">
                      {app.companyName}
                    </h3>
                    <p className="text-sm font-medium text-slate-600">
                      {app.jobTitle}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getStatusBadge(app.status)}`}
                  >
                    {app.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span>Source: {app.source}</span>
                  <span>
                    {new Date(app.applicationDate).toLocaleDateString(
                      undefined,
                      {
                        month: "short",
                        day: "numeric",
                      },
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <Link
                    to={`/applications/${app.id}/edit`}
                    className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600 hover:bg-indigo-100 transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => confirmDelete(app.id, app.companyName)}
                    disabled={deletingId === app.id}
                    className="rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-100 transition"
                  >
                    {deletingId === app.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Styled Confirmation Modal */}
      {deleteModalOpen && selectedAppToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Delete Application
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Are you sure you want to delete your application for{" "}
                <span className="font-semibold text-slate-800">
                  {selectedAppToDelete.companyName}
                </span>
                ? This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                className="rounded-xl px-4 py-2 cursor-pointer text-sm font-semibold text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deletingId !== null}
                className="rounded-xl bg-rose-600 px-4 py-2 cursor-pointer text-sm font-semibold text-white shadow-sm hover:bg-rose-700 transition disabled:opacity-50"
              >
                {deletingId ? "Deleting..." : "Delete Application"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applications;
