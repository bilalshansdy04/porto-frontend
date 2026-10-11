import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { ScrambleText } from "./ScrambleText";
import { cn } from "../lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal className={cn("mb-10 sm:mb-14 md:mb-20", className)}>
      <span className="eyebrow block mb-3 sm:mb-4 text-xs sm:text-sm">
        <span className="opacity-60">{"//"}</span> {eyebrow}
      </span>
      <h2 className="font-display-aurora font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-[var(--ink)] leading-[1.08]">
        <ScrambleText>{title}</ScrambleText>
      </h2>
      {description && (
        <p className="mt-3.5 sm:mt-5 text-sm sm:text-base md:text-lg text-[var(--muted)] max-w-xl leading-relaxed">
          {description}
        </p>
      )}
    </Reveal>
  );
}
