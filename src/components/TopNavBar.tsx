import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../services/api";
import type { Setting } from "../services/api";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
        <div className="hidden md:flex gap-8 items-center">
          <Link
            to="/"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "text-primary font-bold border-b-2 border-primary rounded-none pb-1 hover:bg-transparent hover:text-primary transition-opacity duration-200 opacity-80"
            )}
          >
            {settings?.language === "id" ? "Portofolio" : "Portfolio"}
          </Link>
          <a
            href="/#skills"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "text-on-surface-variant hover:text-primary hover:bg-transparent transition-colors duration-200"
            )}
          >
            {settings?.language === "id" ? "Kemampuan" : "Skills"}
          </a>
          <a
            href="/#experience"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "text-on-surface-variant hover:text-primary hover:bg-transparent transition-colors duration-200"
            )}
          >
            {settings?.language === "id" ? "Pengalaman" : "Experience"}
          </a>
          <a
            href="/#works"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "text-on-surface-variant hover:text-primary hover:bg-transparent transition-colors duration-200"
            )}
          >
            {settings?.language === "id" ? "Karya" : "Works"}
          </a>
        </div>
      </div>
    </nav>
  );
}
