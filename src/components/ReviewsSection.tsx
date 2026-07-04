import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface ReviewItem {
  id: number;
  name: string;
  time: string;
  avatar: string;
  comment: string;
}

const REVIEWS: ReviewItem[] = [
  {
    id: 1,
    name: 'Sajld Khan',
    time: '6 months ago',
    avatar: '/images/reviews/1.jpg',
    comment: 'Amazing collection of hardware components'
  },
  {
    id: 2,
    name: 'Anas Khan',
    time: '6 months ago',
    avatar: '/images/reviews/2.jpg',
    comment: 'Beautiful product and minimum price'
  },
  {
    id: 3,
    name: 'Mohd Javier',
    time: '7 months ago',
    avatar: '/images/reviews/3.jpg',
    comment: 'Excellence products performance. Looking luxurious and stylish products.'
  },
  {
    id: 4,
    name: 'Abid Zafar ali',
    time: '7 months ago',
    avatar: '/images/reviews/4.jpg',
    comment: 'Brilliant collection'
  },
  {
    id: 5,
    name: 'Mohd Javed Ala',
    time: '7 months ago',
    avatar: '/images/reviews/5.jpg',
    comment: 'Well premium collection 👍 great 👍'
  }
];

const AVATAR_IMAGES = [
  '/images/reviews/1.jpg',
  '/images/reviews/2.jpg',
  '/images/reviews/3.jpg',
  '/images/reviews/4.jpg',
  '/images/reviews/5.jpg',
  '/images/reviews/6.jpg'
];

export function ReviewsSection() {
  const [startIndex, setStartIndex] = useState(0);

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  // Auto-play / auto-rotate reviews slowly (every 6 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const activeReviews = [
    REVIEWS[startIndex],
    REVIEWS[(startIndex + 1) % REVIEWS.length]
  ];

  return (
    <section className="py-24 bg-zinc-900 text-white px-4 md:px-8 border-t border-zinc-800 relative overflow-hidden">
      {/* Dynamic Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:30px_30px]" />
      
      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Summary Title */}
        <div className="lg:col-span-5 flex flex-col items-start gap-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight uppercase font-display">
            Why customers love <br />
            <span className="text-zinc-350">FRINK INTERNATIONAL LTD</span>
          </h2>
          
          <div className="flex flex-col gap-2">
            <p className="text-base sm:text-lg font-light text-zinc-300">
              <span className="text-amber-400 font-bold">33+</span> Users rated us <span className="text-amber-400 font-bold">5</span> out of 5.
            </p>
            
            {/* Overlapping Real Avatars */}
            <div className="flex items-center -space-x-3 mt-2 select-none">
              {AVATAR_IMAGES.map((src, i) => (
                <div 
                  key={i} 
                  className="w-9 h-9 rounded-full border-2 border-zinc-900 overflow-hidden shadow-md bg-zinc-850"
                >
                  <img src={src} alt="Reviewer profile photo" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Slider Cards */}
        <div className="lg:col-span-7 flex flex-col gap-6 relative">
          
          {/* Navigation Controls */}
          <div className="flex justify-end gap-3 z-20 mb-2">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-750 border border-zinc-750 flex items-center justify-center text-zinc-350 hover:text-white transition-all cursor-pointer focus:outline-none"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-750 border border-zinc-750 flex items-center justify-center text-zinc-350 hover:text-white transition-all cursor-pointer focus:outline-none"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="wait">
              {activeReviews.map((rev, cardIdx) => (
                <motion.div
                  key={rev.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`bg-zinc-850/80 backdrop-blur-md border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between min-h-[220px] shadow-lg relative group hover:border-zinc-700 transition-all duration-300 ${
                    cardIdx === 1 ? 'hidden md:flex' : 'flex'
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-750 bg-zinc-800">
                          <img src={rev.avatar} alt={rev.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-zinc-200">{rev.name}</span>
                          <span className="text-[10px] text-zinc-500 font-light">{rev.time}</span>
                        </div>
                      </div>
                    </div>

                    {/* Comment */}
                    <p className="text-xs text-zinc-355 leading-relaxed font-light mb-4">
                      &quot;{rev.comment}&quot;
                    </p>
                  </div>

                  {/* Rating Stars & Google Logo Footer */}
                  <div className="flex items-center justify-between border-t border-zinc-800/60 pt-4 mt-auto">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    {/* Google G logo */}
                    <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                    </svg>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Slider dots indicator */}
          <div className="flex justify-center gap-1.5 mt-4">
            {REVIEWS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setStartIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none ${
                  startIndex === idx ? 'w-5 bg-white' : 'w-1.5 bg-zinc-650'
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
