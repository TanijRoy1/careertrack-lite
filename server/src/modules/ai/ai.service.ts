import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

const analyzeJobDescription = async (jobDescription: string) => {
  const prompt = `
You are an expert career coach.

Analyze the following job description.

Return ONLY valid JSON in this exact format:

{
  "summary": "Brief summary",
  "requiredSkills": [],
  "preparationTopics": [],
  "keywords": [],
  "interviewQuestions": []
}

Job Description:
${jobDescription}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const text = response.text ?? "";

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
};

export const AIService = {
  analyzeJobDescription,
};
