import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, MessageSquare, Plus, Minus, Info, Search, Lock } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  basePrice: number;
  category: 'Knobs' | 'Handles' | 'Brackets';
  image: string;
  badge: string;
  tag: string;
  description: string;
  finishes: { name: string; hex: string; priceModifier: number }[];
  specs: string;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'STEEL KNOB',
    basePrice: 299,
    category: 'Knobs',
    image: '/images/product-knob.jpg',
    badge: 'Approved Quality',
    tag: 'Best Seller',
    description: 'Ergonomic circular furniture knob designed for modern cabinets, drawers, and wardrobe doors.',
    specs: 'Diameter: 30mm • Projection: 25mm • Tensile Strength: 515 MPa',
    finishes: [
      { name: 'Brushed Steel', hex: '#d1d5db', priceModifier: 0 },
      { name: 'Matte Black', hex: '#1f2937', priceModifier: 30 },
      { name: 'Satin Gold', hex: '#fbbf24', priceModifier: 50 }
    ]
  },
  {
    id: 2,
    name: 'BRASS HANDLED',
    basePrice: 799,
    category: 'Handles',
    image: '/images/product-handle.jpg',
    badge: 'Premium Brass C360',
    tag: 'Lux Collection',
    description: 'Luxury solid brass cabinet pull handle with fine tactile textures and polished edges.',
    specs: 'Length: 160mm • Center-to-Center: 128mm • Thread Size: M4',
    finishes: [
      { name: 'Polished Gold', hex: '#fbbf24', priceModifier: 0 },
      { name: 'Antique Brass', hex: '#b45309', priceModifier: 60 },
      { name: 'Satin Chrome', hex: '#9ca3af', priceModifier: 40 }
    ]
  },
  {
    id: 3,
    name: 'ANGLE BRACKET (A)',
    basePrice: 149,
    category: 'Brackets',
    image: '/images/product-bracket-a.jpg',
    badge: 'High Durability',
    tag: 'Heavy Duty',
    description: 'Precision bent L-shape structural bracket with multiple mounting slots for structural stability.',
    specs: 'Size: 75x75mm • Thickness: 3.0mm • Steel Grade: Q235',
    finishes: [
      { name: 'Industrial Gray', hex: '#6b7280', priceModifier: 0 },
      { name: 'Coated Black', hex: '#111827', priceModifier: 15 }
    ]
  },
  {
    id: 4,
    name: 'ANGLE BRACKET (B)',
    basePrice: 189,
    category: 'Brackets',
    image: '/images/product-bracket-b.jpg',
    badge: 'Reinforced Steel',
    tag: 'Utility Pack',
    description: 'Heavy duty steel structural joist with cross-reinforcement ribs for heavy weight carrying capacities.',
    specs: 'Size: 100x100mm • Thickness: 4.0mm • Rib Height: 8mm',
    finishes: [
      { name: 'Reinforced Silver', hex: '#cbd5e1', priceModifier: 0 },
      { name: 'Coated Black', hex: '#111827', priceModifier: 20 }
    ]
  }
];

const CATEGORIES = ['ALL', 'KNOBS', 'HANDLES', 'BRACKETS'];
const SEARCH_SUGGESTIONS = ['knobs', 'handles', 'brackets', 'brass', 'steel', 'chrome', 'gold'];

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

const getSpellCorrectedQuery = (query: string): string | null => {
  const cleaned = query.trim().toLowerCase();
  if (!cleaned) return null;
  
  const directMatch = PRODUCTS.some(p => 
    p.name.toLowerCase().includes(cleaned) || 
    p.category.toLowerCase().includes(cleaned)
  );
  if (directMatch) return null;

  const candidates = [
    'knobs', 'handles', 'brackets', 'brass', 'steel', 'chrome', 'gold',
    ...PRODUCTS.map(p => p.name.toLowerCase()),
    ...PRODUCTS.map(p => p.category.toLowerCase())
  ];

  let bestMatch: string | null = null;
  let minDistance = 4; // allow up to 3 spelling mistakes

  for (const candidate of candidates) {
    const dist = getLevenshteinDistance(cleaned, candidate);
    if (dist < minDistance) {
      minDistance = dist;
      bestMatch = candidate;
    }
  }

  return bestMatch;
};

