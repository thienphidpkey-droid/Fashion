import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import ProductModal from './ProductModal';
import { ArrowRight } from 'lucide-react';

interface ProductSectionProps {
    title: string;
    subtitle: string;
    products: Product[];
    sectionId: string;
    className?: string;
    viewAllLink?: string;
}

const ProductSection: React.FC<ProductSectionProps> = ({
    title,
    subtitle,
    products,
    sectionId,
    className,
    viewAllLink
}) => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());

    // Randomize card sizes with better distribution for "masonry" look
    const getRandomSize = (index: number): string => {
        // Pattern: Large, Small, Small, Medium, Small, Large, Medium, Small...
        // This ensures gaps are filled better than pure random
        const patterns = [
            'size-large', 'size-small', 'size-small', 'size-medium',
            'size-small', 'size-large', 'size-medium', 'size-small',
            'size-medium', 'size-small', 'size-small', 'size-medium'
        ];
        return patterns[index % patterns.length];
    };

    // Randomize animation
    const getRandomAnimation = (index: number): string => {
        const animations = ['animate-fade-in', 'animate-run-in', 'animate-scale-up'];
        return animations[index % animations.length];
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('data-id');
                        if (id) {
                            setVisibleItems((prev) => {
                                const newSet = new Set(prev);
                                newSet.add(id);
                                return newSet;
                            });
                            // Stop observing once visible
                            observer.unobserve(entry.target);
                        }
                    }
                });
            },
            {
                root: null,
                rootMargin: '50px', // Increased margin to trigger earlier
                threshold: 0.1,
            }
        );

        const items = sectionRef.current?.querySelectorAll('.product-card');
        items?.forEach((item) => observer.observe(item));

        // Safety fallback: Ensure all items are visible after 2 seconds
        const timeout = setTimeout(() => {
            if (products.length > 0) {
                setVisibleItems(prev => {
                    const newSet = new Set(prev);
                    products.forEach(p => newSet.add(p.id));
                    return newSet;
                });
            }
        }, 2000);

        return () => {
            items?.forEach((item) => observer.unobserve(item));
            clearTimeout(timeout);
        };
    }, [products]);

    return (
        <section ref={sectionRef} id={sectionId} className={`product-section ${className || ''}`}>
            <div className="section-header">
                <h2 className="section-title">{title}</h2>
                <p className="section-subtitle">{subtitle}</p>
            </div>

            <div className="masonry-container">
                <div className="masonry-grid w-full">
                    {products.map((product, index) => (
                        <div
                            key={product.id}
                            data-id={product.id}
                            className={`product-card ${getRandomSize(index)} ${visibleItems.has(product.id) ? getRandomAnimation(index) : ''} cursor-pointer hover:shadow-xl transition-all duration-300`}
                            style={{
                                // Add a small delay based on column index to create a wave effect if multiple items appear at once
                                animationDelay: visibleItems.has(product.id) ? `${(index % 4) * 0.1}s` : '0s'
                            }}
                            onClick={() => setSelectedProduct(product)}
                        >
                            {product.tag && (
                                <span className="product-card-tag">{product.tag}</span>
                            )}
                            <img
                                src={product.image}
                                alt={product.name}
                                className="product-card-image"
                            />
                            <div className="product-card-overlay">
                                <h3 className="product-card-title">{product.name}</h3>
                                <p className="product-card-price">{product.price}</p>
                                <p className="product-card-category">{product.category}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {viewAllLink && (
                <div className="flex justify-center mt-8">
                    <Link
                        to={viewAllLink}
                        className="group flex items-center gap-2 px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-all hover:px-10"
                    >
                        Xem tất cả
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            )}

            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </section>
    );
};

export default ProductSection;
