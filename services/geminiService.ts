
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from "../constants";
import { AIStylistMessage, Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.AIzaSyDfQkF39QZXIM9qcyvaZE5jSfB3PrGHSpc || '' });

export const getStylingAdvice = async (
  userMessage: string,
  history: AIStylistMessage[]
): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview';
    
    // Construct context about our products
    const productContext = PRODUCTS.map(p => 
      `${p.name} ($${p.price}): ${p.description}`
    ).join('\n');

    const contents = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    // Add current message
    contents.push({
      role: 'user',
      parts: [{ text: userMessage }]
    });

    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction: `You are the Primum Clothing AI Stylist. Your tone is sophisticated, helpful, and luxury-oriented.
        You have access to the following current collection:
        ${productContext}
        
        Rules:
        1. Always recommend at least one product from our collection if relevant.
        2. Give fashion advice that is minimalist and "quiet luxury" style.
        3. Use Google Search grounding to incorporate current real-world 2024/2025 fashion trends.
        4. Keep responses concise and elegant.`,
        tools: [{ googleSearch: {} }]
      }
    });

    return response.text || "I apologize, I'm having trouble finding the right style advice at the moment.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The stylist is currently busy preparing the next collection. Please try again in a moment.";
  }
};

export const findRelatedProducts = (advice: string): Product[] => {
  return PRODUCTS.filter(p => 
    advice.toLowerCase().includes(p.name.toLowerCase()) || 
    advice.toLowerCase().includes(p.category.toLowerCase())
  );
};
