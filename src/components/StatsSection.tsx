import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Star, Users, Package } from 'lucide-react';

interface StatItem {
  icon: React.ComponentType<{ className?: string }>;
  endValue: number;
  suffix: string;
  label: string;
  desc: string;
}

const STATS: StatItem[] = [
  {
    icon: Package,
    endValue: 4,
    suffix: '+',
    label: 'Products Offered',
    desc: 'Premium hardware items'
  },
  {
    icon: ShieldCheck,
    endValue: 3,
    suffix: '+',
    label: 'Services Offered',
    desc: 'Bespoke trade solutions'
  },
  {
    icon: Star,
    endValue: 5,
    suffix: '.00 ★',
    label: 'Customer Rating',
    desc: '33 Customer Reviews'
  },
  {
    icon: Users,
    endValue: 900,
    suffix: '+',
    label: 'Happy Customers',
    desc: 'Building dream homes'
  }
];

function CountUp({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const currentRef = elementRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (!isStarted) return;

    let start = 0;
    const duration = 1.2; // 1.2 seconds duration
    const framesPerSecond = 60;
    const totalFrames = duration * framesPerSecond;
    const increment = end / totalFrames;
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      start += increment;
      if (frame >= totalFrames) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / framesPerSecond);

    return () => clearInterval(timer);
  }, [isStarted, end]);

  if (suffix === '.00 ★') {
    return (
      <span ref={elementRef} className="tabular-nums">
        {count === 5 ? '5.00 ★' : `${count}.00 ★`}
      </span>
    );
  }

  return (
    <span ref={elementRef} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="py-24 bg-gray-fil-bg px-4 md:px-8 relative overflow-hidden">
      {/* Dynamic Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:40px_40px] z-0 pointer-events-none" />
      {/* Decorative gradient radial light */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#f1f5f9,transparent_55%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-200 border border-white px-4 py-2 rounded-full shadow-sm mb-4 select-none">
            🌟 Trusted by our customers
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-800 tracking-tight uppercase font-display">
            Proven Success in Numbers
          </h2>
        </div>

        {/* Stats Grid - Premium Neumorphic Layout (Desktop only) */}
        <div className="hidden lg:grid grid-cols-4 gap-6 sm:gap-8">
          {STATS.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="neu-flat p-8 rounded-[36px] border border-white flex flex-col items-center text-center hover:shadow-[12px_12px_24px_#c2c7ce,-12px_-12px_24px_#ffffff] hover:scale-[1.01] transition-all duration-300 select-none"
              >
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-2xl bg-slate-200 flex items-center justify-center border border-white shadow-[inset_2.5px_2.5px_5px_#c2c7ce,inset_-2.5px_-2.5px_5px_#ffffff] mb-5">
                  <IconComponent className="w-6 h-6 text-slate-655" />
                </div>
                
                {/* Dynamic Value */}
                <h4 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight font-display leading-none">
                  <CountUp end={stat.endValue} suffix={stat.suffix} />
                </h4>
                
                {/* Label */}
                <p className="text-xs font-extrabold text-slate-800 tracking-wide uppercase mt-3">
                  {stat.label}
                </p>
                
                {/* Description */}
                <p className="text-[10px] text-slate-500 font-light mt-1 max-w-[150px]">
                  {stat.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Continuous Revolving Marquee Layout (Mobile/Tablet only) */}
        <div className="lg:hidden relative w-full overflow-hidden py-4 mask-edges select-none">
          <div className="flex gap-6 animate-marquee whitespace-nowrap min-w-max animate-[marquee_18s_linear_infinite]">
            {/* First loop of cards */}
            {STATS.map((stat, idx) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={`ticker-1-${idx}`}
                  className="neu-flat p-6 rounded-[28px] border border-white flex flex-col items-center text-center w-48 shrink-0 inline-flex"
                >
                  <div className="w-11 h-11 rounded-xl bg-slate-200 flex items-center justify-center border border-white shadow-[inset_2px_2px_4px_#c2c7ce,inset_-2px_-2px_4px_#ffffff] mb-4">
                    <IconComponent className="w-5 h-5 text-slate-655" />
                  </div>
                  <h4 className="text-xl font-black text-slate-800 tracking-tight font-display leading-none">
                    <CountUp end={stat.endValue} suffix={stat.suffix} />
                  </h4>
                  <p className="text-[10px] font-bold text-slate-800 tracking-wide uppercase mt-2.5 whitespace-normal">
                    {stat.label}
                  </p>
                  <p className="text-[9px] text-slate-500 font-light mt-1 whitespace-normal">
                    {stat.desc}
                  </p>
                </div>
              );
            })}
            {/* Second loop of cards for seamless continuous scrolling */}
            {STATS.map((stat, idx) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={`ticker-2-${idx}`}
                  className="neu-flat p-6 rounded-[28px] border border-white flex flex-col items-center text-center w-48 shrink-0 inline-flex"
                >
                  <div className="w-11 h-11 rounded-xl bg-slate-200 flex items-center justify-center border border-white shadow-[inset_2px_2px_4px_#c2c7ce,inset_-2px_-2px_4px_#ffffff] mb-4">
                    <IconComponent className="w-5 h-5 text-slate-655" />
                  </div>
                  <h4 className="text-xl font-black text-slate-800 tracking-tight font-display leading-none">
                    <CountUp end={stat.endValue} suffix={stat.suffix} />
                  </h4>
                  <p className="text-[10px] font-bold text-slate-800 tracking-wide uppercase mt-2.5 whitespace-normal">
                    {stat.label}
                  </p>
                  <p className="text-[9px] text-slate-500 font-light mt-1 whitespace-normal">
                    {stat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
