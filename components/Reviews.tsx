import React from 'react';
import { CUSTOMER_REVIEWS } from '../constants';
import { Star, Quote } from 'lucide-react';

const Reviews: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-lumiere-green mb-4">Khách Hàng Nói Gì</h2>
          <div className="w-16 h-px bg-stone-300 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {CUSTOMER_REVIEWS.map((review) => (
            <div key={review.id} className="bg-lumiere-cream p-8 md:p-10 relative rounded-sm group hover:shadow-xl transition-shadow duration-300">
              <Quote className="absolute top-8 left-8 text-lumiere-green/20 w-12 h-12" />
              <div className="flex gap-1 text-yellow-500 mb-6 relative z-10">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-stone-700 font-light italic text-lg mb-8 relative z-10 leading-relaxed">
                "{review.content}"
              </p>
              <div className="flex flex-col">
                <span className="font-serif text-xl text-lumiere-green font-medium">{review.author}</span>
                <span className="text-xs uppercase tracking-wider text-stone-500 mt-1">{review.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;