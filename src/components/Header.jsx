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
  Mail,
  ArrowRight,
  Headphones,
  Home,
  Lightbulb,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { cartCount, wishlistCount, openCartDrawer } = useCart();
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSearchCatOpen, setIsSearchCatOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const searchCatRef = useRef(null);

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
      if (searchCatRef.current && !searchCatRef.current.contains(event.target)) {
        setIsSearchCatOpen(false);
        setIsCategoryOpen(false);
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
    { name: 'Home', path: '/', icon: Home },
    { name: 'Shop', path: '/shop' },
    { name: 'About Us', path: '/about' },
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
    <header className="w-full font-['Rubik'] relative z-[1000]">
      {/* TOP BLACK STRIP */}
      <div className="hidden xl:block bg-[#111111] text-white">
        <div className="max-w-[1800px] mx-auto px-6 2xl:px-10 h-[42px] flex items-center justify-between">
          <div className="flex items-center text-[14px]">
            <span className="text-white/90">Welcome to Printer online Store</span>




            <span className="mx-6 h-4 w-px bg-white/20" />

            <a
              href="mailto:info@dashprintershop.com"
              className="flex items-center gap-2 text-white hover:text-[#ff2d37] transition-colors"
            >
              <Mail size={14} className="text-[#ff2d37]" />
              <span className="text-white/90">info@dashprintershop.com</span>
            </a>
          </div>

          <div className="flex items-center gap-5 text-white/85 text-[13px]">
            <Link
              to="/orders"
              className="flex items-center gap-2 text-white hover:text-[#ff2d37] transition-colors"
            >
              <ShoppingCart size={14} className="text-[#ff2d37]" />
              <span className="font-medium">Track Your Order</span>
            </Link>

          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <div className="bg-[#f5f5f5] border-b border-[#e5e5e5]">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-10 py-7">
          <div className="flex items-center justify-between gap-6 xl:gap-10">
            {/* MOBILE MENU BUTTON */}
            <button
              className="xl:hidden w-11 h-11 rounded-md border border-[#dddddd] bg-white text-[#222] flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </button>

            {/* LOGO */}
            <Link to="/" className="shrink-0 flex items-center">
              <img
                src="/logo/logo.png"
                alt="Dash Printer shop"
                className="h-9 md:h-10 lg:h-11 object-contain"
              />
            </Link>

            {/* SEARCH */}
            <div
              ref={searchRef}
              className="hidden xl:flex flex-1 max-w-[700px] 2xl:max-w-[760px] relative"
            >
              <div className="w-full relative">
                <div className="relative h-[44px] rounded-full border border-[#d9d9d9] bg-white overflow-hidden">
                  <input
                    type="text"
                    placeholder="Search the store"
                    className="w-full h-full bg-transparent pl-7 pr-20 text-[15px] text-[#222] placeholder:text-[#9c9c9c] outline-none"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearchTrigger()}
                  />

                  <button
                    onClick={() => handleSearchTrigger()}
                    className="absolute right-[4px] top-1/2 -translate-y-1/2 w-[36px] h-[36px] rounded-full bg-[#111111] text-white flex items-center justify-center hover:bg-[#ff2d37] transition-colors"
                  >
                    <Search size={18} strokeWidth={2.5} />
                  </button>
                </div>

                <AnimatePresence>
                  {isSearchFocused && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-[calc(100%+10px)] left-0 w-full bg-white border border-[#ececec] rounded-2xl shadow-2xl overflow-hidden z-[2200]"
                    >
                      <div className="p-5">
                        {searchValue.length > 1 ? (
                          <>
                            <h4 className="text-[11px] font-black text-[#9b9b9b] uppercase tracking-[0.16em] mb-4">
                              Best Matches
                            </h4>

                            {isLoading ? (
                              <div className="space-y-3">
                                {[1, 2, 3].map((i) => (
                                  <div
                                    key={i}
                                    className="h-[62px] rounded-xl bg-[#f3f3f3] animate-pulse"
                                  />
                                ))}
                              </div>
                            ) : searchResults.length > 0 ? (
                              <div className="space-y-2 max-h-[360px] overflow-y-auto custom-scrollbar pr-1">
                                {searchResults.map((product) => (
                                  <Link
                                    key={product.id}
                                    to={`/product/${product.slug}`}
                                    onClick={() => setIsSearchFocused(false)}
                                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#fafafa] border border-transparent hover:border-[#ededed] transition-all"
                                  >
                                    <div className="w-14 h-14 rounded-lg border border-[#ededed] bg-white flex items-center justify-center overflow-hidden shrink-0">
                                      <img
                                        src={getImagePath(product)}
                                        alt={product.name}
                                        className="w-full h-full object-contain p-1.5"
                                        onError={(e) => {
                                          e.target.src = '/logo/fabicon.png';
                                        }}
                                      />
                                    </div>
                                    <div className="min-w-0">
                                      <p className="text-[14px] font-semibold text-[#222] truncate">
                                        {product.name}
                                      </p>
                                      <p className="text-[15px] font-bold text-[#ff2d37] mt-0.5">
                                        ${product.price}
                                      </p>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            ) : (
                              <p className="text-[14px] text-[#777] py-8 text-center">
                                No matches for "{searchValue}"
                              </p>
                            )}
                          </>
                        ) : (
                          <>
                            <h4 className="text-[11px] font-black text-[#9b9b9b] uppercase tracking-[0.16em] mb-4">
                              Popular Searches
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {[
                                'EcoTank',
                                'LaserJet Pro',
                                'Ink Cartridges',
                                'Scanners',
                                'Brother Printers',
                              ].map((tag) => (
                                <button
                                  key={tag}
                                  onClick={() => handleSearchTrigger(tag)}
                                  className="px-4 py-2 rounded-full border border-[#e2e2e2] text-[13px] font-semibold text-[#555] hover:border-[#ff2d37] hover:text-[#ff2d37] transition-all"
                                >
                                  {tag}
                                </button>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* EMAIL + ICONS */}
            <div className="hidden lg:flex items-center gap-8 xl:gap-10 shrink-0">
              <div className="hidden 2xl:flex items-center gap-4">
                <div className="w-11 h-11 rounded-full flex items-center justify-center text-[#111]">
                  <Mail size={38} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[13px] text-[#777] leading-none mb-1">Email Support:</p>
                  <p className="text-[16px] font-semibold tracking-wide text-[#111]">
                    info@dashprintershop.com
                  </p>
                </div>
              </div>

              <Link
                to={user ? '/profile' : '/login'}
                className="flex flex-col items-center justify-center text-[#222] hover:text-[#ff2d37] transition-colors"
              >
                <User size={24} strokeWidth={2} />
                <span className="mt-2 text-[14px]">My Account</span>
              </Link>

              <Link
                to="/wishlist"
                className="relative flex flex-col items-center justify-center text-[#222] hover:text-[#ff2d37] transition-colors"
              >
                <Heart size={24} strokeWidth={2} />
                <span className="mt-2 text-[14px]">Wishlist</span>
                <span className="absolute -top-2 right-0 min-w-[22px] h-[22px] px-1 rounded-full bg-[#ff2d37] text-white text-[11px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              </Link>

              <button
                onClick={openCartDrawer}
                className="relative flex flex-col items-center justify-center text-[#222] hover:text-[#ff2d37] transition-colors"
              >
                <ShoppingCart size={24} strokeWidth={2} />
                <span className="mt-2 text-[14px]">My Cart</span>
                <span className="absolute -top-2 right-0 min-w-[22px] h-[22px] px-1 rounded-full bg-[#ff2d37] text-white text-[11px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>

          {/* MOBILE SEARCH */}
          <div className="xl:hidden mt-5">
            <div className="h-[46px] rounded-full border border-[#dcdcdc] bg-white px-5 flex items-center">
              <Search size={18} className="text-[#888]" />
              <input
                type="text"
                placeholder="Search the store"
                className="w-full bg-transparent outline-none px-3 text-[14px] text-[#222] placeholder:text-[#999]"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchTrigger()}
              />
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM NAV */}
      <div className="hidden xl:block bg-white border-b border-[#e5e5e5]">
        <div className="max-w-[1800px] mx-auto px-6 2xl:px-10">
          <div className="flex items-stretch justify-between">
            <div className="flex items-stretch">
              {/* ALL CATEGORIES */}
              <div
                className="relative"
                ref={searchCatRef}
                onMouseEnter={() => {
                  if (location.pathname !== '/') setIsCategoryOpen(true);
                }}
                onMouseLeave={() => {
                  if (location.pathname !== '/') {
                    setIsCategoryOpen(false);
                    setIsSearchCatOpen(false);
                  }
                }}
              >
                <button
                  onClick={() => {
                    if (location.pathname !== '/') {
                      setIsSearchCatOpen((prev) => !prev);
                    }
                  }}
                  className="h-[46px] w-[244px] bg-[#ff2d37] text-white flex items-center justify-between px-4 font-semibold text-[16px] uppercase"
                >
                  <span className="flex items-center gap-3">
                    <LayoutGrid size={18} />
                    All Categories
                  </span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform ${location.pathname === '/' || isCategoryOpen || isSearchCatOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {location.pathname !== '/' && (isCategoryOpen || isSearchCatOpen) && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute top-full left-0 w-[244px] bg-white border border-[#ececec] z-[2200]"
                    >
                      <div className="max-h-[380px] overflow-y-auto custom-scrollbar py-2">
                        {categories.map((cat) => (
                          <Link
                            key={cat.id}
                            to={`/shop?category=${cat.slug}`}
                            onClick={() => {
                              setIsCategoryOpen(false);
                              setIsSearchCatOpen(false);
                            }}
                            className="flex items-center justify-between px-5 py-3 text-[14px] font-medium text-[#444] hover:bg-[#fafafa] hover:text-[#ff2d37] transition-all capitalize"
                          >
                            <span>{cat.name}</span>
                            <ArrowRight size={14} />
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* NAV LINKS */}
              <nav className="flex items-center pl-7">
                {navLinks.map((link, index) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.path;

                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`flex items-center gap-2 px-6 h-[46px] text-[14px] font-[500] uppercase transition-colors ${isActive ? 'text-[#111]' : 'text-[#111] hover:text-[#ff2d37]'
                        }`}
                    >
                      {index === 0 && Icon ? <Icon size={16} fill="currentColor" /> : null}
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* OFFER TEXT */}
            <div className="flex items-center gap-3 text-[#ff2d37] font-bold uppercase text-[14px] tracking-[0.02em]">
              <Lightbulb size={17} />
              <span>Fast & Reliable Nationwide Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MENU DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-[2000]"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[340px] bg-white z-[2100] flex flex-col"
            >
              <div className="p-5 border-b border-[#efefef] flex items-center justify-between">
                <img src="/logo/logo.png" alt="Logo" className="h-8 object-contain" />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-full border border-[#e0e0e0] flex items-center justify-center text-[#444]"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                <div className="mb-8">
                  <h3 className="text-[11px] font-black uppercase tracking-widest text-[#999] mb-4">
                    Navigation
                  </h3>
                  <div className="space-y-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-3.5 text-[15px] font-bold text-[#222] border-b border-[#f3f3f3] last:border-0"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[11px] font-black uppercase tracking-widest text-[#999] mb-4">
                    Categories
                  </h3>
                  <div className="space-y-1">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/shop?category=${cat.slug}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-3 text-[14px] font-semibold text-[#555] capitalize"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 border-t border-[#efefef] bg-[#fafafa]">
                <Link
                  to={user ? '/profile' : '/login'}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-[14px] font-bold text-[#222]"
                >
                  <div className="w-9 h-9 rounded-full bg-white border border-[#e0e0e0] flex items-center justify-center">
                    <User size={16} />
                  </div>
                  {user ? user.name.split(' ')[0] : 'Sign In / Register'}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #dddddd;
          border-radius: 999px;
        }
      `}</style>
    </header>
  );
}