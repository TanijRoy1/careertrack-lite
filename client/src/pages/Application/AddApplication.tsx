import { useState } from "react";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import { ApplicationService } from "../../services/application.service";
import ApplicationForm from "../../components/application/ApplicationForm";

import type { CreateApplicationPayload } from "../../types/application.types";
import { showSuccess } from "../../utils/toast";

interface ApiErrorResponse {
  message: string;
}

const AddApplication = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleCreate = async (data: CreateApplicationPayload) => {
    try {
      setLoading(true);
      setApiError("");

      await ApplicationService.createApplication(axiosSecure, data);
      showSuccess("Application added successfully.");
      navigate("/applications");
    } catch (error) {
      if (error instanceof AxiosError) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        setApiError(
          axiosError.response?.data.message ?? "Failed to create application.",
        );
      } else {
        setApiError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Add New Application
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Keep track of job details, interview notes, and application status.
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

        <ApplicationForm onSubmit={handleCreate} loading={loading} />
      </div>
    </div>
  );
};

export default AddApplication;
