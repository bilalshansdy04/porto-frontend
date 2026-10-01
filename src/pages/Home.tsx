import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { api, getImageUrl } from "../services/api";
import type {
  DashboardStats,
  Experience,
  Project,
  Skill,
  Setting,
} from "../services/api";
import { TiltCard } from "../components/TiltCard";
import { Magnetic } from "../components/Magnetic";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { AnimatedCounter } from "../components/AnimatedCounter";
import { TechMarquee } from "../components/TechMarquee";
import { gsap, isCoarsePointer, prefersReducedMotion } from "../lib/gsap";

const SKILL_CATEGORIES = [
  {
    name: "Bahasa Pemrograman",
    nameEn: "Programming Languages",
    icon: "terminal",
    desc: "Inti dari pembangunan perangkat lunak yang tangguh.",
    descEn: "Core languages for building robust software.",
  },
  {
    name: "Framework & Lingkungan",
    nameEn: "Frameworks & Environments",
    icon: "web",
    desc: "Perangkat untuk menciptakan aplikasi yang skalabel.",
    descEn: "Tools for creating scalable applications.",
  },
  {
    name: "Database & Infrastruktur",
    nameEn: "Database & Infrastructure",
    icon: "database",
    desc: "Manajemen data dan arsitektur deployment.",
    descEn: "Data management and deployment architectures.",
  },
  {
    name: "Alat Pengembangan (Tools)",
    nameEn: "Development Tools",
    icon: "handyman",
    desc: "Utilitas penting untuk alur kerja pengembangan.",
    descEn: "Essential utilities for the development workflow.",
  },
  {
    name: "Lainnya",
    nameEn: "Others",
    icon: "apps",
    desc: "Kemampuan dan kapabilitas berharga lainnya.",
    descEn: "Other valuable skills and capabilities.",
  },
];

