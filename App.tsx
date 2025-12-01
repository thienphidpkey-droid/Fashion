import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import BrandIntro from './components/BrandIntro';
import FeaturedProducts from './components/FeaturedProducts';
import NewArrivals from './components/NewArrivals';
import Reviews from './components/Reviews';
import CTA from './components/CTA';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';

const App: React.FC = () => {
  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-lumiere-green selection:text-white">
      <Header />
      <main>
        <Hero />
        <BrandIntro />
        <FeaturedProducts />
        <NewArrivals />
        <Reviews />
        <CTA />
      </main>
      <Footer />
      <AIAssistant />
    </div>
  );
};

export default App;