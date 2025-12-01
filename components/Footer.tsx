import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-lumiere-green-dark text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-serif text-2xl mb-6">LUMIÈRE</h3>
            <p className="text-stone-400 font-light text-sm leading-relaxed mb-6">
              Thương hiệu thời trang cao cấp mang đến vẻ đẹp tinh tế và bền vững. Chúng tôi tôn vinh sự đơn giản trong từng thiết kế.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-stone-400 hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-stone-400 hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-stone-400 hover:text-white transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="uppercase text-xs tracking-[0.15em] font-bold text-stone-300 mb-6">Mua Sắm</h4>
            <ul className="space-y-4 text-sm text-stone-400 font-light">
              <li><a href="#" className="hover:text-white transition-colors">Hàng Mới Về</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bán Chạy Nhất</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Áo Sơ Mi</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Váy Đầm</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Phụ Kiện</a></li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase text-xs tracking-[0.15em] font-bold text-stone-300 mb-6">Hỗ Trợ</h4>
            <ul className="space-y-4 text-sm text-stone-400 font-light">
              <li><a href="#" className="hover:text-white transition-colors">Liên Hệ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Chính Sách Đổi Trả</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hướng Dẫn Chọn Size</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Vận Chuyển</a></li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase text-xs tracking-[0.15em] font-bold text-stone-300 mb-6">Đăng Ký Nhận Tin</h4>
            <p className="text-stone-400 font-light text-sm mb-4">Nhận thông tin về bộ sưu tập mới và ưu đãi độc quyền.</p>
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Email của bạn" 
                className="bg-stone-800 border-none text-white px-4 py-3 text-sm focus:ring-1 focus:ring-stone-500 outline-none"
              />
              <button className="bg-stone-200 text-stone-900 uppercase text-xs font-bold py-3 tracking-wider hover:bg-white transition-colors">
                Đăng Ký
              </button>
            </form>
          </div>

        </div>

        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-stone-500 text-xs font-light">© 2025 Lumière Fashion. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-stone-500">
            <a href="#" className="hover:text-stone-300">Privacy Policy</a>
            <a href="#" className="hover:text-stone-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;