import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { galleryImages } from '@/lib/data';
import { Reveal } from '@/components/Reveal';

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Resort', value: 'resort' },
  { label: 'Suites', value: 'suites' },
  { label: 'Dining', value: 'dining' },
  { label: 'Wellness', value: 'wellness' },
  { label: 'Experiences', value: 'experiences' },
] as const;

type CategoryValue = (typeof categories)[number]['value'];

/* ─────────────────────────────────────────────────────────────
   EDITORIAL GRID LAYOUT
   ─────────────────────────────────────────────────────────────
   Desktop (lg+): 12 columns. Images are placed in "spreads".

   A full spread = 6 images across 12 cols x 6 rows, with no gaps:

     cols  1-5     6-9     10-12
          ┌───────┬───────┬──────┐ row 1
          │       │   2   │      │ row 2
          │       ├───────┤  3   │ row 3
          │   1   │       ├──────┤ row 4
          │       │   4   │      │ row 5
          ├───────┤       │  5   │
          │   6   │       │      │ row 6
          └───────┴───────┴──────┘

   Every second spread is mirrored left-to-right for rhythm.

   Because filtering changes the image count, the final partial
   spread (1–5 images) uses its own recipe that fills a complete
   12 x 4 rectangle. Any count of images therefore tiles with
   zero empty cells.

   Cell format: [colStart, colSpan, rowStart, rowSpan]
   ───────────────────────────────────────────────────────────── */
type Cell = [number, number, number, number];

const SPREAD: Cell[] = [
  [1, 5, 1, 4], // tall feature
  [6, 4, 1, 2], // landscape
  [10, 3, 1, 3], // portrait
  [6, 4, 3, 4], // tall
  [10, 3, 4, 3], // portrait
  [1, 5, 5, 2], // landscape strip
];

const TAILS: Record<number, Cell[]> = {
  1: [[1, 12, 1, 4]],
  2: [
    [1, 7, 1, 4],
    [8, 5, 1, 4],
  ],
  3: [
    [1, 7, 1, 4],
    [8, 5, 1, 2],
    [8, 5, 3, 2],
  ],
  4: [
    [1, 5, 1, 4],
    [6, 3, 1, 2],
    [9, 4, 1, 2],
    [6, 7, 3, 2],
  ],
  5: [
    [1, 5, 1, 4],
    [6, 4, 1, 2],
    [10, 3, 1, 2],
    [6, 3, 3, 2],
    [9, 4, 3, 2],
  ],
};

function buildEditorialLayout(count: number) {
  const cells: { col: string; row: string }[] = [];
  let rowOffset = 0;
  let remaining = count;
  let spreadIndex = 0;

  while (remaining > 0) {
    const size = Math.min(remaining, 6);
    const recipe = size === 6 ? SPREAD : TAILS[size];
    const rows = size === 6 ? 6 : 4;
    const mirrored = spreadIndex % 2 === 1;

    recipe.forEach(([colStart, colSpan, rowStart, rowSpan]) => {
      const start = mirrored ? 14 - colStart - colSpan : colStart;
      cells.push({
        col: `${start} / span ${colSpan}`,
        row: `${rowOffset + rowStart} / span ${rowSpan}`,
      });
    });

    rowOffset += rows;
    remaining -= size;
    spreadIndex += 1;
  }

  return { cells, rows: rowOffset };
}

/* Mobile / tablet: 2 columns. Pattern per 3 images is
   [full-width] [half] [half]. If the last image would sit
   alone in a half cell, it is widened to full-width. */
function compactSpan(index: number, total: number) {
  if (index % 3 === 0) return 2;
  if (index === total - 1 && index % 3 === 1) return 2;
  return 1;
}

const gridCss = `
  .ag-wrap { container-type: inline-size; }

  .ag-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-auto-rows: calc(100cqw * 0.66);
    gap: 0.75rem;
  }

  .ag-tile { grid-column: span var(--span); }

  @media (min-width: 768px) {
    .ag-grid {
      grid-auto-rows: calc(100cqw * 0.5);
      gap: 1rem;
    }
  }

  @media (min-width: 1024px) {
    .ag-grid {
      grid-template-columns: repeat(12, minmax(0, 1fr));
      grid-template-rows: repeat(var(--rows), calc((100cqw - 11rem) / 12 * 1.5));
      grid-auto-rows: calc((100cqw - 11rem) / 12 * 1.5);
    }
    .ag-tile {
      grid-column: var(--col);
      grid-row: var(--row);
    }
  }

  .ag-caption {
    transition: opacity 500ms ease, transform 500ms ease;
  }

  @media (prefers-reduced-motion: reduce) {
    .ag-tile img,
    .ag-caption { transition: none !important; }
    .ag-tile:hover img { transform: none !important; }
  }
`;

