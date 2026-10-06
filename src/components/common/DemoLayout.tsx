// import { useMemo } from "react";
// import { useParams } from "react-router-dom";
// import { DemoPreviewBar } from "./DemoPreviewBar";
import {
  DynamicDemoHost,
  // getDemoBySlug,
  // toDisplayTitle,
} from "../../router/dynamicDemos";

export function DemoLayout() {
  /*
  const { slug } = useParams<{ slug: string }>();
  const entry = useMemo(() => getDemoBySlug(slug), [slug]);
  const title = useMemo(() => {
    if (entry?.title) return entry.title;
    if (slug) return toDisplayTitle(slug);
    return "Interactive Demo";
  }, [entry, slug]);

  const category = useMemo(() => {
    if (entry?.isMiniApp) return "Mini-App Prototype";
    return "Dummy Landing Page";
  }, [entry]);
  */

  return (
    <div className="relative min-h-screen w-full bg-white text-slate-900">
      {/* Demo toolbar commented out for clean canvas */}
      {/* <DemoPreviewBar
        title={title}
        category={category}
      /> */}

      {/* Main Demo Content */}
      <main className="w-full min-h-screen">
        <DynamicDemoHost />
      </main>
    </div>
  );
}
