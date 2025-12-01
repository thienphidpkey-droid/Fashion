import React from 'react';

const CTA: React.FC = () => {
  return (
    <section className="relative py-32 flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/fashioncta/1920/800" 
          alt="CTA Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-stone-900/40"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
          Nâng Tầm Phong Cách Của Bạn
        </h2>
        <p className="text-stone-200 text-lg mb-10 font-light">
          Đăng ký thành viên ngay hôm nay để nhận ưu đãi 15% cho đơn hàng đầu tiên và cập nhật xu hướng mới nhất.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-white text-lumiere-green uppercase tracking-widest text-sm font-semibold hover:bg-lumiere-green hover:text-white transition-colors duration-300">
            Mua Sắm Ngay
          </button>
          <button className="px-8 py-4 border border-white text-white uppercase tracking-widest text-sm font-semibold hover:bg-white hover:text-stone-900 transition-colors duration-300">
            Đặt Lịch Hẹn Tư Vấn
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;