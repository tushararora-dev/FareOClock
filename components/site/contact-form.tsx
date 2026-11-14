"use client";

import { useActionState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { submitEnquiry } from "@/app/actions";
import { initialContactState } from "@/lib/contact";
import { budgets, site } from "@/lib/site";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-xl border border-line bg-white/[0.03] px-3.5 py-3 text-sm text-fog placeholder:text-muted/60 transition-colors focus:border-accent/50 focus:bg-white/[0.05] focus:outline-none";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitEnquiry,
    initialContactState,
  );

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-2xl border border-accent/30 bg-ink p-7 sm:p-8">
        <span className="grid size-11 place-items-center rounded-full bg-accent text-accent-ink">
          <Check className="size-5" strokeWidth={2.4} />
        </span>
        <div>
          <h3 className="text-lg font-medium tracking-tight">
            Message received
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {state.message}
          </p>
        </div>
        <a
          href={`mailto:${site.email}`}
          className="text-sm text-accent underline-offset-4 hover:underline"
        >
          {site.email}
        </a>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" error={state.errors?.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Priya Raman"
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
            placeholder="you@company.com"
            className={inputClass}
            aria-invalid={Boolean(state.errors?.email)}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Company" htmlFor="company" optional>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Acme Inc."
            className={inputClass}
          />
        </Field>

        <Field label="Budget" htmlFor="budget" optional>
          <select
            id="budget"
            name="budget"
            defaultValue=""
            className={cn(inputClass, "appearance-none bg-ink-2")}
          >
            <option value="">Select a range</option>
            {budgets.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        label="Project details"
        htmlFor="message"
        error={state.errors?.message}
      >
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="What are you building, and what does success look like?"
          className={cn(inputClass, "resize-none")}
          aria-invalid={Boolean(state.errors?.message)}
        />
      </Field>

      {/* Honeypot: hidden from humans, tempting for bots. */}
      <div className="hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" && state.message ? (
        <p role="alert" className="text-sm text-red-300">
          {state.message}
        </p>
      ) : null}

      <div className="mt-1 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-ink transition-all duration-200 hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {pending ? (
            <>
              <span className="size-3.5 animate-spin rounded-full border-2 border-accent-ink/30 border-t-accent-ink" />
              Sending…
            </>
          ) : (
            <>
              Send enquiry
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </>
          )}
        </button>
        <p className="text-xs text-muted">
          Or email{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-fog underline-offset-4 hover:underline"
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
        className="flex items-center justify-between text-xs text-muted"
      >
        <span>{label}</span>
        {optional ? <span className="text-muted/50">Optional</span> : null}
      </label>
      {children}
      {error ? (
        <p className="text-xs text-red-300" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
