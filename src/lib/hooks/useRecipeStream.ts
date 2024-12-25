import { useState, useCallback } from 'react';
import { useChatCompletion } from 'openai-streaming-hooks';
import { config } from '../config';
import { RECIPE_SYSTEM_PROMPT, createRecipePrompt } from '../prompts';
import { Recipe, GenerateRecipeParams } from '../types';

export function useRecipeStream() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  const { messages, submitPrompt, isLoading } = useChatCompletion({
    model: 'gpt-4',
    apiKey: config.openai.apiKey,
    temperature: 0.7,
    stream: true,
    maxTokens: 1500,
    options: {
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        response_format: { type: "json_object" }
      }
    }
  });

  const generateRecipe = useCallback(async (params: GenerateRecipeParams) => {
    setRecipe(null); // Reset recipe state
    await submitPrompt([
      { role: 'system', content: RECIPE_SYSTEM_PROMPT },
      { role: 'user', content: createRecipePrompt(params.meal, params.servings, params.dietary) }
    ]);
  }, [submitPrompt]);

  // Process latest message
  const latestMessage = messages[messages.length - 1];
  
  if (latestMessage?.role === 'assistant' && !latestMessage.meta.loading) {
    try {
      const content = latestMessage.content.trim();
      // Only try to parse if it looks like valid JSON
      if (content.startsWith('{') && content.endsWith('}')) {
        const parsedRecipe = JSON.parse(content) as Recipe;
        if (parsedRecipe && !recipe) {
          parsedRecipe.imageUrl = undefined; // We'll generate this later
          setRecipe(parsedRecipe);
        }
      }
    } catch (e) {
      console.error('Failed to parse recipe JSON:', e);
    }
  }

  return {
    recipe,
    isLoading,
    generateRecipe,
    streamingContent: latestMessage?.content || '',
    isStreaming: latestMessage?.meta.loading || false
  };
}
