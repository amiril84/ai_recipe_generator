import React from 'react';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { GenerateRecipeParams } from '../lib/types';

interface MealFormProps {
  onSubmit: (data: GenerateRecipeParams) => void;
  isLoading?: boolean;
}

export function MealForm({ onSubmit, isLoading }: MealFormProps) {
  const [meal, setMeal] = React.useState('');
  const [servings, setServings] = React.useState(2);
  const [dietary, setDietary] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ meal, servings, dietary });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="meal" className="block text-sm font-medium text-gray-700 mb-1">
            What would you like to cook?
          </label>
          <Input
            id="meal"
            type="text"
            placeholder="Enter a meal (e.g., Spaghetti Carbonara, Chicken Curry)"
            value={meal}
            onChange={(e) => setMeal(e.target.value)}
            required
            className="w-full h-12 text-lg"
            disabled={isLoading}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="servings" className="block text-sm font-medium text-gray-700 mb-1">
              Number of Servings
            </label>
            <Input
              id="servings"
              type="number"
              value={servings}
              onChange={(e) => setServings(Number(e.target.value))}
              min={1}
              max={12}
              required
              className="w-full h-12 text-lg"
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="dietary" className="block text-sm font-medium text-gray-700 mb-1">
              Dietary Preferences
            </label>
            <Input
              id="dietary"
              type="text"
              placeholder="e.g., vegetarian, gluten-free"
              value={dietary}
              onChange={(e) => setDietary(e.target.value)}
              className="w-full h-12 text-lg"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        isLoading={isLoading}
        className="w-full h-12 text-lg font-medium"
      >
        Generate Recipe
      </Button>
    </form>
  );
}