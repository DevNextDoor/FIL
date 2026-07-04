import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn, Heart, ArrowRight } from 'lucide-react';

interface GalleryItem {
  id: number;
  src: string;
  title: string;
  category: 'HANDLES' | 'KNOBS' | 'FITTINGS' | 'SHOWROOM';
  description: string;
  specs: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  { 
    id: 1, 
    src: '/images/gallery/1.jpg', 
    title: 'Showroom Interior', 
    category: 'SHOWROOM',
    description: 'Flagship showroom in Aligarh displaying custom architectural fittings.',
    specs: 'Location: Aligarh HQ • Hours: 9am - 6pm'
  },
  { 
    id: 2, 
    src: '/images/gallery/2.jpg', 
    title: 'Ornate Brass Handle', 
    category: 'HANDLES',
    description: 'Traditional heavy brass pull handle featuring intricate custom engraving.',
    specs: 'Material: C360 Solid Brass • Finish: Antique Gold'
  },
  { 
    id: 3, 
    src: '/images/gallery/3.jpg', 
    title: 'Triple Hook Rack', 
    category: 'FITTINGS',
    description: 'Wall-mounted chrome triple hook rail for residential storage organization.',
    specs: 'Material: SS-304 Stainless Steel • Mount: Concealed'
  },
  { 
    id: 4, 
    src: '/images/gallery/4.jpg', 
    title: 'Moscow-R Gold Handle', 
    category: 'HANDLES',
    description: 'Modern gold door handle with minimalist styling and circular lock escutcheon.',
    specs: 'Material: Zamak-5 Zinc Alloy • Finish: Polished Gold'
  },
  { 
    id: 5, 
    src: '/images/gallery/5.jpg', 
    title: 'Latch Bolts Chrome', 
    category: 'FITTINGS',
    description: 'Heavy duty slide latch locks designed for high security interior doors.',
    specs: 'Material: Hardened Steel • Finish: Chrome Plated'
  },
  { 
    id: 6, 
    src: '/images/gallery/6.jpg', 
    title: 'Peg Hook 32.2 cm', 
    category: 'FITTINGS',
    description: 'Precision measured chrome towel and utility hanger strip.',
    specs: 'Length: 32.2 cm • Mounting: Double Screws'
  },
  { 
    id: 7, 
    src: '/images/gallery/7.jpg', 
    title: 'Drawer Knobs Cylinder', 
    category: 'KNOBS',
    description: 'Cylindrical modern stainless steel drawer pulls mounted on solid oak wood.',
    specs: 'Material: SS-304 • Projection: 28 mm'
  },
  { 
    id: 8, 
    src: '/images/gallery/9.jpg', 
    title: 'Frink Brand Card', 
    category: 'SHOWROOM',
    description: 'Official corporate branding display highlighting hardware heritage.',
    specs: 'Established: 2026 • Headquarters: Aligarh'
  },
  { 
    id: 9, 
    src: '/images/gallery/11.jpg', 
    title: 'Corner L-Brackets', 
    category: 'FITTINGS',
    description: 'Reinforced industrial corner joists with included heavy duty screw sets.',
    specs: 'Material: Galvanized Steel • Load limit: 80 kg'
  },
  { 
    id: 10, 
    src: '/images/gallery/12.jpg', 
    title: 'Gold Henry-R Handle', 
    category: 'HANDLES',
    description: 'Premium gold handles engineered with dual-action spring lock assemblies.',
    specs: 'Material: C360 Brass • Color: Warm Gold'
  },
  { 
    id: 11, 
    src: '/images/gallery/18.jpg', 
    title: 'Gold Long Plate Handle', 
    category: 'HANDLES',
    description: 'Luxurious long plate entrance door pull with custom grip textures.',
    specs: 'Length: 450 mm • Finish: Brushed Satin Gold'
  },
  { 
    id: 12, 
    src: '/images/gallery/19.jpg', 
    title: 'Slide Latches Chrome', 
    category: 'FITTINGS',
    description: 'Polished slide bolts designed for gates, wardrobes, and cabinets.',
    specs: 'Material: Extruded Brass • Finish: Chrome'
  },
  { 
    id: 13, 
    src: '/images/gallery/13.jpg', 
    title: 'Double Chrome Hook Strips', 
    category: 'FITTINGS',
    description: 'Commercial hook rails for office coats, bags, and high-frequency use.',
    specs: 'Finish: Mirror Chrome • Lifetime rust warranty'
  },
  { 
    id: 14, 
    src: '/images/gallery/17.jpg', 
    title: 'Circular Map of Accessories', 
    category: 'FITTINGS',
    description: 'Catalog overview displaying locks, L-brackets, hinges, and peg rails.',
    specs: 'Contains: 8 hardware types • Series: 2026 Home'
  }
];

const CATEGORIES = ['ALL', 'HANDLES', 'KNOBS', 'FITTINGS', 'SHOWROOM'];

