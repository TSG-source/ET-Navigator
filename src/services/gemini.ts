/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Type } from "@google/genai";
import { Persona, NewsStory, StoryArc, ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export const fetchPersonalizedNews = async (persona: Persona, userName?: string, userAge?: number, page: number = 1): Promise<NewsStory[]> => {
  const userContext = userName && userAge ? `The user is ${userName}, aged ${userAge}. ` : '';
  const prompt = `${userContext}Generate a list of 6 current, real-world business news stories personalized for a ${persona}. 
  This is page ${page} of the news feed. Ensure these stories are different from previous pages if possible.
  For an investor: focus on market moves, earnings, and macro trends.
  For a founder: focus on funding, competitor moves, and tech innovation.
  For a student: focus on explainers, industry shifts, and career-relevant news.
  Include real source names and URLs if possible.
  For each story, provide a relevant 'imageUrl' using the format: https://loremflickr.com/800/600/{keyword} where {keyword} is a specific, descriptive keyword related to the story topic (e.g., 'semiconductor', 'stock-market', 'startup-office').
  Return as a JSON array of stories.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            title: { type: Type.STRING },
            summary: { type: Type.STRING },
            source: { type: Type.STRING },
            url: { type: Type.STRING },
            imageUrl: { type: Type.STRING },
            timestamp: { type: Type.STRING },
            category: { type: Type.STRING },
            sentiment: { type: Type.STRING, enum: ["positive", "negative", "neutral"] },
            relevance: { type: Type.NUMBER },
          },
          required: ["id", "title", "summary", "source", "url", "imageUrl", "timestamp", "category", "sentiment", "relevance"],
        },
      },
    },
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse news stories", e);
    return [];
  }
};

export const getStoryArc = async (topic: string): Promise<StoryArc> => {
  const prompt = `Analyze the ongoing business story: "${topic}". 
  Provide a timeline of key events (at least 5), identify key players and their roles/sentiment, and provide a "what to watch next" prediction.
  For the main story and each timeline event, provide a relevant 'imageUrl' using the format: https://loremflickr.com/800/600/{keyword} where {keyword} is a specific, descriptive keyword related to the event or topic.
  Return as a JSON object matching the StoryArc interface.`;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          imageUrl: { type: Type.STRING },
          timeline: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                date: { type: Type.STRING },
                event: { type: Type.STRING },
                sentiment: { type: Type.NUMBER },
                impact: { type: Type.STRING },
                imageUrl: { type: Type.STRING },
              },
              required: ["date", "event", "sentiment", "impact", "imageUrl"],
            },
          },
          keyPlayers: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                role: { type: Type.STRING },
                sentiment: { type: Type.STRING },
              },
              required: ["name", "role", "sentiment"],
            },
          },
          prediction: { type: Type.STRING },
        },
        required: ["title", "imageUrl", "timeline", "keyPlayers", "prediction"],
      },
    },
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse story arc", e);
    throw e;
  }
};

export const chatWithNews = async (query: string, history: ChatMessage[]): Promise<ChatMessage> => {
  const chat = ai.chats.create({
    model: "gemini-3.1-pro-preview",
    config: {
      systemInstruction: "You are an expert business news navigator. Synthesize multiple sources into clear, interactive briefings. Answer follow-up questions with depth and context. Always cite sources if available via grounding. If you are discussing a specific company, industry, or topic, you can include a relevant image by adding a line at the very end of your response in this format: IMAGE_URL: https://picsum.photos/seed/{keyword}/800/600 where {keyword} is a single word related to the topic.",
      tools: [{ googleSearch: {} }],
    },
  });

  // Convert history to Gemini format
  const contents = history.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));

  const response = await chat.sendMessage({ message: query });
  
  const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map(chunk => ({
    title: chunk.web?.title || "Source",
    url: chunk.web?.uri || "#"
  })) || [];

  let text = response.text;
  let imageUrl: string | undefined;

  const imageMatch = text.match(/IMAGE_URL: (https:\/\/[^\s]+)/);
  if (imageMatch) {
    imageUrl = imageMatch[1];
    text = text.replace(/IMAGE_URL: https:\/\/[^\s]+/, '').trim();
  }

  return {
    role: 'model',
    text,
    imageUrl,
    sources
  };
};

export const chatWithAssistant = async (query: string, history: ChatMessage[]): Promise<ChatMessage> => {
  const chat = ai.chats.create({
    model: "gemini-3.1-pro-preview",
    config: {
      systemInstruction: "You are ET Navigator, a helpful AI guide for the Economic Times Navigator application. You help users navigate the app, explain business concepts, and provide general assistance. Keep your responses concise, professional, and helpful. You can use markdown for formatting.",
    },
  });

  const contents = history.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));

  const response = await chat.sendMessage({ message: query });
  
  return {
    role: 'model',
    text: response.text
  };
};

export const generateAIImage = async (prompt: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: `A professional, high-quality editorial business news photograph illustrating: ${prompt}. Cinematic lighting, corporate aesthetic, sharp focus.`,
        },
      ],
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  
  return `https://loremflickr.com/800/600/business,${encodeURIComponent(prompt.split(' ')[0])}`;
};
