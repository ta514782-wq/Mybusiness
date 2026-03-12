import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getBIInsights(data: any, query: string) {
  const prompt = `
    You are the IntelliForge AI Business Intelligence Assistant.
    Analyze the following business data and answer the user's query.
    
    Data:
    ${JSON.stringify(data, null, 2)}
    
    User Query: ${query}
    
    Provide a concise, data-driven response with actionable insights. 
    If appropriate, suggest a KPI to monitor.
    Format your response in Markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Error generating insights:", error);
    return "I'm sorry, I encountered an error while analyzing your data. Please try again.";
  }
}
