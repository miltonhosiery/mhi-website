# Milton Hosiery Industries — website

Next.js (App Router) build of the MHI website: Home, About, Products (with
brand tabs, real ANICY photos, hover-cycling and a full-screen carousel),
Contact. Available in **English, Hindi and Marathi** with browser-language
auto-detection and a manual switcher in the nav.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000 — it will redirect to `/en`, `/hi` or `/mr`
based on your browser's language, or a saved preference. Requires internet
access on first run so Next.js can fetch the Poppins and Inter fonts from
Google Fonts.

```bash
npm run build   # production build
npm run start   # run the production build locally
```

## Project structure

```
proxy.js                   locale detection & redirect (runs on every request)
app/
  [locale]/
    layout.js               root layout: fonts, dictionary, <Header>, <Footer>
    page.js                 Home
    about/page.js           About
    products/page.js        Products (brand tabs)
    contact/page.js         Contact + enquiry form
  api/contact/route.js      receives form submissions (outside [locale] — not translated)
  globals.css               all design tokens & styles
components/
  Header.jsx, Footer.jsx, CtaPanel.jsx, LanguageSwitcher.jsx,
  ProductTabs.jsx, ProductCard.jsx, ProductModal.jsx, ContactForm.jsx
lib/
  brands.js                 single source of truth for Milton/ANICY/NICY/Avron
                             (each text field is keyed by locale: en/hi/mr)
  i18n/
    config.js                supported locales
    dictionaries/en.json      UI copy — English (canonical source)
    dictionaries/hi.json      UI copy — Hindi
    dictionaries/mr.json      UI copy — Marathi
    getDictionary.js          loads the right dictionary for a locale
    LocaleContext.jsx         React context so client components (forms,
                              product cards, nav) can read the current
                              locale/dictionary without prop-drilling
public/logos/                 logo image files
public/products/anicy/1–8/    real ANICY product photos
```

## Translations — please review

I (Claude) wrote the Hindi and Marathi translations myself. I'm reasonably
confident in them, but I'm not a native speaker or professional translator,
and this is customer-facing copy for a real business — please have a fluent
speaker read through both languages before this goes live, especially:
- `lib/i18n/dictionaries/hi.json` and `mr.json` (nav, page copy, form)
- `lib/brands.js` (brand descriptions and all product names/descriptions)

Everything is plain text in those files — no code knowledge needed to edit,
just find the string and replace it.

**What stayed in English on purpose:** brand names (Milton, ANICY, NICY,
Avron), the company name, phone/email placeholders, and numbers/times.

## How language switching works

- `proxy.js` runs before every page request. If the URL doesn't already
  start with `/en`, `/hi` or `/mr`, it picks a locale (saved cookie first,
  then the browser's `Accept-Language` header, then English) and redirects.
- Clicking EN / हि / मर in the nav saves that choice in a cookie
  (`NEXT_LOCALE`) so it's remembered on the next visit, and takes you to the
  same page in the new language.
- Adding a fourth language later means: add it to `lib/i18n/config.js`, add
  a `dictionaries/xx.json` file, and add its translations to `lib/brands.js`.

## Before this goes live — a checklist

**Content (from the project brief):**
- [ ] Replace the placeholder milestones in `lib/i18n/dictionaries/*.json`
      (`about.timeline`) with your confirmed company history — in all three
      languages.
- [ ] Add your real email address (currently a placeholder in all three
      languages, in `contact.emailPlaceholder`).
- [ ] Add a Milton brand logo — it currently falls back to a text wordmark
      in `lib/brands.js` (`logo: null`).
- [ ] Add real product photography for Milton and NICY the same way ANICY's
      was added (see below) — they still show placeholder icons.
- [ ] Confirm any public-facing numbers (years in business, cities served,
      retailer counts) before adding them — none are included yet, by design.

**Wholesale enquiry form:**
The form at `/contact` posts to `app/api/contact/route.js`, which currently
just validates the fields and logs the enquiry to the server console. Before
launch, wire this up to one of:
- An email API (Resend, Postmark, SendGrid) to email the team directly, or
- A CRM / spreadsheet (Airtable, Google Sheets, HubSpot) via their API.

Keep any API keys in environment variables (`.env.local`, not committed) —
never hard-code them in `route.js`.

**Domain & deploy:**
- Ready to deploy to Vercel, or any host that supports Next.js.
- Set your production environment variables (email/CRM keys) in your
  hosting provider's dashboard, not in this repo.

## Editing brands, products and copy

`lib/brands.js` is the single source of truth for all four brands — name,
logo, accent color, segment, status, description, and product list. Text
fields are objects like `{ en: "...", hi: "...", mr: "..." }`; update all
three when you change something.

## Adding photos for a new product (matching the ANICY pattern)

1. Drop the images in `public/products/<brand>/<number>/1.jpg`, `2.jpg`, etc.
   (numbered in the order you want them to appear/cycle).
2. In `lib/brands.js`, add an `images: [...]` array of those paths to that
   product's entry.
3. That's it — the hover-cycle thumbnail and the click-to-open carousel both
   pick it up automatically. Products without an `images` array keep showing
   the simple garment-icon placeholder.
