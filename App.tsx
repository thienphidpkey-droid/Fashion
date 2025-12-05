import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import CategoryPage from './pages/CategoryPage';

const App: React.FC = () => {
  return (
    <ProductProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
        </Routes>
      </Router>
    </ProductProvider>
  );
};

export default App;