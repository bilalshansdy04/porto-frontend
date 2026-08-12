import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../services/api";
import type { Setting } from "../services/api";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import GooeyNav from "./GooeyNav";

export function TopNavBar() {
  const [settings, setSettings] = useState<Setting | null>(null);

  useEffect(() => {
    api
      .getSettings()
      .then((data) => setSettings(data))
      .catch((err) => console.error("Failed to load settings in navbar", err));
  }, []);

  return (
    <nav className="dark:bg-surface bg-surface  dark:text-primary-fixed-dim font-body-md text-body-md docked full-width top-0 border-b border-outline-variant flat no shadows sticky z-50">
      <div className="flex justify-between items-center h-16 w-full max-w-300 mx-auto px-6 md:px-grid-margin">
        <Link
          to="/"
          className="font-headline-md text-headline-md font-bold dark:text-primary-fixed-dim"
        >
          Bilal Shandyarta
        </Link>
        <div className="hidden md:flex items-center">
          <div style={{ position: "relative" }}>
            <GooeyNav
              items={[
                {
                  label:
                    settings?.language === "id" ? "Portofolio" : "Portfolio",
                  href: "/",
                },
                {
                  label: settings?.language === "id" ? "Kemampuan" : "Skills",
                  href: "/#skills",
                },
                {
                  label:
                    settings?.language === "id" ? "Pengalaman" : "Experience",
                  href: "/#experience",
                },
                {
                  label: settings?.language === "id" ? "Karya" : "Works",
                  href: "/#works",
                },
              ]}
              particleCount={10}
              colors={["#ffffff"]}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
