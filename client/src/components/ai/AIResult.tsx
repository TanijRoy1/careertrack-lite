import type { AIAnalysis } from "../../types/ai.types";

interface Props {
  result: AIAnalysis;
}

const AIResult = ({ result }: Props) => {
  return (
    <div className="space-y-6 rounded-xl border border-slate-200 bg-white p-6">
      <div>
        <h3 className="font-semibold text-lg">Summary</h3>
        <p className="mt-2 text-slate-600">{result.summary}</p>
      </div>

      <div>
        <h3 className="font-semibold">Required Skills</h3>

        <div className="mt-3 flex flex-wrap gap-2">
          {result.requiredSkills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold">Preparation Topics</h3>

        <ul className="mt-2 list-disc space-y-1 pl-5">
          {result.preparationTopics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold">Keywords</h3>

        <div className="mt-3 flex flex-wrap gap-2">
          {result.keywords.map((keyword) => (
            <span
              key={keyword}
              className="rounded-full bg-slate-100 px-3 py-1 text-sm"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold">Interview Questions</h3>

        <ol className="mt-2 list-decimal space-y-2 pl-5">
          {result.interviewQuestions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default AIResult;
