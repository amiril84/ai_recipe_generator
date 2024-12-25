import OpenAI from 'openai';
import { config } from './config';

const openaiClient = new OpenAI({
  apiKey: config.openai.apiKey,
  dangerouslyAllowBrowser: true
});

export async function generateImage(prompt: string): Promise<string> {
  try {
    const response = await openaiClient.images.generate({
      model: "dall-e-3",
      prompt: `A professional, appetizing food photography of ${prompt}. The image should be well-lit, showing the dish from a top-down or 45-degree angle, with proper food styling and garnishes. Style: Modern food photography, high resolution, soft natural lighting.`,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      style: "natural"
    });

    return response.data[0].url || '';
  } catch (error) {
    console.error('Error generating image:', error);
    return '';
  }
}

export const openaiAPI = openaiClient;