
import { GoogleGenAI, Type } from "@google/genai";
import { WebsiteData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateWebsiteDraft(prompt: string): Promise<WebsiteData> {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a professional website concept for: ${prompt}. Focus on modern SaaS/Business aesthetics.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          businessName: { type: Type.STRING },
          tagline: { type: Type.STRING },
          heroText: { type: Type.STRING },
          aboutUs: { type: Type.STRING },
          imagePrompt: { 
            type: Type.STRING, 
            description: "A detailed visual prompt to generate a stunning hero image for this business. Focus on style, mood, and high-end aesthetics." 
          },
          colorPalette: {
            type: Type.OBJECT,
            properties: {
              primary: { type: Type.STRING, description: "Hex code for primary brand color" },
              secondary: { type: Type.STRING, description: "Hex code for secondary brand color" },
              accent: { type: Type.STRING, description: "Hex code for accent color" }
            },
            required: ["primary", "secondary", "accent"]
          },
          sections: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                features: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["title", "description", "features"]
            }
          }
        },
        required: ["businessName", "tagline", "heroText", "aboutUs", "sections", "colorPalette", "imagePrompt"]
      }
    }
  });

  const text = response.text.trim();
  return JSON.parse(text);
}

export async function generateHeroImage(visualPrompt: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { text: `High quality, 4k resolution, modern minimalist photography for a website hero section. Subject: ${visualPrompt}` }
      ]
    },
    config: {
      imageConfig: {
        aspectRatio: "16:9"
      }
    }
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  throw new Error("Failed to generate image");
}
