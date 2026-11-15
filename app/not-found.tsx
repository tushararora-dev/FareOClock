import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid" />
      <div
        aria-hidden
        className="glow pointer-events-none absolute -top-40 left-1/2 size-[32rem] -translate-x-1/2 opacity-50"
      />

      <p className="relative text-xs uppercase tracking-[0.2em] text-muted">
        404 — page not found
      </p>
      <h1 className="relative mt-5 max-w-xl text-balance text-[clamp(2.5rem,7vw,4.5rem)] font-medium leading-[0.98] tracking-[-0.04em]">
        This route{" "}
        <span className="font-serif italic text-brand">doesn&apos;t exist.</span>
      </h1>
      <p className="relative mt-5 max-w-sm text-pretty text-sm leading-relaxed text-muted">
        Wrong turn — happens to the best of us. The trips are still on the home
        page.
      </p>
      <Link
        href="/"
        className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-cream transition-colors hover:bg-brand"
      >
        <ArrowLeft className="size-4" />
        Back home
      </Link>
    </main>
  );
}
