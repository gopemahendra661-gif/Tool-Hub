export default function handler(req, res) {
  const baseUrl = "https://mytoolhub.info";

  const toolSlugs = [
    'word-counter', 'character-counter', 'case-converter', 'json-formatter',
    'base64-encoder', 'bmi-calculator', 'password-generator', 'qr-code-generator',
    'image-to-base64', 'base64-to-image', 'age-calculator', 'url-encoder',
    'lorem-ipsum-generator', 'random-number-generator', 'duplicate-line-remover',
    'remove-extra-spaces', 'emi-calculator', 'random-color-generator',
    'uuid-generator', 'text-repeater', 'gst-calculator', 'discount-calculator',
    'percentage-calculator', 'simple-interest-calculator', 'dice-roller',
    'coin-flip', 'text-sorter', 'random-name-picker', 'html-formatter',
    'css-minifier', 'js-minifier', 'base64-text-encoder', 'base64-text-decoder',
    'image-compressor', 'image-resizer', 'image-rotate', 'image-flip',
    'image-color-picker', 'time-calculator', 'date-difference',
    'profit-loss-calculator', 'countdown-timer', 'color-code-converter',
    'random-text-generator', 'binary-converter', 'morse-code-converter',
    'slug-generator', 'strong-password-checker', 'text-to-speech',
    'unit-converter', 'color-palette-generator', 'jpg-to-png', 'png-to-jpg',
    'image-crop', 'html-minifier', 'css-formatter', 'js-formatter',
    'regex-tester', 'youtube-thumbnail-downloader', 'image-to-text',
    'bulk-image-resizer', 'youtube-embed-generator', 'youtube-timestamp-generator',
    'youtube-description-formatter', 'ai-content-writer', 'ai-youtube-script-generator',
    'ai-seo-title-generator', 'ai-text-summarizer', 'ai-paraphrasing-tool', 'ai-prompt-improver'
  ];

  const blogSlugs = [
    'best-free-online-tools-for-students', 'top-developer-tools-online',
    'how-to-optimize-images-for-web', 'essential-text-tools-for-writers',
    'why-use-random-password-generator', 'ultimate-guide-online-calculators',
    'improve-website-seo-free-tools', 'convert-image-to-base64-guide',
    'productivity-hacks-online-utility-tools', 'mastering-json-formatting-validating',
    '10-essential-tools-for-modern-web-developers',
    'why-browser-based-tools-are-the-future-of-productivity',
    'mastering-text-manipulation-tips-and-tricks',
    'how-to-create-viral-content-optimization-guide',
    'how-to-improve-ai-prompts-for-better-results'
  ];

  const staticPages = [
    '/',
    '/tools',
    '/blog',
    '/about',
    '/contact',
    '/privacy',
    '/terms'
  ];

  const urls = [
    ...staticPages,
    ...toolSlugs.map(slug => `/tools/${slug}`),
    ...blogSlugs.map(slug => `/blog/${slug}`)
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(url => `
  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${url === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${url === '/' ? '1.0' : url.startsWith('/tools') ? '0.8' : '0.7'}</priority>
  </url>`).join('')}
</urlset>`;

  res.setHeader("Content-Type", "application/xml");
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
  res.status(200).send(sitemap);
}
