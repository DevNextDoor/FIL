import { motion } from 'motion/react';
import { Search, MapPin, Sliders } from 'lucide-react';

export function HeroSection() {
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

        {/* WhatsApp Direct Link Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col gap-3.5 items-start w-full"
        >
          <a 
            href="https://wa.me/+919997773393?text=Hi!+I'm+interested+in+Frink+International+hardware+products."
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full px-6 py-3.5 text-white font-bold text-xs min-[380px]:text-sm uppercase tracking-wider transition-all duration-300 active:scale-95 shadow-md group cursor-pointer whitespace-nowrap"
          >
            <svg className="w-5 h-5 fill-white group-hover:scale-110 transition-transform shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.66.986 3.284 1.48 4.961 1.482 5.485.002 9.947-4.46 9.949-9.949.001-2.66-1.018-5.161-2.87-7.015C16.877 1.816 14.382.793 11.72.793c-5.485 0-9.948 4.46-9.95 9.95-.001 2.014.526 3.985 1.528 5.722l-.99 3.61 3.749-.983zm12.355-6.68c-.282-.14-1.664-.82-1.923-.914-.258-.095-.446-.14-.633.14-.188.28-.728.914-.89 1.1-.164.18-.327.201-.61.06-2.812-1.4-4.63-2.9-6.07-5.4-.15-.258.15-.24.43-.797.106-.207.053-.388-.026-.53-.079-.14-.633-1.523-.867-2.09-.228-.547-.46-.473-.633-.482-.163-.008-.35-.01-.537-.01-.188 0-.492.07-.75.352-.258.28-.984.962-.984 2.344 0 1.382 1.008 2.72 1.148 2.91.14.18 1.985 3.03 4.81 4.25.672.291 1.2.464 1.61.595.676.214 1.29.183 1.777.11.542-.081 1.664-.68 1.9-.1.336 2.36.082 2.47-.052 2.65-.138.183-.344.258-.628.118z"/>
            </svg>
            Let's connect with WhatsApp
          </a>
        </motion.div>

        {/* Floating Neumorphic Filter Bar (Inspired by references: Rent, Price, Street search) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="w-full max-w-4xl mt-12 bg-slate-100/90 backdrop-blur-xl border border-white/40 p-5 sm:py-3.5 sm:px-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,1)]"
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
              onClick={scrollToCatalog}
              className="flex flex-col px-4 border-b sm:border-b-0 sm:border-r border-slate-300/40 pb-4 sm:pb-0 cursor-pointer hover:bg-slate-200/40 py-2 rounded-2xl transition-all"
            >
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                <Sliders className="w-3.5 h-3.5 text-slate-500" />
                Product Line
              </span>
              <span className="text-sm font-extrabold text-slate-800 hover:underline">
                Premium Knobs & Fittings
              </span>
            </div>

            {/* Filter 3 & Action Button */}
            <div className="flex items-center justify-between pl-4 pr-1.5">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                  Starting Price
                </span>
                <span className="text-sm font-extrabold text-slate-800">
                  ₹299/-
                </span>
              </div>

              <button 
                onClick={scrollToCatalog}
                className="flex items-center gap-1.5 sm:gap-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-[10px] min-[320px]:text-[11px] sm:text-xs uppercase tracking-wider px-4 py-2.5 sm:px-6 sm:py-2.5 rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Find Catalog
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
