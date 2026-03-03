import { GoogleGenAI } from "@google/genai";
import { Exercise } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateWorkoutPlan(theme: string): Promise<Exercise[]> {
  const prompt = `Generate a structured F3 workout plan for a "Q" (leader). 
  Theme: ${theme}
  Format as JSON array of exercises with these fields:
  - name: string
  - reps: string (e.g. "20x IC", "10 reps")
  - duration: number (seconds, optional)
  - description: string (short)
  - category: "Warm-up" | "The Thang" | "Mary"
  
  Include 4 warm-up exercises (COP), 8 main workout exercises (The Thang), and 3 core exercises (Mary).
  F3 exercises often have unique names (e.g., Burpees, Merkins, Big Boys, Imperial Walkers). Use a mix of classic and F3-specific names.
  Return ONLY the JSON array.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "[]";
    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating workout:", error);
    return [];
  }
}

export async function parseNaturalLanguageWorkout(input: string): Promise<Exercise[]> {
  const prompt = `Parse the following workout description into a structured JSON array of exercises.
  Workout Description:
  """
  ${input}
  """
  
  Format as JSON array of exercises with these fields:
  - name: string
  - reps: string (e.g. "20x IC", "10 reps")
  - duration: number (seconds, optional)
  - description: string (short)
  - category: "Warm-up" | "The Thang" | "Mary"
  
  If the category is not clear, default to "The Thang".
  Return ONLY the JSON array.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "[]";
    return JSON.parse(text);
  } catch (error) {
    console.error("Error parsing workout:", error);
    return [];
  }
}
