import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../services/api";
import type { Setting } from "../services/api";
import { Magnetic } from "./Magnetic";
import { cn } from "../lib/utils";

interface NavItem {
  id: string;
  labelId: string;
  labelEn: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "home", labelId: "Utama", labelEn: "Home" },
  { id: "skills", labelId: "Kemampuan", labelEn: "Skills" },
  { id: "experience", labelId: "Pengalaman", labelEn: "Experience" },
  { id: "works", labelId: "Karya", labelEn: "Works" },
  { id: "contact", labelId: "Kontak", labelEn: "Contact" },
];

export function TopNavBar() {
  const [settings, setSettings] = useState<Setting | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .getSettings()
      .then((data) => setSettings(data))
      .catch((err) => console.error("Failed to load settings in navbar", err));
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [open]);

  const goToSection = (id: string) => {
    setOpen(false);
    if (window.location.pathname !== "/") {
      navigate(`/#${id}`);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      window.history.replaceState(null, "", `/#${id}`);
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });
    }
  };

  const isId = settings?.language === "id";

  return (
    <>
      <header className="fixed top-3.5 sm:top-5 md:top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav
          className={cn(
            "nav-pill glass rounded-full flex items-center gap-1 pointer-events-auto transition-all duration-300",
            scrolled ? "px-3 py-1.5 shadow-xl bg-black/60 backdrop-blur-xl border-white/15" : "px-4 py-2 sm:py-2.5",
          )}
        >
          <Magnetic strength={0.25}>
            <Link
              to="/"
              onClick={(e) => {
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  window.history.replaceState(null, "", "/");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="font-mono-aurora font-medium text-sm px-3 py-1.5 text-[var(--ink)] hover:text-[var(--cyan)] transition-colors active:scale-95 inline-flex items-center"
              aria-label="Home"
            >
              BS<span className="text-aurora">.</span>
            </Link>
          </Magnetic>

          <span className="w-px h-5 bg-white/10 mx-1 hidden md:block" />

          {/* Desktop & Tablet Links */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => (
              <Magnetic key={item.id} strength={0.45}>
                <button
                  onClick={() => goToSection(item.id)}
                  className={cn(
                    "nav-link text-xs lg:text-sm px-3 py-1.5 lg:px-4 lg:py-2",
                    active === item.id && "is-active",
                  )}
                >
                  {isId ? item.labelId : item.labelEn}
                </button>
              </Magnetic>
            ))}
          </div>

          {/* Mobile hamburger toggle */}
          <button
            className={cn(
              "md:hidden relative w-9 h-9 rounded-full flex items-center justify-center text-[var(--ink)] transition-colors active:scale-90",
              open ? "bg-white/15 text-[var(--cyan)]" : "hover:bg-white/10"
            )}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className="material-symbols-outlined text-[22px] transition-transform duration-200">
              {open ? "close" : "menu"}
            </span>
          </button>
        </nav>
      </header>

      {/* Mobile Drawer Backdrop & Modal */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col items-center pt-20 px-4">
          {/* Backdrop blur overlay */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-xl animate-fade-in transition-opacity"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Floating Drawer Container */}
          <div
            className="relative w-full max-w-sm glass-strong rounded-3xl p-5 border border-white/15 shadow-2xl flex flex-col gap-4 animate-scale-up z-10"
            style={{
              maxHeight: "calc(100svh - 100px)",
              overflowY: "auto",
            }}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="font-mono-aurora font-bold text-sm text-[var(--ink)]">
                  BS<span className="text-aurora">.</span>
                </span>
                <span className="text-[10px] font-mono-aurora px-2 py-0.5 rounded-full bg-[var(--cyan)]/10 text-[var(--cyan)] border border-[var(--cyan)]/20">
                  {isId ? "Navigasi" : "Navigation"}
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--muted)] hover:text-white bg-white/5 active:scale-90 transition-transform"
                aria-label="Close menu"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {/* Nav links with numbers and active states */}
            <div className="flex flex-col gap-1.5 py-1">
              {NAV_ITEMS.map((item, index) => {
                const isActive = active === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => goToSection(item.id)}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3 rounded-2xl text-left transition-all duration-200 active:scale-[0.98]",
                      isActive
                        ? "bg-gradient-to-r from-indigo-500/20 to-cyan-500/10 border border-[var(--cyan)]/30 text-white font-medium"
                        : "text-[var(--muted)] hover:text-white hover:bg-white/5 border border-transparent"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono-aurora text-xs text-[var(--cyan)] opacity-75">
                        0{index + 1}
                      </span>
                      <span className="font-display-aurora text-base">
                        {isId ? item.labelId : item.labelEn}
                      </span>
                    </div>
                    {isActive ? (
                      <span className="w-2 h-2 rounded-full bg-[var(--cyan)] shadow-[0_0_8px_var(--cyan)]" />
                    ) : (
                      <span className="material-symbols-outlined text-sm text-[var(--muted)] opacity-50">
                        chevron_right
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick CTA inside Mobile Menu */}
            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => goToSection("contact")}
                className="btn-aurora w-full justify-center !py-3 text-sm"
              >
                <span className="material-symbols-outlined text-[18px]">mail</span>
                {isId ? "Hubungi Saya" : "Get in Touch"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
