import { GenerateRecipeParams, Recipe } from './types';
import { generateRecipeWithAI } from './openai';

export async function generateRecipe(params: GenerateRecipeParams): Promise<Recipe> {
  try {
    return await generateRecipeWithAI(params);
  } catch (error) {
    console.error('Failed to generate recipe:', error);
    throw new Error('Failed to generate recipe. Please try again.');
  }
}