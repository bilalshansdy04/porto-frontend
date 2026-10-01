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
    <Reveal className={cn("mb-14 md:mb-20", className)}>
      <span className="eyebrow block mb-4">
        <span className="opacity-60">{"//"}</span> {eyebrow}
      </span>
      <h2 className="font-display-aurora font-bold text-4xl md:text-6xl tracking-tight text-[var(--ink)] leading-[1.05]">
        <ScrambleText>{title}</ScrambleText>
      </h2>
      {description && (
        <p className="mt-5 text-base md:text-lg text-[var(--muted)] max-w-xl leading-relaxed">
          {description}
        </p>
      )}
    </Reveal>
  );
}
