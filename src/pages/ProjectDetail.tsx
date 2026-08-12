import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { api, IMAGE_BASE_URL } from "../services/api";
import type { Project, Setting } from "../services/api";
import { buttonVariants } from "@/components/ui/button";
import DepthCarousel from "@/components/DepthCarousel";
import LineSidebar from "@/components/LineSidebar";

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
      <main className="flex-grow max-w-max-width mx-auto w-full px-grid-margin py-section-gap-mobile md:py-section-gap-desktop">
        <p>
          {settings?.language === "id"
            ? "Memuat detail proyek..."
            : "Loading project details..."}
        </p>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="flex-grow max-w-max-width mx-auto w-full px-grid-margin py-section-gap-mobile md:py-section-gap-desktop">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="font-display text-display text-primary mb-4">
            {settings?.language === "id"
              ? "Proyek Tidak Ditemukan"
              : "Project Not Found"}
          </h1>
          <Link
            to="/"
            className={buttonVariants({
              variant: "outline",
              className: "px-6 py-6 font-body-md text-primary",
            })}
          >
            <span
              className="material-symbols-outlined mr-2"
              style={{ fontSize: "20px" }}
            >
              arrow_back
            </span>
            {settings?.language === "id"
              ? "Kembali ke Proyek"
              : "Back to Projects"}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow max-w-max-width mx-auto w-full px-grid-margin py-section-gap-mobile space-y-section-gap-mobile md:space-y-section-gap-desktop">
      {/* Hero & Banner Section */}
      <section className="flex flex-col gap-6">
        {/* Top Banner (Static Image) */}
        <div className="w-full aspect-[21/9] rounded-xl border border-outline-variant overflow-hidden bg-white project-card relative">
          <img
            className="w-full h-full object-cover"
            alt={project.name}
            src={`${IMAGE_BASE_URL}${project.image_url}`}
          />
        </div>

        {/* Project Info (Below Banner) */}
        <div className="flex flex-col gap-4 mt-2">
          <Link
            to="/"
            className={buttonVariants({
              variant: "link",
              className:
                "p-0 h-auto justify-start text-[#3b82f6] hover:underline mb-2 w-fit",
            })}
          >
            <span
              className="material-symbols-outlined mr-2"
              style={{ fontSize: "18px" }}
            >
              arrow_back
            </span>
            {settings?.language === "id"
              ? "Kembali ke Proyek"
              : "Back to Projects"}
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="font-display text-display text-primary">
              {project.name}
            </h1>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({
                  className:
                    "bg-brand-navy hover:opacity-90 transition-opacity whitespace-nowrap",
                })}
              >
                <span className="material-symbols-outlined text-sm mr-2">
                  open_in_new
                </span>
                {settings?.language === "id"
                  ? "Kunjungi Proyek"
                  : "Visit Project"}
              </a>
            )}
          </div>

          {project.tech_stack && project.tech_stack.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {project.tech_stack.map((tech, idx) => (
                <span
                  key={idx}
                  className="font-label-code text-label-code bg-[#f1f5f9] text-[#64748b] px-3 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed whitespace-pre-wrap max-w-4xl">
            {project.description}
          </p>

          {/* Carousel Below Description with Smaller Size */}
          {project.carousel_images && project.carousel_images.length > 0 && (
            <div className="mt-8 w-full max-w-4xl mx-auto h-[400px] sm:h-[500px] relative">
              <DepthCarousel
                items={project.carousel_images.map((imgUrl, idx) => ({
                  image: `${IMAGE_BASE_URL}${imgUrl}`,
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
          )}
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
            {(() => {
              const sidebarItems: string[] = [];
              const sidebarLinks: string[] = [];
              if (project.project_flow && project.project_flow.length > 0) {
                sidebarItems.push(
                  settings?.language === "id" ? "Alur Proyek" : "Project Flow",
                );
                sidebarLinks.push("flow");
              }
              if (project.jobdesc && project.jobdesc.length > 0) {
                sidebarItems.push(
                  settings?.language === "id"
                    ? "Tanggung Jawab"
                    : "Responsibilities",
                );
                sidebarLinks.push("jobdesc");
              }
              return (
                <div className="pl-6 pt-2">
                  <LineSidebar
                    items={sidebarItems}
                    accentColor="#3b82f6" // brand-blue
                    textColor="#94a3b8" // text-secondary
                    markerColor="#334155" // outline-variant
                    showIndex={false}
                    fontSize={1}
                    itemGap={18}
                    onItemClick={(index) => {
                      const id = sidebarLinks[index];
                      const element = document.getElementById(id);
                      if (element) {
                        const top =
                          element.getBoundingClientRect().top +
                          window.scrollY -
                          100; // offset for navbar
                        window.scrollTo({ top, behavior: "smooth" });
                      }
                    }}
                  />
                </div>
              );
            })()}
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
                      <li key={idx} className="custom-list-item">
                        {flow}
                      </li>
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
                {settings?.language === "id"
                  ? "Tanggung Jawab Saya"
                  : "My Responsibilities"}
              </h2>
              <div className="bg-white p-8 rounded-xl border border-outline-variant mt-6">
                <ul className="space-y-4 font-body-md text-body-md text-on-surface-variant pl-4">
                  {project.jobdesc.map((desc, idx) => (
                    <li key={idx} className="custom-list-item">
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="flex justify-center pt-12 pb-8">
        <Link
          to="/"
          className={buttonVariants({
            variant: "outline",
            className: "px-6 py-6 font-body-md text-primary",
          })}
        >
          <span
            className="material-symbols-outlined mr-2"
            style={{ fontSize: "20px" }}
          >
            arrow_back
          </span>
          {settings?.language === "id"
            ? "Kembali ke Proyek"
            : "Back to Projects"}
        </Link>
      </div>
    </main>
  );
}
