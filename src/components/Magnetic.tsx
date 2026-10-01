import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";
import { gsap, isCoarsePointer, prefersReducedMotion } from "../lib/gsap";
import { cn } from "../lib/utils";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
  style?: CSSProperties;
}

export function Magnetic({
  children,
  strength = 0.35,
  className,
  style,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || isCoarsePointer() || prefersReducedMotion()) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      xTo(x * strength);
      yTo(y * strength);
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(el);
      gsap.set(el, { clearProps: "x,y" });
    };
  }, [strength]);

  return (
    <div
      ref={ref}
      className={cn("inline-block will-change-transform", className)}
      style={style}
    >
      {children}
    </div>
  );
}
