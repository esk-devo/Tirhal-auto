# ترحال للسيارات — Frontend

Arabic-first, RTL React frontend for Tirhal Auto, built to reproduce the delivered Figma
screens. Frontend only: no backend, no database. The data layer is isolated behind
services so the future Node/Express/PostgreSQL API can be connected without touching the
UI.

## Stack

React 18 · Vite 5 · Tailwind CSS 3 · React Router 6 · JavaScript (JSX). No other UI or
CSS framework, and no per-component stylesheets — `src/index.css` is the only stylesheet.

## Running

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

## Screens

| Route | Figma screen |
|---|---|
| `/` | Home |
| `/cars` | All cars (اختر سيارتك) |
| `/cars/:id` | Car details (Kia K5 2026) |
| `/compare` | Compare Vehicles |
| `/favorites` | قائمة أمنياتي |
| `/reservation` | Reservation & Inquiry (إتمام الطلب) |
| `/contact` | تواصل معنا |
| `/about` | طريق بلا حدود |
| `/signin`, `/signup` | Sign In / Sign Up |

The PNG exports these were built against are kept in `design-refs/` for future diffing.

## Arabic and RTL

`index.html` sets `lang="ar" dir="rtl"`. Layout uses logical properties throughout —
`ps-`/`pe-`, `ms-`/`me-`, `start-`/`end-`, `text-start`/`text-end` — never physical
left/right, so the document direction drives the layout instead of being patched on.

**The rule that matters when editing this codebase: in RTL, `start` is the right edge.**
`text-start` right-aligns; `text-end` left-aligns. In a flex row the *first DOM child*
renders on the right. Anything that should read right-aligned uses `start`.

Latin runs inside Arabic copy — model names, prices, phone numbers, years, spec values —
are wrapped in `.ltr-run` (`direction: ltr; unicode-bidi: isolate`) so they never reorder.

Directional icons are logical: `<DirectionalIcon direction="forward" />` points left in
RTL, and the same `direction` value drives both the glyph and the scroll or navigation it
triggers, so an arrow can never disagree with the motion it causes.

## Design tokens

`tailwind.config.js` holds the palette, radii, shadows and easing sampled directly from
the Figma exports and reconciled with the Tirhal Design System. Cairo carries Arabic
display and headings; Barlow carries Latin text and every numeral.

## Architecture

```
Page → Component → Hook/Context → Service → mock data
```

Services (`src/services/`) are the only place that knows where data comes from.
`http.js` exports a real `request()` helper alongside `mockRequest()`; connecting the
backend means changing the body of each service function, not the UI.

- `src/context/` — Auth, Favorites, Comparison, Toast
- `src/hooks/` — `useAsync`, `useForm`, `useCarFilters`, `useCompareTray`, `useMediaQuery`, `useLockBodyScroll`
- `src/data/mock/` — cars, brands, taxonomy, company content
- `src/utils/` — formatting, validation, asset resolution

Listing filters live in the URL (`useCarFilters`), so a filtered view is shareable and the
back button behaves — and the future API call can be driven straight from the query string.

## Assets

`src/utils/assets.js` maps a bare key in the data files to a hashed build URL. Replacing
an asset means dropping a file with the same name into the matching folder; no data or
component edits.

- `src/assets/logos/` — the official mark, cropped to its own bounds, plus a white variant
- `src/assets/images/cars/` — car photography, keyed by the `image` field in `cars.js`
- `src/assets/images/brands/` — manufacturer marks
- `src/assets/images/banners/`, `decor/`, `maps/` — page artwork

**Provenance:** the photography, manufacturer marks and branch maps currently in the repo
were extracted from the delivered Figma PNG exports so the build matches the design
exactly. They are stand-ins at export resolution — replace them with the original files
(and licensed brand SVGs / a licensed static-map source) when those are available.

## Known deviations from the Figma

Each of these is a place where the delivered screens contradict themselves or would ship a
defect; all are one-line reversals if you want the literal version instead.

1. **"عرض الكل" arrow direction.** The design draws this link two ways — arrow on the left
   pointing right (bento) and arrow on the right pointing left (branch cards). The second
   is the RTL-correct form, so it is used everywhere.
2. **Numerals.** The comparison cards use Arabic-Indic digits while every other screen uses
   Latin. Latin is used throughout, matching the majority and the Barlow numeral set.
3. **Price range filter.** The design's bounds (50,000–250,000) are narrower than the
   catalogue it shows, so the range is only applied once a handle is moved. Otherwise the
   listing would open empty.
4. **Required-field asterisks.** Not drawn in the design, so not rendered; `required` stays
   on the control for the browser and assistive tech.
5. **Finance calculator figure.** The design's SAR 1,850 is not consistent with its own
   inputs, so the calculator computes the instalment live.
6. **Comparison bar placement.** Shown only on the listing page, which is the one screen
   that draws it; elsewhere the header's compare icon carries the state, as those screens do.
7. **Comparison and wishlist seeds.** Both open pre-populated on a first visit so the pages
   match their Figma; a visitor's own selection replaces the seed from then on.

## Admin dashboard

Not implemented — its UI/UX has not been designed yet. See `src/pages/admin/README.md`
for the seams that are already in place for it.
