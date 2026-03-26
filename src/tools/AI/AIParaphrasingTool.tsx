import React from 'react';
import { AITool } from '../../components/AITool';
import { ToolComponentProps } from '../../types';

export const AIParaphrasingTool: React.FC<ToolComponentProps> = ({ tool }) => {
  return (
    <AITool 
      tool={tool} 
      placeholder="Paste the text you want to paraphrase or rewrite..."
      systemPrompt="AI Paraphrasing Tool. Rewrite the provided text to improve clarity and flow while maintaining the original meaning. Provide 2-3 different variations (e.g., Formal, Creative, Simple)."
    />
  );
};
