import React from 'react';
import { AITool } from '../../components/AITool';
import { ToolComponentProps } from '../../types';

export const AISeoTitleGenerator: React.FC<ToolComponentProps> = ({ tool }) => {
  return (
    <AITool 
      tool={tool} 
      placeholder="Enter your topic or main keyword (e.g., 'Best Vegan Recipes')..."
      systemPrompt="AI SEO Title Generator. Generate 10 catchy and SEO-optimized titles for a blog post or web page based on the provided keyword. Focus on high click-through rates (CTR) and keyword placement."
    />
  );
};
