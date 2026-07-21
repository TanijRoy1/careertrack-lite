import { useState } from "react";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import { ApplicationService } from "../../services/application.service";
import ApplicationForm from "../../components/application/ApplicationForm";

import type { CreateApplicationPayload } from "../../types/application.types";
import AIResult from "../../components/ai/AIResult";
import { AIService } from "../../services/ai.service";
import type { AIAnalysis } from "../../types/ai.types";

interface ApiErrorResponse {
  message: string;
}

const AddApplication = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<AIAnalysis | null>(null);
  const [aiError, setAiError] = useState("");

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      setAiError("Please paste a job description first.");
      return;
    }

    try {
      setAiLoading(true);
      setAiError("");

      const response = await AIService.analyzeJob(axiosSecure, jobDescription);

      setAiResult(response.data);
    } catch {
      setAiError("Failed to analyze job description.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleCreate = async (data: CreateApplicationPayload) => {
    try {
      setLoading(true);
      setApiError("");

      await ApplicationService.createApplication(axiosSecure, data);
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
        {/* // AI job analyzer */}
        <div className="mb-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">AI Job Analyzer (Bonus)</h2>

            <p className="mt-1 text-sm text-slate-500">
              Paste a job description to receive an AI-generated summary,
              required skills, keywords, preparation topics, and interview
              questions.
            </p>
          </div>

          <textarea
            rows={8}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the full job description here..."
            className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-indigo-500"
          />

          {aiError && <p className="mt-3 text-sm text-red-600">{aiError}</p>}

          <div className="mt-4">
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={aiLoading}
              className="rounded-xl bg-indigo-600 px-5 py-2.5 font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {aiLoading ? "Analyzing..." : "Analyze with AI"}
            </button>
          </div>

          {aiResult && (
            <div className="mt-6">
              <AIResult result={aiResult} />
            </div>
          )}
        </div>
        <ApplicationForm onSubmit={handleCreate} loading={loading} />
      </div>
    </div>
  );
};

export default AddApplication;
