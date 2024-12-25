import { useState, useCallback } from 'react';
import { MealForm } from './components/MealForm';
import { Receipt } from './components/Receipt';
import { ErrorMessage } from './components/ErrorMessage';
import { ErrorBoundary } from './components/ErrorBoundary';
import { StreamingRecipe } from './components/StreamingRecipe';
import { useOpenAIStream } from './lib/hooks/useOpenAIStream';
import type { GenerateRecipeParams } from './lib/types';

function App() {
  const [error, setError] = useState<string | null>(null);
  const {
    recipe,
    streamContent,
    isStreaming,
    isGeneratingImage,
    generateRecipe
  } = useOpenAIStream();

  const handleGenerateReceipt = useCallback(async (data: GenerateRecipeParams) => {
    try {
      setError(null);
      await generateRecipe(data);
    } catch (error) {
      console.error('Error generating recipe:', error);
      setError(
        error instanceof Error 
          ? error.message 
          : 'Failed to generate recipe. Please try again.'
      );
    }
  }, [generateRecipe]);

  // Show either streaming content or final recipe, not both
  const showStreaming = isStreaming || (streamContent && !recipe);
  const showRecipe = !isStreaming && recipe;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <span className="text-4xl">👨‍🍳</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Recipe Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enter your desired meal and we'll generate a detailed recipe with
            instructions, nutritional information, and more.
          </p>
        </div>

        <div className="max-w-xl mx-auto mb-12">
          <MealForm onSubmit={handleGenerateReceipt} isLoading={isStreaming || isGeneratingImage} />
          {error && (
            <div className="mt-4">
              <ErrorMessage message={error} />
            </div>
          )}
        </div>

        {showStreaming && (
          <StreamingRecipe content={streamContent} isStreaming={isStreaming} />
        )}
        
        {showRecipe && (
          <div className="mt-12 animate-fade-in">
            <Receipt recipe={recipe} isGeneratingImage={isGeneratingImage} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function AppWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}