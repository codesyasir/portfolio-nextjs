import { fetchBlogBySlug, FALLBACK_BLOGS } from "@/lib/strapi";
import BlogPostContent from "./BlogPostContent";
import Link from "next/link";

export const revalidate = 60;

// Dynamic SEO for each blog post
export async function generateMetadata({ params }) {
  const { slug } = await params;
  let post = await fetchBlogBySlug(slug);
  if (!post) post = FALLBACK_BLOGS.find(b => b.slug === slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt || post.description || `Read ${post.title} on YasirCodes blog.`,
    keywords: [post.category, "YasirCodes", "blog", "WordPress", post.title].filter(Boolean),
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt || "",
      url: `https://yasircodes.online/blog/${slug}`,
      siteName: "YasirCodes",
      publishedTime: post.date || post.publishedAt,
      authors: ["Yasir Malik"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || "",
    },
    alternates: {
      canonical: `https://yasircodes.online/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  let post = await fetchBlogBySlug(slug);
  if (!post) post = FALLBACK_BLOGS.find(b => b.slug === slug) || null;

  if (!post) {
    return (
      <section style={{ padding: "200px 40px", textAlign: "center" }} className="mobile-pad">
        <h1 style={{ fontSize: 64, fontWeight: 900, marginBottom: 16, color: "#c8ff00" }}>404</h1>
        <p style={{ color: "#8e8e99", marginBottom: 32, fontSize: 18 }}>This blog post doesn't exist.</p>
        <Link href="/blog"><button className="btn-primary">← Back to Blog</button></Link>
      </section>
    );
  }

  // Blog post structured data for Google
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || "",
    author: { "@type": "Person", name: "Yasir Malik", url: "https://yasircodes.online" },
    datePublished: post.date || post.publishedAt,
    dateModified: post.updatedAt || post.date,
    publisher: { "@type": "Person", name: "Yasir Malik" },
    url: `https://yasircodes.online/blog/${slug}`,
    mainEntityOfPage: `https://yasircodes.online/blog/${slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogPostContent post={post} />
    </>
  );
}