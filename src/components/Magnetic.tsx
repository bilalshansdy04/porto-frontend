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

    const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });

    let captured = false;
    let originX = 0;
    let originY = 0;
    const MAX_OFFSET = 45;
    const RELEASE_DISTANCE = 120;

    /** Cache the element's untransformed center */
    const updateOrigin = () => {
      const prevX = gsap.getProperty(el, "x") as number;
      const prevY = gsap.getProperty(el, "y") as number;
      gsap.set(el, { x: 0, y: 0 });
      const rect = el.getBoundingClientRect();
      originX = rect.left + rect.width / 2;
      originY = rect.top + rect.height / 2;
      gsap.set(el, { x: prevX, y: prevY });
    };

    const release = () => {
      if (!captured) return;
      captured = false;
      window.removeEventListener("mousemove", onGlobalMove);

      // elastic snap-back: overshoots then settles
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 1.0,
        ease: "elastic.out(1.2, 0.3)",
      });

      window.dispatchEvent(
        new CustomEvent("magnetic-release", { detail: { el } }),
      );
    };

    const capture = () => {
      if (captured) return;
      captured = true;
      gsap.killTweensOf(el); // kill any in-progress snap-back
      updateOrigin();
      window.addEventListener("mousemove", onGlobalMove, { passive: true });
      window.dispatchEvent(
        new CustomEvent("magnetic-capture", { detail: { el } }),
      );
    };

    const onGlobalMove = (e: MouseEvent) => {
      if (!captured) return;
      const dx = e.clientX - originX;
      const dy = e.clientY - originY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > RELEASE_DISTANCE) {
        release();
        return;
      }

      let ox = dx * strength;
      let oy = dy * strength;
      // Clamp offset magnitude for a "resisting" feel at the edges
      const d = Math.sqrt(ox * ox + oy * oy);
      if (d > MAX_OFFSET) {
        const s = MAX_OFFSET / d;
        ox *= s;
        oy *= s;
      }
      xTo(ox);
      yTo(oy);
    };

    const onEnter = () => {
      capture();
    };

    // If another Magnetic captures, release this one
    const onOtherCapture = (e: Event) => {
      const { el: capturedEl } = (e as CustomEvent<{ el: HTMLElement }>).detail;
      if (capturedEl !== el && captured) {
        release();
      }
    };

    el.addEventListener("mouseenter", onEnter);
    window.addEventListener("magnetic-capture", onOtherCapture);

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mousemove", onGlobalMove);
      window.removeEventListener("magnetic-capture", onOtherCapture);
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
