import OpenAI from 'openai';
import { Recipe, GenerateRecipeParams } from '../types';
import { RECIPE_SYSTEM_PROMPT, createRecipePrompt } from '../utils/prompts';

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
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

export async function generateRecipe(params: GenerateRecipeParams): Promise<Recipe> {
  try {
    const completion = await openaiClient.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: RECIPE_SYSTEM_PROMPT },
        { role: 'user', content: createRecipePrompt(params.meal, params.servings, params.dietary) }
      ],
      temperature: 0.7,
      stream: true,
    });

    let fullContent = '';
    for await (const chunk of completion) {
      const content = chunk.choices[0]?.delta?.content || '';
      fullContent += content;
    }

    const recipe = JSON.parse(fullContent) as Recipe;
    recipe.servings = params.servings;
    recipe.dietary = params.dietary || '';
    recipe.imageUrl = await generateImage(recipe.title);

    return recipe;
  } catch (error) {
    console.error('Error generating recipe:', error);
    throw new Error('Failed to generate recipe');
  }
}
