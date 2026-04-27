import { STRAPI_URL } from "@/lib/config";

const SITE_URL = "https://yasircodes.online";

export default async function sitemap() {
  // Static pages
  const staticPages = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/projects`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/creations`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  // Dynamic blog pages from Strapi
  let blogPages = [];
  try {
    const res = await fetch(`${STRAPI_URL}/api/blogs?fields[0]=slug&fields[1]=updatedAt`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const json = await res.json();
      const blogs = json.data || [];
      blogPages = blogs.map((blog) => {
        const slug = blog.slug || blog.attributes?.slug;
        const updated = blog.updatedAt || blog.attributes?.updatedAt;
        return {
          url: `${SITE_URL}/blog/${slug}`,
          lastModified: updated ? new Date(updated) : new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        };
      });
    }
  } catch {}

  return [...staticPages, ...blogPages];
}