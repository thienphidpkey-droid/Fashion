import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ProductProvider } from './context/ProductContext';
import { Loader } from 'lucide-react';

// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-lumiere-cream">
    <div className="flex flex-col items-center gap-4">
      <Loader className="animate-spin text-lumiere-green" size={40} />
      <p className="text-stone-600 font-serif tracking-widest">LUMIÈRE</p>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ProductProvider>
        <Router>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
            </Routes>
          </Suspense>
        </Router>
      </ProductProvider>
    </HelmetProvider>
  );
};

export default App;