import { useState } from "react";
import { AxiosError } from "axios";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AIService } from "../../services/ai.service";
import AIResult from "../../components/ai/AIResult";
import { Button } from "../../components/ui/Button";

import type { AIAnalysis } from "../../types/ai.types";
import { showError } from "../../utils/toast";

interface ApiErrorResponse {
  message: string;
}

const AIAnalyzer = () => {
  const axiosSecure = useAxiosSecure();

  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<AIAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      setApiError("Please paste a job description.");
      return;
    }

    try {
      setLoading(true);
      setApiError("");

      const response = await AIService.analyzeJob(axiosSecure, jobDescription);

      setResult(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        const axiosError = error as AxiosError<ApiErrorResponse>;

        setApiError(
          axiosError.response?.data.message ??
            "Failed to analyze job description.",
        );
        showError("AI service is unavailable. Please try again.");
      } else {
        setApiError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-3xl font-bold text-slate-900">AI Job Analyzer</h1>

        <p className="mt-2 text-slate-500">
          Paste any job description to generate a summary, required skills,
          keywords, preparation topics, and interview questions.
        </p>
      </div>

      {/* Input */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Job Description
        </label>

        <textarea
          rows={12}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the complete job description here..."
          className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-indigo-500"
        />

        {apiError && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {apiError}
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <Button onClick={handleAnalyze} disabled={loading}>
            {loading ? "Analyzing..." : "Analyze with AI"}
          </Button>

          {result && (
            <Button
              variant="outline"
              onClick={() => {
                setResult(null);
                setJobDescription("");
              }}
            >
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Result */}
      {result && <AIResult result={result} />}
    </div>
  );
};

export default AIAnalyzer;
