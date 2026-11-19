"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { submitEnquiry } from "@/app/actions";
import { moneyText, useCurrency } from "@/lib/currency";
import { initialContactState } from "@/lib/contact";
import { budgets, enquiryServices, site } from "@/lib/site";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-xl border border-[#c8bfae] bg-surface/85 px-3.5 py-2.5 text-sm text-ink placeholder:text-muted transition-colors focus:border-brand focus:bg-surface focus:outline-none shadow-[0_1px_2px_rgba(20,32,27,0.03)]";

function SelectMenu({
  id,
  name,
  placeholder,
  value,
  onChange,
  options,
}: {
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

  const selected = options.find((opt) => opt.value === value);

  return (
    <div ref={ref} className="relative">
      <input type="hidden" id={id} name={name} value={value} />
      <button
        type="button"
        id={`${id}-button`}
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${placeholder}: ${selected ? selected.label : "None selected"}`}
        className="pointer-events-auto flex w-full items-center justify-between rounded-xl border border-[#c8bfae] bg-surface/85 px-3.5 py-2.5 text-sm font-medium text-ink shadow-[0_1px_2px_rgba(20,32,27,0.03)] backdrop-blur transition-colors hover:bg-surface focus:outline-none"
      >
        <span className={selected ? "font-medium text-ink" : "text-muted"}>
          {selected ? selected.label : placeholder}
        </span>
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
          aria-label={placeholder}
          className="no-scrollbar absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-y-auto rounded-xl border border-line bg-cream p-1 shadow-[0_16px_40px_-20px_rgba(20,32,27,0.35)]"
        >
          {options.map((item) => (
            <li key={item.value}>
              <button
                type="button"
                role="option"
                aria-selected={value === item.value}
                onClick={() => {
                  onChange(item.value);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs transition-colors hover:bg-surface",
                  value === item.value
                    ? "font-medium text-ink"
                    : "text-muted",
                )}
              >
                <span>{item.label}</span>
                {value === item.value ? (
                  <Check className="size-3 text-brand" aria-hidden />
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitEnquiry,
    initialContactState,
  );
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");
  useCurrency();

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-start gap-3 rounded-xl border border-brand/25 bg-cream/60 p-5">
        <span className="grid size-9 place-items-center rounded-full bg-brand text-cream">
          <Check className="size-4" strokeWidth={2.4} />
        </span>
        <div>
          <h3 className="text-base font-medium tracking-tight">
            Enquiry received
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            {state.message}
          </p>
        </div>
        <a
          href={`mailto:${site.email}`}
          className="text-xs text-brand underline-offset-4 hover:underline"
        >
          {site.email}
        </a>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-3.5 w-full" noValidate>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" error={state.errors?.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Ritika Sharma"
            className={inputClass}
            aria-invalid={Boolean(state.errors?.name)}
          />
        </Field>

        <Field label="Email" htmlFor="email" error={state.errors?.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@email.com"
            className={inputClass}
            aria-invalid={Boolean(state.errors?.email)}
          />
        </Field>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="What do you need?" htmlFor="service">
          <SelectMenu
            id="service"
            name="service"
            placeholder="Select a service"
            value={service}
            onChange={setService}
            options={enquiryServices.map((item) => ({
              value: item,
              label: item,
            }))}
          />
        </Field>

        <Field label="Your budget" htmlFor="budget" optional>
          <SelectMenu
            id="budget"
            name="budget"
            placeholder="Select a range"
            value={budget}
            onChange={setBudget}
            options={budgets.map((item) => ({
              value: item,
              label: moneyText(item),
            }))}
          />
        </Field>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Where to?" htmlFor="destination" optional>
          <input
            id="destination"
            name="destination"
            type="text"
            placeholder="Nepal in March, or 3 countries in 10 days…"
            className={inputClass}
          />
        </Field>

        <Field
          label="Tell me about the trip"
          htmlFor="message"
          error={state.errors?.message}
        >
          <input
            id="message"
            name="message"
            type="text"
            placeholder="Who's coming, dates, or what you want out of it…"
            className={inputClass}
            aria-invalid={Boolean(state.errors?.message)}
          />
        </Field>
      </div>

      {/* Honeypot: hidden from humans, tempting for bots. */}
      <div className="hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" && state.message ? (
        <p role="alert" className="text-xs text-red-700">
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-col items-start gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-brand bg-brand px-5 py-2.5 text-sm font-semibold text-cream shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {pending ? (
            <>
              <span className="size-3.5 animate-spin rounded-full border-2 border-cream/30 border-t-cream" />
              Sending…
            </>
          ) : (
            <>
              Send enquiry
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
            </>
          )}
        </button>
        <p className="text-xs text-muted">
          Or email{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-ink underline-offset-4 hover:underline"
          >
            {site.email}
          </a>
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="flex items-center justify-between text-xs font-semibold text-[#4f5e53]"
      >
        <span>{label}</span>
        {optional ? (
          <span className="text-xs font-normal text-muted">Optional</span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p className="text-xs text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
