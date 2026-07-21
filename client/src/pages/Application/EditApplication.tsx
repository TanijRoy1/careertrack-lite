import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AxiosError } from "axios";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import { ApplicationService } from "../../services/application.service";
import ApplicationForm from "../../components/application/ApplicationForm";

import type { CreateApplicationPayload } from "../../types/application.types";

interface ApiErrorResponse {
  message: string;
}

const EditApplication = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [initialData, setInitialData] = useState<
    CreateApplicationPayload | undefined
  >(undefined);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // Load existing application data
  useEffect(() => {
    const fetchApplication = async () => {
      if (!id) return;

      try {
        setFetching(true);
        const response = await ApplicationService.getApplicationById(
          axiosSecure,
          id,
        );

        // Sanitize applicationDate to match YYYY-MM-DD input format
        const app = response.data;
        const formattedDate = app.applicationDate
          ? new Date(app.applicationDate).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0];

        setInitialData({
          companyName: app.companyName,
          jobTitle: app.jobTitle,
          jobUrl: app.jobUrl ?? "",
          source: app.source,
          status: app.status,
          applicationDate: formattedDate,
          notes: app.notes ?? "",
        });
      } catch (error) {
        if (error instanceof AxiosError) {
          const axiosError = error as AxiosError<ApiErrorResponse>;
          setApiError(
            axiosError.response?.data.message ??
              "Failed to load application details.",
          );
        } else {
          setApiError("An unexpected error occurred while fetching details.");
        }
      } finally {
        setFetching(false);
      }
    };

    fetchApplication();
  }, [axiosSecure, id]);

  const handleUpdate = async (data: CreateApplicationPayload) => {
    if (!id) return;

    try {
      setLoading(true);
      setApiError("");

      await ApplicationService.updateApplication(axiosSecure, id, data);
      navigate("/applications");
    } catch (error) {
      if (error instanceof AxiosError) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        setApiError(
          axiosError.response?.data.message ?? "Failed to update application.",
        );
      } else {
        setApiError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="mx-auto max-w-3xl space-y-4">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-slate-200" />
        <div className="h-96 w-full animate-pulse rounded-2xl bg-slate-100" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Edit Application
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Update stage status, salary notes, or application details.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/applications")}
          className="self-start cursor-pointer sm:self-auto rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition"
        >
          Cancel
        </button>
      </div>

      {/* Form Container */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
        {/* API Error Alert */}
        {apiError && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">
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
        )}

        <ApplicationForm
          defaultValues={initialData}
          onSubmit={handleUpdate}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default EditApplication;
