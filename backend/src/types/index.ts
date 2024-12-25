export interface Recipe {
  title: string;
  origin: string;
  description: string;
  prepTime: string;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: string[];
  instructions: string[];
  nutritionalInfo: Record<string, string>;
  dietary?: string;
  imageUrl?: string;
  tags?: string[];
}

export interface GenerateRecipeParams {
  meal: string;
  servings: number;
  dietary?: string;
}
