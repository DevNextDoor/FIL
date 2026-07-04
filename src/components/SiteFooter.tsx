

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-zinc-950 text-zinc-400 py-16 px-4 md:px-8 border-t border-zinc-900 relative overflow-hidden">
      {/* Decorative metal shine backdrop */}
      <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-900/60 opacity-50 z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Info Column */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="flex items-center gap-2 select-none">
            <div className="w-9 h-9 rounded-xl bg-zinc-900 flex items-center justify-center border border-zinc-800 shadow-sm overflow-hidden">
              <img 
                src="/images/logo.jpg" 
                alt="Frink Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-display font-extrabold text-[18px] tracking-tight text-white">
              FRINK INTERNATIONAL
            </span>
          </div>
          <p className="text-sm font-light leading-relaxed text-zinc-400 max-w-sm">
            Fast-growing and forward-thinking brand in the hardware and furniture fittings industry. Committed to world-class quality and modern design.
          </p>
        </div>

        {/* Links Column */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <h4 className="text-white text-xs font-bold uppercase tracking-widest">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            {['hero', 'products', 'categories', 'gallery', 'contact'].map((id) => (
              <li key={id}>
                <button
                  onClick={() => handleScrollTo(id)}
                  className="hover:text-white transition-colors cursor-pointer capitalize text-left"
                >
                  {id === 'hero' ? 'Home' : id === 'products' ? 'Product Showcase' : id}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Map Embed Column */}
        <div className="lg:col-span-5 flex flex-col gap-4 w-full">
          <h4 className="text-white text-xs font-bold uppercase tracking-widest">
            Find Us on Google Maps
          </h4>
          <div className="w-full h-44 rounded-2xl overflow-hidden border border-zinc-800 shadow-inner bg-zinc-950">
            <iframe
              title="FRINK INTERNATIONAL LTD on Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3525.688849646487!2d78.0664426!3d27.896245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3974a57da4a92deb%3A0x102bdf67db70b136!2sFRINK%20INTERNATIONAL%20LTD!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
              className="w-full h-full border-none opacity-85 hover:opacity-100 transition-opacity"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>

      </div>

      {/* Copyright row */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-zinc-900 relative z-10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <p className="text-zinc-550">
          Copyright © {currentYear} FRINK INTERNATIONAL LTD. All rights reserved. |{' '}
          <a
            href="https://frink-international-ltd.grexa.site/"
            target="_blank"
            rel="noreferrer"
            className="text-zinc-400 hover:text-white transition-colors underline decoration-zinc-700 underline-offset-4"
          >
            Live Site Reference
          </a>
        </p>
        <p className="text-zinc-500">
          Built with premium engineering details.
        </p>
      </div>
    </footer>
  );
}
