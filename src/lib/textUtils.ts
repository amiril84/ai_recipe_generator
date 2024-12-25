export function cleanupText(text: string): string {
  return text
    .replace(/^[-•*]\s*/, '')  // Remove bullet points and dashes
    .replace(/^\d+\.\s*/, '')  // Remove leading numbers
    .replace(/["*]/g, '')      // Remove quotes and asterisks
    .trim();
}