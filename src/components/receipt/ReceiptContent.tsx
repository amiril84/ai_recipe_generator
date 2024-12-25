import React from 'react';
import { InstructionsSection } from './sections/InstructionsSection';
import { IngredientsSection } from './sections/IngredientsSection';
import { NutritionSection } from './sections/NutritionSection';
import { cleanupText } from '../../lib/textUtils';

interface ReceiptContentProps {
  ingredients: string[];
  instructions: string[];
}

export function ReceiptContent({ ingredients = [], instructions = [] }: ReceiptContentProps) {
  // Separate nutritional info from instructions
  const { mainInstructions, nutritionInfo } = separateNutritionalInfo(instructions);
  const cleanIngredients = ingredients.map(cleanupText);

  return (
    <div className="space-y-8">
      <IngredientsSection ingredients={cleanIngredients} />
      <InstructionsSection instructions={mainInstructions} />
      {nutritionInfo.length > 0 && <NutritionSection nutritionInfo={nutritionInfo} />}
    </div>
  );
}

function separateNutritionalInfo(instructions: string[] = []) {
  const nutritionStartIndex = instructions.findIndex(inst => 
    inst.toLowerCase().includes('nutritional information') ||
    inst.toLowerCase().includes('calories:')
  );

  if (nutritionStartIndex === -1) {
    return { mainInstructions: instructions, nutritionInfo: [] };
  }

  return {
    mainInstructions: instructions.slice(0, nutritionStartIndex),
    nutritionInfo: instructions.slice(nutritionStartIndex)
  };
}