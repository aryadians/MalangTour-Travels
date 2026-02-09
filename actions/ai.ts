"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/prisma";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function generateItinerary(preferences: string, budget: number, days: number) {
  if (!process.env.GEMINI_API_KEY) {
    return { success: false, error: "AI Service not configured (Missing API Key)." };
  }

  try {
    const destinations = await prisma.destination.findMany({
      select: { name: true, category: true, price: true, description: true }
    });

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are a premium travel expert for Malang, East Java. 
      Create a ${days}-day itinerary for a user with these preferences: "${preferences}" and a budget of Rp ${budget.toLocaleString()}.
      
      Available destinations in our database:
      ${JSON.stringify(destinations)}

      Guidelines:
      1. ONLY use destinations from the provided list.
      2. Stay within the budget.
      3. Format the output as a JSON object with this structure:
         {
           "title": "Tour Title",
           "estimatedTotal": number,
           "days": [
             { "day": 1, "plan": "Description of the day", "items": ["Destination Name 1", "Destination Name 2"] }
           ],
           "summary": "Short summary of why this fits the user"
         }
      4. Output ONLY the JSON.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().replace(/```json/g, "").replace(/```/g, "").trim();
    
    return { success: true, data: JSON.parse(text) };
  } catch (error) {
    console.error("AI Planning Error:", error);
    return { success: false, error: "Failed to generate AI plan. Please try again." };
  }
}
