import React from 'react';
import { ImageIcon } from 'lucide-react';

interface RecipeImageProps {
  imageUrl?: string;
  title: string;
}

export function RecipeImage({ imageUrl, title }: RecipeImageProps) {
  if (!imageUrl) return null;

  return (
    <div className="relative rounded-lg overflow-hidden mb-6">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-[400px] object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h2 className="text-3xl font-bold text-white">{title}</h2>
      </div>
    </div>
  );
}