import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'motion/react';
import { ChevronRight, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'products', label: 'Showcase' },
  { id: 'categories', label: 'Categories' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [detached, setDetached] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setDetached(latest > 50);
  });

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 120);
  };

  return (
    <motion.nav
      style={{
        top: 0,
        left: '50%',
        x: '-50%',
        zIndex: 99999,
      }}
      animate={{
        y: detached ? 16 : 0,
        width: detached ? (isMobile ? '90%' : '80%') : '100%',
        borderRadius: detached ? '24px' : '0px',
        scale: detached ? 0.98 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 30,
      }}
      className={`fixed flex flex-col items-center px-4 py-3 sm:px-6 transition-all duration-300 ${
        detached
          ? 'bg-slate-100/80 backdrop-blur-xl border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.7)]'
          : 'bg-transparent border-b border-transparent shadow-none'
      }`}
    >
      <div className="flex items-center justify-between w-full max-w-7xl">
        {/* Brand Logo & Name */}
        <button
          onClick={() => {
            setMenuOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 group cursor-pointer focus:outline-none select-none text-left"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center border border-white/40 shadow-sm group-hover:scale-105 transition-transform duration-200 overflow-hidden">
            <img 
              src="/images/logo.jpg" 
              alt="Frink Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-[16px] leading-tight tracking-tight text-slate-800">
              FRINK
            </span>
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest leading-none">
              INTERNATIONAL
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1.5 neu-inset-sm p-1 rounded-full bg-slate-200/50">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-[13px] font-semibold text-slate-600 hover:text-slate-900 px-4 py-1.5 rounded-full hover:bg-white/60 cursor-pointer transition-all duration-200 focus:outline-none"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Action Button & Hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollToSection('contact')}
            className="hidden sm:flex items-center gap-1 bg-slate-800 text-slate-100 hover:bg-slate-900 hover:text-white px-5 py-2 rounded-full text-[13px] font-bold shadow-md cursor-pointer transition-all focus:outline-none whitespace-nowrap"
          >
            Get Quote
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-slate-200/70 border border-white/50 text-slate-700 hover:bg-slate-300/50 cursor-pointer transition-all duration-200 focus:outline-none"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="w-5 h-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-full overflow-hidden md:hidden mt-2 border-t border-slate-200/50"
          >
            <div className="flex flex-col gap-1 py-3 px-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-left text-[14px] font-semibold text-slate-700 hover:text-slate-900 px-4 py-3 rounded-xl hover:bg-slate-200/60 cursor-pointer transition-colors duration-200 focus:outline-none"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                className="flex items-center justify-center gap-1 mt-2 bg-slate-800 text-white py-3.5 rounded-xl text-[14px] font-semibold shadow-md cursor-pointer transition-colors focus:outline-none"
              >
                Get Quote
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
