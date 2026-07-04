import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Sparkles, Sliders } from 'lucide-react';

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  const [query, setQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    scrollToCatalog();
  };

  const handleFilterClick = (filterCategory: string) => {
    onSearch(filterCategory);
    scrollToCatalog();
  };

  const scrollToCatalog = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[92vh] w-full flex items-center justify-center overflow-hidden pt-24 pb-16 px-4 md:px-8">
      {/* Background Image with Brushed Glass Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-[10s] hover:scale-105"
        style={{ backgroundImage: `url('/hero_background.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-800/70 to-transparent z-10" />
      
      {/* Dynamic Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px] z-10" />

      <div className="relative z-20 max-w-7xl w-full flex flex-col items-start justify-center gap-8 mt-8">
        {/* Top Premium Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-slate-300 animate-pulse" />
          <span className="text-xs font-bold text-slate-200 tracking-wider uppercase">
            Est. 2026 • Premium Hardware & Fittings
          </span>
        </motion.div>

        {/* Title Block */}
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight"
          >
            FRINK HOME <br />
            <span className="text-slate-300 font-medium">HARDWARE MODERN</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-4 text-base sm:text-lg text-slate-200/90 leading-relaxed font-light max-w-xl"
          >
            We help build your dream home with world-class quality hardware. Experience super-premium furniture fittings, brassware, and architectural solution craft in Aligarh, India.
          </motion.p>
        </div>

        {/* Search & Explore CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap gap-4 items-center"
        >
          <form onSubmit={handleSearchSubmit} className="relative flex items-center bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-5 py-3 transition-all duration-300 group">
            <input 
              type="text" 
              placeholder="Search catalog..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent text-white placeholder-slate-300 focus:outline-none text-sm w-44 sm:w-60"
            />
            <button type="submit" className="cursor-pointer focus:outline-none text-white ml-2 flex items-center gap-1">
              <span className="text-xs font-bold uppercase tracking-wider group-hover:mr-1 transition-all">Go</span>
              <span className="text-lg">→</span>
            </button>
          </form>
        </motion.div>

        {/* Floating Neumorphic Filter Bar (Inspired by references: Rent, Price, Street search) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="w-full max-w-4xl mt-12 bg-slate-100/90 backdrop-blur-xl border border-white/40 p-4 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,1)]"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
            {/* Filter 1 */}
            <div className="flex flex-col px-4 border-b sm:border-b-0 sm:border-r border-slate-300/40 pb-4 sm:pb-0">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                Origin Store
              </span>
              <span className="text-sm font-extrabold text-slate-800">
                Aligarh Headquarter
              </span>
            </div>

            {/* Filter 2 - Interactive quick filters */}
            <div 
              onClick={() => handleFilterClick('Knobs')}
              className="flex flex-col px-4 border-b sm:border-b-0 sm:border-r border-slate-300/40 pb-4 sm:pb-0 cursor-pointer hover:bg-slate-200/40 py-2 rounded-2xl transition-all"
            >
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                <Sliders className="w-3.5 h-3.5 text-slate-500" />
                Product Line
              </span>
              <span className="text-sm font-extrabold text-slate-850 hover:underline">
                Premium Knobs & Fittings
              </span>
            </div>

            {/* Filter 3 & Action Button */}
            <div className="flex items-center justify-between px-4">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                  Starting Price
                </span>
                <span className="text-sm font-extrabold text-slate-800">
                  ₹299 / Unit
                </span>
              </div>

              <button 
                onClick={scrollToCatalog}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                Find Catalog
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
