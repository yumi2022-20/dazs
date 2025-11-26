import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

export const generateAIAnswer = async (): Promise<string | null> => {
  // Support both Cloud environment (process.env) and Local Vite environment (import.meta.env)
  let apiKey = process.env.API_KEY;
  
  try {
    // @ts-ignore - Handle Vite environment variable safely
    if (!apiKey && typeof import.meta !== 'undefined' && import.meta.env) {
      // @ts-ignore
      apiKey = import.meta.env.VITE_API_KEY;
    }
  } catch (e) {
    // Ignore error if import.meta is not available
  }
  
  // Fail gracefully if no key is present
  if (!apiKey) {
    console.warn("No API Key found. Using local fallback.");
    return null;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "请给我一个指引。",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 1.2, // Higher temperature for more variety
        maxOutputTokens: 50,
      },
    });

    return response.text ? response.text.trim() : null;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};