export function Gallery() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const filteredItems = GALLERY_ITEMS.filter(item => 
    activeFilter === 'ALL' ? true : item.category === activeFilter
  );

  return (
    <section id="gallery" className="py-24 bg-gray-fil-bg px-4 md:px-8 relative overflow-hidden">
      {/* Dynamic Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:40px_40px] z-0 pointer-events-none" />
      {/* Subtle graphic background overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#e2e8f0,transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-800 tracking-tight uppercase font-display">
            Interactive Showcase
          </h2>
          <p className="mt-4 text-slate-500 font-light leading-relaxed max-w-xl mx-auto text-xs sm:text-sm">
            Filter our premium architectural catalog. Hover over any card for details and click to open the specification sheet.
          </p>
        </div>

        {/* Category Filters Bar */}
        <div className="flex gap-2 sm:gap-4 mb-12 overflow-x-auto max-w-full py-2 px-4 mask-edges scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest cursor-pointer py-2.5 px-5 rounded-full transition-all focus:outline-none shrink-0 ${
                activeFilter === cat
                  ? 'text-slate-800 bg-slate-350 shadow-[inset_2px_2px_5px_#c2c7ce,inset_-2px_-2px_5px_#ffffff]'
                  : 'text-slate-500 hover:text-slate-800 bg-transparent hover:bg-slate-200/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid - Full image card design with no inner border gap padding */}
        <motion.div 
          layout
          className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedItem(item)}
                className="relative w-full aspect-square rounded-[36px] overflow-hidden cursor-pointer group select-none border border-white shadow-[8px_8px_16px_#c2c7ce,-8px_-8px_16px_#ffffff] hover:shadow-[12px_12px_24px_#c2c7ce,-12px_-12px_24px_#ffffff] transition-all duration-300"
              >
                {/* Full-width image filling the card bounds completely */}
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Floating Heart Button */}
                <button
                  onClick={(e) => toggleFavorite(item.id, e)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100/80 hover:bg-white backdrop-blur-md border border-white/30 flex items-center justify-center transition-colors shadow-sm focus:outline-none cursor-pointer z-10 active:scale-90"
                >
                  <Heart 
                    className={`w-4 h-4 transition-colors ${
                      favorites.includes(item.id) ? 'fill-rose-500 text-rose-500' : 'text-slate-655 hover:text-rose-500'
                    }`} 
                  />
                </button>

                {/* Floating Category Tag */}
                <span className="absolute top-4 left-4 text-[9px] font-black uppercase tracking-wider bg-slate-800/80 text-slate-100 px-3 py-1 rounded-full border border-slate-700/50 backdrop-blur-md shadow-sm z-10">
                  {item.category}
                </span>

                {/* Glassmorphic Sliding Overlay for title and actions on hover */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-900/90 to-transparent p-6 pt-16 flex flex-col justify-end translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="text-sm font-black text-white tracking-wider uppercase mb-1 drop-shadow-sm truncate">
                    {item.title}
                  </h3>
                  <p className="text-[10px] text-slate-350 font-light leading-normal line-clamp-2 mb-3">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-white uppercase tracking-wider">
                    <span>Inspect Specs</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Subtle static label when not hovered, overlaying the bottom in gradient */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/60 to-transparent p-6 pt-12 flex flex-col justify-end group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                  <h3 className="text-xs font-black text-white tracking-wider uppercase drop-shadow-sm truncate">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Lightbox Split Detail View Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[999999] flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl bg-slate-100 rounded-[35px] border border-white p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.15)] cursor-default text-left relative overflow-hidden"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-200 hover:bg-slate-350 border border-white shadow-[2px_2px_4px_#c2c7ce,-2px_-2px_4px_#ffffff] flex items-center justify-center text-slate-650 cursor-pointer focus:outline-none transition-all hover:rotate-95 hover:scale-105 active:scale-95 z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-4">
                {/* Left Side: Zoomed Image Card */}
                <div className="w-full aspect-square rounded-3xl bg-slate-200 border border-slate-300 shadow-[inset_3px_3px_6px_#c2c7ce,inset_-3px_-3px_6px_#ffffff] p-4 flex items-center justify-center overflow-hidden">
                  <img
                    src={selectedItem.src}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover rounded-2xl shadow-md border border-white/50"
                  />
                </div>

                {/* Right Side: Specifications Pane */}
                <div className="flex flex-col gap-5">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-200 border border-white px-3 py-1 rounded-full shadow-sm">
                      {selectedItem.category} SPECIFICATION
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-800 uppercase tracking-wide mt-4">
                      {selectedItem.title}
                    </h3>
                  </div>

                  <p className="text-sm font-light text-slate-600 leading-relaxed">
                    {selectedItem.description}
                  </p>

                  <div className="bg-slate-200/50 rounded-2xl border border-white p-4">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                      <ZoomIn className="w-4 h-4 text-slate-600" />
                      Details & Technical Metrics:
                    </h4>
                    <p className="text-xs text-slate-600 font-light leading-normal">
                      {selectedItem.specs}
                    </p>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex gap-3 border-t border-slate-350/40 pt-4 mt-2">
                    <button
                      onClick={() => {
                        setSelectedItem(null);
                        const element = document.getElementById('contact');
                        if (element) {
                          const scopeEl = document.getElementsByName('project_scope')[0] as HTMLTextAreaElement;
                          if (scopeEl) {
                            scopeEl.value = `Hi, I am interested in custom work / ordering the following item from the gallery: ${selectedItem.title} (${selectedItem.specs}). Please share more details.`;
                            const event = new Event('input', { bubbles: true });
                            scopeEl.dispatchEvent(event);
                          }
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="flex-grow flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer focus:outline-none"
                    >
                      Inquire Custom Order
                    </button>
                    
                    <a
                      href={`https://wa.me/+919997773393?text=Hi!+I'm+interested+in+your+premium+gallery+item:+${encodeURIComponent(selectedItem.title)}+(${encodeURIComponent(selectedItem.specs)}).`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer focus:outline-none"
                    >
                      WhatsApp Quote
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
