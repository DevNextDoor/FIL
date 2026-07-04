import { useState } from 'react';
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { ServicesSection } from "./components/ServicesSection";
import { ProductCarousel } from "./components/ProductCarousel";
import { CategoryGrid } from "./components/CategoryGrid";
import { Gallery } from "./components/Gallery";
import { ReviewsSection } from "./components/ReviewsSection";
import { StatsSection } from "./components/StatsSection";
import { ContactSection } from "./components/ContactSection";
import { SiteFooter } from "./components/SiteFooter";

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen w-full bg-gray-fil-bg text-gray-fil-text flex flex-col font-sans selection:bg-slate-400 selection:text-white">
      <Navbar />
      <main className="w-full flex-grow flex flex-col">
        {/* Hero Banner Section */}
        <HeroSection onSearch={(query) => setSearchQuery(query)} />
        
        {/* Services / Discover Section (New) */}
        <ServicesSection />
        
        {/* Product Showcase Section */}
        <ProductCarousel searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        
        {/* Neumorphic Category Grid Section (Interactive) */}
        <CategoryGrid />
        
        {/* Compact Mosaic Gallery Section */}
        <Gallery />
        
        {/* Reviews Slider Section (New) */}
        <ReviewsSection />
        
        {/* Stats Summary Section (Proven Success in Numbers) */}
        <StatsSection />
        
        {/* Tactile Contact Submission & Maps Section */}
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
