const analyzeJob = async (jobDescription: string) => {
  return {
    summary: "Mock summary",
    requiredSkills: ["React", "TypeScript", "Node.js"],
    keywords: ["REST API", "JWT", "Git"],
    preparationTopics: ["Authentication", "React Hooks"],
    interviewQuestions: [
      "Tell me about yourself.",
      "Explain JWT.",
      "What is useEffect?",
    ],
  };
};

export const AIService = {
  analyzeJob,
};
