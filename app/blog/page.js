import { fetchAPI, FALLBACK_BLOGS } from "@/lib/strapi";
import BlogContent from "./BlogContent";

export const revalidate = 60;

export default async function BlogPage() {
  const data = await fetchAPI("blogs");
  const blogs = (data && Array.isArray(data) && data.length > 0) ? data : FALLBACK_BLOGS;
  return <BlogContent blogs={blogs} />;
}