import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { api, getImageUrl } from "../services/api";
import type { Project, Setting } from "../services/api";
import DepthCarousel from "@/components/DepthCarousel";
import LineSidebar from "@/components/LineSidebar";
import { Magnetic } from "@/components/Magnetic";
import { Reveal } from "@/components/Reveal";

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [settings, setSettings] = useState<Setting | null>(null);
  const [loading, setLoading] = useState(true);

  const isId = settings?.language === "id";

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const [projectData, settingsData] = await Promise.all([
            api.getProject(id),
            api.getSettings(),
          ]);
          setProject(projectData);
          setSettings(settingsData);
        } catch (err) {
          console.error("Failed to fetch project details or settings", err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <main className="grow max-w-300 mx-auto w-full px-6 md:px-grid-margin pt-40 pb-24 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-[var(--cyan)] animate-spin" />
          <p className="font-mono-aurora text-sm text-[var(--muted)]">
            {isId ? "Memuat detail proyek..." : "Loading project details..."}
          </p>
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="grow max-w-300 mx-auto w-full px-6 md:px-grid-margin pt-40 pb-24">
        <div className="flex flex-col items-center justify-center text-center min-h-[50vh]">
          <p className="eyebrow mb-4">{"// 404"}</p>
          <h1 className="font-display-aurora font-bold text-4xl md:text-5xl text-[var(--ink)] mb-8">
            {isId ? "Proyek Tidak Ditemukan" : "Project Not Found"}
          </h1>
          <Magnetic strength={0.3}>
            <Link to="/" className="btn-ghost">
              <span className="material-symbols-outlined text-[18px]">
                arrow_back
              </span>
              {isId ? "Kembali ke Proyek" : "Back to Projects"}
            </Link>
          </Magnetic>
        </div>
      </main>
    );
  }

  const visibleFlow = (project.project_flow || []).filter(
    (f) => f.is_visible,
  );
  const visibleJobdesc = (project.jobdesc || []).filter(
    (j) => j.is_visible,
  );

  return (
    <main className="grow max-w-300 mx-auto w-full px-6 md:px-grid-margin pt-32 md:pt-40 pb-24 space-y-16 md:space-y-24">
      {/* Hero & Banner Section */}
      <section className="flex flex-col gap-8">
        <Reveal>
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono-aurora text-sm text-[var(--muted)] hover:text-[var(--cyan)] transition-colors group w-fit"
          >
            <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            <span className="opacity-60">{"<"}</span>
            {isId ? "Kembali ke Proyek" : "Back to Projects"}
            <span className="opacity-60">{"/"}</span>
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="w-full aspect-[21/9] rounded-3xl border border-white/10 overflow-hidden bg-white/[0.03] relative shadow-[0_24px_80px_-24px_rgba(99,102,241,0.35)]">
            <img
              className="w-full h-full object-cover"
              alt={project.name}
              src={getImageUrl(project.image_url)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,8,16,0.35)] via-transparent to-transparent pointer-events-none" />
          </div>
        </Reveal>

        <Reveal delay={0.15} className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h1 className="font-display-aurora font-bold tracking-tight text-4xl md:text-6xl text-[var(--ink)] leading-[1.05]">
              {project.name}
            </h1>
            {project.link && (
              <Magnetic strength={0.3}>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-aurora whitespace-nowrap"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    open_in_new
                  </span>
                  {isId ? "Kunjungi Proyek" : "Visit Project"}
                </a>
              </Magnetic>
            )}
          </div>

          {project.tech_stack && project.tech_stack.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tech_stack.map((tech, idx) => (
                <span key={idx} className="chip">
                  {tech}
                </span>
              ))}
            </div>
          )}

          <p className="text-base md:text-lg text-[var(--muted)] leading-relaxed whitespace-pre-wrap max-w-4xl">
            {project.description}
          </p>
        </Reveal>

        {project.carousel_images && project.carousel_images.length > 0 && (
          <Reveal delay={0.2}>
            <div className="w-full max-w-4xl mx-auto h-[400px] sm:h-[500px] relative">
              <DepthCarousel
                items={project.carousel_images.map((imgUrl, idx) => ({
                  image: getImageUrl(imgUrl),
                  alt: `${project.name} screenshot ${idx + 1}`,
                }))}
                cardWidth={600}
                cardHeight={340}
                depth={150}
                spread={60}
                tilt={15}
                visibleCards={3}
                autoplay
                loop
              />
            </div>
          </Reveal>
        )}
      </section>

      {/* Content Sections */}
      {((visibleFlow.length > 0) || (visibleJobdesc.length > 0)) && (
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Sticky Navigation for Content */}
          <div className="md:col-span-3 hidden md:block">
            <div className="sticky top-28 glass rounded-3xl p-6 space-y-4">
              <h3 className="eyebrow">
                {isId ? "daftar isi" : "contents"}
              </h3>
              <div className="pt-2">
                <LineSidebar
                  items={[
                    ...(visibleFlow.length > 0
                      ? [isId ? "Alur Proyek" : "Project Flow"]
                      : []),
                    ...(visibleJobdesc.length > 0
                      ? [isId ? "Tanggung Jawab" : "Responsibilities"]
                      : []),
                  ]}
                  accentColor="#8b5cf6"
                  textColor="#97a1b7"
                  markerColor="#334155"
                  showIndex={false}
                  fontSize={1}
                  itemGap={18}
                  onItemClick={(index) => {
                    const ids = [
                      ...(visibleFlow.length > 0 ? ["flow"] : []),
                      ...(visibleJobdesc.length > 0 ? ["jobdesc"] : []),
                    ];
                    const sectionId = ids[index];
                    const element = sectionId
                      ? document.getElementById(sectionId)
                      : null;
                    if (element) {
                      window.scrollTo({
                        top:
                          element.getBoundingClientRect().top +
                          window.scrollY -
                          110,
                        behavior: "smooth",
                      });
                    }
                  }}
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-9 space-y-16">
            {visibleFlow.length > 0 && (
              <Reveal className="space-y-6">
                <div className="space-y-6" id="flow">
                  <h2 className="font-display-aurora font-bold text-3xl md:text-4xl text-[var(--ink)]">
                    {isId ? "Alur Proyek" : "Project Flow"}
                  </h2>
                  <div className="glass rounded-3xl p-8">
                    <ul className="space-y-4 text-[15px] text-[var(--muted)] leading-relaxed">
                      {visibleFlow.map((flow, idx) => (
                        <li key={idx} className="custom-list-item">
                          {flow.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            )}

            {visibleJobdesc.length > 0 && (
              <Reveal className="space-y-6">
                <div className="space-y-6" id="jobdesc">
                  <h2 className="font-display-aurora font-bold text-3xl md:text-4xl text-[var(--ink)]">
                    {isId ? "Tanggung Jawab Saya" : "My Responsibilities"}
                  </h2>
                  <div className="glass rounded-3xl p-8">
                    <ul className="space-y-4 text-[15px] text-[var(--muted)] leading-relaxed">
                      {visibleJobdesc.map((desc, idx) => (
                        <li key={idx} className="custom-list-item">
                          {desc.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </section>
      )}

      <div className="flex justify-center pt-4">
        <Magnetic strength={0.3}>
          <Link to="/" className="btn-ghost">
            <span className="material-symbols-outlined text-[18px]">
              arrow_back
            </span>
            {isId ? "Kembali ke Proyek" : "Back to Projects"}
          </Link>
        </Magnetic>
      </div>
    </main>
  );
}
