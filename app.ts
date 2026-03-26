import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";
import dotenv from "dotenv";
import { LRUCache } from "lru-cache";
import nodemailer from "nodemailer";
import { createClient } from '@supabase/supabase-js';
import { TOOLS } from "./src/data/tools.ts";
import { BLOG_POSTS } from "./src/data/blogPosts.ts";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Redirect non-www to www
app.use((req, res, next) => {
  const host = req.get('host');
  if (host === 'mytoolhub.info') {
    return res.redirect(301, `https://www.mytoolhub.info${req.originalUrl}`);
  }
  next();
});

// Cache for AI responses to reduce API calls and improve speed
const aiCache = new LRUCache<string, any>({
  max: 100, // Store up to 100 responses
  ttl: 1000 * 60 * 60 * 24, // Cache for 24 hours
});

// Middleware
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

// AI Image to Prompt Generator API with OpenRouter Vision Fallback
app.post("/api/image-to-prompt-openrouter", async (req, res) => {
  const { image } = req.body; // base64 image data
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "OpenRouter API key not configured" });
  }

  if (!image) {
    return res.status(400).json({ error: "Image data is required" });
  }

  // Check cache for this image (using a simple hash or the first 1000 chars of base64)
  const cacheKey = `vision_${image.substring(0, 1000)}`;
  const cachedResponse = aiCache.get(cacheKey);
  if (cachedResponse) {
    console.log("[OpenRouter Vision] Serving from cache");
    return res.json(cachedResponse);
  }

  try {
    // OpenRouter Vision Models (Free) - Trying multiple models in order
    const models = [
      "google/gemini-2.0-flash-exp:free",
      "google/gemini-2.0-flash-lite-preview-02-05:free",
      "meta-llama/llama-3.2-11b-vision-instruct:free",
      "meta-llama/llama-3.2-90b-vision-instruct:free",
      "google/gemini-flash-1.5-8b:free",
      "qwen/qwen-2-vl-7b-instruct:free"
    ];

    let lastError = "";

    for (const model of models) {
      try {
        console.log(`[OpenRouter Vision] Attempting with model: ${model}`);
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://mytoolhub.info",
            "X-Title": "MyToolHub"
          },
          body: JSON.stringify({
            model: model,
            messages: [
              {
                role: "user",
                content: [
                  {
                    type: "text",
                    text: "Describe this image in detail for an AI art prompt. Focus on the subject, composition, lighting, colors, and mood. Provide only the descriptive text, no introductory or concluding remarks."
                  },
                  {
                    type: "image_url",
                    image_url: {
                      url: image // base64 data URL
                    }
                  }
                ]
              }
            ]
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.warn(`[OpenRouter Vision] Model ${model} failed: ${errorText}`);
          lastError = `Model ${model} error: ${response.status}`;
          continue;
        }

        const data: any = await response.json();
        const caption = data.choices?.[0]?.message?.content;

        if (caption) {
          console.log(`[OpenRouter Vision] Success with model: ${model}`);
          const result = { caption, model: `OpenRouter (${model})` };
          aiCache.set(cacheKey, result);
          return res.json(result);
        }
      } catch (err: any) {
        console.error(`[OpenRouter Vision] Exception with model ${model}:`, err.message);
        lastError = err.message;
      }
    }

    res.status(500).json({ error: "All OpenRouter vision models failed", details: lastError });
  } catch (error: any) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

// API routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/test", (req, res) => {
  res.json({ message: "API is working" });
});

// Dynamic Sitemap Route
app.get("/sitemap.xml", (req, res) => {
  const baseUrl = "https://www.mytoolhub.info";
  
  const toolSlugs = TOOLS.map(t => t.slug);
  const blogSlugs = BLOG_POSTS.map(p => p.slug);

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
${urls.map(url => `  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${url === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${url === '/' ? '1.0' : url.startsWith('/tools') ? '0.8' : '0.7'}</priority>
  </url>`).join('\n')}
</urlset>`.trim();

  res.setHeader("Content-Type", "application/xml");
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
  res.status(200).send(sitemap);
});

// Robots.txt Route
app.get("/robots.txt", (req, res) => {
  const robots = `# robots.txt for https://www.mytoolhub.info
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /private/

Sitemap: https://www.mytoolhub.info/sitemap.xml`;

  res.setHeader("Content-Type", "text/plain");
  res.status(200).send(robots);
});

