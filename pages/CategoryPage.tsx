import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductModal from '../components/ProductModal';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Product } from '../types';
import { ArrowLeft } from 'lucide-react';

const CategoryPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { products } = useProducts();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const categoryProducts = slug ? products[slug] : [];

    const sectionTitles: { [key: string]: string } = {
        'womens-jackets': 'Áo Khoác Nữ',
        'womens-tops': 'Outfit Top Nữ',
        'womens-bottoms': 'Outfit Bottom Nữ',
        'mens-outfit': 'Outfit Nam',
        'girls-outfit': 'Outfit Bé Gái',
        'boys-outfit': 'Outfit Bé Trai',
    };

    const title = slug ? sectionTitles[slug] : 'Danh Mục';

    if (!categoryProducts || categoryProducts.length === 0) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy sản phẩm</h2>
                        <Link to="/" className="text-indigo-600 hover:text-indigo-800 flex items-center justify-center gap-2">
                            <ArrowLeft size={20} /> Quay lại trang chủ
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <Link to="/" className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                            <ArrowLeft size={24} />
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
                        <span className="text-gray-500 text-lg">({categoryProducts.length} sản phẩm)</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categoryProducts.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
                                onClick={() => setSelectedProduct(product)}
                            >
                                <div className="relative aspect-[3/4] overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {product.tag && (
                                        <span className="absolute top-2 left-2 bg-black text-white text-xs font-bold px-2 py-1 rounded">
                                            {product.tag}
                                        </span>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-medium text-gray-900 mb-1 truncate">{product.name}</h3>
                                    <p className="text-gray-500 text-sm mb-2">{product.category}</p>
                                    <p className="text-lg font-bold text-gray-900">{product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />

            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </div>
    );
};

export default CategoryPage;
