import React from 'react';
import { AITool } from '../../components/AITool';
import { ToolComponentProps } from '../../types';

export const AIYouTubeScriptGenerator: React.FC<ToolComponentProps> = ({ tool }) => {
  return (
    <AITool 
      tool={tool} 
      placeholder="Enter your video topic or title (e.g., '10 Tips for Better Photography')..."
      systemPrompt="AI YouTube Script Generator. Create an engaging YouTube video script based on the provided topic. Include a catchy intro, a clear outline with main points, and a strong call-to-action (CTA) at the end."
    />
  );
};
