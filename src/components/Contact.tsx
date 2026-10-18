import { useState, type FormEvent } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { destination } from '@/lib/data';
import { useToast } from '@/context/ToastContext';
import { Reveal } from '@/components/Reveal';

export function Contact() {
  const [sent, setSent] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
    showToast('info', 'Demo message prepared', 'This local template does not send or store messages. Connect your own form service to receive enquiries.');
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-stone-50">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal className="max-w-3xl">
          <p className="font-sans text-[11px] uppercase tracking-ultra-wider text-bronze mb-4">Get in touch</p>
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900 font-light leading-tight">
            Begin a conversation.
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <Reveal>
            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="block font-sans text-xs text-stone-600">
                Your name
                <input name="name" required autoComplete="name" className="contact-input mt-2" />
              </label>
              <label className="block font-sans text-xs text-stone-600">
                Email address
                <input name="email" type="email" required autoComplete="email" className="contact-input mt-2" />
              </label>
              <label className="block font-sans text-xs text-stone-600">
                How may we help?
                <textarea name="message" required rows={5} className="contact-input mt-2 resize-y" />
              </label>
              <button type="submit" className="inline-flex items-center gap-2 bg-emerald-deep px-7 py-3.5 font-sans text-xs uppercase tracking-widest text-ivory hover:bg-emerald-dark">
                {sent ? 'Send another message' : 'Send an enquiry'}
                <Send className="h-4 w-4" />
              </button>
              <p className="font-sans text-xs text-stone-400">Demo form only. No data is transmitted or stored.</p>
            </form>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="space-y-6">
              <a href={`mailto:${destination.email}`} className="flex items-start gap-4 text-stone-700 hover:text-emerald-deep">
                <Mail className="mt-1 h-4 w-4 text-bronze" aria-hidden="true" />
                <span className="font-sans text-sm">{destination.email}</span>
              </a>
              <a href={`tel:${destination.phone.replace(/\s/g, '')}`} className="flex items-start gap-4 text-stone-700 hover:text-emerald-deep">
                <Phone className="mt-1 h-4 w-4 text-bronze" aria-hidden="true" />
                <span className="font-sans text-sm">{destination.phone}</span>
              </a>
              <div className="flex items-start gap-4 text-stone-700">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-bronze" aria-hidden="true" />
                <span className="font-sans text-sm">{destination.address}</span>
              </div>
              <div className="relative mt-8 min-h-64 overflow-hidden border border-stone-200 bg-[#e8e2d6] p-7">
                <div className="absolute inset-0 opacity-40" aria-hidden="true">
                  <div className="absolute left-[10%] top-[34%] h-px w-[90%] rotate-[-18deg] bg-emerald-deep/40" />
                  <div className="absolute left-[24%] top-[65%] h-px w-[75%] rotate-[24deg] bg-emerald-deep/40" />
                  <div className="absolute left-[56%] top-[-10%] h-[130%] w-px rotate-[28deg] bg-emerald-deep/30" />
                  <div className="absolute left-[78%] top-[-10%] h-[130%] w-px rotate-[-12deg] bg-emerald-deep/30" />
                </div>
                <div className="relative flex h-full min-h-52 flex-col items-center justify-center text-center">
                  <MapPin className="h-7 w-7 text-emerald-deep" aria-hidden="true" />
                  <p className="mt-3 font-serif text-2xl text-stone-900">Auralis Island</p>
                  <p className="mt-1 font-sans text-xs text-stone-600">{destination.region}</p>
                  <p className="mt-3 font-sans text-[10px] uppercase tracking-widest text-stone-500">Illustrative map · Fictional location</p>
                </div>
              </div>
              <p className="font-sans text-sm text-stone-500 leading-relaxed">{destination.arrival}</p>
            </div>
          </Reveal>
        </div>
      </div>
      <style>{`
        .contact-input {
          display: block;
          width: 100%;
          border: 1px solid #d6d3d1;
          background: transparent;
          padding: 0.75rem 1rem;
          color: #292524;
          font: inherit;
        }
        .contact-input:focus-visible {
          outline: 2px solid #365314;
          outline-offset: 2px;
        }
      `}</style>
    </section>
  );
}
