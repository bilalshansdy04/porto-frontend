import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { api, getImageUrl } from "../services/api";
import type {
  DashboardStats,
  Experience,
  Project,
  Skill,
  Setting,
  Category,
} from "../services/api";
import { TiltCard } from "../components/TiltCard";
import { Magnetic } from "../components/Magnetic";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import { AnimatedCounter } from "../components/AnimatedCounter";
import { TechMarquee } from "../components/TechMarquee";
import { ScrollTrigger } from "../lib/gsap";
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

function ProjectCard({ project, isId }: { project: Project; isId: boolean }) {
  const isDirect = project.target_type === "direct";
  const destination = isDirect && project.link ? project.link : `/project/${project.id}`;

  const handleClick = (e: React.MouseEvent) => {
    if (isDirect && project.link?.startsWith("http")) {
      e.preventDefault();
      window.open(project.link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Link
      to={destination}
      onClick={handleClick}
      className="group block h-full cursor-pointer active:scale-[0.99] transition-transform duration-200"
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
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,8,16,0.65)] via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex gap-1.5 sm:gap-2 flex-wrap">
            {project.category && (
              <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-semibold bg-black/60 backdrop-blur-md text-white border border-white/10">
                {project.category}
              </span>
            )}
            {isDirect && (
              <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-cyan-500/90 text-black shadow-sm">
                {isId ? "Demo Langsung" : "Direct Demo"}
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
                <span className="material-symbols-outlined text-[16px] sm:text-[18px]">
                  north_east
                </span>
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
}

function ShowAllCard({
  title,
  count,
  linkTo,
  isId,
}: {
  title: string;
  count: number;
  linkTo: string;
  isId: boolean;
}) {
  return (
    <Link to={linkTo} className="group block h-full cursor-pointer active:scale-[0.99] transition-transform duration-200">
      <TiltCard
        className="glass-gradient-border rounded-2xl sm:rounded-3xl overflow-hidden h-full p-5 sm:p-7 md:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[var(--cyan)]/40 min-h-[220px] sm:min-h-[260px] md:min-h-[300px] bg-gradient-to-br from-white/[0.03] to-[var(--cyan)]/[0.05]"
        maxTilt={4}
      >
        <div className="flex items-center justify-between">
          <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[var(--cyan)]/10 border border-[var(--cyan)]/25 flex items-center justify-center text-[var(--cyan)] group-hover:scale-110 transition-transform duration-300">
            <span className="material-symbols-outlined text-xl sm:text-2xl">
              grid_view
            </span>
          </span>
          <span className="font-mono-aurora text-[11px] sm:text-xs text-[var(--muted)] uppercase tracking-widest px-2.5 sm:px-3 py-1 rounded-full bg-white/[0.05] border border-white/10">
            {count} {isId ? "Proyek" : "Projects"}
          </span>
        </div>

        <div className="my-4 sm:my-6">
          <p className="font-mono-aurora text-[11px] sm:text-xs text-[var(--cyan)] uppercase tracking-wider mb-1.5 sm:mb-2">
            {isId ? "Jelajahi Arsip" : "Explore Archive"}
          </p>
          <h3 className="font-display-aurora font-bold text-xl sm:text-2xl text-[var(--ink)] group-hover:text-[var(--cyan)] transition-colors duration-300">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-[var(--muted)] mt-1.5 sm:mt-2 leading-relaxed">
            {isId
              ? `Lihat seluruh daftar proyek dan demo interaktif dalam ${title}.`
              : `View complete index, live interactive demos, and case studies for ${title}.`}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[var(--cyan)] group-hover:translate-x-1 transition-transform duration-300">
          <span>{isId ? "Lihat Semua" : "Show All"}</span>
          <span className="material-symbols-outlined text-[16px] sm:text-[18px]">
            arrow_forward
          </span>
        </div>
      </TiltCard>
    </Link>
  );
}

export function Home() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
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
        const [statsData, expData, projData, skillsData, settingsData, catsData] =
          await Promise.all([
            api.getDashboardStats(),
            api.getExperiences(),
            api.getProjects(),
            api.getSkills(),
            api.getSettings(),
            api.getCategories(),
          ]);
        setStats(statsData);
        setExperiences(expData || []);
        setSkills(skillsData || []);
        setSettings(settingsData);
        setCategories(catsData || []);

        let loadedProjects = (projData || []).filter((p) => p.is_visible);
        
        setProjects(loadedProjects);
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
    if (!timeline) return;

    const items = Array.from(timeline.querySelectorAll<HTMLElement>(".timeline-item"));
    const dots = Array.from(timeline.querySelectorAll<HTMLElement>(".timeline-dot"));
    if (dots.length === 0) return;

    /** Get a dot's center (x, y) relative to the timeline container */
    const dotCenter = (dot: HTMLElement) => {
      let x = dot.offsetLeft + dot.offsetWidth / 2;
      let y = dot.offsetTop + dot.offsetHeight / 2;
      let parent = dot.offsetParent as HTMLElement | null;
      while (parent && parent !== timeline) {
        x += parent.offsetLeft;
        y += parent.offsetTop;
        parent = parent.offsetParent as HTMLElement | null;
      }
      return { x, y };
    };

    const svgns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgns, "svg");
    svg.style.position = "absolute";
    svg.style.top = "0";
    svg.style.left = "0";
    svg.style.width = "100%";
    svg.style.height = "100%";
    svg.style.pointerEvents = "none";
    svg.style.zIndex = "1";
    svg.setAttribute("aria-hidden", "true");
    timeline.appendChild(svg);

    // Create Gradient
    const defs = document.createElementNS(svgns, "defs");
    const grad = document.createElementNS(svgns, "linearGradient");
    grad.id = "timeline-grad";
    grad.setAttribute("x1", "0");
    grad.setAttribute("y1", "0");
    grad.setAttribute("x2", "0");
    grad.setAttribute("y2", "1");
    
    const stop1 = document.createElementNS(svgns, "stop");
    stop1.setAttribute("offset", "0%");
    stop1.setAttribute("stop-color", "var(--indigo)");
    const stop2 = document.createElementNS(svgns, "stop");
    stop2.setAttribute("offset", "100%");
    stop2.setAttribute("stop-color", "var(--cyan)");
    
    grad.appendChild(stop1);
    grad.appendChild(stop2);
    defs.appendChild(grad);
    svg.appendChild(defs);

    const R = 7; // Radius of drawn circle
    const CIRCUMFERENCE = 2 * Math.PI * R;
    const triggers: ScrollTrigger[] = [];
    const elements: SVGElement[] = [];

    const buildSVG = () => {
      // Clear previous drawing
      elements.forEach((el) => el.remove());
      elements.length = 0;
      triggers.forEach((t) => t.kill());
      triggers.length = 0;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const item = items[i];
        const nextItem = items[i + 1];
        const nextDot = dots[i + 1];
        const { x, y } = dotCenter(dot);

        // 1. Circle Path (approximated with full arc)
        const circle = document.createElementNS(svgns, "path");
        circle.setAttribute("d", `M ${x} ${y - R} A ${R} ${R} 0 1 1 ${x - 0.01} ${y - R}`);
        circle.setAttribute("fill", "var(--abyss)");
        circle.setAttribute("stroke", "url(#timeline-grad)");
        circle.setAttribute("stroke-width", "2");
        circle.setAttribute("stroke-dasharray", `${CIRCUMFERENCE}`);
        circle.setAttribute("stroke-dashoffset", `${CIRCUMFERENCE}`);
        svg.appendChild(circle);
        elements.push(circle);

        let line: SVGPathElement | null = null;

        // 2. Beautiful S-Curve Line Path to next dot
        if (nextDot) {
          const nextC = dotCenter(nextDot);
          line = document.createElementNS(svgns, "path");
          
          // Organic curved dropdown connecting the bottom of this circle to the top of the next
          const curveOffset = Math.min(24, (nextC.y - y) * 0.3);
          const d = `
            M ${x} ${y + R} 
            C ${x - 4} ${y + R + curveOffset}, 
              ${nextC.x - 4} ${nextC.y - R - curveOffset}, 
              ${nextC.x} ${nextC.y - R}
          `;
          
          line.setAttribute("d", d.trim());
          line.setAttribute("fill", "none");
          line.setAttribute("stroke", "url(#timeline-grad)");
          line.setAttribute("stroke-width", "2");
          
          // Estimate length for dasharray (close enough for smooth GSAP scrub)
          const lineLen = (nextC.y - y) * 1.1;
          line.setAttribute("stroke-dasharray", `${lineLen}`);
          line.setAttribute("stroke-dashoffset", `${lineLen}`);
          svg.appendChild(line);
          elements.push(line);
        }

        // GSAP Timeline to sequentially draw the circle, then the line
        const tl = gsap.timeline();

        tl.to(circle, {
          strokeDashoffset: 0,
          duration: line ? 0.3 : 1, // Draw circle fast if line follows
          ease: "power1.inOut",
          onStart: () => dot.classList.add("is-reached"),
          onReverseComplete: () => dot.classList.remove("is-reached")
        });

        if (line) {
          tl.to(line, {
            strokeDashoffset: 0,
            duration: 0.7,
            ease: "none"
          });
        }

        const st = ScrollTrigger.create({
          trigger: item,
          start: "top 68%",
          endTrigger: nextItem || item,
          end: nextItem ? "top 68%" : "bottom 40%",
          scrub: 0.5,
          animation: tl
        });
        triggers.push(st);
      }
    };

    buildSVG();

    const ro = new ResizeObserver(() => {
      buildSVG();
    });
    ro.observe(timeline);

    const onResize = () => {
      buildSVG();
    };
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onResize, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      ro.disconnect();
      triggers.forEach((st) => st.kill());
      svg.remove();
      dots.forEach((d) => d.classList.remove("is-reached"));
    };
  }, [loading, experiences.length]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 80,
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
        className="relative min-h-[100svh] flex items-center pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden"
      >
        <div className="dot-grid" aria-hidden="true" />
        <div className="relative w-full max-w-300 mx-auto px-6 md:px-grid-margin">
          <div className="hero-anim inline-flex items-center gap-2.5 glass rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 mb-6 sm:mb-8 max-w-full">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--cyan)] opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--cyan)]" />
            </span>
            <span className="font-mono-aurora text-[11px] sm:text-xs text-[var(--muted)] tracking-wide truncate">
              {isId ? "Tersedia untuk proyek baru" : "Available for new projects"}
            </span>
          </div>

          <p className="hero-anim eyebrow mb-3.5 sm:mb-5 text-xs sm:text-sm">
            <span className="opacity-60">{"//"}</span>{" "}
            {isId ? "halo, saya" : "hello, i am"}
          </p>

          <h1
            className="hero-anim font-display-aurora font-bold tracking-tight leading-[0.98] cursor-default select-none text-[clamp(2.3rem,8vw,6.5rem)] text-[var(--ink)] break-words"
            onClick={handleSecretClick}
          >
            Bilal{" "}
            <span className="text-aurora">Shandyarta</span>
            <br />
            Syamsudin
          </h1>

          <p className="hero-anim mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-[var(--muted)] leading-relaxed max-w-xl">
            {loading
              ? (isId ? "Memuat ringkasan..." : "Loading summary...")
              : stats?.summary || (isId ? "Tidak ada ringkasan" : "No summary")}
          </p>

          <div className="hero-anim mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
            <Magnetic strength={0.3}>
              <button onClick={() => scrollTo("works")} className="btn-aurora justify-center w-full sm:w-auto text-center">
                <span className="material-symbols-outlined text-[18px]">
                  north_east
                </span>
                {isId ? "Lihat Karya" : "View Works"}
              </button>
            </Magnetic>
            <Magnetic strength={0.3}>
              <button onClick={() => scrollTo("contact")} className="btn-ghost justify-center w-full sm:w-auto text-center">
                {isId ? "Hubungi Saya" : "Get in Touch"}
              </button>
            </Magnetic>
          </div>

          {statItems.length > 0 && (
            <div className="hero-anim mt-12 sm:mt-16 md:mt-20 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
              {statItems.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display-aurora text-3xl sm:text-4xl md:text-5xl font-bold text-aurora">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="font-mono-aurora text-[10px] sm:text-[11px] tracking-[0.14em] uppercase mt-2 text-[var(--muted)]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-3 opacity-70 pointer-events-none">
          <span className="font-mono-aurora text-[10px] tracking-[0.35em] text-[var(--muted)]">
            SCROLL
          </span>
          <div className="scroll-hint-line" />
        </div>
      </section>

      {/* ================= TECH MARQUEE BANNER ================= */}
      {skills.length > 0 && (
        <div className="w-full relative z-10 -mt-6 sm:-mt-8 mb-4 sm:mb-8">
          <TechMarquee items={skills.map((s) => s.name)} />
        </div>
      )}

      {/* ================= SKILLS ================= */}
      <section
        className="relative py-16 sm:py-24 md:py-36"
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

          {loading ? (
            <p className="text-[var(--muted)] font-mono-aurora text-sm">
              {isId ? "Memuat kemampuan..." : "Loading skills..."}
            </p>
          ) : skills.length === 0 ? (
            <p className="text-[var(--muted)] font-mono-aurora text-sm">
              {isId
                ? "Belum ada kemampuan yang ditambahkan."
                : "No skills added yet."}
            </p>
          ) : (
            <Reveal stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {SKILL_CATEGORIES.map((cat) => {
                const catSkills = skills.filter((s) => s.category === cat.name);
                if (catSkills.length === 0) return null;
  
                return (
                  <TiltCard
                    key={cat.name}
                    className="glass-gradient-border rounded-2xl sm:rounded-3xl p-6 sm:p-7 h-full group active:scale-[0.99] transition-transform duration-200"
                  >
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl mb-4 sm:mb-5 flex items-center justify-center bg-white/[0.05] border border-white/10 text-[var(--cyan)] group-hover:border-[rgba(139,92,246,0.5)] group-hover:text-[var(--violet)] transition-colors duration-300">
                      <span className="material-symbols-outlined text-xl sm:text-2xl">{cat.icon}</span>
                    </div>
                    <h3 className="font-display-aurora font-semibold text-lg sm:text-xl text-[var(--ink)] mb-2">
                      {isId ? cat.name : cat.nameEn}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--muted)] mb-4 sm:mb-5 leading-relaxed">
                      {isId ? cat.desc : cat.descEn}
                    </p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {catSkills.map((skill) => (
                        <span key={skill.id} className="chip text-xs">
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </TiltCard>
                );
              })}
            </Reveal>
          )}
        </div>
      </section>

      {/* ================= EXPERIENCE ================= */}
      <section
        className="relative py-16 sm:py-24 md:py-36"
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
            <div ref={timelineRef} className="relative pl-1 sm:pl-2">
              <div ref={railRef} className="timeline-rail" aria-hidden="true" />
              <div className="space-y-12 sm:space-y-14">
                {experiences.map((exp, idx) => (
                  <Reveal key={exp.id} delay={idx * 0.06} className="timeline-item relative pl-9 sm:pl-12 md:pl-14">
                    <div
                      className={`timeline-dot ${
                        exp.is_current ? "!border-[var(--cyan)] shadow-[0_0_16px_rgba(34,211,238,0.4)]" : ""
                      }`}
                      aria-hidden="true"
                    />
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 md:gap-4 mb-1.5">
                      <h3 className="font-display-aurora font-semibold text-xl sm:text-2xl md:text-[28px] text-[var(--ink)] leading-snug">
                        {exp.company_name}
                      </h3>
                      <span className="font-mono-aurora text-xs sm:text-sm text-[var(--cyan)]">
                        {exp.role}
                      </span>
                    </div>
                    <p className="font-mono-aurora text-xs tracking-wide text-[var(--muted)] mb-3.5 sm:mb-5">
                      {exp.start_date} —{" "}
                      {exp.is_current
                        ? isId
                          ? "sekarang"
                          : "present"
                        : exp.end_date}
                    </p>
                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <ul className="space-y-2.5 sm:space-y-3 text-sm sm:text-[15px] text-[var(--muted)] leading-relaxed max-w-2xl">
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
        className="relative py-16 sm:py-24 md:py-36"
        id="works"
      >
        <div className="w-full max-w-300 mx-auto px-6 md:px-grid-margin space-y-14 sm:space-y-20">
          <div>
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
                  ? "Kumpulan proyek yang paling saya banggakan — jelajahi per kategori atau buka demo langsung."
                  : "A curated collection of systems and interactive landing pages — explore by category or launch live demos directly."
              }
            />

            {/* View All Categories Pill Button */}
            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="font-mono-aurora text-xs text-[var(--muted)]">
                {isId ? "Menampilkan ikhtisar kategori" : "Displaying category highlights"}
              </span>
              <Link
                to="/all-category"
                className="inline-flex items-center gap-1.5 font-mono-aurora text-xs text-[var(--cyan)] hover:underline py-1"
              >
                <span>{isId ? "Buka Direktori Lengkap" : "Browse All Categories"}</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>

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
            <div className="space-y-16 sm:space-y-24">
              {/* --- 1. All Projects 2x2 Showcase (Top 3 items + Show All Slot) --- */}
              <div className="space-y-5 sm:space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--cyan)]" />
                    <h3 className="font-display-aurora font-bold text-lg sm:text-xl md:text-2xl text-[var(--ink)]">
                      {isId ? "Semua Proyek" : "All Projects"}
                    </h3>
                  </div>
                  <span className="font-mono-aurora text-[11px] sm:text-xs text-[var(--muted)]">
                    {projects.length} {isId ? "total proyek" : "total projects"}
                  </span>
                </div>

                <Reveal stagger className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                  {projects.slice(0, 3).map((project) => (
                    <ProjectCard key={project.id} project={project} isId={isId} />
                  ))}
                  {/* Slot 4: Show All Card */}
                  <ShowAllCard
                    title={isId ? "Semua Proyek" : "All Projects"}
                    count={projects.length}
                    linkTo="/all-category"
                    isId={isId}
                  />
                </Reveal>
              </div>

              {/* --- 2. Per-Category Sections (e.g. Dummy Landing Page, MSJ, etc.) --- */}
              {categories
                .filter((cat) => cat.show_on_home)
                .sort((a, b) => a.display_order - b.display_order)
                .map((cat) => {
                  const catProjects = projects.filter(
                    (p) =>
                      p.category?.toLowerCase() === cat.name.toLowerCase() ||
                      p.category?.toLowerCase() === cat.slug.toLowerCase()
                  );

                  if (catProjects.length === 0) return null;

                  return (
                    <div key={cat.id} className="space-y-5 sm:space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                        <div className="flex items-center gap-2.5 sm:gap-3">
                          <span className="w-2.5 h-2.5 rounded-full bg-[var(--violet)]" />
                          <div>
                            <h3 className="font-display-aurora font-bold text-lg sm:text-xl md:text-2xl text-[var(--ink)]">
                              {cat.name}
                            </h3>
                            {cat.description && (
                              <p className="text-xs text-[var(--muted)] mt-0.5 line-clamp-1">
                                {cat.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <Link
                          to={`/category/${cat.slug}`}
                          className="font-mono-aurora text-xs text-[var(--muted)] hover:text-[var(--cyan)] transition-colors self-start sm:self-center py-1"
                        >
                          {catProjects.length} {isId ? "proyek" : "projects"} →
                        </Link>
                      </div>

                      <Reveal stagger className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                        {catProjects.slice(0, 3).map((project) => (
                          <ProjectCard key={project.id} project={project} isId={isId} />
                        ))}
                        {/* Slot 4: Show All Category Card */}
                        <ShowAllCard
                          title={cat.name}
                          count={catProjects.length}
                          linkTo={`/category/${cat.slug}`}
                          isId={isId}
                        />
                      </Reveal>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
