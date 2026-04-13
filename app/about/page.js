import { fetchAPI, FALLBACK_TECHSTACK } from "@/lib/strapi";
import AboutContent from "./AboutContent";

export const revalidate = 60;

// Map of tech names to their category and icon
const TECH_MAP = {
  "PHP": { cat: "Language", icon: "🐘" },
  "JavaScript": { cat: "Language", icon: "⚡" },
  "TypeScript": { cat: "Language", icon: "TS" },
  "Python": { cat: "Language", icon: "🐍" },
  "HTML": { cat: "Frontend", icon: "🌐" },
  "CSS": { cat: "Frontend", icon: "🎨" },
  "React": { cat: "Frontend", icon: "⚛" },
  "Next.js": { cat: "Frontend", icon: "▲" },
  "Vue": { cat: "Frontend", icon: "💚" },
  "Tailwind": { cat: "Frontend", icon: "🌊" },
  "WordPress": { cat: "CMS", icon: "📝" },
  "WooCommerce": { cat: "CMS", icon: "🛒" },
  "Elementor": { cat: "CMS", icon: "🧩" },
  "Strapi": { cat: "CMS", icon: "🚀" },
  "Node.js": { cat: "Backend", icon: "⬢" },
  "Express": { cat: "Backend", icon: "🔧" },
  "Git": { cat: "DevOps", icon: "⑂" },
  "Docker": { cat: "DevOps", icon: "🐳" },
  "Linux": { cat: "DevOps", icon: "🐧" },
  "MySQL": { cat: "Database", icon: "🗄️" },
  "PostgreSQL": { cat: "Database", icon: "🐘" },
  "MongoDB": { cat: "Database", icon: "🍃" },
  "Redis": { cat: "Database", icon: "🔴" },
  "Figma": { cat: "Design", icon: "🎨" },
  "AWS": { cat: "Cloud", icon: "☁" },
  "GraphQL": { cat: "API", icon: "◈" },
};

function parseTechStack(raw) {
  if (!raw) return FALLBACK_TECHSTACK;

  // Parse if it's a string
  let arr = raw;
  if (typeof raw === "string") {
    try { arr = JSON.parse(raw); } catch { return FALLBACK_TECHSTACK; }
  }
  if (!Array.isArray(arr) || arr.length === 0) return FALLBACK_TECHSTACK;

  // Check if it's simple strings like ["PHP", "JavaScript"]
  if (typeof arr[0] === "string") {
    return arr.map(name => {
      const mapped = TECH_MAP[name] || { cat: "Other", icon: "💻" };
      return { name, cat: mapped.cat, icon: mapped.icon };
    });
  }

  // It's objects like [{name, cat, icon}]
  return arr.map((t, i) => ({
    name: t.name || t.Name || t.title || `Tech ${i + 1}`,
    cat: t.cat || t.category || t.type || "Other",
    icon: t.icon || t.emoji || "💻",
  }));
}

function parseStats(raw) {
  if (!raw) return [];
  let arr = typeof raw === "string" ? JSON.parse(raw) : raw;
  if (!Array.isArray(arr)) return [];
  return arr.map(s => ({
    icon: s.icon || "📊",
    val: s.value || s.val || s.count || "0",
    label: s.label || s.name || "",
  }));
}

function parseJourney(raw) {
  if (!raw) return [];
  let arr = typeof raw === "string" ? JSON.parse(raw) : raw;
  if (!Array.isArray(arr)) return [];
  return arr.map(j => ({
    year: j.year || j.date || "",
    title: j.title || j.heading || j.name || "",
    desc: j.desc || j.description || j.text || j.content || "",
  }));
}

const DEFAULT_STATS = [
  { icon: "📦", val: "25+", label: "Projects" },
  { icon: "✍️", val: "40+", label: "Articles" },
  { icon: "🔌", val: "8+", label: "Plugins" },
  { icon: "⭐", val: "200+", label: "Stars" },
];

const DEFAULT_JOURNEY = [
  { year: "2026", title: "Building in Public", desc: "Launching plugins and themes." },
  { year: "2025", title: "Freelance & Open Source", desc: "Started freelancing." },
];

export default async function AboutPage() {
  const data = await fetchAPI("about");

  let bio = null;
  let stats = DEFAULT_STATS;
  let techStack = FALLBACK_TECHSTACK;
  let journey = DEFAULT_JOURNEY;

  if (data) {
    bio = data.bio || data.description || null;

    const parsedStats = parseStats(data.stats);
    if (parsedStats.length > 0) stats = parsedStats;

    techStack = parseTechStack(data.techStack || data.tech_stack || data.techstack);

    const parsedJourney = parseJourney(data.journey);
    if (parsedJourney.length > 0) journey = parsedJourney;
  }

  return <AboutContent about={{ bio, stats, techStack, journey }} />;
}