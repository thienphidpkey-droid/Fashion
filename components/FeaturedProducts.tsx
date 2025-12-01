import React from 'react';
import { FEATURED_PRODUCTS } from '../constants';
import { Heart } from 'lucide-react';

const FeaturedProducts: React.FC = () => {
  return (
    <section id="products" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-stone-500 uppercase tracking-[0.2em] text-xs font-semibold">Tuyển Chọn</span>
          <h2 className="font-serif text-3xl md:text-4xl text-lumiere-green mt-3">Sản Phẩm Nổi Bật</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {FEATURED_PRODUCTS.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 mb-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {product.tag && (
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-xs uppercase tracking-wider py-1 px-3">
                    {product.tag}
                  </span>
                )}
                <button className="absolute bottom-4 right-4 p-3 bg-white/90 hover:bg-lumiere-green hover:text-white rounded-full transition-colors opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300">
                  <Heart size={18} />
                </button>
              </div>
              
              <div className="text-center">
                <p className="text-xs text-stone-500 uppercase tracking-wider mb-1">{product.category}</p>
                <h3 className="font-serif text-xl text-stone-800 group-hover:text-lumiere-green transition-colors">{product.name}</h3>
                <p className="mt-2 text-stone-900 font-medium">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <button className="border-b border-stone-800 pb-1 text-sm uppercase tracking-widest hover:text-lumiere-green hover:border-lumiere-green transition-all">
            Xem Tất Cả Sản Phẩm
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;