import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { api, IMAGE_BASE_URL } from "../services/api";
import type {
  DashboardStats,
  Experience,
  Project,
  Skill,
  Setting,
} from "../services/api";
import { Card, CardContent } from "@/components/ui/card";
import SpotlightCard from "../components/SpotlightCard";
import meImage from "../assets/me.webp";

export function Home() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [settings, setSettings] = useState<Setting | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsData, expData, projData, skillsData, settingsData] =
          await Promise.all([
            api.getDashboardStats(),
            api.getExperiences(),
            api.getProjects(),
            api.getSkills(),
            api.getSettings(),
          ]);
        setStats(statsData);
        setExperiences(expData || []);
        setSkills(skillsData || []);
        setSettings(settingsData);
        // Only show live and completed projects
        setProjects(
          (projData || []).filter(
            (p) =>
              p.is_complete && (p.status === "Live" || p.status === "Done"),
          ),
        );
      } catch (err) {
        console.error("Failed to load home data", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <main className="grow w-full max-w-300 mx-auto px-6 md:px-grid-margin py-10">
      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-section-gap-desktop">
        <div className="flex flex-col gap-6 order-2 md:order-1">
          <div className="inline-flex items-center gap-2 bg-surface-container-highest px-3 py-1.5 rounded-full w-fit">
            <span className="w-2 h-2 rounded-full bg-brand-blue"></span>
            <span className="font-label-code text-label-code text-brand-slate">
              {settings?.language === "id"
                ? "Tersedia untuk Proyek Baru"
                : "Available for New Projects"}
            </span>
          </div>
          <h1 className="font-display text-display text-brand-navy">
            {settings?.language === "id"
              ? "Saya Bilal Shandyarta Syamsudin"
              : "I am Bilal Shandyarta Syamsudin"}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
            {stats?.summary ||
              (settings?.language === "id"
                ? "Tidak ada ringkasan"
                : "No Summary")}
          </p>
          {(settings ? settings.show_experience : true) &&
          stats?.years_of_experience ? (
            <p className="font-label-code text-label-code text-brand-blue font-bold">
              {stats.years_of_experience}+{" "}
              {settings?.language === "id"
                ? "Tahun Pengalaman"
                : "Years of Experience"}
            </p>
          ) : null}
        </div>
        <div className="order-1 md:order-2 flex justify-center md:justify-end">
          <div className="relative w-full max-w-100 aspect-3/4 bg-transparent">
            <img
              alt="Bilal Shandyarta Professional Portrait"
              className="w-full h-full object-cover object-top"
              src={meImage}
            />
          </div>
        </div>
      </section>

      {/* Technical Arsenal Section */}
      <section className="mb-section-gap-desktop" id="skills">
        <div className="flex flex-col gap-2 mb-12">
          <span className="font-label-caps text-label-caps text-brand-slate uppercase tracking-wider">
            {settings?.language === "id" ? "Kemampuan" : "Capabilities"}
          </span>
          <h2 className="font-headline-lg text-headline-lg text-brand-navy">
            {settings?.language === "id"
              ? "Kemampuan Teknis"
              : "Technical Skills"}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(() => {
            const CATEGORIES = [
              {
                name: "Bahasa Pemrograman",
                icon: "terminal",
                desc: "Core languages for building robust software.",
              },
              {
                name: "Framework & Lingkungan",
                icon: "web",
                desc: "Tools for creating scalable applications.",
              },
              {
                name: "Database & Infrastruktur",
                icon: "database",
                desc: "Data management and deployment architectures.",
              },
              {
                name: "Alat Pengembangan (Tools)",
                icon: "handyman",
                desc: "Essential utilities for the development workflow.",
              },
              {
                name: "Lainnya",
                icon: "apps",
                desc: "Other valuable skills and capabilities.",
              },
            ];

            return CATEGORIES.map((cat) => {
              const catSkills = skills.filter((s) => s.category === cat.name);
              if (catSkills.length === 0) return null;

              return (
                <SpotlightCard
                  key={cat.name}
                  className="bg-surface group hover:shadow-[0_4px_12px_rgba(30,41,59,0.05)] transition-shadow border border-outline-variant rounded-xl p-6"
                  spotlightColor="rgba(59, 130, 246, 0.15)"
                >
                  <div>
                    <div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-lg mb-4 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined">
                        {cat.icon}
                      </span>
                    </div>
                    <h3 className="font-headline-md text-headline-md text-brand-navy mb-2">
                      {cat.name}
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-4">
                      {cat.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {catSkills.map((skill) => (
                        <span
                          key={skill.id}
                          className="bg-surface-container text-brand-slate font-label-code text-label-code px-2 py-1 rounded"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              );
            });
          })()}
        </div>
      </section>

      {/* Professional Journey Section */}
      <section className="mb-section-gap-desktop" id="experience">
        <div className="flex flex-col gap-2 mb-12">
          <span className="font-label-caps text-label-caps text-brand-slate uppercase tracking-wider">
            {settings?.language === "id" ? "Linimasa" : "Timeline"}
          </span>
          <h2 className="font-headline-lg text-headline-lg text-brand-navy">
            {settings?.language === "id"
              ? "Perjalanan Profesional"
              : "Professional Journey"}
          </h2>
        </div>
        <div className="relative border-l border-outline-variant ml-4 md:ml-6 space-y-12 pb-4">
          {loading ? (
            <p className="pl-8 text-secondary">
              {settings?.language === "id"
                ? "Memuat pengalaman..."
                : "Loading experiences..."}
            </p>
          ) : experiences.length === 0 ? (
            <p className="pl-8 text-secondary">
              {settings?.language === "id"
                ? "Belum ada pengalaman yang ditambahkan."
                : "No experiences added yet."}
            </p>
          ) : (
            experiences.map((exp) => (
              <div key={exp.id} className="relative pl-8 md:pl-12">
                <div
                  className={`absolute -left-1.25 top-1.5 w-2.5 h-2.5 rounded-none border ${exp.is_current ? "bg-brand-blue border-white" : "bg-surface-container-high border-outline-variant"}`}
                ></div>
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
                  <h3 className="font-headline-md text-headline-md text-brand-navy">
                    {exp.company_name}
                  </h3>
                  <span className="font-label-code text-label-code text-brand-slate">
                    {exp.role}
                  </span>
                </div>
                <p className="font-label-code text-label-code text-on-surface-variant mb-4">
                  {exp.start_date} -{" "}
                  {exp.is_current
                    ? settings?.language === "id"
                      ? "Sekarang"
                      : "Present"
                    : exp.end_date}
                </p>
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <ul className="space-y-3 font-body-md text-body-md text-on-surface-variant">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 bg-brand-blue rounded-none mt-2 shrink-0"></span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          )}
        </div>
      </section>

      {/* Selected Works Section */}
      <section className="mb-section-gap-desktop" id="works">
        <div className="flex flex-col gap-2 mb-12">
          <span className="font-label-caps text-label-caps text-brand-slate uppercase tracking-wider">
            {settings?.language === "id" ? "Portofolio" : "Portfolio"}
          </span>
          <h2 className="font-headline-lg text-headline-lg text-brand-navy">
            {settings?.language === "id" ? "Karya Pilihan" : "Selected Works"}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {loading ? (
            <p className="text-secondary">
              {settings?.language === "id"
                ? "Memuat proyek..."
                : "Loading projects..."}
            </p>
          ) : projects.length === 0 ? (
            <p className="text-secondary">
              {settings?.language === "id"
                ? "Tidak ada proyek aktif untuk ditampilkan."
                : "No live projects to display."}
            </p>
          ) : (
            projects.map((project, idx) => (
              <Link
                key={project.id}
                className={`group block ${idx % 3 === 2 ? "md:col-span-2" : ""}`}
                to={`/project/${project.id}`}
              >
                <Card
                  className={`border-outline-variant rounded-xl overflow-hidden hover:shadow-[0_4px_12px_rgba(30,41,59,0.05)] transition-all flex flex-col ${idx % 3 === 2 ? "md:flex-row" : ""}`}
                >
                  <div
                    className={`bg-surface-container-low border-outline-variant overflow-hidden ${idx % 3 === 2 ? "md:w-1/2 border-b md:border-b-0 md:border-r aspect-video md:aspect-auto" : "aspect-video border-b"}`}
                  >
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={project.name}
                      src={`${IMAGE_BASE_URL}${project.image_url}`}
                    />
                  </div>
                  <CardContent
                    className={`p-6 ${idx % 3 === 2 ? "md:w-1/2 flex flex-col justify-center" : ""}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-headline-md text-headline-md text-brand-navy group-hover:text-brand-blue transition-colors">
                        {project.name}
                      </h3>
                      <span className="material-symbols-outlined text-brand-slate group-hover:text-brand-blue transition-colors">
                        arrow_outward
                      </span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    {project.tech_stack && project.tech_stack.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.tech_stack.map((tech, i) => (
                          <span
                            key={i}
                            className="font-label-code text-label-code text-brand-slate bg-surface-container px-2 py-1 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
