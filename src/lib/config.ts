interface Config {
  openai: {
    apiKey: string;
  };
}

function validateConfig(): Config {
  const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!openaiApiKey) {
    throw new Error(
      'OpenAI API key is missing. Please add VITE_OPENAI_API_KEY to your .env file.'
    );
  }

  return {
    openai: {
      apiKey: openaiApiKey
    }
  };
}

export const config = validateConfig();