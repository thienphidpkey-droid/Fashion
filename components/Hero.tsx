import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/fashionhero/1920/1080" 
          alt="Spring 2025 Collection" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-stone-900/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h2 className="text-sm md:text-base font-medium uppercase tracking-[0.3em] mb-4 animate-fade-in-up">
          Bộ Sưu Tập Mùa Xuân 2025
        </h2>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight">
          Vẻ Đẹp Của <br /> <span className="italic">Sự Tinh Tế</span>
        </h1>
        <p className="text-stone-100 text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto">
          Khám phá những thiết kế vượt thời gian, nơi sự tối giản gặp gỡ chất liệu thượng hạng.
        </p>
        <button className="group bg-white text-lumiere-green px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-lumiere-green hover:text-white transition-all duration-300 flex items-center mx-auto gap-3">
          Khám Phá Ngay
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default Hero;