import { motion } from 'motion/react';
import { Sparkles, Settings, Hammer, Layers } from 'lucide-react';

const SERVICES = [
  {
    index: '01',
    icon: Settings,
    title: 'Custom Engineering & Design',
    desc: 'We design and engineer bespoke hardware solutions tailored to your project requirements, offering custom dimensions, styles, and structural modifications for high-end residential and commercial developments.'
  },
  {
    index: '02',
    icon: Hammer,
    title: 'Precision Bulk Manufacturing',
    desc: 'Leveraging our state-of-the-art manufacturing facilities in Aligarh, we specialize in high-capacity, precision production of premium door pulls, cabinet handles, knobs, and structural brackets.'
  },
  {
    index: '03',
    icon: Layers,
    title: 'Finish & Material Development',
    desc: 'We provide specialized surface treatments and material advisory, offering architects and interior designers exclusive, long-lasting custom finishes (antique gold, matte black, satin chrome) to suit distinct décors.'
  }
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-zinc-900 text-white px-4 md:px-8 relative overflow-hidden">
      {/* Dark grey premium grid and gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-850 opacity-95 z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] z-0" />

      {/* Decorative colored glow spheres */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-zinc-800/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-zinc-700/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* Top Badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 shadow-sm mb-4 select-none">
          <Sparkles className="w-3.5 h-3.5 text-zinc-300 animate-pulse" />
          <span className="text-[10px] font-bold text-zinc-200 tracking-wider uppercase">
            Manufacturing Capabilities
          </span>
        </div>

        {/* Section Title with gradient clip text */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-center tracking-tight leading-tight uppercase font-display bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent max-w-4xl mb-16 select-none">
          Premium Architectural Hardware Services by <br className="hidden sm:inline" />
          <span className="text-zinc-400 font-medium">FRINK INTERNATIONAL LTD</span>
        </h2>

        {/* 3 Columns Cards Layout in Frosted Glassmorphism Styling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-4">
          {SERVICES.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-zinc-850/40 backdrop-blur-md border border-white/10 rounded-[32px] p-8 flex flex-col gap-6 relative overflow-hidden group hover:border-white/20 transition-all duration-300 min-h-[350px] shadow-xl"
              >
                {/* Huge Watermark Index in Background */}
                <div className="text-7xl font-black text-white/[0.03] absolute top-6 right-8 select-none group-hover:text-white/[0.06] transition-colors font-display pointer-events-none">
                  {srv.index}
                </div>

                {/* Styled Icon Container */}
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-zinc-350 group-hover:text-white transition-colors shrink-0">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-black text-white uppercase tracking-wider group-hover:text-zinc-100 transition-colors mt-2">
                  {srv.title}
                </h3>

                {/* Description (Highly readable light-gray with adjusted size) */}
                <p className="text-sm text-zinc-300 font-light leading-relaxed">
                  {srv.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
