import React, { useState } from 'react';
import { AITool } from '../../components/AITool';
import { ToolComponentProps } from '../../types';
import { CaptionUpgradeSystem } from '../../components/CaptionUpgradeSystem';

export const AIInstagramCaptionGenerator: React.FC<ToolComponentProps> = ({ tool }) => {
  const [hasGenerated, setHasGenerated] = useState(false);

  return (
    <AITool 
      tool={tool} 
      placeholder="Describe your photo or video (e.g., 'A sunset at the beach with friends')..."
      systemPrompt="AI Instagram Caption Generator. Create catchy, engaging, and creative Instagram captions based on the provided topic. Include relevant hashtags and emojis. Provide multiple options (e.g., Funny, Aesthetic, Short, Professional)."
      onSuccess={() => setHasGenerated(true)}
      renderAfterOutput={() => (
        <CaptionUpgradeSystem onGenerateTrigger={hasGenerated} />
      )}
    />
  );
};
