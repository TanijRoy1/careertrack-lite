import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router";
import { AxiosError } from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { ApplicationService } from "../../services/application.service";
import type { Application } from "../../types/application.types";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { Button } from "../../components/ui/Button";

import { ApplicationTable } from "../../components/application/ApplicationTable";
import { ApplicationCard } from "../../components/application/ApplicationCard";
import { DeleteDialog } from "../../components/application/DeleteDialog";
import { showError, showSuccess } from "../../utils/toast";

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

  // Phase 11 Filter & Sort States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [selectedSource, setSelectedSource] = useState("ALL");
  const [sortOrder, setSortOrder] = useState<"NEWEST" | "OLDEST">("NEWEST");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalApplications, setTotalApplications] = useState(0);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  // Fetch Applications
  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);

      const response = await ApplicationService.getApplications(axiosSecure, {
        search: searchQuery,
        status: selectedStatus === "ALL" ? undefined : selectedStatus,
        source: selectedSource === "ALL" ? undefined : selectedSource,
        sort: sortOrder === "NEWEST" ? "newest" : "oldest",
        page: currentPage,
        limit: 5,
      });

      setApplications(response.data.data);

      setTotalPages(response.data.pagination.totalPages);
      setTotalApplications(response.data.pagination.total);
      setHasLoadedOnce(true);
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
  }, [
    axiosSecure,
    searchQuery,
    selectedStatus,
    selectedSource,
    sortOrder,
    currentPage,
  ]);

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

  // Delete handler
  const handleDelete = async () => {
    if (!selectedAppToDelete) return;

    const { id } = selectedAppToDelete;

    try {
      setDeletingId(id);
      await ApplicationService.deleteApplication(axiosSecure, id);
      setDeleteModalOpen(false);
      setSelectedAppToDelete(null);
      showSuccess("Application deleted.");
      await fetchApplications();
    } catch (error) {
      if (error instanceof AxiosError) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        setApiError(
          axiosError.response?.data.message ?? "Failed to delete application.",
        );
      } else {
        setApiError("Delete failed. Please try again.");
        showError("Delete failed. Please try again.");
      }
    } finally {
      setDeletingId(null);
    }
  };

  // Status Badge Helper
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

        <Link to="/applications/new">
          <Button variant="primary">
            <svg
              className="h-4 w-4 mr-2"
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
          </Button>
        </Link>
      </div>

      {/* Error Banner */}
      {apiError && (
        <div className="flex items-start justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">
          <p className="text-sm font-medium">{apiError}</p>
          <button
            onClick={() => setApiError("")}
            className="text-red-500 font-bold text-sm"
          >
            ✕
          </button>
        </div>
      )}

      {/* Phase 11: Filter & Control Toolbar */}
      {hasLoadedOnce && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 items-end bg-slate-50/50 p-4 rounded-2xl border border-slate-200">
          <Input
            placeholder="Search company or title..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            icon={
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            }
          />

          <Select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
            options={[
              { label: "All Statuses", value: "ALL" },
              { label: "Applied", value: "APPLIED" },
              { label: "Interviewing", value: "INTERVIEW" },
              { label: "Offer", value: "OFFER" },
              { label: "Rejected", value: "REJECTED" },
            ]}
          />

          <Select
            value={selectedSource}
            onChange={(e) => {
              setSelectedSource(e.target.value);
              setCurrentPage(1);
            }}
            options={[
              { label: "All Sources", value: "ALL" },
              { label: "LinkedIn", value: "LINKEDIN" },
              { label: "Company Website", value: "COMPANY" },
              { label: "Referral", value: "REFERRAL" },
              { label: "BDJobs", value: "BDJOBS" },
              { label: "Indeed", value: "INDEED" },
              { label: "Wellfound", value: "WELLFOUND" },
              { label: "Facebook", value: "FACEBOOK" },
              { label: "Discord", value: "DISCORD" },
              { label: "Internshala", value: "INTERNSHALA" },
              { label: "Unstop", value: "UNSTOP" },
              { label: "Other", value: "OTHER" },
            ]}
          />

          <Select
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value as "NEWEST" | "OLDEST");
              setCurrentPage(1);
            }}
            options={[
              { label: "Newest First", value: "NEWEST" },
              { label: "Oldest First", value: "OLDEST" },
            ]}
          />
        </div>
      )}

      {/* Main Content Area */}
      {loading ? (
        renderSkeletons()
      ) : totalApplications === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
          <h3 className="text-lg font-bold text-slate-800">
            No applications yet
          </h3>

          <p className="mt-1 text-sm text-slate-500 max-w-sm">
            Start tracking your job search by adding your first application.
          </p>

          <Link to="/applications/new" className="mt-6">
            <Button>+ Add First Application</Button>
          </Link>
        </div>
      ) : applications.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
          No applications match your search or filter criteria.
        </div>
      ) : (
        <>
          <ApplicationTable
            applications={applications}
            getStatusBadge={getStatusBadge}
            onDeleteConfirm={confirmDelete}
            deletingId={deletingId}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
            {applications.map((app) => (
              <ApplicationCard
                key={app.id}
                application={app}
                getStatusBadge={getStatusBadge}
                onDeleteConfirm={confirmDelete}
                isDeleting={deletingId === app.id}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-200 pt-4">
              <span className="text-sm text-slate-500">
                Page{" "}
                <span className="font-semibold text-slate-800">
                  {currentPage}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-800">
                  {totalPages}
                </span>
              </span>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                >
                  Previous
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Confirmation Modal */}
      <DeleteDialog
        isOpen={deleteModalOpen}
        companyName={selectedAppToDelete?.companyName || ""}
        isDeleting={deletingId !== null}
        onConfirm={handleDelete}
        onClose={() => setDeleteModalOpen(false)}
      />
    </div>
  );
};

export default Applications;
