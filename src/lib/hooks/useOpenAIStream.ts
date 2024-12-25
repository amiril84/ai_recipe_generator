import { useState, useCallback } from 'react';
import { openaiAPI, generateImage } from '../openai';
import { RECIPE_SYSTEM_PROMPT, createRecipePrompt } from '../prompts';
import type { Recipe, GenerateRecipeParams } from '../types';

const getDifficulty = (prepTime: string): 'Easy' | 'Medium' | 'Hard' => {
  const minutes = parseInt(prepTime.match(/\d+/)?.[0] || '0');
  if (minutes <= 30) return 'Easy';
  if (minutes <= 60) return 'Medium';
  return 'Hard';
};

const SYSTEM_INSTRUCTION = `${RECIPE_SYSTEM_PROMPT}
Format your response in a step-by-step manner as you generate it:

1. First, write "Title:" followed by the recipe name
2. Then write "Origin:" followed by the cuisine origin
3. Then write "Description:" followed by a brief description
4. Then write "Preparation Time:" followed by the total time needed in minutes
5. Then write "Ingredients:" followed by each ingredient on a new line with a bullet point
6. Then write "Instructions:" followed by each step numbered on a new line
7. Finally, write "Nutritional Information:" followed by the nutritional details

After completing the above, SILENTLY (without any visible output) provide the recipe data in JSON format between ---JSON--- tags.

Example format:
Title: [Recipe Name]
Origin: [Origin]
Description: [Description]
...and so on`;

export function useOpenAIStream() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamContent, setStreamContent] = useState('');
  const [hasJson, setHasJson] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const generateRecipe = useCallback(async (params: GenerateRecipeParams) => {
    setIsStreaming(true);
    setRecipe(null);
    setStreamContent('');
    setHasJson(false);
    setIsGeneratingImage(false);

    try {
      const stream = await openaiAPI.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: SYSTEM_INSTRUCTION },
          { role: 'user', content: createRecipePrompt(params.meal, params.servings, params.dietary) }
        ],
        temperature: 0.7,
        stream: true,
      });

      let fullContent = '';
      
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        fullContent += content;

        // Check if we have JSON data
        const jsonMatch = fullContent.match(/---JSON---([\s\S]*?)---JSON---/);
        if (jsonMatch && !hasJson) {
          setHasJson(true);
          try {
            const jsonContent = jsonMatch[1].trim();
            const parsedRecipe = JSON.parse(jsonContent) as Recipe;
            
            // Add or modify properties
            parsedRecipe.servings = params.servings;
            parsedRecipe.dietary = params.dietary || '';
            parsedRecipe.difficulty = getDifficulty(parsedRecipe.prepTime);
            
            // Generate image after recipe is parsed
            setIsGeneratingImage(true);
            const imageUrl = await generateImage(parsedRecipe.title);
            parsedRecipe.imageUrl = imageUrl;
            setIsGeneratingImage(false);
            
            setRecipe(parsedRecipe);
          } catch (e) {
            console.error('Failed to parse recipe JSON:', e);
          }
        }

        // Only update visible content if it's before the JSON section
        const visibleContent = fullContent.split('---JSON---')[0];
        setStreamContent(visibleContent);
      }
    } catch (error) {
      console.error('Error generating recipe:', error);
      throw error;
    } finally {
      setIsStreaming(false);
    }
  }, []);

  return {
    recipe,
    isStreaming,
    isGeneratingImage,
    generateRecipe,
    streamContent
  };
}
