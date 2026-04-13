import { fetchAPI, FALLBACK_PLUGINS } from "@/lib/strapi";
import CreationsContent from "./CreationsContent";

export const revalidate = 60;

export default async function CreationsPage() {
  const data = await fetchAPI("plugins");
  const plugins = (data && Array.isArray(data) && data.length > 0) ? data : FALLBACK_PLUGINS;
  return <CreationsContent plugins={plugins} />;
}