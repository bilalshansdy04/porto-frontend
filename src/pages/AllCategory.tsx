import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, getImageUrl } from "../services/api";
import type { Project, Category, Setting } from "../services/api";
import { TiltCard } from "../components/TiltCard";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { Search, ExternalLink, ArrowRight, ArrowLeft } from "lucide-react";

export function AllCategory() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [settings, setSettings] = useState<Setting | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
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
        setProjects((projData || []).filter((p) => p.is_visible));
        setCategories(catsData || []);
        setSettings(settingsData);
      } catch (err) {
        console.error("Failed to load all categories data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === "All" ||
      project.category?.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      !searchQuery.trim() ||
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech_stack?.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

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
        {/* Back Link */}
        <Reveal>
          <Link
            to="/#works"
            className="inline-flex items-center gap-2 font-mono-aurora text-xs text-[var(--muted)] hover:text-[var(--cyan)] transition-colors mb-6 sm:mb-8 cursor-pointer group active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {isId ? "Kembali ke Beranda" : "Back to Home"}
          </Link>
        </Reveal>

        {/* Header */}
        <SectionHeading
          eyebrow={isId ? "koleksi lengkap" : "all categories"}
          title={
            isId ? (
              <>
                Semua <span className="text-aurora">Karya</span>
              </>
            ) : (
              <>
                Complete <span className="text-aurora">Works</span>
              </>
            )
          }
          description={
            isId
              ? "Jelajahi seluruh proyek dan prototipe saya berdasarkan kategori atau pencarian kata kunci."
              : "Explore my entire portfolio of systems, products, and interactive landing pages across all domains."
          }
        />

        {/* Search & Filter Bar */}
        <div className="mt-6 sm:mt-8 mb-8 sm:mb-12 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-6 px-6 md:mx-0 md:px-0 md:flex-wrap pb-1 md:pb-0">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`shrink-0 whitespace-nowrap px-3.5 sm:px-4 py-2 rounded-full text-xs font-medium transition-all active:scale-95 cursor-pointer ${
                selectedCategory === "All"
                  ? "bg-[var(--cyan)] text-black font-semibold shadow-lg shadow-[var(--cyan)]/20"
                  : "glass text-[var(--muted)] hover:text-white"
              }`}
            >
              {isId ? "Semua" : "All Projects"} ({projects.length})
            </button>
            {categories.map((cat) => {
              const count = projects.filter(
                (p) =>
                  p.category?.toLowerCase() === cat.name.toLowerCase() ||
                  p.category?.toLowerCase() === cat.slug.toLowerCase()
              ).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`shrink-0 whitespace-nowrap px-3.5 sm:px-4 py-2 rounded-full text-xs font-medium transition-all active:scale-95 cursor-pointer ${
                    selectedCategory.toLowerCase() === cat.name.toLowerCase()
                      ? "bg-[var(--cyan)] text-black font-semibold shadow-lg shadow-[var(--cyan)]/20"
                      : "glass text-[var(--muted)] hover:text-white"
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-auto md:min-w-[280px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
            <input
              type="text"
              placeholder={isId ? "Cari proyek..." : "Search projects or tech..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 rounded-full glass text-xs text-white placeholder-[var(--muted)] focus:outline-none focus:ring-1 focus:ring-[var(--cyan)] border border-white/10"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-white text-xs p-1"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Project Grid */}
        {loading ? (
          <div className="py-24 text-center font-mono-aurora text-sm text-[var(--muted)]">
            {isId ? "Memuat seluruh proyek..." : "Loading all projects..."}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="py-16 sm:py-24 text-center rounded-3xl glass p-6 sm:p-8">
            <p className="text-base sm:text-lg font-medium text-white mb-2">
              {isId ? "Tidak ada proyek yang cocok" : "No matching projects found"}
            </p>
            <p className="text-xs sm:text-sm text-[var(--muted)] mb-6">
              {isId
                ? "Coba ubah filter kategori atau kata kunci pencarian Anda."
                : "Try adjusting your category selection or search query."}
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="btn-ghost text-xs !py-2.5 !px-5"
            >
              {isId ? "Reset Filter" : "Reset Filters"}
            </button>
          </div>
        ) : (
          <Reveal stagger className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {filteredProjects.map((project) => {
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

                      {/* Category Tag & Direct Badge */}
                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex gap-1.5 sm:gap-2 flex-wrap">
                        <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-semibold bg-black/60 backdrop-blur-md text-white border border-white/10">
                          {project.category || "General"}
                        </span>
                        {isDirect && (
                          <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-cyan-500/90 text-black shadow-sm">
                            Live Demo
                          </span>
                        )}
                      </div>
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
