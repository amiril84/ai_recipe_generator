import { Recipe, NutritionalInfo } from './types';

function parseNutritionInfo(nutritionLines: string[]): NutritionalInfo {
  const defaultNutrition: NutritionalInfo = {
    calories: 0,
    protein: 0,
    carbohydrates: 0,
    fat: 0,
    fiber: 0,
    sugar: 0,
    sodium: 0
  };

  if (!nutritionLines?.length) return defaultNutrition;

  const getValue = (line: string): number => {
    const match = line.match(/\d+(\.\d+)?/);
    return match ? parseFloat(match[0]) : 0;
  };

  nutritionLines.forEach(line => {
    const lowerLine = line.toLowerCase();
    if (lowerLine.includes('calories')) defaultNutrition.calories = getValue(line);
    if (lowerLine.includes('protein')) defaultNutrition.protein = getValue(line);
    if (lowerLine.includes('carbohydrates')) defaultNutrition.carbohydrates = getValue(line);
    if (lowerLine.includes('fat')) defaultNutrition.fat = getValue(line);
    if (lowerLine.includes('fiber')) defaultNutrition.fiber = getValue(line);
    if (lowerLine.includes('sugar')) defaultNutrition.sugar = getValue(line);
    if (lowerLine.includes('sodium')) defaultNutrition.sodium = getValue(line);
  });

  return defaultNutrition;
}

function extractCountryName(origin: string): string {
  const withoutParens = origin.replace(/\([^)]*\)/g, '');
  const parts = withoutParens.split(/[,\s]+/).filter(Boolean);
  const countries = ['China', 'Thailand', 'Vietnam', 'Japan', 'Korea', 'India', 'Italy', 'France', 'Mexico'];
  const country = countries.find(c => origin.includes(c));
  return country || parts[0] || 'Unknown';
}

export function parseRecipeResponse(content: string): Recipe {
  const lines = content.split('\n').map(line => line.trim());
  const recipe: Partial<Recipe> = {
    ingredients: [],
    instructions: [],
    variations: [],
    nutritionalInfo: {
      calories: 0,
      protein: 0,
      carbohydrates: 0,
      fat: 0,
      fiber: 0,
      sugar: 0,
      sodium: 0
    }
  };

  let currentSection: 'ingredients' | 'instructions' | 'nutrition' | 'variations' | null = null;
  const nutritionLines: string[] = [];

  for (const line of lines) {
    if (!line) continue;

    if (line.startsWith('Title:')) {
      recipe.title = line.replace('Title:', '').trim();
    } else if (line.startsWith('Origin:')) {
      recipe.origin = extractCountryName(line.replace('Origin:', '').trim());
    } else if (line.startsWith('Time:')) {
      recipe.prepTime = line.replace('Time:', '').trim();
    } else if (line.startsWith('Servings:')) {
      const servingsMatch = line.match(/\d+/);
      recipe.servings = servingsMatch ? parseInt(servingsMatch[0]) : 2;
    } else if (line.toLowerCase().includes('ingredients:')) {
      currentSection = 'ingredients';
    } else if (line.toLowerCase().includes('instructions:')) {
      currentSection = 'instructions';
    } else if (line.toLowerCase().includes('nutritional information')) {
      currentSection = 'nutrition';
    } else if (line.toLowerCase().includes('variations:')) {
      currentSection = 'variations';
    } else if (currentSection === 'nutrition') {
      nutritionLines.push(line);
    } else if (currentSection && line.trim()) {
      const cleanLine = line.replace(/^[-•*]\s*/, '').trim();
      if (cleanLine) {
        if (currentSection === 'ingredients') {
          recipe.ingredients!.push(cleanLine);
        } else if (currentSection === 'instructions') {
          recipe.instructions!.push(cleanLine);
        } else if (currentSection === 'variations') {
          recipe.variations!.push(cleanLine);
        }
      }
    }
  }

  recipe.nutritionalInfo = parseNutritionInfo(nutritionLines);
  recipe.calories = recipe.nutritionalInfo.calories;

  return recipe as Recipe;
}