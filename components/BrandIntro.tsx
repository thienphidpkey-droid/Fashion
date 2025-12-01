import React from 'react';

const BrandIntro: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-lumiere-cream">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 md:order-1 relative">
             <div className="aspect-[4/5] bg-stone-200 overflow-hidden">
                <img 
                  src="https://picsum.photos/seed/brandstory/800/1000" 
                  alt="Thợ may lành nghề" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
             </div>
             {/* Decor element */}
             <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-lumiere-green/10 -z-10"></div>
          </div>

          <div className="order-1 md:order-2">
            <h3 className="text-lumiere-green uppercase tracking-widest text-sm font-medium mb-4">Câu Chuyện Thương Hiệu</h3>
            <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-8 leading-tight">
              Hơn cả thời trang, <br/> đó là phong cách sống.
            </h2>
            <p className="text-stone-600 font-light text-lg mb-6 leading-relaxed">
              Tại Lumière, chúng tôi tin rằng sự sang trọng thực sự nằm ở chất lượng và sự đơn giản. Mỗi đường kim mũi chỉ đều được chăm chút tỉ mỉ bởi những nghệ nhân hàng đầu, mang đến cho bạn không chỉ một bộ trang phục, mà là sự tự tin.
            </p>
            
            <div className="grid grid-cols-2 gap-8 mt-12 border-t border-stone-300 pt-8">
              <div>
                <span className="block font-serif text-4xl text-lumiere-green mb-2">15+</span>
                <span className="text-sm uppercase tracking-wider text-stone-500">Năm Kinh Nghiệm</span>
              </div>
              <div>
                <span className="block font-serif text-4xl text-lumiere-green mb-2">98%</span>
                <span className="text-sm uppercase tracking-wider text-stone-500">Khách Hàng Hài Lòng</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BrandIntro;