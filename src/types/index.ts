import { LucideIcon } from 'lucide-react';

export type Category = 'Text' | 'Image' | 'Developer' | 'Calculator' | 'Utility' | 'AI';

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: Category;
  icon: string; // Icon name from lucide-react
  slug: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  faq: { question: string; answer: string }[];
  content?: string;
  trending?: boolean;
  popular?: boolean;
}

export interface ToolComponentProps {
  tool: Tool;
}
