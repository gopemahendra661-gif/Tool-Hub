import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogImage = 'https://picsum.photos/seed/toolhub/1200/630',
  ogType = 'website',
}) => {
  const siteName = 'My Tool Hub';
  const fullTitle = `${title} | ${siteName}`;
  const baseUrl = 'https://mytoolhub.info';
  
  // Automatically generate canonical URL if not provided
  const currentPath = window.location.pathname + window.location.search;
  const finalCanonicalUrl = canonicalUrl || `${baseUrl}${currentPath}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:url" content={finalCanonicalUrl} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@MyTooHub" />
      <meta name="twitter:creator" content="@MyTooHub" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      <link rel="canonical" href={finalCanonicalUrl} />
    </Helmet>
  );
};
