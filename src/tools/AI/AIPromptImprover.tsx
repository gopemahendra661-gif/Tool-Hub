import React from 'react';
import { AITool } from '../../components/AITool';
import { ToolComponentProps } from '../../types';

export const AIPromptImprover: React.FC<ToolComponentProps> = ({ tool }) => {
  return (
    <AITool 
      tool={tool} 
      placeholder="Paste your basic AI prompt here (e.g., 'Write a story about a cat')..."
      systemPrompt="AI Prompt Improver. Your goal is to take a simple, basic, or poorly constructed AI prompt and turn it into a high-quality, detailed, and effective prompt that will yield better results from LLMs like ChatGPT, Claude, or Gemini. Focus on adding context, specifying tone, defining constraints, and providing clear instructions."
    />
  );
};
