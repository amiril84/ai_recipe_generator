# Recipe Generator with OpenAI

An elegant, real-time recipe generation application powered by OpenAI's GPT-4 and DALL-E 3. Watch as your recipe comes to life with streaming content generation and beautiful AI-generated food photography. Built with modern web technologies and a focus on user experience.

## ✨ Features

### Core Features
- 🔄 Real-time recipe streaming as it's being generated
- 📸 Professional food photography using DALL-E 3
- 📝 Detailed, step-by-step cooking instructions
- 🥗 Customizable serving sizes and dietary preferences
- 📊 Comprehensive nutritional information

### User Experience
- ⚡ Instant feedback with streaming content generation
- 🎨 Beautiful, responsive design with smooth animations
- 🔍 Clear, well-organized recipe presentation
- ⏱️ Smart difficulty estimation based on preparation time
- 💫 Elegant loading states and transitions

### Technical Features
- 🔐 Secure OpenAI API integration
- 🎯 Type-safe development with TypeScript
- 🛠️ Custom streaming implementation
- 📱 Mobile-first responsive design
- 🔄 Efficient state management

## 🚀 Technology Stack

### Core Technologies
- **React 18** - For building the user interface
- **TypeScript** - For type-safe code
- **Vite** - For fast development and building
- **Tailwind CSS** - For modern, utility-first styling

### AI Integration
- **OpenAI GPT-4** - For intelligent recipe generation
- **DALL-E 3** - For creating appetizing food images
- **Custom Streaming** - For real-time content updates

### Development Tools
- **ESLint** - For code quality
- **Prettier** - For consistent code formatting
- **React DevTools** - For component debugging

## 📝 Changelog

### December 25, 2024 - 10:48 AM
#### Code Modernization and Cleanup
- Removed unnecessary React imports using new JSX transform
- Updated component imports for better efficiency
- Improved code organization and readability

### December 25, 2024 - 10:38 AM
#### Performance and Build Optimization
- Enhanced Vite configuration with better build options
- Added source map generation for debugging
- Implemented vendor chunk splitting for React
- Added custom animation utilities in Tailwind
- Improved loading state animations

### December 25, 2024 - 10:14 AM
#### Image Generation and UI Updates
- Fixed image container styling for better balance
- Added edge-to-edge image display
- Improved loading states and transitions
- Enhanced typography and spacing

### December 25, 2024 - 10:08 AM
#### Streaming Implementation
- Added real-time recipe generation streaming
- Implemented custom streaming hook
- Enhanced error handling and state management
- Added formatted streaming output
- Integrated DALL-E 3 for image generation

## Project Structure

```
src/
├── components/                 # React components
│   ├── ErrorBoundary.tsx      # Error handling wrapper
│   ├── ErrorMessage.tsx       # Error display component
│   ├── MealForm.tsx          # Recipe input form
│   ├── Receipt.tsx           # Main recipe display component
│   └── StreamingRecipe.tsx   # Real-time recipe generation display
├── lib/                      # Utility functions and hooks
│   ├── hooks/               
│   │   └── useOpenAIStream.ts # Custom streaming hook for OpenAI
│   ├── config.ts            # Application configuration
│   ├── openai.ts            # OpenAI client and image generation
│   ├── prompts.ts           # GPT-4 system and user prompts
│   └── types.ts             # TypeScript type definitions
├── styles/
│   └── index.css            # Global styles and animations
├── App.tsx                  # Main application component
└── main.tsx                # Application entry point
```

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/recipe-generator-with-bolt.git
cd recipe-generator-with-bolt
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your OpenAI API key:
```env
VITE_OPENAI_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_OPENAI_API_KEY` | Your OpenAI API key for GPT-4 and DALL-E 3 access |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenAI for providing the GPT-4 and DALL-E 3 APIs
- The React community for excellent tools and libraries