// Vercel-style route for /api/generate
app.post("/api/generate", async (req, res) => {
  const { prompt } = req.body;
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "OpenRouter API key not configured" });
  }

  const cacheKey = `gen_${prompt}`;
  const cachedResponse = aiCache.get(cacheKey);
  if (cachedResponse) {
    return res.json(cachedResponse);
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://mytoolhub.info",
        "X-Title": "MyToolHub"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [{ role: "user", content: prompt }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: "OpenRouter API error", details: errorText });
    }

    const data: any = await response.json();
    const result = {
      result: data.choices?.[0]?.message?.content || "No response"
    };
    aiCache.set(cacheKey, result);
    return res.json(result);
  } catch (error: any) {
    return res.status(500).json({ error: "Server error", details: error.message });
  }
});

// Robust AI Generation Function with Fallback
async function generateAIResponse(prompt: string, tool: string, systemPrompt?: string) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured in environment variables.");
  }

  const cacheKey = `ai_${tool}_${prompt}`;
  const cachedResponse = aiCache.get(cacheKey);
  if (cachedResponse) {
    console.log(`[AI] Serving ${tool} from cache`);
    return cachedResponse;
  }

  // List of stable models to try in order
  const models = [
    "google/gemini-2.0-flash-exp:free", // Highly reliable free model
    "meta-llama/llama-3-8b-instruct",
    "mistralai/mistral-7b-instruct",
    "google/gemma-7b-it",
    "meta-llama/llama-3.3-70b-instruct:free",
    "deepseek/deepseek-r1:free"
  ];

  let lastError = "";

  for (const model of models) {
    try {
      console.log(`[AI] Attempting generation with model: ${model}`);
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://mytoolhub.info",
          "X-Title": "MyToolHub"
        },
        body: JSON.stringify({
          model: model,
          messages: [
            {
              role: "system",
              content: systemPrompt || `You are a helpful assistant for MyToolHub. You are acting as the ${tool}. Provide high-quality Markdown output.`
            },
            {
              role: "user",
              content: prompt
            }
          ]
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.warn(`[AI] Model ${model} failed with status ${response.status}: ${errorText}`);
        lastError = `Model ${model} error: ${response.status}`;
        continue;
      }

      const data: any = await response.json();
      const content = data.choices?.[0]?.message?.content;

      if (content) {
        console.log(`[AI] Success! Used model: ${model}`);
        const result = {
          content,
          modelUsed: model
        };
        aiCache.set(cacheKey, result);
        return result;
      }
    } catch (err: any) {
      console.error(`[AI] Exception with model ${model}:`, err.message);
      lastError = err.message;
    }
  }

  throw new Error(`All AI models failed. Last error: ${lastError}`);
}

app.post("/api/ai/generate", async (req, res) => {
  const { prompt, tool, systemPrompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const result = await generateAIResponse(prompt, tool, systemPrompt);
    res.json(result);
  } catch (error: any) {
    console.error("[Server] AI Route Error:", error.message);
    res.status(500).json({ 
      error: "All AI models failed to generate content. Please try again later.",
      details: error.message
    });
  }
});

// Email Transporter (Lazy initialization)
let transporter: any = null;

const getTransporter = () => {
  if (!transporter) {
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_APP_PASSWORD?.replace(/\s/g, '');

    if (!user || !pass) {
      console.warn("Email credentials not found. Feedback will only be logged to console.");
      return null;
    }

    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });

    // Verify connection configuration
    transporter.verify((error: any) => {
      if (error) {
        console.error("Transporter verification failed:", error);
      } else {
        console.log("Email transporter is ready");
      }
    });
  }
  return transporter;
};

