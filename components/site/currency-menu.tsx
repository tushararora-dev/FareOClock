"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { CURRENCIES, useCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";

/**
 * Currency picker pill. Used fixed in the top-right corner on desktop and
 * inside the mobile top bar. The list opens downward, right-aligned.
 */
export function CurrencyMenu({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { currency, setCurrency } = useCurrency();

  useEffect(() => {
    if (!open) return;

    const onDown = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Currency: ${currency.code}`}
        className="pointer-events-auto flex items-center gap-1.5 rounded-lg border border-line-strong bg-cream/80 px-3 py-2 text-[13px] font-medium text-ink shadow-sm backdrop-blur transition-colors hover:bg-surface"
      >
        {currency.symbol.trim()} {currency.code}
        <ChevronDown
          className={cn(
            "size-3 text-muted transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      {open ? (
        <ul
          role="listbox"
          aria-label="Currency"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "color-mix(in oklab, var(--color-brand) 72%, transparent) transparent",
          }}
          className="absolute right-0 top-full z-50 mt-2 max-h-72 w-48 overflow-y-auto rounded-xl border border-line bg-cream p-1 shadow-[0_16px_40px_-20px_rgba(20,32,27,0.35)]"
        >
          {CURRENCIES.map((item) => (
            <li key={item.code}>
              <button
                type="button"
                role="option"
                aria-selected={currency.code === item.code}
                onClick={() => {
                  setCurrency(item);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-surface",
                  currency.code === item.code
                    ? "font-medium text-ink"
                    : "text-muted",
                )}
              >
                {item.symbol.trim()} {item.code}
                {currency.code === item.code ? (
                  <Check className="size-3.5 text-brand" aria-hidden />
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
