import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import MenuShowcaseSection from '@/components/sections/MenuShowcaseSection'
import InfiniteScrollBanner from '@/components/sections/InfiniteScrollBanner'
import FeaturedOfferingSection from '@/components/sections/FeaturedOfferingSection'
import PhilosophySection from '@/components/sections/PhilosophySection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import PlaylistSection from '@/components/sections/PlaylistSection'
import InstagramSection from '@/components/sections/InstagramSection'
import ContactSection from '@/components/sections/ContactSection'
import FinalCTA from '@/components/sections/FinalCTA'
import Footer from '@/components/layout/Footer'

// Section flow mirrors cemberstudio.com, recopied for Prager Brothers:
// hero → manifesto → 3-pillar showcase → marquee → daily offerings →
// the craft gallery → testimonials → ★ music vinyl → instagram → locations → CTA.
export default function HomePage() {
  return (
    <main className="page">
      <HeroSection />
      <AboutSection />
      <MenuShowcaseSection />
      <InfiniteScrollBanner />
      <FeaturedOfferingSection />
      <PhilosophySection />
      <TestimonialsSection />
      <PlaylistSection />
      <InstagramSection />
      <ContactSection />
      <FinalCTA />
      <Footer />
    </main>
  )
}
