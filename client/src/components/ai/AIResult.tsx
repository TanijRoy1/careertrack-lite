import React, { useState } from "react";
import {
  Sparkles,
  Check,
  Copy,
  BrainCircuit,
  Tag,
  BookOpen,
  HelpCircle,
  FileText,
} from "lucide-react";
import type { AIAnalysis } from "../../types/ai.types";

interface Props {
  result: AIAnalysis;
}

const AIResult: React.FC<Props> = ({ result }) => {
  // Keeps track of which section was recently copied (e.g., 'summary', 'skills')
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = (text: string, sectionKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionKey);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Result Top Banner */}
      <div className="flex items-center justify-between rounded-2xl bg-linear-to-r from-indigo-900 via-indigo-800 to-slate-900 p-6 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-400/30">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold">AI Analysis Complete</h2>
            <p className="text-xs text-indigo-200/80">
              Breakdown generated tailored to your job description.
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            copyToClipboard(
              `SUMMARY:\n${result.summary}\n\nREQUIRED SKILLS:\n${result.requiredSkills.join(
                ", ",
              )}\n\nPREPARATION TOPICS:\n${result.preparationTopics.join(
                "\n",
              )}\n\nKEYWORDS:\n${result.keywords.join(
                ", ",
              )}\n\nINTERVIEW QUESTIONS:\n${result.interviewQuestions.join("\n")}`,
              "full",
            )
          }
          className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-95"
        >
          {copiedSection === "full" ? (
            <>
              <Check className="h-4 w-4 text-emerald-400" />
              <span>Full Report Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>Copy Full Report</span>
            </>
          )}
        </button>
      </div>

      {/* Grid Layout for Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Summary Card (Spans full width) */}
        <div className="md:col-span-2 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <FileText className="h-4 w-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Role Summary
              </h3>
            </div>

            <button
              onClick={() => copyToClipboard(result.summary, "summary")}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              {copiedSection === "summary" ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-emerald-600 font-semibold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-slate-400" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <p className="text-sm leading-relaxed text-slate-600 bg-slate-50/60 p-4 rounded-xl border border-slate-100">
            {result.summary}
          </p>
        </div>

        {/* Required Skills Card */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <BrainCircuit className="h-4 w-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Required Skills
                </h3>
              </div>

              <button
                onClick={() =>
                  copyToClipboard(result.requiredSkills.join(", "), "skills")
                }
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
              >
                {copiedSection === "skills" ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-semibold">
                      Copied
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-slate-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {result.requiredSkills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center rounded-lg bg-indigo-50 border border-indigo-100 px-3 py-1.5 text-xs font-semibold text-indigo-700 shadow-2xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Keywords Card */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  <Tag className="h-4 w-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Resume Keywords
                </h3>
              </div>

              <button
                onClick={() =>
                  copyToClipboard(result.keywords.join(", "), "keywords")
                }
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
              >
                {copiedSection === "keywords" ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-semibold">
                      Copied
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-slate-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {result.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="inline-flex items-center rounded-lg bg-slate-100 border border-slate-200/80 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-2xs"
                >
                  #{keyword}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Preparation Topics */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <BookOpen className="h-4 w-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Preparation Focus Areas
              </h3>
            </div>

            <button
              onClick={() =>
                copyToClipboard(result.preparationTopics.join("\n"), "topics")
              }
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              {copiedSection === "topics" ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-emerald-600 font-semibold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-slate-400" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-700">
            {result.preparationTopics.map((topic, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 rounded-xl bg-slate-50/80 p-3 border border-slate-100"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700">
                  {idx + 1}
                </span>
                <span className="mt-0.5 leading-relaxed">{topic}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Interview Questions */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                <HelpCircle className="h-4 w-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Likely Interview Questions
              </h3>
            </div>

            <button
              onClick={() =>
                copyToClipboard(
                  result.interviewQuestions.join("\n"),
                  "questions",
                )
              }
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              {copiedSection === "questions" ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-emerald-600 font-semibold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-slate-400" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-2.5 text-xs text-slate-700">
            {result.interviewQuestions.map((q, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 rounded-xl bg-slate-50/80 p-3 border border-slate-100"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 text-[10px] font-bold text-violet-700">
                  Q{idx + 1}
                </span>
                <p className="mt-0.5 leading-relaxed font-medium text-slate-800">
                  {q}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIResult;
