import type { Recipe } from '../lib/types';

interface ReceiptProps {
  recipe: Recipe;
  isGeneratingImage?: boolean;
}

export function Receipt({ recipe, isGeneratingImage }: ReceiptProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      {/* Header with Image */}
      <div className="text-center mb-8">
        {(isGeneratingImage || recipe.imageUrl) && (
          <div className="relative -mx-8 mb-8 h-[400px] bg-gray-50">
            {isGeneratingImage ? (
              <div className="absolute inset-0 animate-pulse flex items-center justify-center">
                <div className="text-gray-400">Generating image...</div>
              </div>
            ) : recipe.imageUrl ? (
              <img 
                src={recipe.imageUrl} 
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
            ) : null}
          </div>
        )}
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{recipe.title}</h2>
        {recipe.origin && (
          <p className="text-lg text-gray-600">From {recipe.origin}</p>
        )}
      </div>

      {/* Recipe Info Grid */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-600">Prep Time</p>
          <p className="font-semibold">{recipe.prepTime}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-600">Servings</p>
          <p className="font-semibold">{recipe.servings}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-600">Difficulty</p>
          <p className="font-semibold capitalize">{recipe.difficulty}</p>
        </div>
      </div>

      {/* Description */}
      {recipe.description && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Description</h3>
          <p className="text-gray-700">{recipe.description}</p>
        </div>
      )}

      {/* Two Column Layout for Ingredients and Instructions */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Ingredients */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">•</span>
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Instructions</h3>
          <ol className="space-y-4">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="flex">
                <span className="font-bold mr-2">{index + 1}.</span>
                <span>{instruction}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Nutritional Information */}
      {recipe.nutritionalInfo && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Nutritional Information</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.entries(recipe.nutritionalInfo).map(([key, value]) => (
              <div key={key} className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600 capitalize">{key}</p>
                <p className="font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      {recipe.tags && recipe.tags.length > 0 && (
        <div className="mt-8">
          <div className="flex flex-wrap gap-2">
            {recipe.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}