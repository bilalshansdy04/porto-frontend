import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../lib/gsap";

export function AuroraBackground() {
  const layer1 = useRef<HTMLDivElement>(null);
  const layer2 = useRef<HTMLDivElement>(null);
  const layer3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let mx = 0;
    let my = 0;
    let x1 = 0;
    let y1 = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const loop = () => {
      x1 += (mx - x1) * 0.02;
      y1 += (my - y1) * 0.02;
      if (layer1.current)
        layer1.current.style.transform = `translate(${x1 * 34}px, ${y1 * 26}px)`;
      if (layer2.current)
        layer2.current.style.transform = `translate(${x1 * -46}px, ${y1 * -30}px)`;
      if (layer3.current)
        layer3.current.style.transform = `translate(${x1 * 22}px, ${y1 * -20}px)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="aurora-bg" aria-hidden="true">
      <div ref={layer1} className="absolute inset-0">
        <div className="aurora-blob aurora-blob-1" />
      </div>
      <div ref={layer2} className="absolute inset-0">
        <div className="aurora-blob aurora-blob-2" />
      </div>
      <div ref={layer3} className="absolute inset-0">
        <div className="aurora-blob aurora-blob-3" />
      </div>
    </div>
  );
}
