"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

// Basic in-memory rate limiter (will reset on server restart)
const rateLimitMap = new Map<string, { count: number, resetTime: number }>();

function isRateLimited(userId: string) {
  const now = Date.now();
  const limit = 5; // 5 requests
  const timeframe = 60000; // per 1 minute

  const userRecord = rateLimitMap.get(userId);

  if (!userRecord || now > userRecord.resetTime) {
    rateLimitMap.set(userId, { count: 1, resetTime: now + timeframe });
    return false;
  }

  if (userRecord.count >= limit) {
    return true;
  }

  userRecord.count++;
  return false;
}

export async function generalChat(message: string) {
  const { GoogleGenerativeAI } = await import("@google/generative-ai");
  const session = await getSession();
  
  if (session?.userId && isRateLimited(session.userId)) {
    return { success: false, error: "Too many requests. Please wait a minute." };
  }

  console.log("Chat request received. message:", message);
  
  let apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    apiKey = apiKey.trim().replace(/^["']|["']$/g, '');
  }

  if (!apiKey || apiKey.includes("ISI_DENGAN") || apiKey === "your-api-key-here") {
    console.error("Gemini API Key is missing or invalid");
    return { success: false, error: "API Key not set or still contains placeholder. Please check your .env file." };
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    
    const prompt = `
      You are a friendly and helpful travel assistant for "Malang Premium Tours". 
      Answer the following user question about traveling in Malang, East Java: "${message}".
      Keep your answer concise (max 3 sentences), engaging, and professional. 
      If you don't know about a specific hidden spot, suggest visiting Mount Bromo or Tumpak Sewu.
    `;

    // Try models in order of preference - prioritizing Pro models as requested
    const modelsToTry = [
      "gemini-1.5-pro",
      "gemini-1.5-pro-latest",
      "gemini-1.5-flash", 
      "gemini-2.0-flash-exp",
      "gemini-pro"
    ];
    let lastError = null;

    console.log(`Using API Key starting with: ${apiKey.substring(0, 4)}...${apiKey.substring(apiKey.length - 4)}`);

    for (const modelName of modelsToTry) {
      try {
        console.log(`Attempting AI generation with model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        if (text) {
          console.log(`Success with model: ${modelName}`);
          return { success: true, text: text };
        }
      } catch (error: any) {
        lastError = error;
        console.error(`Model ${modelName} failed. Error:`, error.message);
        
        // If it's a 404, we definitely want to try the next model
        if (error.message?.includes("404") || error.message?.includes("not found")) {
          continue;
        }
        // For other errors (like 429 quota or 401/403 auth), we might want to break,
        // but for now we'll try all models in the list.
        continue;
      }
    }

    // If we reach here, all models failed
    const finalErrorMessage = lastError?.message || "Unknown AI error";
    console.error("All AI models failed. Final error:", finalErrorMessage);
    
    return { 
      success: false, 
      error: `AI Error: ${finalErrorMessage}. Please check if your API Key is valid and supports Gemini 1.5 in Google AI Studio.`
    };
  } catch (error: any) {
    console.error("Critical AI Assistant Error:", error);
    return { 
      success: false, 
      error: `Critical Error: ${error.message || "Connection failed"}.` 
    };
  }
}

export async function savePlan(planData: any, preferences: string) {
  const session = await getSession();
  
  try {
    const saved = await prisma.savedPlan.create({
      data: {
        userId: session?.userId || null,
        title: planData.title,
        summary: planData.summary,
        estimatedTotal: planData.estimatedTotal,
        days: JSON.stringify(planData.days),
        preferences: preferences,
      }
    });
    return { success: true, id: saved.id };
  } catch (error) {
    console.error("Save Plan Error:", error);
    return { success: false, error: "Failed to save plan." };
  }
}

export async function getSavedPlan(id: string) {
  try {
    const plan = await prisma.savedPlan.findUnique({
      where: { id }
    });
    if (!plan) return null;
    return {
      ...plan,
      days: JSON.parse(plan.days)
    };
  } catch (error) {
    return null;
  }
}

export async function generateItinerary(preferences: string, budget: number, days: number) {
  const { GoogleGenerativeAI } = await import("@google/generative-ai");
  console.log("Generating itinerary with AI...");
  let apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    apiKey = apiKey.trim().replace(/^["']|["']$/g, '');
  }
  
  if (!apiKey || apiKey.includes("ISI_DENGAN") || apiKey === "your-api-key-here") {
    console.error("Gemini API Key is missing or invalid for itinerary generation");
    return { success: false, error: "AI Service not configured (Missing or invalid API Key)." };
  }

  try {
    const destinations = await prisma.destination.findMany({
      select: { name: true, category: true, price: true, description: true }
    });

    const genAI = new GoogleGenerativeAI(apiKey);
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
      4. Output ONLY the JSON. No other text or markdown formatting outside the JSON.
    `;

    const modelsToTry = [
      "gemini-1.5-pro",
      "gemini-1.5-pro-latest",
      "gemini-1.5-flash", 
      "gemini-2.0-flash-exp",
      "gemini-pro"
    ];
    let lastError = null;
    let text = "";

    console.log(`Generating itinerary using API Key starting with: ${apiKey.substring(0, 4)}...`);

    for (const modelName of modelsToTry) {
      try {
        console.log(`Trying model for itinerary: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        text = response.text();
        if (text) {
          console.log(`Itinerary success with model: ${modelName}`);
          break;
        }
      } catch (error: any) {
        lastError = error;
        console.warn(`Itinerary model ${modelName} failed:`, error.message);
        continue;
      }
    }

    if (!text) {
      return { 
        success: false, 
        error: `Failed to generate AI plan: ${lastError?.message || "All models failed"}` 
      };
    }
    
    // Attempt to extract JSON if it's wrapped in markdown
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      text = jsonMatch[0];
    }
    
    try {
      const parsedData = JSON.parse(text);
      return { success: true, data: parsedData };
    } catch (parseError: any) {
      console.error("Failed to parse AI response as JSON:", text);
      throw new Error(`Invalid response format from AI: ${parseError.message}`);
    }
  } catch (error: any) {
    console.error("AI Planning Error:", error);
    return { success: false, error: `Failed to generate AI plan: ${error.message || "Unknown error"}` };
  }
}
