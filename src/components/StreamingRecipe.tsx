import { useEffect, useRef } from 'react';

interface StreamingRecipeProps {
  content: string;
  isStreaming: boolean;
}

export function StreamingRecipe({ content, isStreaming }: StreamingRecipeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [content]);

  const formatContent = (content: string) => {
    try {
      // Try to find and format JSON content
      const startIdx = content.indexOf('{');
      const endIdx = content.lastIndexOf('}') + 1;
      if (startIdx !== -1 && endIdx !== -1) {
        const jsonContent = content.slice(startIdx, endIdx);
        const parsed = JSON.parse(jsonContent);
        return JSON.stringify(parsed, null, 2);
      }
    } catch {
      // If not valid JSON or can't parse, return as is
    }
    return content;
  };

  const formatStreamingContent = (content: string) => {
    // Remove any JSON content between tags
    const cleanContent = content.replace(/---JSON---[\s\S]*?---JSON---/g, '').trim();
    
    // Split into sections
    const sections = cleanContent.split('\n').map(line => {
      // Format bullet points for ingredients
      if (line.trim().startsWith('•')) {
        return `<li class="ml-4">• ${line.trim().substring(1).trim()}</li>`;
      }
      
      // Format numbered instructions
      if (/^\d+\./.test(line.trim())) {
        return `<li class="ml-4 mb-2">${line.trim()}</li>`;
      }
      
      // Format section headers
      if (line.includes(':')) {
        const [header, ...rest] = line.split(':');
        const content = rest.join(':').trim();
        if (header.trim() === 'Ingredients' || header.trim() === 'Instructions') {
          return `<h3 class="text-xl font-semibold mt-6 mb-3">${header.trim()}:</h3>${content ? `<p>${content}</p>` : ''}`;
        }
        if (header.trim() === 'Title') {
          return `<h2 class="text-3xl font-bold mb-4">${content}</h2>`;
        }
        return `<div class="mb-2"><strong>${header.trim()}:</strong> ${content}</div>`;
      }
      
      return `<p class="mb-2">${line}</p>`;
    });

    return sections.join('\n');
  };

  return (
    <div 
      ref={containerRef}
      className="bg-white rounded-lg shadow-lg p-8 mt-8 overflow-auto max-h-[600px]"
    >
      <div className="mb-4 flex items-center gap-2">
        <div className={`${isStreaming ? 'animate-pulse' : ''} text-blue-500`}>⚡</div>
        <span className="text-gray-500">
          {isStreaming ? 'Generating your recipe...' : 'Recipe generated!'}
        </span>
      </div>
      {isStreaming ? (
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ 
            __html: formatStreamingContent(content) || 'Preparing your recipe...'
          }}
        />
      ) : (
        <pre className="font-mono text-sm whitespace-pre-wrap overflow-x-auto bg-gray-50 p-4 rounded-lg">
          {formatContent(content) || 'Preparing your recipe...'}
        </pre>
      )}
    </div>
  );
}