export function Gallery() {
  const [category, setCategory] = useState<CategoryValue>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = galleryImages.filter(
    (img) => category === 'all' || img.category === category,
  );

  const editorial = buildEditorialLayout(filtered.length);

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  return (
    <section
      id="gallery"
      className="bg-neutral-50 py-24 lg:py-32"
    >
      <style>{gridCss}</style>

      <div className="w-full px-6 lg:px-10">
        {/* Section Heading */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-4 font-sans text-[11px] uppercase tracking-ultra-wider text-bronze">
            The Gallery
          </p>

          <h2 className="font-serif text-4xl font-light leading-tight text-stone-900 md:text-5xl">
            A Glimpse Into AuraResort
          </h2>
        </Reveal>

        {/* Category Filters */}
        <Reveal
          delay={0.1}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setCategory(cat.value);
                setLightboxIndex(null);
              }}
              className={`border px-5 py-2 font-sans text-xs uppercase tracking-widest transition-all duration-300 ${
                category === cat.value
                  ? 'border-emerald-deep bg-emerald-deep text-ivory'
                  : 'border-stone-300 bg-transparent text-stone-600 hover:border-emerald-deep hover:text-emerald-deep'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </Reveal>

        {/* Gallery Grid — asymmetric editorial composition */}
        <div className="ag-wrap mx-auto mt-12 w-full max-w-[1800px]">
          <motion.div
            layout
            className="ag-grid w-full"
            style={{ '--rows': editorial.rows } as React.CSSProperties}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((img, i) => (
                <motion.button
                  layout
                  key={img.id}
                  initial={{
                    opacity: 0,
                    scale: 0.95,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.95,
                  }}
                  transition={{
                    duration: 0.4,
                  }}
                  onClick={() => openLightbox(i)}
                  style={
                    {
                      '--span': compactSpan(i, filtered.length),
                      '--col': editorial.cells[i]?.col,
                      '--row': editorial.cells[i]?.row,
                    } as React.CSSProperties
                  }
                  className="
                    ag-tile
                    group
                    relative
                    h-full
                    w-full
                    overflow-hidden
                    bg-stone-200
                    focus-visible:outline
                    focus-visible:outline-2
                    focus-visible:outline-offset-2
                    focus-visible:outline-emerald-deep
                  "
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    loading="lazy"
                    className="
                      block
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-105
                    "
                  />

                  {/* Hover Overlay */}
                  <div
                    className="
                      absolute
                      inset-0
                      bg-stone-900/0
                      transition-colors
                      duration-300
                      group-hover:bg-stone-900/20
                    "
                  />

                  {/* Hover caption */}
                  <div
                    className="
                      ag-caption
                      pointer-events-none
                      absolute
                      inset-x-0
                      bottom-0
                      translate-y-2
                      bg-gradient-to-t
                      from-stone-950/55
                      to-transparent
                      px-5
                      pb-4
                      pt-16
                      text-left
                      opacity-0
                      group-hover:translate-y-0
                      group-hover:opacity-100
                      group-focus-visible:translate-y-0
                      group-focus-visible:opacity-100
                    "
                  >
                    <span className="font-serif text-base font-light capitalize text-ivory">
                      {img.category}
                    </span>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        images={filtered}
        index={lightboxIndex}
        onClose={closeLightbox}
        onNavigate={(dir) => {
          if (lightboxIndex === null) return;

          const next =
            (lightboxIndex + dir + filtered.length) %
            filtered.length;

          setLightboxIndex(next);
        }}
      />
    </section>
  );
}

function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: typeof galleryImages;
  index: number | null;
  onClose: () => void;
  onNavigate: (dir: number) => void;
}) {
  const reduced = useReducedMotion();

  const next = useCallback(
    () => onNavigate(1),
    [onNavigate],
  );

  const prev = useCallback(
    () => onNavigate(-1),
    [onNavigate],
  );

  /* Keyboard Controls */
  useEffect(() => {
    if (index === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }

      if (e.key === 'ArrowRight') {
        next();
      }

      if (e.key === 'ArrowLeft') {
        prev();
      }
    };

    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
    };
  }, [index, onClose, next, prev]);

  return (
    <AnimatePresence>
      {index !== null && images[index] && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-stone-950/90
            p-4
            backdrop-blur-md
          "
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery"
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="
              absolute
              right-6
              top-6
              text-ivory/70
              transition-colors
              hover:text-ivory
            "
            aria-label="Close lightbox"
          >
            <X className="h-7 w-7" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="
              absolute
              left-4
              flex
              h-12
              w-12
              items-center
              justify-center
              text-ivory/70
              transition-colors
              hover:text-ivory
              md:left-8
            "
            aria-label="Previous image"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          {/* Main Image */}
          <motion.div
            key={images[index].id}
            initial={
              reduced
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    scale: 0.96,
                  }
            }
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.3,
            }}
            className="
              flex
              max-h-[90vh]
              max-w-5xl
              flex-col
              items-center
            "
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[index].url}
              alt={images[index].alt}
              className="
                max-h-[78vh]
                max-w-full
                w-auto
                object-contain
              "
            />

            {/* Image Caption */}
            <p className="mt-4 text-center font-sans text-sm text-ivory/60">
              {images[index].alt}

              <span className="ml-3 text-ivory/30">
                {index + 1} / {images.length}
              </span>
            </p>
          </motion.div>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="
              absolute
              right-4
              flex
              h-12
              w-12
              items-center
              justify-center
              text-ivory/70
              transition-colors
              hover:text-ivory
              md:right-8
            "
            aria-label="Next image"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}