# Budget Banda — "Kam kharch, zyada duniya."

Single-page site for a budget-travel service: **custom itineraries** and **1:1 travel sessions**. Built to deploy on Vercel in one click.

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

All editorial content lives in one file:

| What | Where |
| --- | --- |
| Name, domain, email, tagline, mission, availability, socials | `lib/site.ts` → `site` |
| Navigation links | `lib/site.ts` → `nav` |
| Hero stats (turnaround, session fee, cheapest trip, mark-ups) | `lib/site.ts` → `stats` |
| Destination ticker | `lib/site.ts` → `destinations` |
| Real trips + what they cost | `lib/site.ts` → `trips` |
| Landmark photos + alt text | `lib/site.ts` → `places` |
| The four mission principles | `lib/site.ts` → `principles` |
| The two services | `lib/site.ts` → `services` |
| Questions answered on a 1:1 call | `lib/site.ts` → `questions` |
| Process steps | `lib/site.ts` → `process` |
| Testimonials | `lib/site.ts` → `testimonials` |
| Pricing tiers | `lib/site.ts` → `pricing` |
| FAQ | `lib/site.ts` → `faqs` |
| Form budget + service options | `lib/site.ts` → `budgets`, `enquiryServices` |
| Colours / fonts / spacing tokens | `app/globals.css` → `@theme` |
| Fonts | `app/layout.tsx` (Geist + Instrument Serif) |
| Social preview image | `app/opengraph-image.tsx` |
| Favicon | `app/icon.svg` |

Each section is its own component in `components/site/`, so you can reorder or remove sections in `app/page.tsx`.

**Before launching:**

1. Replace `site.url` and `site.domain` with the real domain.
2. Replace the three **testimonials** with real ones (they are placeholders).
3. Confirm the trip prices and the "2 slots left" availability line are current.
4. Point `site.socials` at the real Instagram and YouTube handles.

---

## Design notes

**Palette — "Passport Cream"** (defined in `app/globals.css`):

| Role | Token | Hex |
| --- | --- | --- |
| Page background | `cream` | `#FAF6EE` |
| Cards | `surface` | `#FFFFFF` |
| Text | `ink` | `#14201B` |
| Secondary text | `muted` | `#6B756F` |
| Brand / links | `brand` | `#1F5A45` |
| Accent (prices, dots, marks) | `accent` | `#F2A33C` |
| Borders | `line` | `#E6DFD1` |
| Dark section text | `on-dark` / `on-dark-muted` | `#F7F3EA` / `#9AA8A0` |

- Light theme throughout, with exactly one dark section (`#ask`) using `bg-ink text-on-dark`.
- Primary CTAs are ink-on-cream, not amber — the accent stays a highlight so it never cheapens the page.
- Oversized headings with tight tracking; a handwritten-ish serif italic (`Instrument Serif`) carries the emotional lines.
- Signature devices: numbered section eyebrows (`01 ·`), the full-bleed real world map in the hero (accurate coastlines, country borders and labels, great-circle flight route with a travelling plane, destination pins, coordinate readout and scale bar), the interactive trip tab board, the postcard filmstrip, and the boarding-pass pricing cards.
- Motion is subtle (12–18px rise, 650ms) and disabled for `prefers-reduced-motion`.
- Content stays visible with JavaScript disabled (`<noscript>` fallback in `app/layout.tsx`).

---

## Hero map

The hero background is a self-contained SVG atlas — no tiles, no map library, no API key. It is generated once from public-domain data and committed as JSON.

- `components/site/map-backdrop.tsx` — full-bleed, draggable, zoomable map. Opens focused on India, over-fills the hero at every size, and clamps panning so no seam ever shows. Scrolls with `touch-action: pan-y`, pans with drag or arrow keys, zooms with the buttons, `+` / `-` or double-click, and resets with `0`.
- `lib/world-countries.json` — the real Natural Earth 1:50m countries: 184 countries, 520 rings, ~12.4k points. Each entry carries a display name, a label anchor and its rings.
- `scripts/build-world-map.cjs` — regenerates the file from Natural Earth Admin 0 – Countries (public domain), simplifying to the map's projection. Run `node scripts/build-world-map.cjs` after changing the projection or tolerance.
- The map draws real coastlines and country borders, cream land on a sage ocean, constant-size country labels, a curved great-circle flight route and the destination pins. Headings, route and pins come from `lib/site.ts` (`places` carries `lat`/`lon`), so editing a destination updates the map, the trips board and the ticker together.

---

## Photos & credits

The 10 landmark photos in `public/places/` come from Wikimedia Commons. Attribution, licence links and original files are listed at `/credits` and generated from `lib/place-credits.json`.

To refresh them, run `node scripts/resolve-places.cjs` (needs `sharp`). If you swap a photo, update the matching entry in `lib/place-credits.json` too — the credits page and the footer link depend on it.

---

## Contact form

The form posts to a Server Action (`app/actions.ts`) that validates with Zod and emails you through [Resend](https://resend.com). It captures name, email, service, destination, budget and message.

Without a key it runs in **demo mode**: the enquiry is logged in the server console and the UI shows a success state. Nothing is emailed.

To go live:

1. Create a Resend account and API key.
2. Verify your sending domain in Resend.
3. Create `.env.local`:

   ```bash
   RESEND_API_KEY=re_xxxxxxxx
   CONTACT_TO_EMAIL=you@yourdomain.com
   CONTACT_FROM_EMAIL="Budget Banda <hello@yourdomain.com>"
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
  globals.css         tokens, animations, utilities
  actions.ts          contact form server action
  credits/page.tsx    Wikimedia attribution page
  robots.ts           /robots.txt
  sitemap.ts          /sitemap.xml
  opengraph-image.tsx generated social preview
components/
  reveal.tsx          scroll-reveal wrapper (Motion)
  section-heading.tsx shared eyebrow + heading
  site/               one file per page section (map-backdrop = hero atlas)
lib/
  site.ts             all copy and content
  world-countries.json generated real world map shapes + label anchors
  place-credits.json  photo attribution data
  contact.ts          form state types
  utils.ts            cn() + ₹ formatting
public/places/        landmark photos (1400px wide)
scripts/
  build-world-map.cjs   regenerate the map JSON from Natural Earth
  resolve-places.cjs  re-fetch + normalise the photos
```

Page order: Hero → destination ticker → Trips (interactive price board) → Postcards (filmstrip) → Services (+ process strip) → Ask (dark: mission + 1:1 questions) → Testimonials → Pricing (boarding passes) → FAQ → Contact.
