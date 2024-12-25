import React from 'react';
import { ListChecks } from 'lucide-react';

interface IngredientsSectionProps {
  ingredients: string[];
}

export function IngredientsSection({ ingredients }: IngredientsSectionProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <ListChecks className="h-5 w-5 text-blue-600" />
        <h3 className="font-semibold text-lg text-gray-900">Ingredients</h3>
      </div>
      <ul className="grid gap-2">
        {ingredients.map((ingredient, i) => (
          <li key={i} className="flex items-start gap-2">
            <div className="min-w-4 h-4 w-4 mt-1 rounded border border-blue-200 bg-blue-50" />
            <span className="text-gray-700">{ingredient}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}