import { api } from "../services/api";
import type { Setting } from "../services/api";
import { useEffect, useState } from "react";
import { Magnetic } from "./Magnetic";
import { Reveal } from "./Reveal";

const SOCIALS = [
  { label: "LinkedIn", href: "https://linkedin.com/in/bilal-shandyata-syamsudin" },
  { label: "GitHub", href: "https://github.com/bilalshansdy04" },
  { label: "Resume", href: "#" },
];

export function Footer() {
  const [settings, setSettings] = useState<Setting | null>(null);

  useEffect(() => {
    api
      .getSettings()
      .then(setSettings)
      .catch(() => undefined);
  }, []);

  const isId = settings?.language === "id";

  return (
    <footer
      className="relative z-10 mt-24 border-t border-white/[0.07]"
      id="contact"
    >
      <div className="w-full max-w-300 mx-auto px-6 md:px-grid-margin py-20 md:py-28">
        <Reveal>
          <span className="eyebrow block mb-6">
            <span className="opacity-60">{"//"}</span>{" "}
            {isId ? "kontak" : "contact"}
          </span>
          <h2 className="font-display-aurora font-bold tracking-tight text-[var(--ink)] leading-[1.02] text-4xl sm:text-6xl md:text-7xl max-w-4xl">
            {isId ? (
              <>
                Punya ide?{" "}
                <span className="text-aurora">Wujudkan bersama.</span>
              </>
            ) : (
              <>
                Have an idea?{" "}
                <span className="text-aurora">Let&rsquo;s build it together.</span>
              </>
            )}
          </h2>
          <p className="mt-6 text-[var(--muted)] text-base md:text-lg max-w-xl leading-relaxed">
            {isId
              ? "Terbuka untuk proyek baru, kolaborasi, atau sekadar ngobrol soal teknologi."
              : "Open for new projects, collaborations, or just talking about technology."}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic strength={0.3}>
              <a
                href="mailto:bilalshandyarta@gmail.com"
                className="btn-aurora"
              >
                <span className="material-symbols-outlined text-[18px]">
                  mail
                </span>
                {isId ? "Hubungi Saya" : "Get in Touch"}
              </a>
            </Magnetic>

            <Magnetic strength={0.3}>
              <a
                href="https://github.com/bilalshansdy04"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <span className="material-symbols-outlined text-[18px]">
                  code
                </span>
                {isId ? "Lihat Kode Saya" : "See My Code"}
              </a>
            </Magnetic>
          </div>
        </Reveal>

        <div className="mt-20 md:mt-28 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-mono-aurora text-xs text-[var(--muted)] tracking-wide">
            © {new Date().getFullYear()} Bilal Shandyarta —{" "}
            {isId ? "dibangun dengan presisi." : "built with precision."}
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            {SOCIALS.map((social) => (
              <Magnetic key={social.label} strength={0.35}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chip !text-[13px] !px-5 !py-2.5 inline-block font-mono-aurora"
                >
                  {social.label}
                </a>
              </Magnetic>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
