import React from 'react';
import { Clock, Users, MapPin } from 'lucide-react';

interface ReceiptHeaderProps {
  title: string;
  origin?: string;
  servings: number;
  prepTime: string;
  dietary?: string;
}

export function ReceiptHeader({ title, origin, servings, prepTime, dietary }: ReceiptHeaderProps) {
  const cleanTitle = title?.replace(/^#+\s*/, '').trim() || 'Recipe';

  return (
    <div className="border-b pb-4 mb-4">
      <h2 className="text-2xl font-bold text-gray-800">{cleanTitle}</h2>
      {origin && (
        <div className="flex items-center gap-1 text-gray-600 mt-1">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{origin}</span>
        </div>
      )}
      <div className="flex gap-4 mt-2 text-gray-600">
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          <span>{servings} servings</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{prepTime}</span>
        </div>
      </div>
      {dietary && (
        <div className="mt-2">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {dietary}
          </span>
        </div>
      )}
    </div>
  );
}