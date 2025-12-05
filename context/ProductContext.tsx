import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';
import {
    WOMENS_JACKETS,
    WOMENS_TOPS,
    WOMENS_BOTTOMS,
    MENS_OUTFIT,
    GIRLS_OUTFIT,
    BOYS_OUTFIT
} from '../constants';

interface ProductContextType {
    products: { [key: string]: Product[] };
    updateProduct: (sectionId: string, updatedProduct: Product) => void;
    addProduct: (sectionId: string, newProduct: Product) => void;
    getAllProducts: () => Product[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Helper to shuffle array
const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<{ [key: string]: Product[] }>({});

    useEffect(() => {
        // Load from localStorage or initialize from constants
        const savedProducts = localStorage.getItem('lumiere_products');

        if (savedProducts) {
            setProducts(JSON.parse(savedProducts));
        } else {
            const initialProducts = {
                'womens-jackets': shuffleArray(WOMENS_JACKETS),
                'womens-tops': shuffleArray(WOMENS_TOPS),
                'womens-bottoms': shuffleArray(WOMENS_BOTTOMS),
                'mens-outfit': shuffleArray(MENS_OUTFIT),
                'girls-outfit': shuffleArray(GIRLS_OUTFIT),
                'boys-outfit': shuffleArray(BOYS_OUTFIT),
            };
            setProducts(initialProducts);
            localStorage.setItem('lumiere_products', JSON.stringify(initialProducts));
        }
    }, []);

    const updateProduct = (sectionId: string, updatedProduct: Product) => {
        setProducts(prev => {
            const sectionProducts = prev[sectionId] || [];
            const newSectionProducts = sectionProducts.map(p =>
                p.id === updatedProduct.id ? updatedProduct : p
            );

            const newProducts = {
                ...prev,
                [sectionId]: newSectionProducts
            };

            localStorage.setItem('lumiere_products', JSON.stringify(newProducts));
            return newProducts;
        });
    };

    const addProduct = (sectionId: string, newProduct: Product) => {
        setProducts(prev => {
            const sectionProducts = prev[sectionId] || [];
            const newProducts = {
                ...prev,
                [sectionId]: [newProduct, ...sectionProducts]
            };

            localStorage.setItem('lumiere_products', JSON.stringify(newProducts));
            return newProducts;
        });
    };

    const getAllProducts = () => {
        return Object.values(products).flat();
    };

    return (
        <ProductContext.Provider value={{ products, updateProduct, addProduct, getAllProducts }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};