export function Home() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [settings, setSettings] = useState<Setting | null>(null);
  const [loading, setLoading] = useState(true);
  const secretClicksRef = useRef(0);

  const heroRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  const isId = settings?.language === "id";

  const handleSecretClick = () => {
    secretClicksRef.current += 1;
    if (secretClicksRef.current >= 5) {
      secretClicksRef.current = 0;
      window.dispatchEvent(new Event("openSecretAdminDialog"));
    }
  };

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
        setProjects(
          (projData || []).filter((p) => p.is_visible),
        );
      } catch (err) {
        console.error("Failed to load home data", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const hero = heroRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-anim", {
        y: 36,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.15,
      });
    }, hero);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    if (prefersReducedMotion() || isCoarsePointer()) return;

    const layers = Array.from(
      hero.querySelectorAll<HTMLElement>("[data-depth]"),
    ).map((el) => ({ el, depth: parseFloat(el.dataset.depth || "0") }));
    if (layers.length === 0) return;

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      tx = (e.clientX - rect.left) / rect.width - 0.5;
      ty = (e.clientY - rect.top) / rect.height - 0.5;
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
    };

    const loop = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      if (Math.abs(tx - cx) + Math.abs(ty - cy) > 0.0005) {
        for (const { el, depth } of layers) {
          el.style.translate = `${(-cx * depth * 2).toFixed(2)}px ${(-cy * depth * 2).toFixed(2)}px`;
        }
      }
      raf = requestAnimationFrame(loop);
    };

    hero.addEventListener("mousemove", onMove, { passive: true });
    hero.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
      for (const { el } of layers) el.style.translate = "";
    };
  }, []);

  useEffect(() => {
    const timeline = timelineRef.current;
    const rail = railRef.current;
    if (!timeline || !rail) return;

    const dotCenterY = (dot: HTMLElement) => {
      let y = dot.offsetTop + dot.offsetHeight / 2;
      let parent = dot.offsetParent as HTMLElement | null;
      while (parent && parent !== timeline) {
        y += parent.offsetTop;
        parent = parent.offsetParent as HTMLElement | null;
      }
      return y;
    };

    const alignRail = () => {
      const dots = timeline.querySelectorAll<HTMLElement>(".timeline-dot");
      const first = dots[0];
      const last = dots[dots.length - 1];
      if (!first || !last) return;
      const firstY = dotCenterY(first);
      const lastY = dotCenterY(last);
      rail.style.top = `${firstY}px`;
      rail.style.bottom = "auto";
      rail.style.height = `${Math.max(lastY - firstY, 2)}px`;
    };

    alignRail();
    const ro = new ResizeObserver(alignRail);
    ro.observe(timeline);
    return () => ro.disconnect();
  }, [loading, experiences.length]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 90,
        behavior: "smooth",
      });
    }
  };

  const statItems = [
    (settings ? settings.show_experience : true) &&
      stats?.years_of_experience
      ? {
          value: stats.years_of_experience,
          suffix: "+",
          label: isId ? "Tahun Pengalaman" : "Years of Experience",
        }
      : null,
    {
      value: projects.length,
      suffix: "",
      label: isId ? "Proyek Dibuat" : "Projects Built",
    },
    {
      value: skills.length,
      suffix: "",
      label: isId ? "Teknologi Dikuasai" : "Technologies",
    },
  ].filter(Boolean) as { value: number; suffix: string; label: string }[];

  return (
    <main className="grow w-full">
      {/* ================= HERO ================= */}
      <section
        ref={heroRef}
        id="home"
        className="relative min-h-[100svh] flex items-center pt-36 pb-24 overflow-hidden"
      >
        <div className="dot-grid" aria-hidden="true" />
        <div className="relative w-full max-w-300 mx-auto px-6 md:px-grid-margin">
          <div className="hero-anim inline-flex items-center gap-2.5 glass rounded-full px-4 py-2 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--cyan)] opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--cyan)]" />
            </span>
            <span className="font-mono-aurora text-xs text-[var(--muted)] tracking-wide">
              {isId ? "Tersedia untuk proyek baru" : "Available for new projects"}
            </span>
          </div>

          <p className="hero-anim eyebrow mb-5">
            <span className="opacity-60">{"//"}</span>{" "}
            {isId ? "halo, saya" : "hello, i am"}
          </p>

          <h1
            className="hero-anim font-display-aurora font-bold tracking-tight leading-[0.98] cursor-default select-none text-[clamp(2.8rem,9vw,7rem)] text-[var(--ink)]"
            onClick={handleSecretClick}
          >
            Bilal{" "}
            <span className="text-aurora">Shandyarta</span>
            <br />
            Syamsudin
          </h1>

          <p className="hero-anim mt-8 text-base md:text-xl text-[var(--muted)] leading-relaxed max-w-xl">
            {stats?.summary || (isId ? "Tidak ada ringkasan" : "No summary")}
          </p>

          <div className="hero-anim mt-10 flex flex-wrap items-center gap-4">
            <Magnetic strength={0.3}>
              <button onClick={() => scrollTo("works")} className="btn-aurora">
                <span className="material-symbols-outlined text-[18px]">
                  north_east
                </span>
                {isId ? "Lihat Karya" : "View Works"}
              </button>
            </Magnetic>
            <Magnetic strength={0.3}>
              <button onClick={() => scrollTo("contact")} className="btn-ghost">
                {isId ? "Hubungi Saya" : "Get in Touch"}
              </button>
            </Magnetic>
          </div>

          {statItems.length > 0 && (
            <div className="hero-anim mt-16 md:mt-20 flex flex-wrap gap-x-16 gap-y-8">
              {statItems.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display-aurora text-4xl md:text-5xl font-bold text-aurora">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="font-mono-aurora text-[11px] tracking-[0.15em] uppercase mt-2 text-[var(--muted)]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-70">
          <span className="font-mono-aurora text-[10px] tracking-[0.35em] text-[var(--muted)]">
            SCROLL
          </span>
          <div className="scroll-hint-line" />
        </div>
      </section>

      {/* ================= SKILLS ================= */}
      <section
        className="relative py-24 md:py-36"
        id="skills"
      >
        <div className="w-full max-w-300 mx-auto px-6 md:px-grid-margin">
          <SectionHeading
            eyebrow={isId ? "kemampuan" : "skills"}
            title={
              isId ? (
                <>
                  Arsenal <span className="text-aurora">Teknis</span>
                </>
              ) : (
                <>
                  Technical <span className="text-aurora">Arsenal</span>
                </>
              )
            }
            description={
              isId
                ? "Perangkat yang saya gunakan untuk merancang dan membangun perangkat lunak — dari prototipe hingga produksi."
                : "The tools I use to design and build software — from prototype to production."
            }
          />

          <Reveal stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILL_CATEGORIES.map((cat) => {
              const catSkills = skills.filter((s) => s.category === cat.name);
              if (catSkills.length === 0) return null;

              return (
                <TiltCard
                  key={cat.name}
                  className="glass-gradient-border rounded-3xl p-7 h-full group"
                >
                  <div className="w-12 h-12 rounded-2xl mb-5 flex items-center justify-center bg-white/[0.05] border border-white/10 text-[var(--cyan)] group-hover:border-[rgba(139,92,246,0.5)] group-hover:text-[var(--violet)] transition-colors duration-300">
                    <span className="material-symbols-outlined">{cat.icon}</span>
                  </div>
                  <h3 className="font-display-aurora font-semibold text-xl text-[var(--ink)] mb-2">
                    {isId ? cat.name : cat.nameEn}
                  </h3>
                  <p className="text-sm text-[var(--muted)] mb-5 leading-relaxed">
                    {isId ? cat.desc : cat.descEn}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {catSkills.map((skill) => (
                      <span key={skill.id} className="chip">
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </TiltCard>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* ================= EXPERIENCE ================= */}
      <section
        className="relative py-24 md:py-36"
        id="experience"
      >
        <div className="w-full max-w-300 mx-auto px-6 md:px-grid-margin">
          <SectionHeading
            eyebrow={isId ? "perjalanan" : "journey"}
            title={
              isId ? (
                <>
                  Perjalanan <span className="text-aurora">Profesional</span>
                </>
              ) : (
                <>
                  Professional <span className="text-aurora">Journey</span>
                </>
              )
            }
          />

          {loading ? (
            <p className="text-[var(--muted)] font-mono-aurora text-sm">
              {isId ? "Memuat pengalaman..." : "Loading experiences..."}
            </p>
          ) : experiences.length === 0 ? (
            <p className="text-[var(--muted)] font-mono-aurora text-sm">
              {isId
                ? "Belum ada pengalaman yang ditambahkan."
                : "No experiences added yet."}
            </p>
          ) : (
            <div ref={timelineRef} className="relative pl-1">
              <div ref={railRef} className="timeline-rail" aria-hidden="true" />
              <div className="space-y-14">
                {experiences.map((exp, idx) => (
                  <Reveal key={exp.id} delay={idx * 0.06} className="timeline-item relative pl-10 md:pl-14">
                    <div
                      className={`timeline-dot ${
                        exp.is_current ? "!border-[var(--cyan)] shadow-[0_0_16px_rgba(34,211,238,0.4)]" : ""
                      }`}
                      aria-hidden="true"
                    />
                    <div className="flex flex-col md:flex-row md:items-baseline gap-1.5 md:gap-4 mb-1.5">
                      <h3 className="font-display-aurora font-semibold text-2xl md:text-[28px] text-[var(--ink)]">
                        {exp.company_name}
                      </h3>
                      <span className="font-mono-aurora text-sm text-[var(--cyan)]">
                        {exp.role}
                      </span>
                    </div>
                    <p className="font-mono-aurora text-xs tracking-wide text-[var(--muted)] mb-5">
                      {exp.start_date} —{" "}
                      {exp.is_current
                        ? isId
                          ? "sekarang"
                          : "present"
                        : exp.end_date}
                    </p>
                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <ul className="space-y-3 text-[15px] text-[var(--muted)] leading-relaxed max-w-2xl">
                        {exp.responsibilities.map((resp, i) => (
                          <li key={i} className="custom-list-item">
                            {resp}
                          </li>
                        ))}
                      </ul>
                    )}
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ================= WORKS ================= */}
      <section
        className="relative py-24 md:py-36"
        id="works"
      >
        <div className="w-full max-w-300 mx-auto px-6 md:px-grid-margin">
          <SectionHeading
            eyebrow={isId ? "portofolio" : "portfolio"}
            title={
              isId ? (
                <>
                  Karya <span className="text-aurora">Pilihan</span>
                </>
              ) : (
                <>
                  Selected <span className="text-aurora">Works</span>
                </>
              )
            }
            description={
              isId
                ? "Kumpulan proyek yang paling saya banggakan — klik untuk melihat cerita di baliknya."
                : "A collection of projects I'm most proud of — click through to see the story behind each one."
            }
          />

          {loading ? (
            <p className="text-[var(--muted)] font-mono-aurora text-sm">
              {isId ? "Memuat proyek..." : "Loading projects..."}
            </p>
          ) : projects.length === 0 ? (
            <p className="text-[var(--muted)] font-mono-aurora text-sm">
              {isId
                ? "Tidak ada proyek aktif untuk ditampilkan."
                : "No live projects to display."}
            </p>
          ) : (
            <Reveal stagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, idx) => (
                <Link
                  key={project.id}
                  className={`group block ${idx % 3 === 2 ? "md:col-span-2" : ""}`}
                  to={`/project/${project.id}`}
                >
                  <TiltCard
                    className="glass rounded-3xl overflow-hidden h-full transition-colors duration-300 hover:border-white/[0.16]"
                    maxTilt={5}
                  >
                    <div
                      className={`flex flex-col h-full ${
                        idx % 3 === 2 ? "md:flex-row" : ""
                      }`}
                    >
                      <div
                        className={`relative overflow-hidden bg-white/[0.03] aspect-video ${
                          idx % 3 === 2 ? "md:w-1/2 md:aspect-auto md:min-h-[300px]" : ""
                        }`}
                      >
                        <img
                          className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out"
                          alt={project.name}
                          src={getImageUrl(project.image_url)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,8,16,0.55)] via-transparent to-transparent" />
                      </div>
                      <div
                        className={`p-7 ${
                          idx % 3 === 2
                            ? "md:w-1/2 flex flex-col justify-center"
                            : "flex-1"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-3 gap-4">
                          <h3 className="font-display-aurora font-semibold text-xl md:text-2xl text-[var(--ink)] group-hover:text-[var(--cyan)] transition-colors duration-300">
                            {project.name}
                          </h3>
                          <span className="shrink-0 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[var(--muted)] group-hover:text-[var(--ink)] group-hover:border-[var(--cyan)] group-hover:rotate-45 transition-all duration-300">
                            <span className="material-symbols-outlined text-[18px]">
                              north_east
                            </span>
                          </span>
                        </div>
                        <p className="text-sm md:text-[15px] text-[var(--muted)] mb-5 line-clamp-3 leading-relaxed">
                          {project.description}
                        </p>
                        {project.tech_stack && project.tech_stack.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {project.tech_stack.map((tech, i) => (
                              <span key={i} className="chip">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </TiltCard>
                </Link>
              ))}
            </Reveal>
          )}
        </div>
      </section>
    </main>
  );
}
