import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { api, getImageUrl } from "../services/api";
import type { Project, Category, Setting } from "../services/api";
import { TiltCard } from "../components/TiltCard";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { ExternalLink, ArrowRight } from "lucide-react";

export function CategoryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [projects, setProjects] = useState<Project[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [settings, setSettings] = useState<Setting | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const isId = settings?.language === "id";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projData, catsData, settingsData] = await Promise.all([
          api.getProjects(),
          api.getCategories(),
          api.getSettings(),
        ]);

        const matchedCat = (catsData || []).find(
          (c) =>
            c.slug.toLowerCase() === slug?.toLowerCase() ||
            c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug?.toLowerCase()
        );

        setCategory(
          matchedCat || {
            id: 0,
            name: slug ? slug.replace(/-/g, " ").toUpperCase() : "Category",
            slug: slug || "",
            description: "",
            display_order: 1,
            show_on_home: true,
          }
        );

        const categoryName = matchedCat ? matchedCat.name : slug;

        const categoryProjects = (projData || [])
          .filter((p) => p.is_visible)
          .filter(
            (p) =>
              p.category?.toLowerCase() === categoryName?.toLowerCase() ||
              p.category?.toLowerCase() === slug?.toLowerCase() ||
              p.category?.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug?.toLowerCase()
          );

        setProjects(categoryProjects);
        setSettings(settingsData);
      } catch (err) {
        console.error("Failed to load category projects", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  const handleCardClick = (e: React.MouseEvent, project: Project) => {
    if (project.target_type === "direct" && project.link) {
      e.preventDefault();
      if (project.link.startsWith("http")) {
        window.open(project.link, "_blank", "noopener,noreferrer");
      } else {
        navigate(project.link);
      }
    }
  };

  return (
    <main className="grow w-full pt-28 sm:pt-36 pb-20 sm:pb-32">
      <div className="w-full max-w-300 mx-auto px-6 md:px-grid-margin">
        {/* Navigation Breadcrumbs */}
        <Reveal>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 font-mono-aurora text-xs text-[var(--muted)] mb-6 sm:mb-8">
            <Link to="/" className="hover:text-[var(--cyan)] transition-colors active:scale-95">
              {isId ? "Beranda" : "Home"}
            </Link>
            <span className="opacity-50">/</span>
            <Link to="/all-category" className="hover:text-[var(--cyan)] transition-colors active:scale-95">
              {isId ? "Kategori" : "Categories"}
            </Link>
            <span className="opacity-50">/</span>
            <span className="text-white font-medium truncate max-w-[200px] sm:max-w-none">{category?.name}</span>
          </div>
        </Reveal>

        {/* Category Header */}
        <SectionHeading
          eyebrow={isId ? "kategori proyek" : "project category"}
          title={
            <>
              {category?.name} <span className="text-aurora">Works</span>
            </>
          }
          description={
            category?.description ||
            (isId
              ? `Koleksi proyek dalam kategori ${category?.name}.`
              : `Explore all projects and initiatives belonging to the ${category?.name} collection.`)
          }
        />

        {/* Counter Badge & Back Link */}
        <div className="mt-4 sm:mt-6 mb-8 sm:mb-12 flex flex-wrap items-center justify-between gap-3">
          <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-white/[0.06] border border-white/10 text-[var(--cyan)] font-mono-aurora">
            {projects.length} {projects.length === 1 ? "Project" : "Projects"}
          </span>
          <Link
            to="/all-category"
            className="text-xs text-[var(--muted)] hover:text-white transition-colors py-1 inline-flex items-center gap-1"
          >
            <span>{isId ? "Lihat semua kategori" : "View all categories"}</span>
            <span className="text-sm">→</span>
          </Link>
        </div>

        {/* Project Grid */}
        {loading ? (
          <div className="py-24 text-center font-mono-aurora text-sm text-[var(--muted)]">
            {isId ? "Memuat proyek kategori..." : "Loading category projects..."}
          </div>
        ) : projects.length === 0 ? (
          <div className="py-16 sm:py-24 text-center rounded-3xl glass p-6 sm:p-8">
            <p className="text-base sm:text-lg font-medium text-white mb-2">
              {isId
                ? "Belum ada proyek dalam kategori ini"
                : "No projects in this category yet"}
            </p>
            <p className="text-xs sm:text-sm text-[var(--muted)] mb-6">
              {isId
                ? "Tambahkan proyek ke kategori ini melalui panel admin."
                : "Assign projects to this category in the admin panel to showcase them here."}
            </p>
            <Link to="/all-category" className="btn-ghost text-xs !py-2.5 !px-5">
              {isId ? "Jelajahi Semua Kategori" : "Browse All Categories"}
            </Link>
          </div>
        ) : (
          <Reveal stagger className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {projects.map((project) => {
              const isDirect = project.target_type === "direct";
              const destination = isDirect && project.link ? project.link : `/project/${project.id}`;

              return (
                <Link
                  key={project.id}
                  to={destination}
                  onClick={(e) => handleCardClick(e, project)}
                  className="group block cursor-pointer active:scale-[0.99] transition-transform duration-200"
                >
                  <TiltCard
                    className="glass rounded-2xl sm:rounded-3xl overflow-hidden h-full transition-colors duration-300 hover:border-white/[0.2] flex flex-col"
                    maxTilt={4}
                  >
                    <div className="relative overflow-hidden bg-white/[0.03] aspect-video">
                      <img
                        className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700 ease-out"
                        alt={project.name}
                        src={getImageUrl(project.image_url)}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,8,16,0.6)] via-transparent to-transparent" />

                      {isDirect && (
                        <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                          <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-cyan-500/90 text-black shadow-sm">
                            Live Demo
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-5 sm:p-6 md:p-7 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2.5 sm:mb-3 gap-3 sm:gap-4">
                          <h3 className="font-display-aurora font-semibold text-lg sm:text-xl text-[var(--ink)] group-hover:text-[var(--cyan)] transition-colors duration-300">
                            {project.name}
                          </h3>
                          <span className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/10 flex items-center justify-center text-[var(--muted)] group-hover:text-[var(--ink)] group-hover:border-[var(--cyan)] group-hover:rotate-45 transition-all duration-300">
                            {isDirect ? (
                              <ExternalLink className="w-4 h-4" />
                            ) : (
                              <ArrowRight className="w-4 h-4" />
                            )}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-[var(--muted)] mb-4 sm:mb-5 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {project.tech_stack && project.tech_stack.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2 border-t border-white/5">
                          {project.tech_stack.map((tech, i) => (
                            <span key={i} className="chip text-[10px] sm:text-[11px] px-2.5 py-0.5 sm:py-1">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </TiltCard>
                </Link>
              );
            })}
          </Reveal>
        )}
      </div>
    </main>
  );
}
