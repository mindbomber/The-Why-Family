
import { GoogleGenAI } from "@google/genai";
import { Persona, Message } from "../types";

const API_KEY = process.env.API_KEY || "";
const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generatePersonaResponse(persona: Persona, history: Message[]) {
  try {
    const isInitial = history.length === 0;
    const model = ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: isInitial 
        ? `${persona.initialPrompt} Keep it to one or two short paragraphs.`
        : `The user asked "Why?" to: "${history[history.length - 1].text}". Please explain why in your persona's unique voice and style. Keep your explanation very concise, limited to one or two short paragraphs maximum.`,
      config: {
        systemInstruction: persona.systemInstruction,
        temperature: 0.9,
      }
    });

    const response = await model;
    return response.text || "I'm not sure why either, honey!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Oops! My thoughts got tangled like a messy ball of yarn. Try asking again?";
  }
}
