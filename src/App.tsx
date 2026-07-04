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
import { X, Lock } from 'lucide-react';

export default function App() {
  const [isPricingUnlocked, setIsPricingUnlocked] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gray-fil-bg text-gray-fil-text flex flex-col font-sans selection:bg-slate-400 selection:text-white">
      <Navbar />
      <main className="w-full flex-grow flex flex-col">
        {/* Hero Banner Section */}
        <HeroSection />
        
        {/* Services / Discover Section (New) */}
        <ServicesSection />
        
        {/* Product Showcase Section */}
        <ProductCarousel 
          isPricingUnlocked={isPricingUnlocked} 
          onUnlockPricing={() => setShowLeadModal(true)} 
        />
        
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

      {/* Neumorphic Lead Collection Modal for unlocking pricing */}
      {showLeadModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[99999] flex items-center justify-center p-4">
          <div 
            className="w-full max-w-md bg-slate-100 rounded-[35px] border border-white p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowLeadModal(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-200 hover:bg-slate-300 border border-white shadow-[2px_2px_4px_#c2c7ce,-2px_-2px_4px_#ffffff] flex items-center justify-center text-slate-650 cursor-pointer focus:outline-none transition-all active:scale-95"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex flex-col gap-5">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-200 border border-white px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5 w-fit">
                  <Lock className="w-3 h-3 text-slate-550" />
                  Premium Access Lock
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-800 uppercase tracking-wide mt-4">
                  Unlock Catalog & Pricing
                </h3>
                <p className="text-xs text-slate-500 font-light mt-1">
                  Enter your contact details to instantly unlock all prices and receive customized trade estimates.
                </p>
              </div>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsPricingUnlocked(true);
                  setShowLeadModal(false);
                }}
                className="flex flex-col gap-4 text-left"
              >
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Your Name</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="e.g. John Doe"
                    className="bg-slate-200/80 border border-white/50 rounded-2xl px-4 py-3 shadow-[inset_2px_2px_4px_#c2c7ce,inset_-2px_-2px_4px_#ffffff] text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-slate-350"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    required 
                    type="email" 
                    placeholder="e.g. john@example.com"
                    className="bg-slate-200/80 border border-white/50 rounded-2xl px-4 py-3 shadow-[inset_2px_2px_4px_#c2c7ce,inset_-2px_-2px_4px_#ffffff] text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-slate-350"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Phone / WhatsApp Number</label>
                  <input 
                    required 
                    type="tel" 
                    placeholder="e.g. +91 99999 88888"
                    className="bg-slate-200/80 border border-white/50 rounded-2xl px-4 py-3 shadow-[inset_2px_2px_4px_#c2c7ce,inset_-2px_-2px_4px_#ffffff] text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-slate-350"
                  />
                </div>
                
                <button
                  type="submit"
                  className="bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer mt-2"
                >
                  Reveal Pricing & Catalog
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
