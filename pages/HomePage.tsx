import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import ProductSection from '../components/ProductSection';
import Footer from '../components/Footer';
import AIAssistant from '../components/AIAssistant';
import FloatingMenu from '../components/FloatingMenu';
import { useProducts } from '../context/ProductContext';

const HomePage: React.FC = () => {
    const { products } = useProducts();

    // Helper to safely get products or empty array
    const getProducts = (key: string) => products[key] || [];

    return (
        <div className="min-h-screen relative overflow-x-hidden selection:bg-lumiere-green selection:text-white">
            <Helmet>
                <title>LUMIÈRE | Luxury Fashion & Lifestyle</title>
                <meta name="description" content="Discover the latest trends in luxury fashion at LUMIÈRE. Shop our exclusive collections of women's, men's, and kids' wear." />
                <meta name="keywords" content="fashion, luxury, clothing, style, trendy, women's fashion, men's fashion, kids fashion" />
                <meta property="og:title" content="LUMIÈRE | Luxury Fashion & Lifestyle" />
                <meta property="og:description" content="Discover the latest trends in luxury fashion at LUMIÈRE." />
                <meta property="og:type" content="website" />
            </Helmet>

            <Header />
            <FloatingMenu />
            <main className="pt-24">
                {/* Women's Jackets Section */}
                <ProductSection
                    sectionId="womens-jackets"
                    title="Áo Khoác Nữ"
                    subtitle="Bộ sưu tập áo khoác cao cấp cho phái đẹp"
                    products={getProducts('womens-jackets')}
                    className="bg-gradient-to-br from-rose-50 via-white to-orange-50"
                    viewAllLink="/category/womens-jackets"
                />

                {/* Women's Tops Section */}
                <ProductSection
                    sectionId="womens-tops"
                    title="Outfit Top Nữ"
                    subtitle="Những mẫu áo đỉnh cao thời trang"
                    products={getProducts('womens-tops')}
                    className="bg-gradient-to-bl from-orange-50 via-white to-rose-50"
                    viewAllLink="/category/womens-tops"
                />

                {/* Women's Bottoms Section */}
                <ProductSection
                    sectionId="womens-bottoms"
                    title="Outfit Bottom Nữ"
                    subtitle="Quần và váy thanh lịch, hiện đại"
                    products={getProducts('womens-bottoms')}
                    className="bg-gradient-to-br from-rose-50 via-white to-orange-50"
                    viewAllLink="/category/womens-bottoms"
                />

                {/* Men's Outfit Section */}
                <ProductSection
                    sectionId="mens-outfit"
                    title="Outfit Nam"
                    subtitle="Thời trang nam lịch lãm, phong cách"
                    products={getProducts('mens-outfit')}
                    className="bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50"
                    viewAllLink="/category/mens-outfit"
                />

                {/* Girls' Outfit Section */}
                <ProductSection
                    sectionId="girls-outfit"
                    title="Outfit Bé Gái"
                    subtitle="Trang phục dễ thương cho công chúa nhỏ"
                    products={getProducts('girls-outfit')}
                    className="bg-gradient-to-br from-pink-50 via-white to-purple-50"
                    viewAllLink="/category/girls-outfit"
                />

                {/* Boys' Outfit Section */}
                <ProductSection
                    sectionId="boys-outfit"
                    title="Outfit Bé Trai"
                    subtitle="Phong cách trẻ trung cho hoàng tử nhỏ"
                    products={getProducts('boys-outfit')}
                    className="bg-gradient-to-br from-blue-50 via-white to-sky-100"
                    viewAllLink="/category/boys-outfit"
                />
            </main>
            <Footer />
            <AIAssistant />
        </div>
    );
};

export default HomePage;