// Feedback API
app.post("/api/feedback", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required" });
  }

  console.log(`[Feedback Received]
    Name: ${name}
    Email: ${email}
    Subject: ${subject}
    Message: ${message}
  `);

  const mailTransporter = getTransporter();
  if (!mailTransporter) {
    return res.status(500).json({ 
      error: "Email service not configured. Please set EMAIL_USER and EMAIL_APP_PASSWORD.",
      success: false 
    });
  }

  try {
    await mailTransporter.sendMail({
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: "chillforai@gmail.com",
      subject: `[My Tool Hub] ${subject}: from ${name}`,
      text: `
        New feedback received from My Tool Hub:
        
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
      `,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #4f46e5;">New Feedback Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="margin-top: 20px; padding: 15px; background: #f9fafb; border-radius: 8px;">
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          </div>
          <hr style="margin-top: 20px; border: 0; border-top: 1px solid #eee;" />
          <p style="font-size: 12px; color: #666;">This email was sent from the My Tool Hub contact form.</p>
        </div>
      `,
    });
    console.log("Email sent successfully to chillforai@gmail.com");
    return res.json({ success: true, message: "Feedback received successfully" });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return res.status(500).json({ 
      error: "Failed to send email. Please check server logs.", 
      details: error.message,
      success: false 
    });
  }
});

// Supabase Client (Server-side) - Lazy initialization
let supabaseClient: any = null;

const getSupabase = () => {
  if (!supabaseClient) {
    const supabaseUrl = process.env.SUPABASE_URL || '';
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn("Supabase configuration missing. Please set SUPABASE_URL and SUPABASE_ANON_KEY in Secrets.");
      return null;
    }

    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseClient;
};

// Tool Feedback API (Supabase)
app.get("/api/feedback/:toolId", async (req, res) => {
  const { toolId } = req.params;
  const supabase = getSupabase();

  if (!supabase) {
    return res.status(500).json({ success: false, error: "Supabase not configured." });
  }

  try {
    // Get recent comments (only top-level comments first, or all and we nest them)
    const { data: allFeedback, error: feedbackError } = await supabase
      .from('tool_feedback')
      .select('id, comment, timestamp, rating, parent_id')
      .eq('tool_id', toolId)
      .not('comment', 'is', null)
      .neq('comment', '')
      .order('timestamp', { ascending: false });

    if (feedbackError) throw feedbackError;

    const likes = allFeedback.filter(c => c.rating === 'like').length;
    const dislikes = allFeedback.filter(c => c.rating === 'dislike').length;

    // Nest replies under their parents
    const comments = allFeedback.filter(c => !c.parent_id);
    const replies = allFeedback.filter(c => c.parent_id);

    const nestedComments = comments.map(parent => ({
      ...parent,
      replies: replies.filter(r => r.parent_id === parent.id).reverse()
    }));

    res.json({ success: true, likes, dislikes, comments: nestedComments });
  } catch (error: any) {
    console.error("Supabase Fetch Error:", error.message || error);
    res.status(500).json({ success: false, error: "Failed to fetch feedback." });
  }
});

app.post("/api/feedback/save", async (req, res) => {
  const { toolId, toolName, rating, comment, timestamp, pageUrl, parentId } = req.body;
  const supabase = getSupabase();

  if (!supabase) {
    return res.status(500).json({ success: false, error: "Supabase not configured." });
  }

  try {
    const { data, error } = await supabase
      .from('tool_feedback')
      .insert([
        { 
          tool_id: toolId, 
          tool_name: toolName, 
          rating, 
          comment, 
          timestamp, 
          page_url: pageUrl,
          parent_id: parentId || null
        }
      ]);

    if (error) {
      console.error("Supabase Insert Error Details:", error);
      throw error;
    }

    res.json({ success: true });
  } catch (error: any) {
    console.error("Supabase Save Error:", error.message || error);
    res.status(500).json({ success: false, error: error.message || "Failed to save feedback." });
  }
});

// Global error handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error("Unhandled Server Error:", err);
  res.status(500).json({ 
    error: "Internal Server Error", 
    details: err.message || "An unexpected error occurred on the server" 
  });
});

export default app;
