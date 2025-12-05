import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Search } from 'lucide-react';
import { NAV_LINKS } from '../constants';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if link is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-lumiere-cream/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
        }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-serif font-bold tracking-widest text-lumiere-green hover:text-lumiere-dark transition-colors">
          LUMIÈRE
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8">
          {NAV_LINKS.map((link) => (
            <div key={link.name} className="group relative py-4">
              <Link
                to={link.href}
                className={`uppercase text-xs tracking-widest font-medium transition-colors ${isActive(link.href) ? 'text-lumiere-green font-bold' : 'text-stone-600 hover:text-lumiere-green'
                  }`}
              >
                {link.name}
              </Link>

              {/* Dropdown Menu */}
              {link.submenu && (
                <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-md py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                  {link.submenu.map((subItem) => (
                    <Link
                      key={subItem.name}
                      to={subItem.href}
                      className="block px-4 py-2 text-sm text-stone-600 hover:text-lumiere-green hover:bg-stone-50 transition-colors"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Icons */}
        < div className="flex items-center space-x-6" >
          <button className="text-stone-600 hover:text-lumiere-green transition-colors">
            <Search size={20} strokeWidth={1.5} />
          </button>
          <button className="text-stone-600 hover:text-lumiere-green transition-colors relative">
            <ShoppingBag size={20} strokeWidth={1.5} />
            <span className="absolute -top-1 -right-1 bg-lumiere-green text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </button>
          <button
            className="md:hidden text-stone-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {
        mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-lumiere-cream border-t border-stone-200 py-4 px-6 shadow-lg max-h-[80vh] overflow-y-auto">
            {NAV_LINKS.map((link) => (
              <div key={link.name} className="mb-4 border-b border-stone-100 last:border-0 pb-2">
                <Link
                  to={link.href}
                  className="text-stone-800 uppercase text-sm tracking-widest py-2 block font-bold hover:text-lumiere-green transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
                {link.submenu && link.submenu.length > 0 && (
                  <div className="pl-4 mt-1 space-y-2 border-l-2 border-stone-200">
                    {link.submenu.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="block text-stone-600 text-sm py-1.5 hover:text-lumiere-green transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )
      }
    </header >
  );
};

export default Header;