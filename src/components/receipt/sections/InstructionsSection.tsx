import React from 'react';
import { ChefHat } from 'lucide-react';

interface InstructionsSectionProps {
  instructions: string[];
}

export function InstructionsSection({ instructions }: InstructionsSectionProps) {
  const processedInstructions = instructions.map(instruction => ({
    isHeader: isHeaderInstruction(instruction),
    text: cleanInstructionText(instruction)
  }));

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <ChefHat className="h-5 w-5 text-blue-600" />
        <h3 className="font-semibold text-lg text-gray-900">Instructions</h3>
      </div>
      <div className="space-y-6">
        {processedInstructions.map((instruction, i) => (
          <React.Fragment key={i}>
            {instruction.isHeader ? (
              <div className="mt-8 first:mt-0">
                <h4 className="text-lg font-semibold text-blue-800 border-b border-blue-100 pb-2">
                  {instruction.text}
                </h4>
              </div>
            ) : (
              <div className="flex gap-4 items-start pl-4">
                <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-blue-200" />
                <p className="text-gray-700 leading-relaxed">{instruction.text}</p>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function isHeaderInstruction(instruction: string): boolean {
  // A line is a header if it ends with a colon or starts with a header keyword
  const headerPattern = /:$/;
  const headerKeywords = ['prepare', 'preparing', 'cook', 'cooking', 'make', 'making', 'serve', 'serving'];
  const lowercaseInstruction = instruction.toLowerCase().trim();
  
  return (
    headerPattern.test(instruction) || 
    headerKeywords.some(keyword => lowercaseInstruction.startsWith(keyword))
  );
}

function cleanInstructionText(instruction: string): string {
  return instruction
    .replace(/^\d+\.\s*/, '')     // Remove leading numbers
    .replace(/[*"]/g, '')         // Remove asterisks and quotes
    .replace(/^-\s*/, '')         // Remove leading dashes
    .replace(/:\s*$/, '')         // Remove trailing colons
    .trim();
}