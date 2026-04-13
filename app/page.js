import { fetchAPI, FALLBACK_PROJECTS, FALLBACK_BLOGS } from "@/lib/strapi";
import HomeContent from "./HomeContent";

export const revalidate = 60;

export default async function HomePage() {
  const [heroData, projectsData, blogsData] = await Promise.all([
    fetchAPI("hero"),
    fetchAPI("projects"),
    fetchAPI("blogs"),
  ]);

  const hero = heroData || { name: "Yasir Malik", title: "I build things for the web", tagline: "Building products, crafting themes, shipping plugins — and writing about all of it." };
  const projects = (projectsData && Array.isArray(projectsData) && projectsData.length > 0) ? projectsData : FALLBACK_PROJECTS;
  const blogs = (blogsData && Array.isArray(blogsData) && blogsData.length > 0) ? blogsData : FALLBACK_BLOGS;

  return <HomeContent hero={hero} projects={projects} blogs={blogs} />;
}