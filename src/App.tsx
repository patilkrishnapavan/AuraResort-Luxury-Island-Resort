import { ToastProvider } from '@/context/ToastContext';
import { BookingProvider } from '@/context/BookingContext';
import { ToastContainer } from '@/components/ToastContainer';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Rooms } from '@/components/Rooms';
import { Experiences } from '@/components/Experiences';
import { Amenities } from '@/components/Amenities';
import { Services } from '@/components/Services';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Dining } from '@/components/Dining';
import { Wellness } from '@/components/Wellness';
import { Reviews } from '@/components/Reviews';
import { Gallery } from '@/components/Gallery';
import { SpecialOffer } from '@/components/SpecialOffer';
import { FAQ } from '@/components/FAQ';
import { Booking } from '@/components/Booking';
import { Footer } from '@/components/Footer';
import { StickyMobileCTA } from '@/components/StickyMobileCTA';

function App() {
  return (
    <ToastProvider>
      <BookingProvider>
        <Navbar />
        <main>
          <Hero />
          <Rooms />
          <Experiences />
          <Amenities />
          <Services />
          <Dining />
          <Wellness />
          <About />
          <Reviews />
          <Gallery />
          <SpecialOffer />
          <FAQ />
          <Booking />
          <Contact />
        </main>
        <Footer />
        <StickyMobileCTA />
        <ToastContainer />
      </BookingProvider>
    </ToastProvider>
  );
}

export default App;
