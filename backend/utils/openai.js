import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const getGeminiAPIResponse = async (message) => {
  const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  try {
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent([message]);
    const response = await result.response;
    return response.text();
  } catch (err) {
    console.error("Gemini Error:", err);
    return "Something went wrong";
  }
};

export default getGeminiAPIResponse;
