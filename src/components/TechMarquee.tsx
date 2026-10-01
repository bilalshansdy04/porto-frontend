import type { CSSProperties } from "react";

interface TechMarqueeProps {
  items: string[];
}

export function TechMarquee({ items }: TechMarqueeProps) {
  const unique = [...new Set(items)];
  if (unique.length === 0) return null;
  const loop = [...unique, ...unique];

  return (
    <div className="tech-marquee" aria-hidden="true">
      <div
        className="tech-marquee-track"
        style={
          {
            "--marquee-duration": `${Math.max(30, unique.length * 5)}s`,
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
