import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Settings, 
  Compass, 
  Info, 
  Wrench, 
  FileText, 
  MapPin, 
  PhoneCall, 
  BookOpen,
  X,
  FileCheck,
  CheckCircle
} from 'lucide-react';

interface CategoryItem {
  id: string;
  icon: any;
  title: string;
  desc: string;
  type: 'modal' | 'scroll';
  scrollTarget?: string;
  prefillMessage?: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'home_design',
    icon: Home,
    title: 'HOME DESIGN',
    desc: 'Bespoke residential hardware setups',
    type: 'modal'
  },
  {
    id: 'furniture_design',
    icon: Settings,
    title: 'FURNITURE DESIGN',
    desc: 'Premium hinges, slides, and cabinet pulls',
    type: 'modal'
  },
  {
    id: 'interior_design',
    icon: Compass,
    title: 'INTERIOR DESIGN',
    desc: 'Architectural handle & lock styling',
    type: 'modal'
  },
  {
    id: 'info_product',
    icon: Info,
    title: 'INFORMATION PRODUCT',
    desc: 'Material specs, finishes, and dimensions',
    type: 'modal'
  },
  {
    id: 'maintenance',
    icon: Wrench,
    title: 'MAINTENANCE',
    desc: 'Care instructions & warranty services',
    type: 'modal'
  },
  {
    id: 'administration',
    icon: FileText,
    title: 'ADMINISTRATION',
    desc: 'Quick bulk quotes and catalog requests',
    type: 'scroll',
    scrollTarget: 'contact',
    prefillMessage: "Hi, I'm interested in requesting the latest trade catalog and receiving a bulk quote estimate for a commercial project."
  },
  {
    id: 'location_store',
    icon: MapPin,
    title: 'LOCATION STORE',
    desc: 'Visit our flagship Aligarh showroom',
    type: 'scroll',
    scrollTarget: 'contact' // scrolls to maps section inside contact area
  },
  {
    id: 'customer_services',
    icon: PhoneCall,
    title: 'CUSTOMER SERVICES',
    desc: '24/7 support & engineering consulting',
    type: 'scroll',
    scrollTarget: 'contact',
    prefillMessage: "Hello, I require technical assistance / engineering support regarding the load capabilities and styling guidelines for your handles."
  },
  {
    id: 'hardware_blog',
    icon: BookOpen,
    title: 'HARDWARE BLOG',
    desc: 'Design trends, lock security & guides',
    type: 'modal'
  }
];

