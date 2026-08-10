import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { api, IMAGE_BASE_URL } from "../services/api";
import type { Project, Setting } from "../services/api";

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [settings, setSettings] = useState<Setting | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const [projectData, settingsData] = await Promise.all([
            api.getProject(id),
            api.getSettings()
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
    return <main className="flex-grow max-w-max-width mx-auto w-full px-grid-margin py-section-gap-mobile md:py-section-gap-desktop"><p>{settings?.language === "id" ? "Memuat detail proyek..." : "Loading project details..."}</p></main>;
  }

  if (!project) {
    return (
      <main className="flex-grow max-w-max-width mx-auto w-full px-grid-margin py-section-gap-mobile md:py-section-gap-desktop">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="font-display text-display text-primary mb-4">
            {settings?.language === "id" ? "Proyek Tidak Ditemukan" : "Project Not Found"}
          </h1>
          <Link className="inline-flex items-center px-6 py-3 border border-[#64748b] rounded-lg font-body-md text-body-md text-primary hover:bg-[#f1f5f9] transition-colors" to="/">
            <span className="material-symbols-outlined mr-2" style={{ fontSize: "20px" }}>arrow_back</span>
            {settings?.language === "id" ? "Kembali ke Proyek" : "Back to Projects"}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow max-w-max-width mx-auto w-full px-grid-margin py-section-gap-mobile md:py-section-gap-desktop space-y-section-gap-mobile md:space-y-section-gap-desktop">
      {/* Hero Section */}
      <section className="flex flex-col items-start gap-6">
        <Link className="flex items-center text-[#3b82f6] font-body-md text-body-md hover:underline mb-4" to="/">
          <span className="material-symbols-outlined mr-2" style={{ fontSize: "18px" }}>arrow_back</span>
          {settings?.language === "id" ? "Kembali ke Proyek" : "Back to Projects"}
        </Link>
        <h1 className="font-display text-display text-primary max-w-3xl">{project.name}</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed whitespace-pre-wrap">
          {project.description}
        </p>
        {project.tech_stack && project.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-4">
            {project.tech_stack.map((tech, idx) => (
              <span key={idx} className="font-label-code text-label-code bg-[#f1f5f9] text-[#64748b] px-3 py-1 rounded">
                {tech}
              </span>
            ))}
          </div>
        )}
      </section>

      {/* Project Images (Bento Grid Style) */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-grid-gutter">
        <div className="md:col-span-12 h-96 rounded-xl border border-outline-variant overflow-hidden bg-white project-card relative">
          <img 
            className="w-full h-full object-cover" 
            alt={project.name} 
            src={`${IMAGE_BASE_URL}${project.image_url}`} 
          />
        </div>
      </section>

      {/* Content Sections */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Sticky Navigation for Content */}
        <div className="md:col-span-3 hidden md:block">
          <div className="sticky top-24 space-y-4">
            <h3 className="font-label-caps text-label-caps text-secondary tracking-widest uppercase">
              {settings?.language === "id" ? "Daftar Isi" : "Contents"}
            </h3>
            <ul className="space-y-3 font-body-md text-body-md text-on-surface-variant">
              {project.project_flow && project.project_flow.length > 0 && (
                <li><a className="hover:text-primary transition-colors" href="#flow">{settings?.language === "id" ? "Alur Proyek" : "Project Flow"}</a></li>
              )}
              {project.jobdesc && project.jobdesc.length > 0 && (
                <li><a className="hover:text-primary transition-colors" href="#jobdesc">{settings?.language === "id" ? "Tanggung Jawab" : "Responsibilities"}</a></li>
              )}
            </ul>
          </div>
        </div>

        {/* Text Content */}
        <div className="md:col-span-9 space-y-16">
          {project.project_flow && project.project_flow.length > 0 && (
            <>
              <div className="space-y-6" id="flow">
                <h2 className="font-headline-lg text-headline-lg text-primary">
                  {settings?.language === "id" ? "Alur Proyek" : "Project Flow"}
                </h2>
                <div className="bg-white p-8 rounded-xl border border-outline-variant mt-6">
                  <ul className="space-y-4 font-body-md text-body-md text-on-surface-variant pl-4">
                    {project.project_flow.map((flow, idx) => (
                      <li key={idx} className="custom-list-item">{flow}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="w-full h-px bg-outline-variant opacity-50"></div>
            </>
          )}

          {project.jobdesc && project.jobdesc.length > 0 && (
            <div className="space-y-6" id="jobdesc">
              <h2 className="font-headline-lg text-headline-lg text-primary">
                {settings?.language === "id" ? "Tanggung Jawab Saya" : "My Responsibilities"}
              </h2>
              <div className="bg-white p-8 rounded-xl border border-outline-variant mt-6">
                <ul className="space-y-4 font-body-md text-body-md text-on-surface-variant pl-4">
                  {project.jobdesc.map((desc, idx) => (
                    <li key={idx} className="custom-list-item">{desc}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="flex justify-center pt-12 pb-8">
        <Link className="inline-flex items-center px-6 py-3 border border-[#64748b] rounded-lg font-body-md text-body-md text-primary hover:bg-[#f1f5f9] transition-colors" to="/">
          <span className="material-symbols-outlined mr-2" style={{ fontSize: "20px" }}>arrow_back</span>
          {settings?.language === "id" ? "Kembali ke Proyek" : "Back to Projects"}
        </Link>
      </div>
    </main>
  );
}
