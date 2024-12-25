import { Router } from 'express';
import { generateRecipe, generateImage } from '../services/openai';

const router = Router();

router.post('/generate', async (req, res) => {
  try {
    const { meal, servings, dietary } = req.body;
    const recipe = await generateRecipe({ meal, servings, dietary });
    res.json(recipe);
  } catch (error) {
    console.error('Error generating recipe:', error);
    res.status(500).json({ error: 'Failed to generate recipe' });
  }
});

router.post('/generate-image', async (req, res) => {
  try {
    const { prompt } = req.body;
    const imageUrl = await generateImage(prompt);
    res.json({ imageUrl });
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
});

export const recipeRouter = router;
