import { useEffect, useRef, type ReactNode } from "react";
import { prefersReducedMotion } from "../lib/gsap";

const GLYPHS = "!<>-_\\/[]{}=+*^?#$%&";

export function ScrambleText({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const nodes: Text[] = [];
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      nodes.push(n as Text);
    }
    if (nodes.length === 0) return;

    const originals = nodes.map((n) => n.nodeValue ?? "");
    if (originals.join("").trim().length === 0) return;

    let raf = 0;
    let start = 0;
    const DURATION = 1100;

    const glyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

    const frame = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / DURATION, 1);
      nodes.forEach((node, i) => {
        const orig = originals[i];
        let out = "";
        for (let c = 0; c < orig.length; c++) {
          const ch = orig[c];
          if (ch.trim() === "") {
            out += ch;
            continue;
          }
          out += p >= (c + 1) / (orig.length + 1) ? ch : glyph();
        }
        node.nodeValue = out;
      });
      if (p < 1) {
        raf = requestAnimationFrame(frame);
      } else {
        nodes.forEach((node, i) => (node.nodeValue = originals[i]));
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          io.disconnect();
          raf = requestAnimationFrame(frame);
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      nodes.forEach((node, i) => (node.nodeValue = originals[i]));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span ref={ref} className="inline">
      {children}
    </span>
  );
}
