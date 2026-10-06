import React, { useMemo, Suspense, lazy } from "react";
import { useParams } from "react-router-dom";

// Vite glob importer for all demo entry files:
// 1. Single-file demos at src/pages/demos/*.tsx
// 2. Multi-page mini-app entry points at src/pages/demos/*/{Index,App,index,main}.tsx
const rawDemos = import.meta.glob<{ default: React.ComponentType<any> }>([
  "/src/pages/demos/*.{tsx,jsx}",
  "/src/pages/demos/*/{Index,App,index,main}.{tsx,jsx}",
]);

function toKebabCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

export function toDisplayTitle(slug: string): string {
  return slug
    .split(/[-_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export interface DemoRegistryEntry {
  slug: string;
  name: string;
  title: string;
  isMiniApp: boolean;
  loadComponent: () => Promise<{ default: React.ComponentType<any> }>;
}

// Build map of slugs -> loader
export function getDemoRegistry(): Map<string, DemoRegistryEntry> {
  const registry = new Map<string, DemoRegistryEntry>();

  for (const path in rawDemos) {
    const singleFileMatch = path.match(/\/src\/pages\/demos\/([^/]+)\.(tsx|jsx)$/);
    const folderMatch = path.match(/\/src\/pages\/demos\/([^/]+)\/(Index|App|index|main)\.(tsx|jsx)$/);

    let name = "";
    let isMiniApp = false;

    if (singleFileMatch) {
      name = singleFileMatch[1];
      isMiniApp = false;
    } else if (folderMatch) {
      name = folderMatch[1];
      isMiniApp = true;
    } else {
      continue;
    }

    const kebab = toKebabCase(name);
    const lower = name.toLowerCase();
    const title = toDisplayTitle(kebab);

    const entry: DemoRegistryEntry = {
      slug: kebab,
      name,
      title,
      isMiniApp,
      loadComponent: rawDemos[path],
    };

    // Register both kebab-case and direct lowercase
    registry.set(kebab, entry);
    registry.set(lower, entry);

    // Aliases: if NovaLandingPage, also support "landingpage1"
    if (name.toLowerCase() === "novalandingpage") {
      registry.set("landingpage1", entry);
    }
  }

  return registry;
}

// Cached registry
export const demoRegistry = getDemoRegistry();

export function getDemoBySlug(slug: string | undefined): DemoRegistryEntry | undefined {
  if (!slug) return undefined;
  const normalized = slug.trim().toLowerCase();
  return demoRegistry.get(normalized) || demoRegistry.get(toKebabCase(normalized));
}

// Dynamic Component Loader
export function DynamicDemoHost() {
  const { slug } = useParams<{ slug: string }>();

  const entry = useMemo(() => getDemoBySlug(slug), [slug]);

  if (!entry) {
    return (
      <div className="min-h-screen bg-[#050810] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
          <span className="material-symbols-outlined text-3xl">error_outline</span>
        </div>
        <h1 className="text-2xl font-bold font-display-aurora text-white mb-2">
          Demo Not Found
        </h1>
        <p className="text-sm text-white/60 max-w-md mb-6 leading-relaxed">
          The requested demo route <code className="text-cyan-400 font-mono">/demos/{slug}</code> does not match any file or folder in <code className="text-white/80 font-mono">src/pages/demos/</code>.
        </p>
        <a
          href="/"
          className="px-5 py-2.5 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/40 text-xs font-semibold tracking-wide transition-all"
        >
          Return to Portfolio
        </a>
      </div>
    );
  }

  const LazyComponent = useMemo(
    () =>
      lazy(async () => {
        const mod: any = await entry.loadComponent();
        const Component = mod.default || Object.values(mod)[0];
        return { default: Component };
      }),
    [entry]
  );

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#050810] flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
            <span className="text-xs font-mono text-cyan-400/80">Loading {entry.title}...</span>
          </div>
        </div>
      }
    >
      <LazyComponent />
    </Suspense>
  );
}
