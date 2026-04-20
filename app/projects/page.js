import { fetchAPI, FALLBACK_PROJECTS } from "@/lib/strapi";
import { SectionHeader, ProjectCard } from "@/components/Cards";
import { T } from "@/lib/config";

export const revalidate = 60;

export default async function ProjectsPage() {
  const data = await fetchAPI("projects");
  const projects = (data && Array.isArray(data) && data.length > 0) ? data : FALLBACK_PROJECTS;

  return (
    <section style={{ padding: "140px 40px 100px", maxWidth: 1200, margin: "0 auto" }} className="mobile-pad">
      <SectionHeader label="02" title="Recent Work" />
      <p style={{ color: T.gray, fontSize: 16, marginTop: 12, marginBottom: 48, maxWidth: 500 }}>
        A selection of projects I've built — from client work to side projects and open source.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="mobile-col">
        {projects.map((p, i) => <ProjectCard key={`p-${p.id || i}`} project={p} index={i} />)}
      </div>
    </section>
  );
}