import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  suffix = "",
  duration = 1.8,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.textContent = String(value);
      return;
    }

    const obj = { v: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        v: value,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = String(Math.round(obj.v));
        },
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      });
    });

    return () => ctx.revert();
  }, [value, duration]);

  return (
    <span className={className}>
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}
