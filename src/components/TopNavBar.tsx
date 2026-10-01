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
    const onScroll = () => setScrolled(window.scrollY > 60);
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
        top: el.getBoundingClientRect().top + window.scrollY - 90,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="fixed top-4 md:top-6 inset-x-0 z-50 flex justify-center px-4">
      <nav
        className={cn(
          "nav-pill glass rounded-full flex items-center gap-1",
          scrolled ? "px-3 py-1.5" : "px-4 py-2.5",
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
            className="font-mono-aurora font-medium text-sm px-3 py-1.5 text-[var(--ink)] hover:text-[var(--cyan)] transition-colors"
          >
            BS<span className="text-aurora">.</span>
          </Link>
        </Magnetic>

        <span className="w-px h-5 bg-white/10 mx-1 hidden md:block" />

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-0.5">
          {NAV_ITEMS.map((item) => (
            <Magnetic key={item.id} strength={0.3}>
              <button
                onClick={() => goToSection(item.id)}
                className={cn("nav-link", active === item.id && "is-active")}
              >
                {settings?.language === "id" ? item.labelId : item.labelEn}
              </button>
            </Magnetic>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden nav-link !px-3"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="material-symbols-outlined text-[20px]">
            {open ? "close" : "menu"}
          </span>
        </button>

        {/* Mobile panel */}
        {open && (
          <div className="md:hidden absolute top-[calc(100%+10px)] left-0 right-0 glass-strong rounded-3xl p-3 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => goToSection(item.id)}
                className={cn(
                  "nav-link !rounded-2xl text-left",
                  active === item.id && "is-active",
                )}
              >
                {settings?.language === "id" ? item.labelId : item.labelEn}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
