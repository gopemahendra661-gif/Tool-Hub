import React, { lazy, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { SEO } from '../components/SEO';
import { Schema } from '../components/Schema';
import ReactMarkdown from 'react-markdown';
import { TOOLS } from '../data/tools';
import { motion } from 'motion/react';
import { ChevronRight, Copy, Check, Download, Info, HelpCircle, Construction, Twitter, Facebook, MessageSquare } from 'lucide-react';
import { DynamicIcon } from '../components/DynamicIcon';

import { ToolFeedback } from '../components/ToolFeedback';

// Lazy load Tool Components
const WordCounter = lazy(() => import('../tools/WordCounter').then(m => ({ default: m.WordCounter })));
const JsonFormatter = lazy(() => import('../tools/JsonFormatter').then(m => ({ default: m.JsonFormatter })));
const PasswordGenerator = lazy(() => import('../tools/PasswordGenerator').then(m => ({ default: m.PasswordGenerator })));
const BmiCalculator = lazy(() => import('../tools/BmiCalculator').then(m => ({ default: m.BmiCalculator })));
const QrCodeGenerator = lazy(() => import('../tools/QrCodeGenerator').then(m => ({ default: m.QrCodeGenerator })));
const ImageToBase64 = lazy(() => import('../tools/ImageToBase64').then(m => ({ default: m.ImageToBase64 })));
const Base64ToImage = lazy(() => import('../tools/Base64ToImage').then(m => ({ default: m.Base64ToImage })));
const CaseConverter = lazy(() => import('../tools/CaseConverter').then(m => ({ default: m.CaseConverter })));
const UrlEncoder = lazy(() => import('../tools/UrlEncoder').then(m => ({ default: m.UrlEncoder })));
const AgeCalculator = lazy(() => import('../tools/AgeCalculator').then(m => ({ default: m.AgeCalculator })));
const LoremIpsumGenerator = lazy(() => import('../tools/LoremIpsumGenerator').then(m => ({ default: m.LoremIpsumGenerator })));
const RandomNumberGenerator = lazy(() => import('../tools/RandomNumberGenerator').then(m => ({ default: m.RandomNumberGenerator })));
const DuplicateLineRemover = lazy(() => import('../tools/DuplicateLineRemover').then(m => ({ default: m.DuplicateLineRemover })));
const TextCleaner = lazy(() => import('../tools/TextCleaner').then(m => ({ default: m.TextCleaner })));
const EmiCalculator = lazy(() => import('../tools/EmiCalculator').then(m => ({ default: m.EmiCalculator })));
const RandomColorGenerator = lazy(() => import('../tools/RandomColorGenerator').then(m => ({ default: m.RandomColorGenerator })));
const UuidGenerator = lazy(() => import('../tools/UuidGenerator').then(m => ({ default: m.UuidGenerator })));
const TextRepeater = lazy(() => import('../tools/TextRepeater').then(m => ({ default: m.TextRepeater })));
const PercentageCalculator = lazy(() => import('../tools/PercentageCalculator').then(m => ({ default: m.PercentageCalculator })));
const GstCalculator = lazy(() => import('../tools/GstCalculator').then(m => ({ default: m.GstCalculator })));
const DiceRoller = lazy(() => import('../tools/DiceRoller').then(m => ({ default: m.DiceRoller })));
const CoinFlip = lazy(() => import('../tools/CoinFlip').then(m => ({ default: m.CoinFlip })));
const TextSorter = lazy(() => import('../tools/TextSorter').then(m => ({ default: m.TextSorter })));
const RandomNamePicker = lazy(() => import('../tools/RandomNamePicker').then(m => ({ default: m.RandomNamePicker })));
const DiscountCalculator = lazy(() => import('../tools/DiscountCalculator').then(m => ({ default: m.DiscountCalculator })));
const Base64TextTool = lazy(() => import('../tools/Base64TextTool').then(m => ({ default: m.Base64TextTool })));
const ImageEditor = lazy(() => import('../tools/ImageEditor').then(m => ({ default: m.ImageEditor })));
const SimpleInterestCalculator = lazy(() => import('../tools/SimpleInterestCalculator').then(m => ({ default: m.SimpleInterestCalculator })));
const ProfitLossCalculator = lazy(() => import('../tools/ProfitLossCalculator').then(m => ({ default: m.ProfitLossCalculator })));
const DateDifferenceCalculator = lazy(() => import('../tools/DateDifferenceCalculator').then(m => ({ default: m.DateDifferenceCalculator })));
const RandomTextGenerator = lazy(() => import('../tools/RandomTextGenerator').then(m => ({ default: m.RandomTextGenerator })));
const CountdownTimer = lazy(() => import('../tools/CountdownTimer').then(m => ({ default: m.CountdownTimer })));
const ColorCodeConverter = lazy(() => import('../tools/ColorCodeConverter').then(m => ({ default: m.ColorCodeConverter })));
const BinaryConverter = lazy(() => import('../tools/BinaryConverter').then(m => ({ default: m.BinaryConverter })));
const SlugGenerator = lazy(() => import('../tools/SlugGenerator').then(m => ({ default: m.SlugGenerator })));
const MorseCodeConverter = lazy(() => import('../tools/MorseCodeConverter').then(m => ({ default: m.MorseCodeConverter })));
const PasswordStrengthChecker = lazy(() => import('../tools/PasswordStrengthChecker').then(m => ({ default: m.PasswordStrengthChecker })));
const TextToSpeech = lazy(() => import('../tools/TextToSpeech').then(m => ({ default: m.TextToSpeech })));
const UnitConverter = lazy(() => import('../tools/UnitConverter').then(m => ({ default: m.UnitConverter })));
const ColorPaletteGenerator = lazy(() => import('../tools/ColorPaletteGenerator').then(m => ({ default: m.ColorPaletteGenerator })));
const ImageFormatConverter = lazy(() => import('../tools/ImageFormatConverter').then(m => ({ default: m.ImageFormatConverter })));
const DevTools = lazy(() => import('../tools/DevTools').then(m => ({ default: m.DevTools })));
const RegexTester = lazy(() => import('../tools/RegexTester').then(m => ({ default: m.RegexTester })));
const ImageResizer = lazy(() => import('../tools/ImageResizer').then(m => ({ default: m.ImageResizer })));
const ImageColorPicker = lazy(() => import('../tools/ImageColorPicker').then(m => ({ default: m.ImageColorPicker })));
const TimeCalculator = lazy(() => import('../tools/TimeCalculator').then(m => ({ default: m.TimeCalculator })));
const ImageCompressor = lazy(() => import('../tools/ImageCompressor').then(m => ({ default: m.ImageCompressor })));
const CharacterCounter = lazy(() => import('../tools/CharacterCounter').then(m => ({ default: m.CharacterCounter })));
const ImageCropTool = lazy(() => import('../tools/ImageCropTool').then(m => ({ default: m.ImageCropTool })));
const YouTubeThumbnailDownloader = lazy(() => import('../tools/YouTubeThumbnailDownloader').then(m => ({ default: m.YouTubeThumbnailDownloader })));
const ImageToText = lazy(() => import('../tools/ImageToText').then(m => ({ default: m.ImageToText })));
const BulkImageResizer = lazy(() => import('../tools/BulkImageResizer').then(m => ({ default: m.BulkImageResizer })));
const YouTubeEmbedGenerator = lazy(() => import('../tools/YouTubeEmbedGenerator').then(m => ({ default: m.YouTubeEmbedGenerator })));
const YouTubeTimestampGenerator = lazy(() => import('../tools/YouTubeTimestampGenerator').then(m => ({ default: m.YouTubeTimestampGenerator })));
const YouTubeDescriptionFormatter = lazy(() => import('../tools/YouTubeDescriptionFormatter').then(m => ({ default: m.YouTubeDescriptionFormatter })));

// AI Tools
const AIContentWriter = lazy(() => import('../tools/AI/AIContentWriter').then(m => ({ default: m.AIContentWriter })));
const AIYouTubeScriptGenerator = lazy(() => import('../tools/AI/AIYouTubeScriptGenerator').then(m => ({ default: m.AIYouTubeScriptGenerator })));
const AIInstagramCaptionGenerator = lazy(() => import('../tools/AI/AIInstagramCaptionGenerator').then(m => ({ default: m.AIInstagramCaptionGenerator })));
const AILinkedInPostGenerator = lazy(() => import('../tools/AI/AILinkedInPostGenerator').then(m => ({ default: m.AILinkedInPostGenerator })));
const AIBlogIdeaGenerator = lazy(() => import('../tools/AI/AIBlogIdeaGenerator').then(m => ({ default: m.AIBlogIdeaGenerator })));
const PrivacyPolicyGenerator = lazy(() => import('../tools/PrivacyPolicyGenerator').then(m => ({ default: m.PrivacyPolicyGenerator })));
const TermsAndConditionsGenerator = lazy(() => import('../tools/TermsAndConditionsGenerator').then(m => ({ default: m.TermsAndConditionsGenerator })));
const JsonToCsvConverter = lazy(() => import('../tools/JsonToCsvConverter').then(m => ({ default: m.JsonToCsvConverter })));
const CsvToJsonConverter = lazy(() => import('../tools/CsvToJsonConverter').then(m => ({ default: m.CsvToJsonConverter })));
const AISeoTitleGenerator = lazy(() => import('../tools/AI/AISeoTitleGenerator').then(m => ({ default: m.AISeoTitleGenerator })));
const AITextSummarizer = lazy(() => import('../tools/AI/AITextSummarizer').then(m => ({ default: m.AITextSummarizer })));
const AIParaphrasingTool = lazy(() => import('../tools/AI/AIParaphrasingTool').then(m => ({ default: m.AIParaphrasingTool })));
const AIPromptImprover = lazy(() => import('../tools/AI/AIPromptImprover').then(m => ({ default: m.AIPromptImprover })));
const AIImageToPromptGenerator = lazy(() => import('../tools/AI/AIImageToPromptGenerator').then(m => ({ default: m.AIImageToPromptGenerator })));
const AICommentReplyGenerator = lazy(() => import('../tools/AI/AICommentReplyGenerator').then(m => ({ default: m.AICommentReplyGenerator })));
const AIHashtagGenerator = lazy(() => import('../tools/AI/AIHashtagGenerator').then(m => ({ default: m.AIHashtagGenerator })));

const TOOL_COMPONENTS: Record<string, React.FC<any>> = {
  'word-counter': WordCounter,
  'character-counter': CharacterCounter,
  'json-formatter': JsonFormatter,
  'password-generator': PasswordGenerator,
  'bmi-calculator': BmiCalculator,
  'qr-code-generator': QrCodeGenerator,
  'image-to-base64': ImageToBase64,
  'base64-to-image': Base64ToImage,
  'case-converter': CaseConverter,
  'url-encoder': UrlEncoder,
  'age-calculator': AgeCalculator,
  'lorem-ipsum-generator': LoremIpsumGenerator,
  'random-number-generator': RandomNumberGenerator,
  'duplicate-line-remover': DuplicateLineRemover,
  'remove-extra-spaces': TextCleaner,
  'emi-calculator': EmiCalculator,
  'random-color-generator': RandomColorGenerator,
  'uuid-generator': UuidGenerator,
  'text-repeater': TextRepeater,
  'percentage-calculator': PercentageCalculator,
  'gst-calculator': GstCalculator,
  'dice-roller': DiceRoller,
  'coin-flip': CoinFlip,
  'text-sorter': TextSorter,
  'random-name-picker': RandomNamePicker,
  'discount-calculator': DiscountCalculator,
  'base64-encoder': () => <Base64TextTool mode="encode" />,
  'base64-text-encoder': () => <Base64TextTool mode="encode" />,
  'base64-text-decoder': () => <Base64TextTool mode="decode" />,
  'image-rotate': ImageEditor,
  'image-flip': ImageEditor,
  'simple-interest-calculator': SimpleInterestCalculator,
  'profit-loss-calculator': ProfitLossCalculator,
  'date-difference': DateDifferenceCalculator,
  'random-text-generator': RandomTextGenerator,
  'countdown-timer': CountdownTimer,
  'color-code-converter': ColorCodeConverter,
  'binary-converter': BinaryConverter,
  'slug-generator': SlugGenerator,
  'morse-code-converter': MorseCodeConverter,
  'strong-password-checker': PasswordStrengthChecker,
  'text-to-speech': TextToSpeech,
  'unit-converter': UnitConverter,
  'color-palette-generator': ColorPaletteGenerator,
  'jpg-to-png': () => <ImageFormatConverter targetFormat="png" />,
  'png-to-jpg': () => <ImageFormatConverter targetFormat="jpg" />,
  'html-minifier': () => <DevTools mode="html-min" />,
  'css-minifier': () => <DevTools mode="css-min" />,
  'js-minifier': () => <DevTools mode="js-min" />,
  'html-formatter': () => <DevTools mode="html-fmt" />,
  'css-formatter': () => <DevTools mode="css-fmt" />,
  'js-formatter': () => <DevTools mode="js-fmt" />,
  'regex-tester': RegexTester,
  'image-resizer': ImageResizer,
  'image-color-picker': ImageColorPicker,
  'time-calculator': TimeCalculator,
  'image-compressor': ImageCompressor,
  'image-crop': ImageCropTool,
  'youtube-thumbnail-downloader': YouTubeThumbnailDownloader,
  'image-to-text': ImageToText,
  'bulk-image-resizer': BulkImageResizer,
  'youtube-embed-generator': YouTubeEmbedGenerator,
  'youtube-timestamp-generator': YouTubeTimestampGenerator,
  'youtube-description-formatter': YouTubeDescriptionFormatter,
  'ai-content-writer': AIContentWriter,
  'ai-youtube-script-generator': AIYouTubeScriptGenerator,
  'ai-instagram-caption-generator': AIInstagramCaptionGenerator,
  'ai-linkedin-post-generator': AILinkedInPostGenerator,
  'ai-blog-idea-generator': AIBlogIdeaGenerator,
  'privacy-policy-generator': PrivacyPolicyGenerator,
  'terms-and-conditions-generator': TermsAndConditionsGenerator,
  'json-to-csv-converter': JsonToCsvConverter,
  'csv-to-json-converter': CsvToJsonConverter,
  'ai-seo-title-generator': AISeoTitleGenerator,
  'ai-text-summarizer': AITextSummarizer,
  'ai-paraphrasing-tool': AIParaphrasingTool,
  'ai-prompt-improver': AIPromptImprover,
  'ai-image-to-prompt-generator': AIImageToPromptGenerator,
  'ai-comment-reply-generator': AICommentReplyGenerator,
  'ai-hashtag-generator': AIHashtagGenerator,
};

export const ToolDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const tool = TOOLS.find(t => t.slug === slug);

  const [linkCopied, setLinkCopied] = React.useState(false);
  const [hasInteracted, setHasInteracted] = React.useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleToolInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
  };

  if (!tool) {
    return (
      <Layout>
        <div className="py-24 text-center">
          <h1 className="text-4xl font-bold mb-4">Tool Not Found</h1>
          <p className="text-neutral-500 mb-8">The tool you are looking for does not exist or has been moved.</p>
          <Link to="/tools" className="text-indigo-600 font-bold hover:underline">Back to All Tools</Link>
        </div>
      </Layout>
    );
  }

  const ToolComponent = TOOL_COMPONENTS[tool.id] || (() => (
    <div className="p-12 text-center bg-neutral-50 rounded-3xl border-2 border-dashed border-neutral-200">
      <Construction size={48} className="mx-auto mb-4 text-neutral-400" />
      <h3 className="text-xl font-bold mb-2">Tool Under Construction</h3>
      <p className="text-neutral-500">We are working hard to bring this tool to you soon!</p>
    </div>
  ));

  return (
    <Layout>
      <SEO 
        title={tool.seoTitle} 
        description={tool.seoDescription} 
        keywords={tool.keywords}
      />

      <Schema 
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": tool.name,
          "operatingSystem": "All",
          "applicationCategory": "UtilitiesApplication",
          "description": tool.description,
          "url": `https://mytoolhub.info/tools/${tool.slug}`,
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        }}
      />

      {tool.faq && tool.faq.length > 0 && (
        <Schema 
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": tool.faq.map(item => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
              }
            }))
          }}
        />
      )}

      {/* Breadcrumbs */}
      <nav className="bg-white border-b border-neutral-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-2 text-sm text-neutral-500">
            <li><Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link></li>
            <li><ChevronRight size={14} /></li>
            <li><Link to="/tools" className="hover:text-indigo-600 transition-colors">Tools</Link></li>
            <li><ChevronRight size={14} /></li>
            <li><Link to={`/tools?category=${tool.category}`} className="hover:text-indigo-600 transition-colors">{tool.category}</Link></li>
            <li><ChevronRight size={14} /></li>
            <li className="text-neutral-900 font-medium truncate">{tool.name}</li>
          </ol>
        </div>
      </nav>

      <div className="py-12 bg-neutral-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tool Header */}
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm border border-neutral-100">
              <DynamicIcon name={tool.icon} size={32} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">{tool.name}</h1>
              <p className="text-lg text-neutral-500">{tool.description}</p>
            </div>
          </div>

          {/* Tool Interface */}
          <div 
            className="mb-16"
            onClick={handleToolInteraction}
            onKeyDown={handleToolInteraction}
          >
            <Suspense fallback={
              <div className="p-12 text-center bg-white rounded-3xl border border-neutral-200 shadow-sm">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-neutral-500 font-medium">Loading tool...</p>
              </div>
            }>
              <ToolComponent tool={tool} />
            </Suspense>

            {/* Tool Feedback Section - Always Visible */}
            <div className="mt-12">
              <ToolFeedback toolId={tool.id} toolName={tool.name} />
            </div>
          </div>

          {/* Tool Content / SEO Text */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
                    <Info size={18} />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900">About {tool.name}</h2>
                </div>
                <div className="prose prose-neutral max-w-none text-neutral-600 leading-relaxed">
                  {tool.content ? (
                    <div className="markdown-body">
                      <ReactMarkdown>{tool.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <>
                      <p>{tool.seoDescription}</p>
                      <p className="mt-4">
                        Our {tool.name} is designed to be the fastest and most reliable tool in its category. 
                        Whether you're a professional developer, a student, or just someone looking to get a quick task done, 
                        this tool provides a seamless experience directly in your browser.
                      </p>
                    </>
                  )}
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
                    <HelpCircle size={18} />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900">Frequently Asked Questions</h2>
                </div>
                <div className="space-y-6">
                  {tool.faq.map((item, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-neutral-200">
                      <h3 className="font-bold text-neutral-900 mb-2">{item.question}</h3>
                      <p className="text-neutral-600">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-8">
              <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm">
                <h3 className="font-bold text-neutral-900 mb-6">Related Tools</h3>
                <div className="space-y-4">
                  {TOOLS.filter(t => t.category === tool.category && t.id !== tool.id).slice(0, 5).map(related => (
                    <Link 
                      key={related.id} 
                      to={`/tools/${related.slug}`}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-50 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-neutral-50 rounded-lg flex items-center justify-center text-neutral-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-colors">
                        <DynamicIcon name={related.icon} size={20} />
                      </div>
                      <span className="text-sm font-medium text-neutral-700 group-hover:text-indigo-600 transition-colors">{related.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm">
                <h3 className="font-bold text-neutral-900 mb-6">Try More Tools</h3>
                <div className="space-y-4">
                  {TOOLS.filter(t => t.category !== tool.category).sort(() => 0.5 - Math.random()).slice(0, 5).map(random => (
                    <Link 
                      key={random.id} 
                      to={`/tools/${random.slug}`}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-50 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-neutral-50 rounded-lg flex items-center justify-center text-neutral-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-colors">
                        <DynamicIcon name={random.icon} size={20} />
                      </div>
                      <span className="text-sm font-medium text-neutral-700 group-hover:text-indigo-600 transition-colors">{random.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-indigo-600 p-8 rounded-3xl text-white shadow-xl shadow-indigo-500/20">
                <h3 className="font-bold text-xl mb-4">Share this tool</h3>
                <p className="text-indigo-100 text-sm mb-6">Help others find this useful tool by sharing it with your network.</p>
                <div className="flex gap-3">
                  <button 
                    onClick={() => window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(`Check out this useful tool: ${tool.name}`)}&url=${encodeURIComponent(window.location.href)}&via=MyTooHub`, '_blank')}
                    className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors flex items-center justify-center gap-2 font-medium"
                  >
                    <Twitter size={18} /> X (Twitter)
                  </button>
                  <button 
                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                    className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors flex items-center justify-center gap-2 font-medium"
                  >
                    <Facebook size={18} /> Facebook
                  </button>
                </div>
                <button 
                  onClick={handleCopyLink}
                  className="w-full mt-3 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  {linkCopied ? (
                    <>
                      <Check size={18} className="text-emerald-400" /> Link Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={18} /> Copy Link
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