export function CategoryGrid() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleCardClick = (cat: CategoryItem) => {
    if (cat.type === 'scroll' && cat.scrollTarget) {
      if (cat.prefillMessage) {
        const scopeEl = document.getElementsByName('project_scope')[0] as HTMLTextAreaElement;
        if (scopeEl) {
          scopeEl.value = cat.prefillMessage;
          const event = new Event('input', { bubbles: true });
          scopeEl.dispatchEvent(event);
        }
      }
      const element = document.getElementById(cat.scrollTarget);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setActiveModal(cat.id);
    }
  };

  return (
    <section id="categories" className="py-24 bg-gray-fil-bg px-4 md:px-8 relative overflow-hidden">
      {/* Dynamic Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:40px_40px] z-0 pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Title */}
        <h2 className="text-3xl sm:text-5xl font-black text-slate-800 tracking-tight text-center uppercase font-display mb-16">
          CATEGORIES & INFORMATION
        </h2>

        {/* 3x3 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => handleCardClick(cat)}
                className="neu-flat p-6 rounded-3xl flex items-center gap-5 group cursor-pointer hover:shadow-[inset_4px_4px_8px_#c2c7ce,inset_-3px_-3px_6px_#ffffff] transition-all duration-300 active:scale-98 select-none"
              >
                {/* Neumorphic Inset Circle Container for the Icon */}
                <div className="w-16 h-16 rounded-2xl bg-slate-200 flex items-center justify-center border border-white shadow-[inset_4px_4px_8px_#c2c7ce,inset_-4px_-4px_8px_#ffffff] group-hover:scale-95 transition-transform duration-300 shrink-0">
                  <Icon className="w-6 h-6 text-slate-600" />
                </div>

                {/* Text Content */}
                <div className="flex flex-col">
                  <h3 className="text-sm font-black text-slate-800 tracking-wider uppercase group-hover:text-slate-900 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-normal font-light">
                    {cat.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Interactive Detail Modal Popups */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[99999] flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="w-full max-w-2xl bg-slate-100 rounded-[35px] border border-white p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.15)] cursor-default text-left relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Corner Accent Graphic */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-200/50 rounded-bl-[100px] z-0 pointer-events-none border-l border-b border-white" />

              {/* Close Button */}
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-200 hover:bg-slate-350 border border-white shadow-[2px_2px_4px_#c2c7ce,-2px_-2px_4px_#ffffff] flex items-center justify-center text-slate-650 cursor-pointer focus:outline-none transition-all duration-200 z-10 hover:rotate-90 active:scale-95"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative z-10 flex flex-col gap-6">
                {/* Modal Title Block */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-200 border border-white shadow-[inset_2px_2px_4px_#c2c7ce,inset_-2px_-2px_4px_#ffffff] flex items-center justify-center shrink-0">
                    {activeModal === 'home_design' && <Home className="w-5 h-5 text-slate-600" />}
                    {activeModal === 'furniture_design' && <Settings className="w-5 h-5 text-slate-600" />}
                    {activeModal === 'interior_design' && <Compass className="w-5 h-5 text-slate-600" />}
                    {activeModal === 'info_product' && <Info className="w-5 h-5 text-slate-600" />}
                    {activeModal === 'maintenance' && <Wrench className="w-5 h-5 text-slate-600" />}
                    {activeModal === 'hardware_blog' && <BookOpen className="w-5 h-5 text-slate-600" />}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">TECHNICAL BRIEF</span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-800 uppercase tracking-wide leading-tight">
                      {activeModal === 'home_design' && 'Home Hardware Design Specs'}
                      {activeModal === 'furniture_design' && 'Premium Furniture Fittings Guide'}
                      {activeModal === 'interior_design' && 'Interior Hardware Co-ordination'}
                      {activeModal === 'info_product' && 'Material Grades & Specifications'}
                      {activeModal === 'maintenance' && 'Care & Warranty Guidelines'}
                      {activeModal === 'hardware_blog' && 'Metalwork Design Blog'}
                    </h3>
                  </div>
                </div>

                <div className="text-sm text-slate-600 leading-relaxed font-light mt-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                  
                  {/* HOME DESIGN modal */}
                  {activeModal === 'home_design' && (
                    <div className="flex flex-col gap-4">
                      <p>
                        Elevating residential properties requires strategic choices in door pulls, cabinet handles, and hinges. Our premium home design catalog offers curated metal accessories that balance modern form with lifetime utility.
                      </p>
                      <div className="bg-slate-200/50 rounded-2xl border border-white p-4 mt-2">
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4 text-slate-600" />
                          Key Installation Guidelines:
                        </h4>
                        <ul className="list-disc pl-5 text-xs text-slate-600 flex flex-col gap-1.5 font-light">
                          <li><strong>Door Handle Height:</strong> Standard spindle centerline is placed 990mm - 1050mm from finished floor level.</li>
                          <li><strong>Drawer Center pulls:</strong> Best installed using double mounting points for drawers exceeding 500mm width to prevent mechanical torque.</li>
                          <li><strong>Spindle Thickness:</strong> Solid 8x8mm square spindles in high-wear lock assemblies.</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* FURNITURE DESIGN modal */}
                  {activeModal === 'furniture_design' && (
                    <div className="flex flex-col gap-4">
                      <p>
                        High-quality furniture design depends on hardware kinematics. Our slides and slide hinges are engineered with precision dampers to ensure uniform speed dampening and silent operation.
                      </p>
                      <div className="bg-slate-200/50 rounded-2xl border border-white p-4">
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                          <FileCheck className="w-4 h-4 text-slate-600" />
                          Load Ratings & Slide Specs:
                        </h4>
                        <table className="w-full text-xs font-light text-slate-600 mt-2 border-collapse">
                          <thead>
                            <tr className="border-b border-slate-300 font-bold text-slate-700">
                              <th className="text-left py-1.5 pb-2">Hardware Type</th>
                              <th className="text-left py-1.5 pb-2">Material</th>
                              <th className="text-left py-1.5 pb-2">Max Capacity</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-slate-350/40">
                              <td className="py-2">Soft-Close Slides</td>
                              <td>Cold Rolled Steel</td>
                              <td>45 kg / pair</td>
                            </tr>
                            <tr className="border-b border-slate-350/40">
                              <td className="py-2">Concealed Hinges</td>
                              <td>Zinc-plated Steel</td>
                              <td>25 kg / 3 hinges</td>
                            </tr>
                            <tr className="border-b border-slate-350/40">
                              <td className="py-2">Solid Cabinet Pulls</td>
                              <td>Extruded Brass</td>
                              <td>N/A (Tensile 380 MPa)</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* INTERIOR DESIGN modal */}
                  {activeModal === 'interior_design' && (
                    <div className="flex flex-col gap-4">
                      <p>
                        Color coordination in interior design sets the tone for luxury spaces. We offer curated color schemes tailored to coordinate with premium marble, wood, and concrete textures.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                        <div className="bg-slate-200/50 p-4 rounded-2xl border border-white">
                          <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-1">Modern Warm Palette</h5>
                          <p className="text-xs text-slate-500 font-light">Combine brushed satin brass knobs with dark oak, walnut veneer, and warm beige plaster finishes.</p>
                        </div>
                        <div className="bg-slate-200/50 p-4 rounded-2xl border border-white">
                          <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-1">Industrial Cool Palette</h5>
                          <p className="text-xs text-slate-500 font-light">Pair matte space grey locks or black pulls with light pine wood, polished cement, and marble.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* INFO PRODUCT modal */}
                  {activeModal === 'info_product' && (
                    <div className="flex flex-col gap-4">
                      <p>
                        Frink International uses industrial-grade raw metal formulations. Below is a specification comparison table of materials used across our architectural handles and lock configurations.
                      </p>
                      <div className="bg-slate-200/50 rounded-2xl border border-white p-4">
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-2">Material Grade Profiles</h4>
                        <table className="w-full text-xs font-light text-slate-600 border-collapse">
                          <thead>
                            <tr className="border-b border-slate-300 font-bold text-slate-700">
                              <th className="text-left py-1.5 pb-2">Metal Grade</th>
                              <th className="text-left py-1.5 pb-2">Properties</th>
                              <th className="text-left py-1.5 pb-2">Best Suited For</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-slate-350/40">
                              <td className="py-2 font-bold text-slate-700">Solid Brass C360</td>
                              <td>High corrosion resistance, lifetime wear-limit</td>
                              <td>Luxury projects, high humidity environments</td>
                            </tr>
                            <tr className="border-b border-slate-350/40">
                              <td className="py-2 font-bold text-slate-700">Stainless Steel 304</td>
                              <td>Extreme tensile strength, rustproof structure</td>
                              <td>Heavy commercial doors, external entry pulls</td>
                            </tr>
                            <tr className="border-b border-slate-350/40">
                              <td className="py-2 font-bold text-slate-700">Premium Zinc ZAMAK-5</td>
                              <td>Excellent design flexibility, perfect casting weight</td>
                              <td>Ornate interior knobs, detailed furniture trims</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* MAINTENANCE modal */}
                  {activeModal === 'maintenance' && (
                    <div className="flex flex-col gap-4">
                      <p>
                        To ensure your premium hardware maintains its original luster, strict maintenance steps must be followed. High-end finishes rely on lacquer coatings that can degrade under abrasive solvents.
                      </p>
                      <div className="bg-slate-200/50 rounded-2xl border border-white p-4 mt-2">
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4 text-slate-650" />
                          Maintenance Checklist:
                        </h4>
                        <ul className="list-disc pl-5 text-xs text-slate-600 flex flex-col gap-1.5 font-light">
                          <li><strong>Cleaning:</strong> Wipe regularly with a soft, clean microfiber cloth dampened with warm water. Avoid chemical solvents or aerosol sprays.</li>
                          <li><strong>Finishes to Avoid:</strong> NEVER use metal polishes (e.g. Brasso) on lacquered brass or electroplated items. It strips the protective clear coat.</li>
                          <li><strong>Lubrication:</strong> Spray cylinder lock mechanism with dry graphite lubricant every 12 months. Do not use WD-40 inside tumbler systems.</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* HARDWARE BLOG modal */}
                  {activeModal === 'hardware_blog' && (
                    <div className="flex flex-col gap-4">
                      <div className="border-b border-slate-300 pb-3">
                        <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Design Journal • Article 24</span>
                        <h4 className="text-base font-bold text-slate-850 uppercase tracking-wide mt-1">
                          Solid Brass vs. SS-304: Choosing the Right Finish for High-Humidity Areas
                        </h4>
                      </div>
                      <p className="font-light">
                        Hardware degradation is primarily accelerated by atmospheric oxygen and humidity. When choosing between Solid Brass and Grade-304 Stainless Steel for humid environments, it is crucial to analyze key mechanical differences:
                      </p>
                      <p className="font-light">
                        <strong>Solid Brass (Copper-Zinc Alloy):</strong> Naturally forms a thin oxide layer (patina) which protects the underlying core from structural rusting. When lacquered, it maintains a luxury metallic shine for decades. Ideal for premium coastal architectural projects.
                      </p>
                      <p className="font-light">
                        <strong>Stainless Steel 304 (Chromium-Nickel Alloy):</strong> Features a self-healing passive chromium oxide film. It is highly resistant to pitting corrosion, making it perfect for external industrial gates and heavy architectural door installations.
                      </p>
                    </div>
                  )}

                </div>

                {/* Modal Footer */}
                <div className="flex justify-end gap-3 mt-6 border-t border-slate-300/40 pt-4">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="bg-slate-200 hover:bg-slate-300 border border-white text-slate-800 text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-2xl shadow-sm transition-all active:scale-95 cursor-pointer focus:outline-none"
                  >
                    Close
                  </button>
                  {activeModal !== 'info_product' && activeModal !== 'maintenance' && (
                    <button
                      onClick={() => {
                        setActiveModal(null);
                        const element = document.getElementById('contact');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer focus:outline-none"
                    >
                      Inquire Custom Work
                    </button>
                  )}
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
