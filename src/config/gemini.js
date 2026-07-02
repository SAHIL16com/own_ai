import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

async function MainChat(prompt) {
  try {

    const response = await ai.models.generateContent({model: "gemini-2.5-flash",contents: prompt, });

    return response.text;
    
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default MainChat;