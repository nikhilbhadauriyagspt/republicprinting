import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  LayoutGrid,
  ArrowRight,
  Mail,
  Headphones,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { cartCount, wishlistCount, openCartDrawer } = useCart();
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          const printerParent = data.data.find(
            (cat) => cat.slug === 'printers' || cat.id === 46
          );
          if (printerParent && printerParent.children) {
            setCategories(printerParent.children);
          }
        }
      })
      .catch((err) => console.error(err));

    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    checkUser();
    window.addEventListener('storage', checkUser);

    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('storage', checkUser);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue.length > 1) {
        setIsLoading(true);
        fetch(`${API_BASE_URL}/products?search=${encodeURIComponent(searchValue)}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.status === 'success') {
              setSearchResults(data.data);
            } else {
              setSearchResults([]);
            }
            setIsLoading(false);
          })
          .catch((err) => {
            console.error(err);
            setSearchResults([]);
            setIsLoading(false);
          });
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' },
  ];

  const handleSearchTrigger = (term) => {
    const searchParam = term || searchValue;
    if (searchParam.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchParam.trim())}`);
      setIsSearchFocused(false);
      setSearchValue(searchParam);
    }
  };

  const getImagePath = (product) => {
    let imagePath = '/logo/fabicon.png';
    try {
      const images = JSON.parse(product.images);
      if (images && images.length > 0) {
        imagePath = `/${images[0].replace(/\\/g, '/')}`;
      }
    } catch (e) { }
    return imagePath;
  };

  return (
    <header className="w-full font-['Rubik'] relative z-[1000] bg-white ">
      {/* PART 1: TOP ROW - LOGO, CAT, SEARCH, CONTACT, AUTH */}
      <div className="max-w-[1800px] mx-auto px-4 md:px-6 py-4 flex items-center gap-4 md:gap-8 lg:gap-10">
        {/* LOGO */}
        <Link to="/" className="shrink-0">
          <img src="/logo/logo.png" alt="Logo" className="h-7 md:h-9 object-contain" />
        </Link>

        {/* CATEGORY BUTTON */}
        <div
          className="relative hidden xl:block shrink-0"
          onMouseEnter={() => setIsCategoryOpen(true)}
          onMouseLeave={() => setIsCategoryOpen(false)}
        >
          <button className="flex items-center gap-2.5 px-5 py-2.5 bg-background border border-border rounded-full text-foreground font-semibold text-[13px] uppercase tracking-wider transition-all hover:bg-primary/5">
            <LayoutGrid size={18} className="text-primary" />
            Categories
            <ChevronDown size={14} className={`transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isCategoryOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 w-[240px] bg-white border border-border z-[2200] py-1 shadow-2xl rounded-2xl overflow-hidden mt-2"
              >
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/shop?category=${cat.slug}`}
                    className="flex items-center justify-between px-6 py-3.5 text-[14px] font-semibold text-secondary hover:bg-primary/5 hover:text-primary transition-all border-b border-background last:border-0"
                  >
                    {cat.name}
                    <ArrowRight size={14} className="opacity-20" />
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* SEARCH BAR */}
        <div ref={searchRef} className="flex-1 max-w-[600px] relative hidden lg:block">
          <div className={`relative h-[46px] flex items-center border transition-all duration-300 rounded-full ${isSearchFocused ? 'border-primary ring-4 ring-primary/5' : 'border-border hover:border-secondary/30 bg-background'}`}>
            <input
              type="text"
              placeholder="Search for printers, ink & toner..."
              className="w-full h-full bg-transparent pl-6 pr-14 text-[13px] outline-none font-semibold text-foreground"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchTrigger()}
            />
            <button
              onClick={() => handleSearchTrigger()}
              className="absolute right-1.5 h-[36px] w-[36px] flex items-center justify-center bg-primary text-white hover:bg-primary-hover transition-colors rounded-full"
            >
              <Search size={18} />
            </button>
          </div>

          <AnimatePresence>
            {isSearchFocused && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-border z-[2200] overflow-hidden shadow-2xl rounded-2xl"
              >
                <div className="p-4">
                  {searchValue.length > 1 ? (
                    <div className="space-y-1 max-h-[350px] overflow-y-auto custom-scrollbar">
                      {searchResults.length > 0 ? (
                        searchResults.map((product) => (
                          <Link
                            key={product.id}
                            to={`/product/${product.slug}`}
                            onClick={() => setIsSearchFocused(false)}
                            className="flex items-center gap-4 p-3 hover:bg-background transition-all group/item border-b border-background last:border-0 rounded-xl"
                          >
                            <div className="w-12 h-12 bg-white border border-border flex items-center justify-center shrink-0 rounded-lg">
                              <img src={getImagePath(product)} alt="" className="w-full h-full object-contain p-1" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[13px] font-semibold text-foreground truncate group-hover/item:text-primary">{product.name}</p>
                              <p className="text-[13px] font-bold text-primary mt-0.5">${product.price}</p>
                            </div>
                          </Link>
                        ))
                      ) : !isLoading && <p className="text-[13px] text-secondary text-center py-8">No matches found for "{searchValue}"</p>}
                    </div>
                  ) : (
                    <div className="px-2 pb-2">
                      <p className="text-[11px] font-semibold text-secondary uppercase mb-4 tracking-widest">Trending Searches</p>
                      <div className="flex flex-wrap gap-2">
                        {['EcoTank', 'LaserJet', 'Brother', 'Toner'].map((tag) => (
                          <button
                            key={tag}
                            onClick={() => handleSearchTrigger(tag)}
                            className="px-5 py-2 border border-border text-[12px] font-semibold text-secondary hover:border-primary hover:text-primary transition-all rounded-full"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CONTACT SECTION */}
        <div className="hidden xl:flex items-center gap-4 shrink-0 border-l border-border pl-8">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Mail size={20} />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[10px] font-semibold text-secondary uppercase tracking-widest mb-1">Email Support</span>
            <a href="mailto:info@vitalprint.shop" className="text-[13px] font-semibold text-foreground hover:text-primary transition-colors">info@vitalprint.shop</a>
          </div>
        </div>

        {/* AUTH BUTTONS */}
        <div className="flex items-center gap-4 ml-auto shrink-0 border-l border-border pl-8">
          {user ? (
            <Link to="/profile" className="flex items-center gap-3 px-5 py-2 border border-border rounded-full hover:border-primary transition-all group">
              <div className="w-8 h-8 rounded-full bg-foreground text-white flex items-center justify-center text-[12px] font-semibold group-hover:bg-primary">
                {user.name.charAt(0)}
              </div>
              <div className="hidden 2xl:block text-left">
                <p className="text-[11px] text-secondary font-semibold uppercase leading-none mb-1">Authenticated</p>
                <p className="text-[13px] font-semibold text-foreground truncate max-w-[80px]">{user.name.split(' ')[0]}</p>
              </div>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="px-5 py-2.5 text-[13px] font-semibold text-foreground uppercase tracking-wider hover:text-primary transition-colors hidden sm:block">
                Sign In
              </Link>
              <Link to="/signup" className="px-6 py-2.5 bg-primary text-white text-[13px] font-semibold uppercase tracking-widest hover:bg-primary-hover transition-all shadow-lg shadow-primary/10 rounded-full">
                Sign Up
              </Link>
            </div>
          )}
          <button className="lg:hidden text-foreground ml-2" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* PART 2: BOTTOM ROW - NAVIGATION & ICONS */}
      <div className="bg-white border-t border-border hidden lg:block">
        <div className="max-w-[1800px] mx-auto px-6 h-[64px] flex items-center justify-between">
          <nav className="flex items-center gap-1 h-full">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-6 h-full flex items-center text-[13px] font-semibold uppercase tracking-[0.1em] transition-all relative ${isActive ? 'text-primary' : 'text-secondary hover:text-primary'
                    }`}
                >
                  {link.name}
                  {isActive && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-primary rounded-t-full" />}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-8 h-full">
            {/* WISHLIST SECTION */}
            <Link to="/wishlist" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all relative shrink-0">
                <Heart size={18} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-foreground text-white text-[8px] font-bold flex items-center justify-center rounded-full border border-white">
                    {wishlistCount}
                  </span>
                )}
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[9px] font-semibold text-secondary uppercase tracking-widest mb-0.5">Favorites</span>
                <span className="text-[13px] font-semibold text-foreground group-hover:text-primary transition-colors">Wishlist</span>
              </div>
            </Link>

            {/* CART SECTION */}
            <button onClick={openCartDrawer} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all relative shrink-0">
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-foreground text-white text-[8px] font-bold flex items-center justify-center rounded-full border border-white">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="flex flex-col text-left leading-tight">
                <span className="text-[9px] font-semibold text-secondary uppercase tracking-widest mb-0.5">Your Cart</span>
                <span className="text-[13px] font-semibold text-foreground group-hover:text-primary transition-colors">{cartCount > 0 ? `${cartCount} items` : "$0.00"}</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-[2000] backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[340px] bg-white z-[2100] flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-border flex items-center justify-between bg-background">
                <img src="/logo/logo.png" alt="Logo" className="h-8 object-contain" />
                <button onClick={() => setIsMobileMenuOpen(false)} className="w-10 h-10 flex items-center justify-center bg-white border border-border text-foreground hover:bg-primary hover:text-white transition-all">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-10">
                <div>
                  <p className="text-[11px] font-black text-secondary uppercase tracking-[0.3em] mb-6">Navigation</p>
                  <div className="space-y-1">
                    {navLinks.map(link => (
                      <Link key={link.name} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className="block py-3.5 text-[16px] font-bold text-foreground border-b border-background last:border-0">{link.name}</Link>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-black text-secondary uppercase tracking-[0.3em] mb-6">Hardware Categories</p>
                  <div className="grid grid-cols-1 gap-2">
                    {categories.map(cat => (
                      <Link key={cat.id} to={`/shop?category=${cat.slug}`} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between text-[14px] font-semibold text-secondary py-3 border-b border-background">
                        {cat.name}
                        <ArrowRight size={14} className="opacity-20" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-border bg-background">
                <Link to={user ? '/profile' : '/login'} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 w-full p-5 bg-white border border-border shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                    <User size={24} />
                  </div>
                  <div className="text-left">
                    <p className="text-[15px] font-bold text-foreground leading-none mb-1">{user ? user.name : 'Client Access'}</p>
                    <p className="text-[12px] text-secondary font-medium">{user ? 'Manage Profile' : 'Sign in to your account'}</p>
                  </div>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--color-border); border-radius: 10px; }
      `}</style>
    </header>
  );
}
