import React, { useRef } from 'react';
import { NEW_ARRIVALS } from '../constants';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const NewArrivals: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 300;
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="py-20 bg-lumiere-beige/30">
      <div className="container mx-auto px-6 mb-10 flex justify-between items-end">
        <div>
          <span className="text-lumiere-green uppercase tracking-[0.2em] text-xs font-bold">Mới Về Tuần Này</span>
          <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mt-2">New Arrivals</h2>
        </div>
        <div className="flex gap-4">
          <button onClick={() => scroll('left')} className="p-3 border border-stone-300 rounded-full hover:border-stone-800 hover:bg-stone-800 hover:text-white transition-all">
            <ArrowLeft size={20} />
          </button>
          <button onClick={() => scroll('right')} className="p-3 border border-stone-300 rounded-full hover:border-stone-800 hover:bg-stone-800 hover:text-white transition-all">
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-8 px-6 pb-12 no-scrollbar snap-x snap-mandatory"
        style={{ scrollPaddingLeft: '1.5rem', scrollPaddingRight: '1.5rem' }}
      >
        {NEW_ARRIVALS.map((product) => (
          <div key={product.id} className="min-w-[280px] md:min-w-[350px] snap-start group cursor-pointer">
             <div className="aspect-[3/4] overflow-hidden mb-4 relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                 <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
             </div>
             <div>
                <h3 className="font-serif text-lg text-stone-800">{product.name}</h3>
                <p className="text-stone-600 mt-1">{product.price}</p>
             </div>
          </div>
        ))}
        {/* Spacer for right padding */}
        <div className="min-w-[1px]"></div>
      </div>
    </section>
  );
};

export default NewArrivals;