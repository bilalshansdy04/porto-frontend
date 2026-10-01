import { useEffect, useRef } from "react";
import { isCoarsePointer } from "../lib/gsap";

const RING_SIZE = 38;
const RING_RADIUS = 19;
const HOVER_PAD = 6;
const MAX_MORPH_WIDTH = 340;
const MAX_MORPH_HEIGHT = 120;
const LERP_POS = 0.16;
const LERP_SIZE = 0.22;

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isCoarsePointer()) return;

    document.body.classList.add("custom-cursor-active");
    const dot = dotRef.current;
    const ring = ringRef.current;
    const inner = innerRef.current;
    if (!dot || !ring || !inner) return;

    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;
    let visible = false;

    let hoverEl: HTMLElement | null = null;
    let hoverRadius = 0;
    let morph = false;

    // Locked state: ring stays as button outline during magnetic capture
    let lockedEl: HTMLElement | null = null;

    let w = RING_SIZE;
    let h = RING_SIZE;
    let rad = RING_RADIUS;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onOver = (e: MouseEvent) => {
      // While locked to a captured button, ignore hover changes
      if (lockedEl) return;

      const target = e.target as Element | null;
      const interactive = (target?.closest?.(
        "a, button, [role='button'], [data-cursor]",
      ) ?? null) as HTMLElement | null;
      if (interactive === hoverEl) return;
      hoverEl = interactive;
      if (interactive) {
        const computed = getComputedStyle(interactive);
        const first = parseFloat(computed.borderRadius.split("/")[0]);
        hoverRadius = Number.isFinite(first) ? first : 0;
        morph = true;
        ring.classList.add("is-active");
      } else {
        hoverRadius = 0;
        morph = false;
        ring.classList.remove("is-active");
      }
    };

    /** Lock ring to the interactive child of the Magnetic wrapper */
    const onCapture = (e: Event) => {
      const magneticEl = (e as CustomEvent<{ el: HTMLElement }>).detail.el;
      const interactive = magneticEl.querySelector(
        "a, button, [role='button'], [data-cursor]",
      ) as HTMLElement | null;
      if (interactive) {
        lockedEl = interactive;
        hoverEl = interactive;
        const computed = getComputedStyle(interactive);
        const first = parseFloat(computed.borderRadius.split("/")[0]);
        hoverRadius = Number.isFinite(first) ? first : 0;
        morph = true;
        ring.classList.add("is-active");
      }
    };

    /** Unlock ring — seed lerp position for a smooth float-back */
    const onRelease = (e: Event) => {
      const magneticEl = (e as CustomEvent<{ el: HTMLElement }>).detail.el;
      const interactive = magneticEl.querySelector(
        "a, button, [role='button'], [data-cursor]",
      ) as HTMLElement | null;
      if (interactive && interactive === lockedEl) {
        // Seed rx/ry to the button's current center so the ring
        // smoothly lerps from button → cursor instead of jumping
        if (interactive.isConnected) {
          const rect = interactive.getBoundingClientRect();
          rx = rect.left + rect.width / 2;
          ry = rect.top + rect.height / 2;
        }
        lockedEl = null;
        hoverEl = null;
        hoverRadius = 0;
        morph = false;
        ring.classList.remove("is-active");
      }
    };

    const onDown = () => ring.classList.add("is-pressed");
    const onUp = () => ring.classList.remove("is-pressed");

    const loop = () => {
      rx += (mx - rx) * LERP_POS;
      ry += (my - ry) * LERP_POS;

      let tw = RING_SIZE;
      let th = RING_SIZE;
      let tr = RING_RADIUS;

      // Read the button rect once per frame (includes Magnetic transform)
      let btnRect: DOMRect | null = null;

      if (hoverEl) {
        if (!hoverEl.isConnected) {
          hoverEl = null;
          lockedEl = null;
          morph = false;
          ring.classList.remove("is-active");
        } else if (morph) {
          const rect = hoverEl.getBoundingClientRect();
          if (
            rect.width > 0 &&
            rect.width <= MAX_MORPH_WIDTH &&
            rect.height <= MAX_MORPH_HEIGHT
          ) {
            btnRect = rect;
            tw = Math.max(rect.width + HOVER_PAD * 2, 24);
            th = Math.max(rect.height + HOVER_PAD * 2, 24);
            tr =
              Math.min(hoverRadius, Math.min(rect.width, rect.height) / 2) +
              HOVER_PAD;
          }
        }
      }

      w += (tw - w) * LERP_SIZE;
      h += (th - h) * LERP_SIZE;
      rad += (tr - rad) * LERP_SIZE;

      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;

      let ringX: number;
      let ringY: number;
      if (morph && hoverEl?.isConnected && btnRect) {
        // getBoundingClientRect() already includes the Magnetic component's
        // CSS transform, so we use it directly — no extra offset needed.
        ringX = btnRect.left + btnRect.width / 2;
        ringY = btnRect.top + btnRect.height / 2;
      } else {
        ringX = rx;
        ringY = ry;
      }
      ring.style.transform = `translate3d(${ringX.toFixed(2)}px, ${ringY.toFixed(2)}px, 0)`;
      inner.style.width = `${w.toFixed(2)}px`;
      inner.style.height = `${h.toFixed(2)}px`;
      inner.style.margin = `${(-h / 2).toFixed(2)}px 0 0 ${(-w / 2).toFixed(2)}px`;
      inner.style.borderRadius = `${Math.min(rad, Math.min(w, h) / 2).toFixed(2)}px`;

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("magnetic-capture", onCapture);
    window.addEventListener("magnetic-release", onRelease);
    raf = requestAnimationFrame(loop);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("magnetic-capture", onCapture);
      window.removeEventListener("magnetic-release", onRelease);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true">
        <div className="cursor-dot-inner" />
      </div>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <div ref={innerRef} className="cursor-ring-inner" />
      </div>
    </>
  );
}
