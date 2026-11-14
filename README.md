# Auren Studio — agency landing page

A premium, dark, single-page site for a design agency. Built to be deployed on Vercel in one click.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Motion · lucide-react · Resend

---

## Run locally

Node 20.9+ required.

```bash
npm install
npm run dev
```

Open http://localhost:3000

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # eslint
```

> This project was scaffolded on Node 26. If `node` isn't on your PATH, install the current LTS from nodejs.org.

---

## Make it yours

Everything editorial lives in one file:

| What | Where |
| --- | --- |
| Studio name, email, URL, socials, availability | `lib/site.ts` → `site` |
| Navigation links | `lib/site.ts` → `nav` |
| Hero stats, client logos | `lib/site.ts` → `stats`, `clients` |
| Services cards | `lib/site.ts` → `services` |
| Case studies | `lib/site.ts` → `work` |
| Process steps | `lib/site.ts` → `process` |
| Testimonials | `lib/site.ts` → `testimonials` |
| Pricing tiers | `lib/site.ts` → `pricing` |
| FAQ | `lib/site.ts` → `faqs` |
| Budget options in the form | `lib/site.ts` → `budgets` |
| Colours / fonts / spacing tokens | `app/globals.css` → `@theme` |
| Fonts | `app/layout.tsx` (Geist + Instrument Serif) |
| Social preview image | `app/opengraph-image.tsx` |
| Favicon | `app/icon.svg` |

Each section is its own component in `components/site/`, so you can reorder or remove sections in `app/page.tsx`.

**Before launching:** replace `site.url` and `site.domain` with your real domain, swap the placeholder client names, case-study metrics and testimonials for real ones, and add a real OG image.

---

## Contact form

The form posts to a Server Action (`app/actions.ts`) that validates with Zod and emails you through [Resend](https://resend.com).

Without a key it runs in **demo mode**: the enquiry is logged in the server console and the UI shows a success state. Nothing is emailed.

To go live:

1. Create a Resend account and API key.
2. Verify your sending domain in Resend.
3. Create `.env.local`:

   ```bash
   RESEND_API_KEY=re_xxxxxxxx
   CONTACT_TO_EMAIL=you@yourdomain.com
   CONTACT_FROM_EMAIL="Auren Studio <hello@yourdomain.com>"
   ```

4. Add the same variables in **Vercel → Project → Settings → Environment Variables**.

`CONTACT_FROM_EMAIL` must use a domain verified in Resend (`onboarding@resend.dev` works only for testing, and only to your own Resend account email).

---

## Deploy on Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Framework is auto-detected as Next.js — no config needed.
4. Add the contact-form environment variables (optional at first).
5. Deploy, then add your custom domain in **Settings → Domains**.

Free Hobby plan covers this site comfortably. Vercel Analytics is already wired up and activates automatically in production.

### GitHub Pages?

Not a good fit: the contact form uses a Server Action, which needs a server. GitHub Pages serves static files only. If you must use Pages, replace the form with a third-party service (Formspree, Basin) or a `mailto:` link, and add `output: "export"` to `next.config.ts`.

---

## Structure

```
app/
  layout.tsx          fonts, metadata, analytics
  page.tsx            section composition + JSON-LD
  globals.css         design tokens, utilities, marquee keyframes
  actions.ts          contact form server action
  robots.ts           /robots.txt
  sitemap.ts          /sitemap.xml
  opengraph-image.tsx generated social preview
components/
  reveal.tsx          scroll-reveal wrapper (Motion)
  section-heading.tsx shared eyebrow + heading
  site/               one file per page section
lib/
  site.ts             all copy and content
  contact.ts          form state types
  utils.ts            cn() helper
```

---

## Design notes

- Single accent colour (`--color-accent`), everything else neutral.
- Type scale via `clamp()`; oversized headings with tight tracking.
- Motion is subtle (12–18px rise, 650ms, ease-out) and disabled for `prefers-reduced-motion`.
- Content stays visible with JavaScript disabled (`<noscript>` fallback in `app/layout.tsx`).
- One accent CTA per screen; all roads lead to `#contact`.