interface ProductCarouselProps {
  isPricingUnlocked: boolean;
  onUnlockPricing: () => void;
}

export function ProductCarousel({ isPricingUnlocked, onUnlockPricing }: ProductCarouselProps) {
  const [activeCat, setActiveCat] = useState('ALL');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [selectedFinish, setSelectedFinish] = useState(PRODUCTS[0].finishes[0]);
  const [quantity, setQuantity] = useState(25);
  const [searchVal, setSearchVal] = useState('');
  const [customSubmitted, setCustomSubmitted] = useState(false);

  const spellingCorrection = getSpellCorrectedQuery(searchVal);
  const activeSearchQuery = (searchVal && !PRODUCTS.some(p => p.name.toLowerCase().includes(searchVal.toLowerCase()) || p.category.toLowerCase().includes(searchVal.toLowerCase())))
    ? (spellingCorrection || searchVal)
    : searchVal;

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = activeCat === 'ALL' ? true : p.category.toUpperCase() === activeCat;
    const matchesSearch = activeSearchQuery 
      ? p.name.toLowerCase().includes(activeSearchQuery.toLowerCase()) || 
        p.category.toLowerCase().includes(activeSearchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  // Select first matching product when filter/search changes
  useEffect(() => {
    if (filteredProducts.length > 0) {
      const match = filteredProducts.find(p => p.id === selectedProduct.id) || filteredProducts[0];
      setSelectedProduct(match);
      setSelectedFinish(match.finishes[0]);
    }
  }, [activeCat, activeSearchQuery]);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setSelectedFinish(product.finishes[0]);

    // Smooth scroll to the item container on mobile to show the image first
    setTimeout(() => {
      const element = document.getElementById(`product-card-${product.id}`);
      if (element && window.innerWidth < 1024) { // 1024px is lg breakpoint
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  const calculatedUnitPrice = selectedProduct.basePrice + selectedFinish.priceModifier;
  const totalPrice = calculatedUnitPrice * quantity;

  // Reset custom form submission when search changes
  useEffect(() => {
    setCustomSubmitted(false);
  }, [searchVal]);

  const renderConfiguratorPanel = () => {
    return (
      <motion.div
        key={selectedProduct.id}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.3 }}
        className="neu-flat rounded-[40px] border border-white p-6 sm:p-8 flex flex-col gap-6 w-full"
      >
        {/* Upper split row: Large Image & Title details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          
          {/* Left: Product Image */}
          <div className="w-full aspect-square rounded-3xl bg-slate-200 border border-slate-350 shadow-[inset_4px_4px_8px_#c2c7ce,inset_-4px_-4px_8px_#ffffff] p-4 flex items-center justify-center relative group">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="max-w-[85%] max-h-[85%] object-contain drop-shadow-[4px_6px_10px_rgba(0,0,0,0.12)] group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute top-4 left-4 text-[9px] font-bold uppercase tracking-wider bg-slate-800/80 text-slate-100 px-3 py-1 rounded-full border border-slate-700/50 backdrop-blur-sm shadow-sm select-none">
              {selectedProduct.tag}
            </span>
          </div>

          {/* Right: Spec Title Box */}
          <div className="flex flex-col gap-4">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">
                {selectedProduct.category} DETAILS
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-800 uppercase tracking-wide leading-tight mt-1">
                {selectedProduct.name}
              </h3>
              <p className="text-xs text-slate-505 font-light leading-relaxed mt-2">
                {selectedProduct.description}
              </p>
            </div>

            <div className="bg-slate-200/50 rounded-2xl border border-white p-3.5">
              <h5 className="text-[10px] font-bold text-slate-700 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-slate-655" />
                Dimensions & Strength:
              </h5>
              <p className="text-[10px] text-slate-600 font-light leading-normal">
                {selectedProduct.specs}
              </p>
            </div>
          </div>

        </div>

        {/* Configurator Controls Area */}
        <div className="border-t border-slate-300/40 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Finish Color Selector */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
              Select Finish ({selectedFinish.name})
            </span>
            <div className="flex items-center gap-3 mt-1">
              {selectedProduct.finishes.map((f) => (
                <button
                  key={f.name}
                  onClick={() => setSelectedFinish(f)}
                  style={{ backgroundColor: f.hex }}
                  className={`w-9 h-9 rounded-full border-2 transition-all relative flex items-center justify-center cursor-pointer shadow-sm hover:scale-105 active:scale-95 focus:outline-none ${
                    selectedFinish.name === f.name 
                       ? 'border-slate-800 ring-2 ring-slate-350' 
                       : 'border-white hover:border-slate-400'
                  }`}
                  aria-label={`Select finish ${f.name}`}
                >
                  {selectedFinish.name === f.name && (
                    <Check className={`w-4 h-4 ${f.hex === '#1f2937' || f.hex === '#111827' ? 'text-white' : 'text-slate-800'}`} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Calculator */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
              Configure Quantity
            </span>
            <div className="flex items-center gap-2 mt-1">
              <button
                onClick={() => setQuantity(prev => Math.max(10, prev - 5))}
                className="w-10 h-10 rounded-full bg-slate-200 border border-white shadow-[2px_2px_4px_#c2c7ce,-2px_-2px_4px_#ffffff] flex items-center justify-center text-slate-655 hover:bg-slate-300 cursor-pointer active:scale-90 focus:outline-none"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-16 text-center text-sm font-extrabold text-slate-800 py-2 bg-slate-200 border border-slate-350 shadow-[inset_1.5px_1.5px_3px_#c2c7ce,inset_-1.5px_-1.5px_3px_#ffffff] rounded-xl select-none">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(prev => Math.min(1000, prev + 5))}
                className="w-10 h-10 rounded-full bg-slate-200 border border-white shadow-[2px_2px_4px_#c2c7ce,-2px_-2px_4px_#ffffff] flex items-center justify-center text-slate-655 hover:bg-slate-300 cursor-pointer active:scale-90 focus:outline-none"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Est Quote & Inquiry CTA Footer */}
        <div className="bg-slate-200/50 rounded-[28px] border border-white p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
          <div className="flex flex-col text-center sm:text-left">
            <span className="text-[9px] font-bold text-slate-555 uppercase tracking-widest leading-none">ESTIMATED BULK ESTIMATE</span>
            {isPricingUnlocked ? (
              <div className="flex items-baseline justify-center sm:justify-start gap-1.5 mt-2">
                <span className="text-2xl font-black text-slate-800">₹{totalPrice.toLocaleString('en-IN')}</span>
                <span className="text-[10px] text-slate-550 font-semibold">(₹{calculatedUnitPrice}/unit)</span>
              </div>
            ) : (
              <button
                onClick={onUnlockPricing}
                className="text-xs font-extrabold text-slate-800 underline hover:text-slate-950 mt-1 cursor-pointer focus:outline-none text-left"
              >
                Unlock Pricing Details
              </button>
            )}
          </div>

          <a
            href={isPricingUnlocked 
              ? `https://wa.me/+919997773393?text=Hi!+I'm+interested+in+configuring+a+bulk+order+of+${encodeURIComponent(selectedProduct.name)}+in+the+${encodeURIComponent(selectedFinish.name)}+finish.+Quantity:+${quantity}+units.+Estimated+Quote:+INR+${totalPrice.toLocaleString('en-IN')}.`
              : `https://wa.me/+919997773393?text=Hi!+I'm+interested+in+configuring+a+bulk+order+of+${encodeURIComponent(selectedProduct.name)}+in+the+${encodeURIComponent(selectedFinish.name)}+finish.+Quantity:+${quantity}+units.`
            }
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer focus:outline-none select-none w-full sm:w-auto"
          >
            <MessageSquare className="w-4 h-4" />
            Inquire Bulk Quote
          </a>
        </div>

      </motion.div>
    );
  };

  return (
    <section id="products" className="py-24 bg-gray-fil-bg px-4 md:px-8 relative overflow-hidden">
      {/* Dynamic Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:40px_40px] z-0 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-12 flex flex-col items-center">
          <span className="text-xs font-bold text-slate-550 uppercase tracking-widest bg-slate-200 border border-white px-4 py-2 rounded-full shadow-sm mb-4">
            Interactive Configurator
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-800 tracking-tight uppercase font-display">
            Hardware Configurator
          </h2>
        </div>

        {/* Configurator Search Bar with Spelling Check */}
        <div className="max-w-md mx-auto mb-10 px-4 flex flex-col items-center relative z-20">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search configurator products..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="pl-11 pr-12 py-3 w-full bg-slate-200 border border-white rounded-full shadow-[inset_3px_3px_6px_#c2c7ce,inset_-3px_-3px_6px_#ffffff] text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-slate-350"
            />
            {searchVal && (
              <button 
                onClick={() => setSearchVal('')}
                className="absolute inset-y-0 right-4 flex items-center text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Autocomplete Quick Suggestions */}
          {searchVal && filteredProducts.length > 0 && (
            <div className="mt-3 text-[10px] text-slate-500 flex flex-wrap gap-1.5 items-center justify-center">
              <span className="font-semibold">Quick Suggestions:</span>
              {SEARCH_SUGGESTIONS.map(sug => (
                <button
                  key={sug}
                  onClick={() => setSearchVal(sug)}
                  className="bg-slate-250 px-2.5 py-1 rounded-full border border-white hover:bg-slate-300 transition-all text-[9px] font-bold uppercase tracking-wider text-slate-650 hover:text-slate-800 shadow-sm cursor-pointer"
                >
                  {sug}
                </button>
              ))}
            </div>
          )}

          {/* Spell check / Typo correction note */}
          {spellingCorrection && spellingCorrection.toLowerCase() !== searchVal.toLowerCase() && (
            <div className="text-xs text-slate-500 mt-2 text-center italic bg-slate-200 border border-white px-3 py-1.5 rounded-full shadow-sm">
              Showing results for:{' '}
              <button
                onClick={() => setSearchVal(spellingCorrection)}
                className="underline text-slate-800 font-extrabold cursor-pointer hover:text-slate-950 focus:outline-none bg-transparent border-none p-0 inline capitalize"
              >
                {spellingCorrection}
              </button>
            </div>
          )}
        </div>

        {/* Categories Navigation Filter Bar */}
        <div className="w-full flex justify-center mb-12 overflow-x-auto py-2 mask-edges scrollbar-none">
          <div className="flex gap-2 sm:gap-4 px-4 items-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`text-xs sm:text-sm font-extrabold uppercase tracking-widest cursor-pointer py-2.5 px-6 rounded-full transition-all focus:outline-none ${
                  activeCat === cat
                    ? 'text-slate-800 bg-slate-350 shadow-[inset_2px_2px_5px_#c2c7ce,inset_-2px_-2px_5px_#ffffff]'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Split Configurator Interface */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Interactive Products List Grid (lg:col-span-5) */}
            <div className="lg:col-span-5 flex flex-col gap-4 max-h-[620px] overflow-y-auto pr-2 custom-scrollbar w-full">
              {filteredProducts.map((p) => (
                <div key={p.id} id={`product-card-${p.id}`} className="flex flex-col gap-3 w-full">
                  <div
                    onClick={() => handleProductSelect(p)}
                    className={`neu-flat p-4 rounded-3xl border flex items-center gap-4 cursor-pointer transition-all duration-300 select-none ${
                      selectedProduct.id === p.id
                        ? 'border-slate-400 bg-slate-200/50 shadow-[inset_3px_3px_6px_#c2c7ce,inset_-3px_-3px_6px_#ffffff]'
                        : 'border-white hover:border-slate-300'
                    }`}
                  >
                    {/* Small Image Circle */}
                    <div className="w-20 h-20 rounded-2xl bg-slate-200 flex items-center justify-center p-2 border border-white shadow-[inset_2px_2px_4px_#c2c7ce,inset_-2px_-2px_4px_#ffffff] shrink-0">
                      <img src={p.image} alt={p.name} className="max-w-[90%] max-h-[90%] object-contain" />
                    </div>
                    
                    {/* Details summary */}
                    <div className="flex flex-col flex-grow truncate">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">
                        {p.category}
                      </span>
                      <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider truncate">
                        {p.name}
                      </h4>
                      <span className="text-xs font-semibold text-slate-655 mt-1 flex items-center gap-1">
                        {isPricingUnlocked ? (
                          `Starting ₹${p.basePrice}`
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onUnlockPricing();
                            }}
                            className="text-[10px] text-slate-500 underline flex items-center gap-1 hover:text-slate-800 cursor-pointer"
                          >
                            <Lock className="w-3 h-3 text-slate-550" /> Unlock Price
                          </button>
                        )}
                      </span>
                    </div>
                    
                    {/* Selected indicator */}
                    {selectedProduct.id === p.id && (
                      <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center shadow-sm shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>

                  {/* Inline Detail Card below item on mobile */}
                  {selectedProduct.id === p.id && (
                    <div className="block lg:hidden w-full">
                      {renderConfiguratorPanel()}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Column: Dynamic Inspector & Configurator Panel (lg:col-span-7) */}
            <div className="hidden lg:block lg:col-span-7 w-full">
              <AnimatePresence mode="wait">
                {renderConfiguratorPanel()}
              </AnimatePresence>
            </div>

          </div>
        ) : (
          <div className="text-center text-slate-550 py-12 flex flex-col items-center gap-4 w-full">
            <p className="text-sm font-semibold">No products match your search query.</p>
            
            {/* Custom Sourcing Lead Form */}
            <div className="w-full max-w-lg mx-auto bg-slate-100 rounded-[32px] border border-white p-6 sm:p-8 shadow-md flex flex-col gap-5 text-center mt-6">
              <div>
                <span className="text-[10px] font-bold text-slate-550 uppercase tracking-widest bg-slate-200 border border-white px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5 w-fit mx-auto">
                  Custom Hardware Configuration
                </span>
                <h3 className="text-lg sm:text-xl font-black text-slate-800 uppercase mt-4">
                  Request Custom Manufacturing
                </h3>
                <p className="text-xs text-slate-500 font-light mt-1.5 leading-relaxed">
                  We custom-manufacture bespoke hardware configurations in our Aligarh facility. Let us know what you need and our team will get in touch!
                </p>
              </div>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setCustomSubmitted(true);
                }}
                className="flex flex-col gap-3.5 text-left w-full"
              >
                {customSubmitted ? (
                  <div className="bg-emerald-50 border border-emerald-250 p-4 rounded-2xl text-center">
                    <p className="text-xs text-emerald-800 font-extrabold">
                      ✓ Custom hardware request received! Our engineering team will reach out via WhatsApp/Email within 24 hours.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <input 
                        required 
                        type="text" 
                        placeholder="Your Name"
                        className="bg-slate-200/80 border border-white/50 rounded-2xl px-4 py-3 shadow-[inset_2px_2px_4px_#c2c7ce,inset_-2px_-2px_4px_#ffffff] text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-slate-350"
                      />
                      <input 
                        required 
                        type="tel" 
                        placeholder="Phone / WhatsApp"
                        className="bg-slate-200/80 border border-white/50 rounded-2xl px-4 py-3 shadow-[inset_2px_2px_4px_#c2c7ce,inset_-2px_-2px_4px_#ffffff] text-slate-800 placeholder-slate-405 text-xs focus:outline-none focus:ring-2 focus:ring-slate-350"
                      />
                    </div>
                    <textarea 
                      required 
                      placeholder="Describe the hardware item you are looking for..."
                      defaultValue={`I am looking for: ${searchVal}`}
                      className="bg-slate-200/80 border border-white/50 rounded-2xl px-4 py-3 shadow-[inset_2px_2px_4px_#c2c7ce,inset_-2px_-2px_4px_#ffffff] text-slate-800 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-slate-350 min-h-[90px]"
                    />
                    <button
                      type="submit"
                      className="bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer w-full text-center"
                    >
                      Submit Sourcing Request
                    </button>
                  </>
                )}
              </form>
            </div>

            <button 
              onClick={() => { setActiveCat('ALL'); setSearchVal(''); }}
              className="bg-slate-350 hover:bg-slate-400 text-slate-800 font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-xl shadow-sm transition-all cursor-pointer focus:outline-none mt-4"
            >
              Reset Search
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
