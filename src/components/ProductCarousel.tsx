import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, MessageSquare, Plus, Minus, Info } from 'lucide-react';

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

interface ProductCarouselProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function ProductCarousel({ searchQuery, onSearchChange }: ProductCarouselProps) {
  const [activeCat, setActiveCat] = useState('ALL');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [selectedFinish, setSelectedFinish] = useState(PRODUCTS[0].finishes[0]);
  const [quantity, setQuantity] = useState(25);

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = activeCat === 'ALL' ? true : p.category.toUpperCase() === activeCat;
    const matchesSearch = searchQuery 
      ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
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
  }, [activeCat, searchQuery]);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setSelectedFinish(product.finishes[0]);
  };

  const calculatedUnitPrice = selectedProduct.basePrice + selectedFinish.priceModifier;
  const totalPrice = calculatedUnitPrice * quantity;

  return (
    <section id="products" className="py-24 bg-gray-fil-bg px-4 md:px-8 relative overflow-hidden">
      {/* Dynamic Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:40px_40px] z-0 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-12 flex flex-col items-center">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-200 border border-white px-4 py-2 rounded-full shadow-sm mb-4">
            Interactive Configurator
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-800 tracking-tight uppercase font-display">
            Hardware Configurator
          </h2>
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
            <div className="lg:col-span-5 flex flex-col gap-4 max-h-[620px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
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
                    <span className="text-xs font-semibold text-slate-600 mt-1">
                      Starting ₹{p.basePrice}
                    </span>
                  </div>
                  
                  {/* Selected indicator */}
                  {selectedProduct.id === p.id && (
                    <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center shadow-sm shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Column: Dynamic Inspector & Configurator Panel (lg:col-span-7) */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedProduct.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="neu-flat rounded-[40px] border border-white p-6 sm:p-8 flex flex-col gap-6"
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
                        <p className="text-xs text-slate-500 font-light leading-relaxed mt-2">
                          {selectedProduct.description}
                        </p>
                      </div>

                      <div className="bg-slate-200/50 rounded-2xl border border-white p-3.5">
                        <h5 className="text-[10px] font-bold text-slate-700 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                          <Info className="w-3.5 h-3.5 text-slate-650" />
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
                          className="w-10 h-10 rounded-full bg-slate-200 border border-white shadow-[2px_2px_4px_#c2c7ce,-2px_-2px_4px_#ffffff] flex items-center justify-center text-slate-650 hover:bg-slate-300 cursor-pointer active:scale-90 focus:outline-none"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-16 text-center text-sm font-extrabold text-slate-800 py-2 bg-slate-200 border border-slate-350 shadow-[inset_1.5px_1.5px_3px_#c2c7ce,inset_-1.5px_-1.5px_3px_#ffffff] rounded-xl select-none">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(prev => Math.min(1000, prev + 5))}
                          className="w-10 h-10 rounded-full bg-slate-200 border border-white shadow-[2px_2px_4px_#c2c7ce,-2px_-2px_4px_#ffffff] flex items-center justify-center text-slate-650 hover:bg-slate-300 cursor-pointer active:scale-90 focus:outline-none"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Est Quote & Inquiry CTA Footer */}
                  <div className="bg-slate-200/50 rounded-[28px] border border-white p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
                    <div className="flex flex-col text-center sm:text-left">
                      <span className="text-[9px] font-bold text-slate-550 uppercase tracking-widest leading-none">ESTIMATED BULK ESTIMATE</span>
                      <div className="flex items-baseline justify-center sm:justify-start gap-1.5 mt-2">
                        <span className="text-2xl font-black text-slate-850">₹{totalPrice.toLocaleString('en-IN')}</span>
                        <span className="text-[10px] text-slate-500 font-semibold">(₹{calculatedUnitPrice}/unit)</span>
                      </div>
                    </div>

                    <a
                      href={`https://wa.me/+919997773393?text=Hi!+I'm+interested+in+configuring+a+bulk+order+of+${encodeURIComponent(selectedProduct.name)}+in+the+${encodeURIComponent(selectedFinish.name)}+finish.+Quantity:+${quantity}+units.+Estimated+Quote:+INR+${totalPrice.toLocaleString('en-IN')}.`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 bg-slate-850 hover:bg-slate-950 text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer focus:outline-none select-none w-full sm:w-auto"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Inquire Bulk Quote
                    </a>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        ) : (
          <div className="text-center text-slate-550 py-12 flex flex-col items-center gap-4">
            <p className="text-sm font-semibold">No products match the selected criteria.</p>
            <button 
              onClick={() => { setActiveCat('ALL'); onSearchChange(''); }}
              className="bg-slate-350 hover:bg-slate-400 text-slate-800 font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-xl shadow-sm transition-all cursor-pointer focus:outline-none"
            >
              Reset Search
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
