import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';
import { Tool } from '../types';
import { motion } from 'motion/react';
import { DynamicIcon } from './DynamicIcon';

interface ToolCardProps {
  tool: Tool;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-100 transition-all duration-300"
    >
      <Link to={`/tools/${tool.slug}`} className="absolute inset-0 z-10" aria-label={tool.name} />
      
      {tool.popular && (
        <div className="absolute top-4 right-4 z-20">
          <span className="inline-flex items-center px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-700 border border-amber-200 shadow-sm">
            <Star size={10} className="mr-1 fill-amber-500" />
            Most Popular
          </span>
        </div>
      )}
      
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-neutral-50 rounded-xl flex items-center justify-center text-neutral-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
          <DynamicIcon name={tool.icon} size={24} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-neutral-900 mb-1 group-hover:text-indigo-600 transition-colors truncate">
            {tool.name}
          </h3>
          <p className="text-sm text-neutral-600 line-clamp-2 leading-relaxed">
            {tool.description}
          </p>
        </div>
      </div>
      
      <div className="mt-6 flex items-center justify-between">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-600 group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-colors">
          {tool.category}
        </span>
        <div className="text-neutral-400 group-hover:text-indigo-400 transition-colors">
          <ArrowRight size={18} />
        </div>
      </div>
    </motion.div>
  );
};
