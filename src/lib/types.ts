export interface Recipe {
  title: string;
  origin?: string;
  servings: number;
  prepTime: string;
  calories: number;
  ingredients: string[];
  instructions: string[];
  dietary?: string;
  nutritionalInfo: NutritionalInfo;
  variations?: string[];
  imageUrl?: string;
}

export interface NutritionalInfo {
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
}

export interface GenerateRecipeParams {
  meal: string;
  servings: number;
  dietary?: string;
}