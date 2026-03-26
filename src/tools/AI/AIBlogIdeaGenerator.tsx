import React from 'react';
import { AITool } from '../../components/AITool';
import { ToolComponentProps } from '../../types';

export const AIBlogIdeaGenerator: React.FC<ToolComponentProps> = ({ tool }) => {
  return (
    <AITool 
      tool={tool} 
      placeholder="Enter your niche or a broad topic (e.g., 'Fitness', 'Digital Marketing', 'Cooking')..."
      systemPrompt="AI Blog Idea Generator. Generate unique, trending, and viral blog post ideas and catchy titles for the provided niche. Provide a list of 10-15 ideas with brief descriptions of what each post could cover."
    />
  );
};
