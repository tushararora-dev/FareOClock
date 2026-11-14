import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <span className="eyebrow">
        <span className="size-1.5 rounded-full bg-accent" aria-hidden />
        {eyebrow}
      </span>
      <h2 className="max-w-2xl text-balance text-[clamp(2rem,4.2vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.035em]">
        {title}
      </h2>
      {description ? (
        <p className="max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
