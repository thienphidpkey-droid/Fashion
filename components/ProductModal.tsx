import React from 'react';
import { X, ShoppingBag, Heart, Share2 } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
    product: Product;
    onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
    // Prevent click propagation from modal content to backdrop
    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-4xl flex flex-col md:flex-row max-h-[90vh] animate-scale-up"
                onClick={handleContentClick}
            >
                {/* Image Section */}
                <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-gray-100">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                    <button
                        onClick={onClose}
                        className="absolute top-4 left-4 md:hidden p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Details Section */}
                <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-sm text-gray-500 font-medium mb-1">{product.category}</p>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">{product.name}</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="hidden md:block p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X size={24} className="text-gray-500" />
                        </button>
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-2xl font-bold text-lumiere-dark">{product.price}</span>
                        {product.tag && (
                            <span className="px-3 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-full uppercase tracking-wider">
                                {product.tag}
                            </span>
                        )}
                    </div>

                    <div className="prose prose-sm text-gray-600 mb-8">
                        <p>
                            Sản phẩm được thiết kế tinh tế với chất liệu cao cấp, mang lại sự thoải mái và phong cách thời thượng.
                            Phù hợp cho cả đi làm, đi chơi hay các buổi tiệc sang trọng.
                        </p>
                        <ul className="list-disc pl-4 mt-2 space-y-1">
                            <li>Chất liệu thoáng mát, thấm hút mồ hôi</li>
                            <li>Đường may tỉ mỉ, chắc chắn</li>
                            <li>Thiết kế tôn dáng, dễ phối đồ</li>
                            <li>Bảo hành đường may 12 tháng</li>
                        </ul>
                    </div>

                    {/* Selectors */}
                    <div className="space-y-4 mb-8">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Màu sắc</label>
                            <div className="flex gap-2">
                                {['bg-black', 'bg-white border border-gray-300', 'bg-blue-500', 'bg-rose-500'].map((color, i) => (
                                    <button key={i} className={`w-8 h-8 rounded-full ${color} hover:scale-110 transition-transform focus:ring-2 ring-offset-2 ring-gray-400`} />
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Kích thước</label>
                            <div className="flex gap-2">
                                {['S', 'M', 'L', 'XL'].map((size) => (
                                    <button key={size} className="w-10 h-10 rounded-lg border border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all font-medium text-sm">
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-auto flex gap-3">
                        <button className="flex-1 bg-black text-white py-3 px-6 rounded-full font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                            <ShoppingBag size={20} />
                            Thêm vào giỏ
                        </button>
                        <button className="p-3 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors text-gray-600">
                            <Heart size={20} />
                        </button>
                        <button className="p-3 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors text-gray-600">
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
