"use client";

import { useId, type ReactNode } from "react";
import {
  PassportStamp,
  type PassportStampInk,
  type PassportStampVariant,
} from "@/components/passport-stamp";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";
import "./passport-section.css";

type PassportField = {
  label: string;
  value: ReactNode;
};

type PassportSectionProps = {
  number: string;
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  fields?: PassportField[];
  stampLabel?: string;
  stampStatus?: string;
  stampUpperText?: string;
  stampLowerText?: string;
  stampSeriesText?: string;
  stampVariant?: PassportStampVariant;
  stampInk?: PassportStampInk;
  hideStamp?: boolean;
  machineText?: string;
  action?: ReactNode;
  children?: ReactNode;
  className?: string;
  tilt?: "right-down" | "left-up" | "none";
};

export function PassportSection({
  number,
  eyebrow,
  title,
  description,
  fields = [],
  stampLabel,
  stampStatus,
  stampUpperText,
  stampLowerText = "",
  stampSeriesText = "",
  stampVariant = "round",
  stampInk = "green",
  hideStamp = false,
  machineText = "",
  action,
  children,
  className = "",
  tilt = "none",
}: PassportSectionProps) {
  const paperGrain = `${useId()}-paper-grain`;
  const showStamp = !hideStamp && Boolean(stampLabel && stampStatus);

  const tiltClass =
    tilt === "right-down"
      ? "passport-section--tilt-right-down"
      : tilt === "left-up"
        ? "passport-section--tilt-left-up"
        : "";

  return (
    <div className={cn("passport-section", tiltClass, className)}>
      <svg
        className="passport-section__paper"
        viewBox="0 0 1600 360"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <filter id={paperGrain} x="0" y="0" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="3"
              seed="17"
              stitchTiles="stitch"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.38  0 0 0 0 0.32  0 0 0 0 0.2  0.5 0 0 0 -0.1"
            />
          </filter>
        </defs>
        <rect width="1600" height="360" opacity="0.3" filter={`url(#${paperGrain})`} />
        <g
          transform="translate(1030 180)"
          fill="none"
          stroke="#456b50"
          strokeWidth="1.2"
          opacity="0.12"
        >
          {[0, 30, 60, 90, 120, 150].map((angle) => (
            <ellipse key={angle} rx="172" ry="104" transform={`rotate(${angle})`} />
          ))}
          <circle r="144" />
          <circle r="153" />
          <circle r="180" />
        </g>
      </svg>

      <div
        className={cn(
          "passport-section__body",
          action && "passport-section__body--with-action",
          !showStamp && "passport-section__body--no-seal",
          children && "passport-section__body--with-content",
        )}
      >
        <SectionHeading
          className="passport-section__heading"
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {fields && fields.length > 0 ? (
          <dl className="passport-section__fields">
            {fields.map((field) => (
              <div key={field.label}>
                <dt>{field.label}</dt>
                <dd>{field.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {children ? (
          <div className="passport-section__content">{children}</div>
        ) : null}

        {action ? <div className="passport-section__action">{action}</div> : null}

        {showStamp ? (
          <div className="passport-section__seal" aria-hidden="true">
            <div className="passport-section__stamp-frame">
              <PassportStamp
                number={number}
                label={stampLabel!}
                status={stampStatus!}
                upperText={stampUpperText}
                lowerText={stampLowerText}
                seriesText={stampSeriesText}
                variant={stampVariant}
                ink={stampInk}
              />
            </div>
          </div>
        ) : null}
      </div>

      {machineText ? (
        <div className="passport-section__machine-line" aria-hidden="true">
          {machineText}
        </div>
      ) : null}
    </div>
  );
}
