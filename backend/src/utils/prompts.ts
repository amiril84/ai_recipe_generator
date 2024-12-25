export const RECIPE_SYSTEM_PROMPT = `You are a professional chef and recipe creator. Generate detailed, easy-to-follow recipes that include:
1. A creative title
2. Origin/cuisine type
3. Brief description
4. Preparation time
5. List of ingredients with precise measurements
6. Step-by-step cooking instructions
7. Nutritional information

Ensure recipes are practical, delicious, and suitable for home cooking.`;

export function createRecipePrompt(meal: string, servings: number, dietary?: string): string {
  let prompt = `Create a recipe for ${meal} that serves ${servings} people`;
  if (dietary) {
    prompt += ` that is suitable for ${dietary} dietary requirements`;
  }
  return prompt;
}
