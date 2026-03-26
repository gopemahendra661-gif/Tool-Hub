import React from 'react';
import { AITool } from '../../components/AITool';
import { ToolComponentProps } from '../../types';

export const AILinkedInPostGenerator: React.FC<ToolComponentProps> = ({ tool }) => {
  return (
    <AITool 
      tool={tool} 
      placeholder="What is your LinkedIn post about? (e.g., 'A lesson I learned about leadership')..."
      systemPrompt="AI LinkedIn Post Generator. Create high-impact, professional, and engaging LinkedIn posts based on the provided topic. Use a hook at the beginning, break text into readable paragraphs, and include relevant hashtags. Aim for a mix of personal storytelling and professional insight."
    />
  );
};
