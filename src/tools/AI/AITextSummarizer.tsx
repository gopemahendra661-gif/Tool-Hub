import React from 'react';
import { AITool } from '../../components/AITool';
import { ToolComponentProps } from '../../types';

export const AITextSummarizer: React.FC<ToolComponentProps> = ({ tool }) => {
  return (
    <AITool 
      tool={tool} 
      placeholder="Paste your long text or document here to summarize..."
      systemPrompt="AI Text Summarizer. Provide a concise and accurate summary of the provided text. Use bullet points for key takeaways and a short paragraph for the overall summary."
    />
  );
};
