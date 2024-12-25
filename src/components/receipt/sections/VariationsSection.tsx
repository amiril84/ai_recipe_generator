import React from 'react';
import { Sparkles } from 'lucide-react';

interface VariationsSectionProps {
  variations: string[];
}

export function VariationsSection({ variations }: VariationsSectionProps) {
  if (!variations?.length) return null;

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-blue-600" />
        <h3 className="font-semibold text-lg text-gray-900">Variations</h3>
      </div>
      <ul className="space-y-3">
        {variations.map((variation, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-blue-400" />
            <span className="text-gray-700">{variation}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}