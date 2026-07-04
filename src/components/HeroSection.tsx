import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Sliders } from 'lucide-react';

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

const SUGGESTIONS = ['knobs', 'handles', 'brackets', 'brass', 'steel', 'chrome', 'gold', 'showroom'];

const getLevenshteinDistance = (a: string, b: string): number => {
  const tmp: number[][] = [];
  let i, j;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  for (i = 0; i <= a.length; i++) tmp[i] = [i];
  for (j = 0; j <= b.length; j++) tmp[0][j] = j;
  for (i = 1; i <= a.length; i++) {
    for (j = 1; j <= b.length; j++) {
      tmp[i][j] = Math.min(
        tmp[i - 1][j] + 1,
        tmp[i][j - 1] + 1,
        tmp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return tmp[a.length][b.length];
};

const getDidYouMean = (word: string): string | null => {
  const lowerWord = word.trim().toLowerCase();
  if (!lowerWord || SUGGESTIONS.includes(lowerWord)) return null;
  
  let bestMatch: string | null = null;
  let minDistance = 3; // Limit distance threshold to 2 changes max
  
  for (const sug of SUGGESTIONS) {
    const dist = getLevenshteinDistance(lowerWord, sug);
    if (dist < minDistance) {
      minDistance = dist;
      bestMatch = sug;
    }
  }
  return bestMatch;
};

export function HeroSection({ onSearch }: HeroSectionProps) {
  const [query, setQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.search-container')) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    setDropdownOpen(false);
    scrollToCatalog();
  };

  const handleFilterClick = (filterCategory: string) => {
    onSearch(filterCategory);
    setDropdownOpen(false);
    scrollToCatalog();
  };

  const scrollToCatalog = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const didYouMean = getDidYouMean(query);

  const filteredSuggestions = query
    ? SUGGESTIONS.filter((sug) => sug.toLowerCase().includes(query.toLowerCase()))
    : ['knobs', 'handles', 'brackets', 'brass']; // Default popular matches when empty

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

        {/* Search, spelling correction & autocomplete dropdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col gap-3.5 items-start w-full"
        >
          {/* Autocomplete Search Container */}
          <div className="search-container relative z-40">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-5 py-3 transition-all duration-300 group">
              <input 
                type="text" 
                placeholder="Search catalog..." 
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setDropdownOpen(true);
                }}
                onFocus={() => setDropdownOpen(true)}
                className="bg-transparent text-white placeholder-slate-300 focus:outline-none text-sm w-44 sm:w-60"
              />
              <button type="submit" className="cursor-pointer focus:outline-none text-white ml-2 flex items-center gap-1">
                <span className="text-xs font-bold uppercase tracking-wider group-hover:mr-1 transition-all">Go</span>
                <span className="text-lg">→</span>
              </button>
            </form>

            {/* Floating Suggestions Dropdown */}
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-slate-950/95 backdrop-blur-xl border border-white/15 rounded-2xl shadow-2xl z-50 p-2 overflow-hidden flex flex-col gap-0.5"
                >
                  <div className="text-[9px] font-black text-slate-450 uppercase tracking-widest px-3 py-1.5 border-b border-white/5 select-none">
                    {query ? 'Suggested Matches' : 'Trending Searches'}
                  </div>
                  {filteredSuggestions.map((sug) => (
                    <button
                      key={sug}
                      type="button"
                      onClick={() => {
                        setQuery(sug);
                        onSearch(sug);
                        setDropdownOpen(false);
                        scrollToCatalog();
                      }}
                      className="text-left text-xs font-bold text-white hover:bg-white/10 px-3 py-2.5 rounded-xl transition-colors cursor-pointer w-full focus:outline-none capitalize"
                    >
                      {sug}
                    </button>
                  ))}
                  {filteredSuggestions.length === 0 && (
                    <span className="text-left text-[11px] text-slate-400 px-3 py-2.5 select-none">
                      No matching hardware found
                    </span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Spell check / Typo correction Did-You-Mean helper */}
          {didYouMean && (
            <div className="text-xs text-slate-300 select-none ml-2">
              Did you mean:{' '}
              <button
                onClick={() => {
                  setQuery(didYouMean);
                  onSearch(didYouMean);
                  setDropdownOpen(false);
                  scrollToCatalog();
                }}
                className="underline text-white font-bold cursor-pointer hover:text-slate-200 focus:outline-none bg-transparent border-none p-0 inline"
              >
                {didYouMean}
              </button>
              ?
            </div>
          )}
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
