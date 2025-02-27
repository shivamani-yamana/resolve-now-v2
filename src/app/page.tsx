import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";

import CTA from "@/components/home/CTA";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="relative w-full flex items-center justify-center">
        <Navbar className="top-2" />
      </div>

      <main className="flex-grow">
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
