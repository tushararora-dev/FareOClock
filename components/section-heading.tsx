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
        "flex flex-col gap-3.5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <span className="eyebrow">
        <span className="size-1.5 rounded-full bg-accent" aria-hidden />
        {eyebrow}
      </span>
      <h2 className="max-w-2xl text-balance text-[clamp(1.9rem,3.6vw,2.8rem)] font-medium leading-[1.06] tracking-[-0.035em]">
        {title}
      </h2>
      {description ? (
        <p className="max-w-xl text-pretty text-sm leading-relaxed text-muted sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
