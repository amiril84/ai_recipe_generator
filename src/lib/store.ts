import { create } from 'zustand';
import { Recipe } from './types';

interface RecipeStore {
  recipe: Partial<Recipe> | null;
  isLoading: boolean;
  error: string | null;
  setRecipe: (recipe: Partial<Recipe>) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialRecipe: Partial<Recipe> = {
  title: '',
  ingredients: [],
  instructions: [],
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

export const useRecipeStore = create<RecipeStore>((set) => ({
  recipe: null,
  isLoading: false,
  error: null,
  setRecipe: (recipe) => set((state) => ({
    recipe: {
      ...initialRecipe,
      ...state.recipe,
      ...recipe
    }
  })),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  reset: () => set({ recipe: null, error: null })
}));