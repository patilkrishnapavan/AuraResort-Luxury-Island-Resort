import roomsData from '@/data/rooms.json';
import experiencesData from '@/data/experiences.json';
import servicesData from '@/data/services.json';
import testimonialsData from '@/data/testimonials.json';
import galleryData from '@/data/gallery.json';
import destinationsData from '@/data/destinations.json';
import amenitiesData from '@/data/amenities.json';
import faqData from '@/data/faqs.json';

export type Room = {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  highlights: string[];
  badge: string;
  category: 'ocean' | 'villa' | 'penthouse';
  guests: number;
  size: string;
  bed: string;
  view: string;
  amenities: string[];
  image: string;
  gallery: string[];
};

export type Experience = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type Testimonial = {
  id: string;
  name: string;
  country: string;
  stayType: string;
  rating: number;
  review: string;
};

export type GalleryImage = {
  id: string;
  url: string;
  alt: string;
  category: 'resort' | 'suites' | 'dining' | 'wellness' | 'experiences';
};

export type Amenity = {
  id: string;
  label: string;
  icon: string;
};

export const rooms = roomsData as Room[];
export const experiences = experiencesData as Experience[];
export const services = servicesData as Service[];
export const testimonials = testimonialsData as Testimonial[];
export const galleryImages = galleryData as GalleryImage[];
export const amenities = amenitiesData as Amenity[];
export const destination = destinationsData;
export const faqItems = faqData;

export const heroImage = galleryImages[0].url.replace('w=1600', 'w=2400');
export const diningImage = galleryImages.find((image) => image.id === 'g3')!.url;
export const diningImage2 = 'https://images.pexels.com/photos/18340656/pexels-photo-18340656.jpeg?auto=compress&cs=tinysrgb&w=1600';
export const wellnessImage = galleryImages.find((image) => image.id === 'g10')!.url;

export function formatCurrency(amount: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
