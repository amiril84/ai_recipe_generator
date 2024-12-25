import React from 'react';
import { Activity } from 'lucide-react';
import { NutritionalInfo } from '../../../lib/types';

interface NutritionSectionProps {
  nutritionalInfo?: NutritionalInfo;
}

interface NutritionItem {
  label: string;
  value: string;
  unit: string;
}

export function NutritionSection({ nutritionalInfo }: NutritionSectionProps) {
  if (!nutritionalInfo) return null;

  const items: NutritionItem[] = [
    { label: 'Calories', value: nutritionalInfo.calories.toString(), unit: 'kcal' },
    { label: 'Protein', value: nutritionalInfo.protein.toString(), unit: 'g' },
    { label: 'Carbohydrates', value: nutritionalInfo.carbohydrates.toString(), unit: 'g' },
    { label: 'Fat', value: nutritionalInfo.fat.toString(), unit: 'g' },
    { label: 'Fiber', value: nutritionalInfo.fiber.toString(), unit: 'g' },
    { label: 'Sugar', value: nutritionalInfo.sugar.toString(), unit: 'g' },
    { label: 'Sodium', value: nutritionalInfo.sodium.toString(), unit: 'mg' },
  ];

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="h-5 w-5 text-blue-600" />
        <h3 className="font-semibold text-lg text-gray-900">Nutritional Information</h3>
        <span className="text-sm text-gray-500">(Per Serving)</span>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item, i) => (
          <div key={i} className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">{item.label}</div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-semibold text-gray-900">
                {item.value}
              </span>
              <span className="text-sm text-gray-600">{item.unit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}