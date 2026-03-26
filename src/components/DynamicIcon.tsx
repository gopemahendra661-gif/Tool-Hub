import React, { lazy, Suspense } from 'react';
import { LucideProps, HelpCircle } from 'lucide-react';

interface DynamicIconProps extends LucideProps {
  name: string;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, ...props }) => {
  // Use lazy to dynamically import the icon from lucide-react
  // This helps with tree-shaking and reduces the initial bundle size
  const IconComponent = lazy(() => 
    import('lucide-react').then((module) => {
      const Icon = (module as any)[name];
      if (!Icon) {
        return { default: HelpCircle };
      }
      return { default: Icon };
    })
  );

  return (
    <Suspense fallback={<div className="w-6 h-6 bg-neutral-100 animate-pulse rounded" />}>
      <IconComponent {...props} />
    </Suspense>
  );
};
