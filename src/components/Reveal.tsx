import { useEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  stagger?: boolean;
  staggerAmount?: number;
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 44,
  duration = 1,
  stagger = false,
  staggerAmount = 0.12,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from(stagger ? Array.from(el.children) : el, {
        y,
        opacity: 0,
        duration,
        delay,
        ease: "power3.out",
        stagger: stagger ? staggerAmount : 0,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [delay, y, duration, stagger, staggerAmount]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
