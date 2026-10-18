import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/Logo';

const navLinks = [
  { label: 'Stay', href: '#rooms' },
  { label: 'Experience', href: '#experiences' },
  { label: 'Services', href: '#services' },
  { label: 'Dining', href: '#dining' },
  { label: 'Our Story', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'backdrop-blur-md bg-stone-50/90 border-b border-stone-200/50 shadow-sm'
            : 'backdrop-blur-sm bg-stone-50/40 border-b border-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-10">
          <a href="#hero" aria-label="AuraResort home">
            <Logo />
          </a>

          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-sans text-[13px] uppercase tracking-widest text-stone-600 hover:text-emerald-deep transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-bronze transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <a
              href="#booking"
              className="inline-flex items-center bg-emerald-deep text-ivory font-sans text-[13px] uppercase tracking-widest px-7 py-3 hover:bg-emerald-dark transition-colors duration-300"
            >
              Book Your Stay
            </a>
          </div>

          <button
            className="lg:hidden p-2 -mr-2 text-stone-800"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] lg:hidden bg-stone-50 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200/50">
              <Logo />
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="p-2 -mr-2 text-stone-800"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-1 flex-col justify-center px-6">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block py-4 font-serif text-3xl text-stone-900 hover:text-emerald-deep transition-colors border-b border-stone-200/40"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.a
                href="#booking"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-8 inline-flex items-center justify-center bg-emerald-deep text-ivory font-sans text-sm uppercase tracking-widest px-7 py-4"
              >
                Book Your Stay
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
