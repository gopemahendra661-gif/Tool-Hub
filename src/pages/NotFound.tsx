import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { SEO } from '../components/SEO';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

const NotFound: React.FC = () => {
  return (
    <Layout>
      <SEO 
        title="404 - Page Not Found" 
        description="The page you are looking for does not exist on My Tool Hub. Explore our 50+ free online tools instead."
      />
      
      <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24 bg-neutral-50">
        <div className="max-w-md w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-indigo-100 text-indigo-600 mb-8 shadow-sm border border-indigo-200">
              <span className="text-4xl font-black">404</span>
            </div>
            
            <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight sm:text-4xl mb-4">
              Oops! Page not found
            </h1>
            
            <p className="text-lg text-neutral-600 mb-10">
              The page you're looking for doesn't exist or has been moved. Don't worry, you can find plenty of useful tools on our homepage.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 transition-all duration-200"
              >
                <Home size={18} className="mr-2" />
                Back to Home
              </Link>
              
              <Link
                to="/tools"
                className="inline-flex items-center justify-center px-6 py-3 border border-neutral-200 text-base font-medium rounded-xl text-neutral-700 bg-white hover:bg-neutral-50 shadow-sm transition-all duration-200"
              >
                <Search size={18} className="mr-2" />
                Explore Tools
              </Link>
            </div>
            
            <div className="mt-12 pt-8 border-t border-neutral-200">
              <p className="text-sm text-neutral-500 mb-4">Popular tools you might be looking for:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Word Counter', 'JSON Formatter', 'Password Generator', 'BMI Calculator'].map((tool) => (
                  <Link
                    key={tool}
                    to={`/tools/${tool.toLowerCase().replace(/ /g, '-')}`}
                    className="px-3 py-1 bg-neutral-100 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg text-xs font-medium text-neutral-600 transition-colors"
                  >
                    {tool}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
