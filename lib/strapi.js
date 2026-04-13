import { STRAPI_URL } from "./config";

function normalizeItem(item) {
  if (!item) return null;
  if (!item.attributes) return item;
  return { id: item.id, ...item.attributes };
}

function normalizeData(data) {
  if (!data) return null;
  if (Array.isArray(data)) return data.map(normalizeItem);
  return normalizeItem(data);
}

export async function fetchAPI(endpoint) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/${endpoint}?populate=*`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return normalizeData(json.data);
  } catch {
    return null;
  }
}

export async function fetchBlogBySlug(slug) {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/blogs?filters[slug][$eq]=${slug}&populate=*`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const json = await res.json();
    if (json.data && json.data.length > 0) return normalizeItem(json.data[0]);
    return null;
  } catch {
    return null;
  }
}

export const FALLBACK_PROJECTS = [
  { id: 1, title: "CloudSync Dashboard", desc: "Real-time cloud monitoring with live metrics and alerts.", tags: ["Next.js", "WebSocket", "D3.js"], link: "#", featured: true },
  { id: 2, title: "ShopFlow E-Commerce", desc: "Modern headless e-commerce with Stripe and analytics.", tags: ["React", "Strapi", "Stripe"], link: "#", featured: true },
  { id: 3, title: "DevNote", desc: "Developer note-taking app with markdown and GitHub sync.", tags: ["Electron", "React", "SQLite"], link: "#", featured: false },
  { id: 4, title: "CodeCollab", desc: "Real-time collaborative code editor with video chat.", tags: ["Socket.io", "Monaco", "WebRTC"], link: "#", featured: true },
];

export const FALLBACK_BLOGS = [
  { id: 1, title: "Why I Switched from WordPress to Strapi", excerpt: "After 5 years on WordPress, I made the jump to headless CMS.", date: "2026-04-10", category: "Development", readTime: "8 min", slug: "wordpress-to-strapi", content: "Full content comes from Strapi." },
  { id: 2, title: "Building a Plugin Marketplace", excerpt: "How I built a plugin distribution system with auto-updates.", date: "2026-04-08", category: "Tutorial", readTime: "12 min", slug: "plugin-marketplace", content: "Full content comes from Strapi." },
  { id: 3, title: "Minimal UI Design in 2026", excerpt: "A deep dive into modern minimalist design principles.", date: "2026-04-05", category: "Design", readTime: "6 min", slug: "minimal-ui-design", content: "Full content comes from Strapi." },
];

export const FALLBACK_PLUGINS = [
  { id: 1, title: "Strapi SEO Plugin", desc: "SEO management for Strapi — meta tags, sitemaps, Open Graph.", type: "plugin", downloads: "2.4k", version: "2.1.0", tags: ["Strapi", "SEO"], link: "#" },
  { id: 2, title: "Dark Starter Theme", desc: "Minimal dark theme for Next.js with animations and MDX blog.", type: "theme", downloads: "1.8k", version: "1.3.0", tags: ["Next.js", "Theme"], link: "#" },
  { id: 3, title: "Auth Flow Plugin", desc: "Authentication with social logins, 2FA, and magic links.", type: "plugin", downloads: "3.1k", version: "3.0.2", tags: ["Auth", "Node.js"], link: "#" },
];

export const FALLBACK_TECHSTACK = [
  { name: "React", cat: "Frontend", icon: "⚛" },
  { name: "Next.js", cat: "Frontend", icon: "▲" },
  { name: "TypeScript", cat: "Language", icon: "TS" },
  { name: "Node.js", cat: "Backend", icon: "⬢" },
  { name: "Strapi", cat: "CMS", icon: "🚀" },
  { name: "PostgreSQL", cat: "Database", icon: "🐘" },
  { name: "MongoDB", cat: "Database", icon: "🍃" },
  { name: "Docker", cat: "DevOps", icon: "🐳" },
  { name: "Python", cat: "Language", icon: "🐍" },
  { name: "Figma", cat: "Design", icon: "🎨" },
  { name: "Redis", cat: "Database", icon: "🔴" },
  { name: "GraphQL", cat: "API", icon: "◈" },
  { name: "Tailwind", cat: "Frontend", icon: "🌊" },
  { name: "Git", cat: "DevOps", icon: "⑂" },
];