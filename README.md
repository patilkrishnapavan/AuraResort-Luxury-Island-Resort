# AuraResort

A fictional luxury-island-resort website template built with React and Vite. It is a frontend demonstration: reservation and contact forms do not send, store, or charge for anything.

## Features

- Responsive resort landing page with sticky desktop and mobile navigation
- Room cards with category, guest-capacity, and price filters
- Room-detail gallery dialog with keyboard navigation and booking shortcut
- Experiences, amenities, guest services, dining, wellness, story, and destination sections
- Filterable image gallery with lightbox
- Guest testimonial slider and FAQ accordion
- Frontend-only availability search and reservation estimate with date and capacity validation
- Contact form demonstration, toast notifications, and back-to-top control
- Reduced-motion support, visible focus states, semantic landmarks, and SEO/social metadata
- Editable JSON content for rooms, services, experiences, testimonials, gallery, destination, amenities, and FAQs

## Technologies

- React 18 and TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide icons

No backend, database, authentication, API key, payment processor, or paid service is required.

## Installation and local development

Install [Node.js](https://nodejs.org/) (which includes npm), then run these commands in the project folder:

```powershell
npm install
npm run dev
```

Open the local address printed by Vite, usually `http://localhost:5173`. Keep the terminal running while you use the site. Stop the server with `Ctrl+C`.

Other project commands:

```powershell
npm run typecheck
npm run lint
npm run build
npm run preview
```

`npm run preview` serves the production build locally after running `npm run build`.

## Customization

### Hotel name and tagline

Update the displayed brand in `src/components/Logo.tsx`, page title and SEO text in `index.html`, and demo copy in the relevant components and `README.md`.

### Colors and fonts

- Edit the Tailwind theme colors and font families in `tailwind.config.js`.
- Global base styles and CSS custom properties are in `src/index.css`.
- The current Google Fonts are linked in `index.html`. Replace the link and matching Tailwind font names to use different fonts. A local font can also be added under `public/` if you want to avoid the external font request.

### Rooms, prices, services, and other content

Edit the JSON files under `src/data/`:

- `rooms.json` — names, descriptions, prices, currency, guest limit, size, bed, view, amenities, and image URLs
- `services.json` — guest services and icon names
- `experiences.json` — activities and images
- `testimonials.json` — sample guest stories (replace fictional testimonials before publishing)
- `gallery.json` — image URLs, alternative text, and gallery categories
- `destinations.json` — fictional location and contact information
- `amenities.json` — resort amenities and icon names
- `faqs.json` — frequently asked questions

Keep room IDs unique and use `ocean`, `villa`, or `penthouse` as a room category. Gallery categories are `resort`, `suites`, `dining`, `wellness`, and `experiences`. Icon values need to match the mappings in `src/components/Amenities.tsx` or `src/components/Services.tsx`.

### Images

The demo uses remote Pexels image URLs and Google Fonts, so an internet connection is needed to load those assets. Replace the URLs in `src/data/*.json` with your licensed image URLs or files placed under `public/` (for example, `/images/rooms/suite.jpg`) to serve images locally. Set meaningful `alt` text in `gallery.json`.

### Contact details

Edit `src/data/destinations.json`. The contact and booking forms are demonstration UI only; connect a form endpoint or booking provider before using them for real enquiries or reservations. No form data is transmitted by this template.

## Deployment

The static production files are generated in `dist/` by `npm run build`.

- **Netlify:** use `npm run build` as the build command and `dist` as the publish directory.
- **Vercel:** import the project and use the Vite framework preset, `npm run build`, and `dist` as the output directory.
- **GitHub Pages:** configure Pages with a build workflow that runs `npm ci` and `npm run build`, then publishes `dist`. If hosting below a repository subpath, set Vite's `base` in `vite.config.ts` to that path before building.

## Folder structure

```text
public/
  favicon.svg
src/
  components/      Reusable page sections and UI
  context/         Booking and toast state
  data/            Editable JSON content
  lib/data.ts      Typed exports for the JSON content
  App.tsx          Page composition
  index.css        Global styles and reduced-motion rules
  main.tsx         React entry point
index.html         Document metadata and font links
tailwind.config.js Theme configuration
vite.config.ts     Vite and source alias configuration
```

AuraResort, its contact information, guest stories, rates, and destination are fictional demo content. Replace them with accurate, licensed content before commercial use.
