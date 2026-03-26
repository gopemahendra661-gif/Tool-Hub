import React from 'react';
import { AITool } from '../../components/AITool';
import { ToolComponentProps } from '../../types';

export const AIContentWriter: React.FC<ToolComponentProps> = ({ tool }) => {
  return (
    <AITool 
      tool={tool} 
      placeholder="Enter a topic or title for your blog post (e.g., 'The Future of Remote Work')..."
      systemPrompt="AI Content Writer. Generate a high-quality, SEO-optimized blog post or article based on the provided topic. Include headings, an introduction, detailed body paragraphs, and a conclusion."
    />
  );
};
