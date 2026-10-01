import {
  useEffect,
  useRef,
  type ReactNode,
  type HTMLAttributes,
} from "react";
import { gsap, isCoarsePointer, prefersReducedMotion } from "../lib/gsap";
import { cn } from "../lib/utils";

interface TiltCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  maxTilt?: number;
  className?: string;
}

export function TiltCard({
  children,
  maxTilt = 7,
  className,
  ...rest
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || isCoarsePointer() || prefersReducedMotion()) return;

    const layers = Array.from(el.querySelectorAll<HTMLElement>(".tilt-layer"));

    gsap.set(el, { transformPerspective: 900 });
    const rxTo = gsap.quickTo(el, "rotationX", {
      duration: 0.55,
      ease: "power2",
    });
    const ryTo = gsap.quickTo(el, "rotationY", {
      duration: 0.55,
      ease: "power2",
    });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      ryTo((px - 0.5) * 2 * maxTilt);
      rxTo(-(py - 0.5) * 2 * maxTilt);
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
      for (const layer of layers) {
        layer.style.transform = `translate3d(${((0.5 - px) * 14).toFixed(1)}px, ${((0.5 - py) * 14).toFixed(1)}px, 0) scale(1.05)`;
      }
    };

    const onLeave = () => {
      rxTo(0);
      ryTo(0);
      for (const layer of layers) {
        layer.style.transform = "";
      }
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(el);
      gsap.set(el, { clearProps: "rotationX,rotationY,transformPerspective" });
    };
  }, [maxTilt]);

  return (
    <div ref={ref} className={cn("tilt-card", className)} {...rest}>
      {children}
      <div ref={glareRef} className="tilt-glare" aria-hidden="true" />
      <div className="tilt-spot" aria-hidden="true" />
    </div>
  );
}
