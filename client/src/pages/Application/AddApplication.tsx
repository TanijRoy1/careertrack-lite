import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import { ApplicationService } from "../../services/application.service";

import type { CreateApplicationPayload } from "../../types/application.types";

import {
  APPLICATION_SOURCE,
  APPLICATION_STATUS,
} from "../../types/application.types";

interface ApiErrorResponse {
  message: string;
}

const AddApplication = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateApplicationPayload>({
    defaultValues: {
      applicationDate: new Date().toISOString().split("T")[0], // Default to today
    },
  });

  const onSubmit = async (data: CreateApplicationPayload) => {
    try {
      setLoading(true);
      setApiError("");

      await ApplicationService.createApplication(axiosSecure, data);

      reset();
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Section: Basic Information */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Google, Acme Corp"
                {...register("companyName", {
                  required: "Company name is required",
                })}
                className={`w-full rounded-xl border px-4 py-3 text-sm transition focus:outline-none focus:ring-2 ${
                  errors.companyName
                    ? "border-red-300 bg-red-50/30 focus:border-red-500 focus:ring-red-200"
                    : "border-slate-200 bg-white focus:border-indigo-500 focus:ring-indigo-200"
                }`}
              />
              {errors.companyName && (
                <p className="mt-1.5 text-xs font-medium text-red-500">
                  {errors.companyName.message}
                </p>
              )}
            </div>

            {/* Job Title */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Frontend Developer"
                {...register("jobTitle", {
                  required: "Job title is required",
                })}
                className={`w-full rounded-xl border px-4 py-3 text-sm transition focus:outline-none focus:ring-2 ${
                  errors.jobTitle
                    ? "border-red-300 bg-red-50/30 focus:border-red-500 focus:ring-red-200"
                    : "border-slate-200 bg-white focus:border-indigo-500 focus:ring-indigo-200"
                }`}
              />
              {errors.jobTitle && (
                <p className="mt-1.5 text-xs font-medium text-red-500">
                  {errors.jobTitle.message}
                </p>
              )}
            </div>
          </div>

          {/* Job URL */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Job Listing URL
            </label>
            <input
              type="url"
              placeholder="https://example.com/careers/job"
              {...register("jobUrl")}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          {/* Section: Tracking Metadata */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {/* Source */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Source
              </label>
              <select
                {...register("source")}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              >
                {APPLICATION_SOURCE.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Status
              </label>
              <select
                {...register("status")}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              >
                {APPLICATION_STATUS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Application Date */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Applied Date
              </label>
              <input
                type="date"
                {...register("applicationDate")}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Notes & Reminders
            </label>
            <textarea
              rows={4}
              placeholder="Add key info, contact person, interview details, salary range..."
              {...register("notes")}
              className="w-full rounded-xl border border-slate-200 bg-white p-4 text-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          {/* Form Controls */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => navigate("/applications")}
              className="rounded-xl px-5 py-3 text-sm cursor-pointer font-semibold text-slate-600 hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center cursor-pointer gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
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
                  <span>Saving Application...</span>
                </>
              ) : (
                "Save Application"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddApplication;
