import { Logo } from '@/components/Logo';
import { Mail, Phone, MapPin } from 'lucide-react';
import { destination } from '@/lib/data';

const exploreLinks = [
  { label: 'Rooms', href: '#rooms' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Dining', href: '#dining' },
  { label: 'Wellness', href: '#wellness' },
  { label: 'Our Story', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
];

const stayLinks = [
  { label: 'Booking', href: '#booking' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
  { label: 'Guest Services', href: '#booking' },
];

export function Footer() {
  return (
    <footer className="bg-stone-900 text-ivory">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <Logo dark />
            <p className="mt-6 font-serif text-lg italic text-ivory/50 leading-relaxed max-w-xs">
              A private world between ocean and sky.
            </p>
          </div>

          <div>
            <h3 className="font-sans text-[10px] uppercase tracking-ultra-wider text-bronze-soft mb-5">
              Explore
            </h3>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-ivory/60 hover:text-ivory transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-[10px] uppercase tracking-ultra-wider text-bronze-soft mb-5">
              Stay
            </h3>
            <ul className="space-y-3">
              {stayLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-ivory/60 hover:text-ivory transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-[10px] uppercase tracking-ultra-wider text-bronze-soft mb-5">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`mailto:${destination.email}`}
                  className="flex items-start gap-3 font-sans text-sm text-ivory/60 hover:text-ivory transition-colors"
                >
                  <Mail className="h-4 w-4 mt-0.5 text-bronze shrink-0" />
                  {destination.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${destination.phone.replace(/\s/g, '')}`}
                  className="flex items-start gap-3 font-sans text-sm text-ivory/60 hover:text-ivory transition-colors"
                >
                  <Phone className="h-4 w-4 mt-0.5 text-bronze shrink-0" />
                  {destination.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 font-sans text-sm text-ivory/60">
                <MapPin className="h-4 w-4 mt-0.5 text-bronze shrink-0" />
                {destination.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-ivory/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-ivory/40">
            © {new Date().getFullYear()} AuraResort. A fictional luxury brand. All imagery for demonstration.
          </p>
          <p className="font-sans text-xs text-ivory/40">
            Crafted with attention to every detail.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-sans text-xs text-ivory/60 underline underline-offset-4 hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze-soft"
          >
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
