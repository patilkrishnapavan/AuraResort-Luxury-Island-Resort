# AuraResort — Luxury Island Resort Website

A fictional luxury-island-resort website built with React, TypeScript, and Vite. This responsive frontend demonstration features room browsing, resort experiences, image galleries, and a reservation interface.

**Note:** This is a frontend-only demonstration. Reservation and contact forms do not send or store information and do not process payments.

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
- Editable JSON content for rooms, services, experiences, testimonials, gallery, destinations, amenities, and FAQs

## Technologies

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide icons

No backend, database, authentication, API key, payment processor, or paid service is required.

## Getting Started

### Prerequisites

Install [Node.js](https://nodejs.org/), which includes npm.

### Installation

Clone the repository:

```bash
git clone https://github.com/patilkrishnapavan/auraresort-hotel-website.git
```

Navigate into the project folder:

```bash
cd auraresort-hotel-website
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local address printed by Vite, usually `http://localhost:5173`.

Keep the terminal running while using the website. Press `Ctrl+C` to stop the server.

## Available Scripts

```bash
npm run dev
npm run typecheck
npm run lint
npm run build
npm run preview
```

- `npm run dev` — Starts the development server.
- `npm run typecheck` — Checks TypeScript types.
- `npm run lint` — Runs ESLint.
- `npm run build` — Creates the production build.
- `npm run preview` — Previews the production build locally.

## Project Structure

```text
public/
  favicon.svg

src/
  components/
    sections/
  context/
  data/
  hooks/
  lib/
  App.tsx
  index.css
  main.tsx

index.html
package.json
tailwind.config.js
tsconfig.json
vite.config.ts
```

## Customization

### Hotel Name and Tagline

Update the displayed brand in `src/components/Logo.tsx`. Update the page title and SEO metadata in `index.html`.

### Colors and Fonts

- Edit `tailwind.config.js` to customize theme colors and font families.
- Edit `src/index.css` for global styles and CSS custom properties.
- Update the font links in `index.html` if you want to use different fonts.

### Rooms, Prices, and Content

Edit the JSON files under `src/data/`:

- `rooms.json` — Room names, descriptions, prices, capacity, and amenities.
- `services.json` — Guest services and icon names.
- `experiences.json` — Activities and images.
- `testimonials.json` — Sample guest testimonials.
- `gallery.json` — Image URLs, alternative text, and categories.
- `destinations.json` — Destination and contact information.
- `amenities.json` — Resort amenities.
- `faqs.json` — Frequently asked questions.

Replace fictional content with accurate information before publishing the website commercially.

### Images

The demo uses remote Pexels image URLs and Google Fonts. An internet connection is required to load these assets.

Replace the image URLs with properly licensed images or local files stored under `public/`.

### Contact and Booking

The booking and contact forms are frontend demonstrations only. Connect a suitable backend, form endpoint, or booking provider before using them for real enquiries or reservations.

No real reservations or payments are processed.

## Deployment

Build the production version:

```bash
npm run build
```

The generated static files will be available in `dist/`.

### Netlify

- Build command: `npm run build`
- Publish directory: `dist`

### Vercel

Import the GitHub repository and configure the project using the Vite framework preset.

- Build command: `npm run build`
- Output directory: `dist`

### GitHub Pages

Configure a GitHub Actions workflow to build the project and publish `dist/`. If deploying under a repository subpath, configure the appropriate `base` value in `vite.config.ts`.

## License and Disclaimer

AuraResort is a fictional demonstration project. Its branding, contact information, destination, rates, and sample guest stories are demo content.

Replace them with accurate, properly licensed content before commercial use.