import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { api, getImageUrl } from "../services/api";
import type { Project, Setting } from "../services/api";
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
      <main className="grow max-w-300 mx-auto w-full px-6 md:px-12 pt-40 pb-24 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-white/10 border-t-[var(--cyan)] animate-spin" />
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="grow max-w-300 mx-auto w-full px-6 md:px-12 pt-40 pb-24">
        <div className="flex flex-col items-center justify-center text-center min-h-[50vh]">
          <h1 className="font-display-aurora font-bold text-5xl md:text-7xl text-[var(--ink)] mb-8 tracking-tighter">
            {isId ? "404" : "404"}
          </h1>
          <p className="text-xl text-[var(--muted)] mb-12">
            {isId ? "Proyek Tidak Ditemukan" : "Project Not Found"}
          </p>
          <Magnetic strength={0.3}>
            <Link to="/" className="btn-ghost">
              <span className="material-symbols-outlined text-[18px]">
                arrow_back
              </span>
              {isId ? "Kembali" : "Back"}
            </Link>
          </Magnetic>
        </div>
      </main>
    );
  }

  const visibleFlow = (project.project_flow || []).filter((f) => f.is_visible);
  const visibleJobdesc = (project.jobdesc || []).filter((j) => j.is_visible);
  
  // Combine screenshots and carousel images for display
  const displayScreenshots = project.screenshots || 
    (project.carousel_images || []).map((url, idx) => ({
      image_url: url,
      title: isId ? `Tangkapan layar ${idx + 1}` : `Screenshot ${idx + 1}`
    }));

  return (
    <main className="grow w-full pt-24 sm:pt-32 pb-20 sm:pb-32">
      {/* Exaggerated Minimalist Hero */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 mb-12 sm:mb-20 md:mb-32">
        <Reveal>
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono-aurora text-xs sm:text-sm text-[var(--muted)] hover:text-[var(--ink)] transition-colors group w-fit mb-8 sm:mb-12 md:mb-16 active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            {isId ? "Kembali ke Proyek" : "Back to Projects"}
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 
            className="font-display-aurora font-black text-[var(--ink)] leading-[0.95] sm:leading-[0.9] break-words"
            style={{ 
              fontSize: "clamp(2.25rem, 8vw, 7.5rem)",
              letterSpacing: "-0.03em",
              marginLeft: "-0.02em" 
            }}
          >
            {project.name}
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 mt-10 sm:mt-16 md:mt-24">
            <div className="md:col-span-8">
              <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-[var(--muted)] leading-[1.4] tracking-tight font-light whitespace-pre-wrap max-w-4xl">
                {project.description}
              </p>
            </div>
            
            <div className="md:col-span-4 flex flex-col gap-6 sm:gap-8 md:pt-2">
              {project.tech_stack && project.tech_stack.length > 0 && (
                <div>
                  <h3 className="eyebrow mb-3 sm:mb-4 opacity-60 text-xs sm:text-sm">
                    {isId ? "Teknologi" : "Tech Stack"}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.tech_stack.map((tech, idx) => (
                      <span key={idx} className="chip text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {project.link && (
                <div>
                  <h3 className="eyebrow mb-3 sm:mb-4 opacity-60 text-xs sm:text-sm">
                    {isId ? "Tautan" : "Live Link"}
                  </h3>
                  <Magnetic strength={0.2}>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-aurora justify-center w-full sm:w-auto text-center"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        open_in_new
                      </span>
                      {isId ? "Kunjungi Proyek" : "Visit Project"}
                    </a>
                  </Magnetic>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Main Cover Image */}
      <Reveal delay={0.3}>
        <div className="w-full px-4 sm:px-6 md:px-12 max-w-[1600px] mx-auto mb-16 sm:mb-28 md:mb-40">
          <div className="w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] rounded-2xl md:rounded-[40px] overflow-hidden bg-white/[0.03] relative border border-white/10 shadow-[0_30px_100px_-24px_rgba(99,102,241,0.2)]">
            <img
              className="w-full h-full object-cover"
              alt={project.name}
              src={getImageUrl(project.image_url)}
            />
          </div>
        </div>
      </Reveal>

      {/* Screenshots Section with Mandatory Descriptions */}
      {displayScreenshots.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16 sm:mb-28 md:mb-40">
          <Reveal>
            <h2 className="font-display-aurora font-bold text-2xl sm:text-4xl md:text-6xl text-[var(--ink)] mb-8 sm:mb-16 md:mb-24 tracking-tight">
              {isId ? "Tinjauan Visual" : "Visual Overview"}
            </h2>
          </Reveal>
          
          <div className="space-y-12 sm:space-y-20 md:space-y-36">
            {displayScreenshots.map((shot, idx) => (
              <Reveal key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-16 items-center">
                <div className={`md:col-span-8 ${idx % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="w-full rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] shadow-2xl transition-transform duration-500 hover:scale-[1.01] sm:hover:scale-[1.02]">
                    <img
                      src={getImageUrl(shot.image_url)}
                      alt={`${project.name} screenshot ${idx + 1}`}
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className={`md:col-span-4 ${idx % 2 === 1 ? 'md:order-1' : ''}`}>
                  <div className="flex flex-col gap-3 sm:gap-6">
                    <span className="font-mono-aurora text-xs text-[var(--cyan)] uppercase tracking-widest opacity-80">
                      0{idx + 1} //
                    </span>
                    <p className="text-lg sm:text-xl md:text-2xl text-[var(--muted)] leading-relaxed font-light">
                      {shot.title}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Details Sections */}
      {((visibleFlow.length > 0) || (visibleJobdesc.length > 0)) && (
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 mb-20 sm:mb-32 grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 md:gap-12">
          
          {visibleFlow.length > 0 && (
            <Reveal className="space-y-6 sm:space-y-10">
              <h2 className="font-display-aurora font-bold text-2xl sm:text-3xl md:text-4xl text-[var(--ink)] tracking-tight">
                {isId ? "Alur Proyek" : "Project Flow"}
              </h2>
              <div className="space-y-4 sm:space-y-6">
                {visibleFlow.map((flow, idx) => (
                  <div key={idx} className="flex gap-4 sm:gap-6 group">
                    <div className="mt-0.5 sm:mt-1 flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-[var(--cyan)] font-mono-aurora text-xs group-hover:border-[var(--cyan)] group-hover:bg-[var(--cyan)]/10 transition-colors">
                      {idx + 1}
                    </div>
                    <p className="text-base sm:text-lg text-[var(--muted)] leading-relaxed pt-0.5 sm:pt-1">
                      {flow.text}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {visibleJobdesc.length > 0 && (
            <Reveal className="space-y-6 sm:space-y-10">
              <h2 className="font-display-aurora font-bold text-2xl sm:text-3xl md:text-4xl text-[var(--ink)] tracking-tight">
                {isId ? "Tanggung Jawab" : "Responsibilities"}
              </h2>
              <div className="space-y-4 sm:space-y-6">
                {visibleJobdesc.map((desc, idx) => (
                  <div key={idx} className="flex gap-4 sm:gap-6 group">
                    <div className="mt-0.5 sm:mt-1 flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-[var(--indigo)] font-mono-aurora text-xs group-hover:border-[var(--indigo)] group-hover:bg-[var(--indigo)]/10 transition-colors">
                      <span className="material-symbols-outlined text-[14px]">
                        check
                      </span>
                    </div>
                    <p className="text-base sm:text-lg text-[var(--muted)] leading-relaxed pt-0.5 sm:pt-1">
                      {desc.text}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

        </section>
      )}

      {/* Footer CTA */}
      <Reveal className="flex justify-center pb-12 sm:pb-20">
        <Magnetic strength={0.3}>
          <Link to="/" className="btn-ghost text-base sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4">
            <span className="material-symbols-outlined text-[20px] sm:text-[24px]">
              arrow_upward
            </span>
            {isId ? "Kembali ke Beranda" : "Back to Home"}
          </Link>
        </Magnetic>
      </Reveal>
    </main>
  );
}
