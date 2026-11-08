import type { MetadataRoute } from "next";
import { abs } from "@/lib/seo";

// Bots de IA permitidos a propósito (AEO): queremos que ChatGPT, Perplexity,
// Gemini y Claude lean y citen el sitio.
const BOTS_IA = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Google-Extended",
  "ClaudeBot",
  "Claude-SearchBot",
];

const DISALLOW = ["/api/", "/gracias"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      { userAgent: BOTS_IA, allow: "/", disallow: DISALLOW },
    ],
    sitemap: abs("/sitemap.xml"),
  };
}
