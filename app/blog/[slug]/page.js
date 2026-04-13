import { fetchBlogBySlug, FALLBACK_BLOGS } from "@/lib/strapi";
import BlogPostContent from "./BlogPostContent";
import Link from "next/link";
import { T } from "@/lib/config";

export const revalidate = 60;

export default async function BlogPostPage({ params }) {
  const { slug } = await params;

  // Try Strapi first
  let post = await fetchBlogBySlug(slug);

  // Fallback to demo data
  if (!post) {
    post = FALLBACK_BLOGS.find(b => b.slug === slug) || null;
  }

  if (!post) {
    return (
      <section style={{ padding: "200px 40px", textAlign: "center" }} className="mobile-pad">
        <h1 style={{ fontSize: 64, fontWeight: 900, marginBottom: 16, color: "#c8ff00" }}>404</h1>
        <p style={{ color: "#8e8e99", marginBottom: 32, fontSize: 18 }}>This blog post doesn't exist.</p>
        <Link href="/blog"><button className="btn-primary">← Back to Blog</button></Link>
      </section>
    );
  }

  return <BlogPostContent post={post} />;
}