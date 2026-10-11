import type { CSSProperties } from "react";

interface TechMarqueeProps {
  items: string[];
}

export function TechMarquee({ items }: TechMarqueeProps) {
  const unique = [...new Set(items)];
  if (unique.length === 0) return null;

  let base = [...unique];
  while (base.length < 12) {
    base = [...base, ...unique];
  }
  const loop = [...base, ...base];

  return (
    <div className="tech-marquee" aria-hidden="true">
      <div
        className="tech-marquee-track"
        style={
          {
            "--marquee-duration": `${Math.max(25, base.length * 2.8)}s`,
          } as CSSProperties
        }
      >
        {loop.map((name, i) => (
          <span key={i} className="tech-marquee-item">
            <span className="tech-marquee-diamond" />
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
