export interface AIAnalysis {
  summary: string;
  requiredSkills: string[];
  preparationTopics: string[];
  keywords: string[];
  interviewQuestions: string[];
}

export interface AIAnalysisResponse {
  success: boolean;
  data: AIAnalysis;
}
