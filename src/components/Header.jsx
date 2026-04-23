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
  MapPin,
  LogOut,
  Package,
  Headphones,
  Truck,
  Globe,
  Zap,
  Printer,
  ChevronRight,
  Settings,
  Droplets,
  TrendingUp,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { cartCount, wishlistCount, openCartDrawer, openSearch } = useCart();
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const accountRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          const printerParent = data.data.find(cat => cat.slug === 'printers' || cat.id === 46);
          if (printerParent && printerParent.children) setCategories(printerParent.children);
        }
      })
      .catch(err => console.error(err));

    const checkUser = () => setUser(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
    checkUser();
    window.addEventListener('storage', checkUser);

    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setIsSearchFocused(false);
      if (accountRef.current && !accountRef.current.contains(e.target)) setIsAccountOpen(false);
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
          .then(res => res.json())
          .then(data => {
            setSearchResults(data.status === 'success' ? data.data : []);
            setIsLoading(false);
          })
          .catch(() => { setSearchResults([]); setIsLoading(false); });
      } else setSearchResults([]);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchValue]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About us', path: '/about' },
    { name: 'Help center', path: '/faq' },
    { name: 'Contact', path: '/contact' },
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
    try {
      const images = JSON.parse(product.images);
      return images?.length > 0 ? `/${images[0].replace(/\\/g, '/')}` : '/logo/fabicon.png';
    } catch { return '/logo/fabicon.png'; }
  };

  return (
    <>


      {/* Main Unique Floating-Style Header */}
      <header className={`w-full z-[1000] bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all duration-300 ${isSticky ? 'fixed top-0 shadow-sm py-3' : 'relative py-5'}`}>
        <div className="w-full px-6 md:px-12 flex items-center justify-between max-w-[1800px] mx-auto">

          {/* 1. Left: Logo & Integrated Navigation */}
          <div className="flex items-center gap-10 xl:gap-14">
            <Link to="/" className="">
              <img src="/logo/fabicon.png" alt="Logo" className={`${isSticky ? 'h-[50px]' : 'h-9 md:h-[60px]'} object-contain transition-all`} />
            </Link>

            <nav className="hidden lg:flex items-center gap-1 text-[13px] font-medium">

              {/* Sleek Category Dropdown integrated into nav */}
              <div className="relative mr-4" onMouseEnter={() => setIsCategoryOpen(true)} onMouseLeave={() => setIsCategoryOpen(false)}>
                <button className="flex items-center gap-2 py-2 px-3 text-[#0096d6] bg-[#0096d6]/20/80 rounded-full hover:bg-emerald-100 transition-colors">
                  <LayoutGrid size={15} />
                  Browse categories
                  <ChevronDown size={14} className={`transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isCategoryOpen && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full left-0 w-[450px] bg-white shadow-xl border border-gray-100 rounded-2xl overflow-hidden z-[1100] mt-3">
                      <div className="p-6 grid grid-cols-2 gap-x-6 gap-y-2">
                        <div className="col-span-2 mb-2 pb-2 border-b border-gray-50">
                          <p className="text-[11px] text-gray-400 font-semibold tracking-wide">Our departments</p>
                        </div>
                        {categories.map(cat => (
                          <Link key={cat.id} to={`/shop?category=${cat.slug}`} className="flex items-center justify-between py-2 px-3 rounded-lg text-[13px] text-gray-600 hover:text-[#0096d6] hover:bg-[#0096d6]/20 transition-all group">
                            {cat.name}
                            <ChevronRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#0096d6]" />
                          </Link>
                        ))}
                      </div>
                      <div className="bg-gray-50 p-4 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-[12px] text-gray-500">Need expert printing advice?</span>
                        <Link to="/contact" className="text-[12px] font-semibold text-[#0096d6] hover:underline">Contact us</Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2 rounded-full transition-all ${location.pathname === link.path ? 'text-[#0096d6] font-semibold bg-[#0096d6]/20/50' : 'text-gray-600 hover:text-[#0096d6] hover:bg-gray-50'}`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* 2. Right: Robust Search & Icons */}
          <div className="flex items-center gap-3 md:gap-4">



            {/* Integrated Search Bar with Button */}
            <div onClick={openSearch} className="relative hidden lg:block">
              <div className={`flex items-center h-[46px] w-[320px] xl:w-[450px] bg-white rounded-xl border-2 ${isSearchFocused ? 'border-[#0096d6]/200 shadow-[0_0_0_4px_rgba(16,185,129,0.1)]' : 'border-gray-100 bg-gray-50/50'} transition-all duration-200 overflow-hidden`}>
                <div className="pl-4 pr-2">
                  <Search size={18} className={`${isSearchFocused ? 'text-[#0096d6]' : 'text-gray-400'} transition-colors`} />
                </div>
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  className="flex-1 h-full bg-transparent text-[14px] text-gray-800 outline-none placeholder:text-gray-400 font-medium"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearchTrigger()}
                />
                <button
                  onClick={() => handleSearchTrigger()}
                  className="h-[34px] mr-1.5 px-4 bg-[#0096d6] hover:bg-[#0096d6] text-white text-[13px] font-bold rounded-lg transition-all active:scale-95 flex items-center gap-2 shadow-sm shadow-emerald-200"
                >
                  <span>Search</span>
                </button>
              </div>


            </div>

            <div className="h-6 w-[1px] bg-gray-200 hidden md:block mx-1"></div>

            {/* Minimalist Icons */}
            <div className="relative" ref={accountRef}>
              <button onMouseEnter={() => setIsAccountOpen(true)} className="p-2.5 text-white bg-[#0096d6] rounded-full transition-all flex items-center gap-2">
                <User size={20} strokeWidth={1.5} />
                <span className="hidden xl:block text-[13px] font-medium">{user ? user.name.split(' ')[0] : 'Sign in'}</span>
              </button>
              <AnimatePresence>
                {isAccountOpen && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} onMouseLeave={() => setIsAccountOpen(false)} className="absolute top-[110%] right-0 w-[200px] bg-white border border-gray-100 shadow-xl z-[2200] rounded-2xl p-2 mt-2">
                    {!user ? (
                      <div className="p-1 space-y-1">
                        <Link to="/login" className="block w-full py-2 bg-[#0096d6] text-white rounded-xl text-[13px] text-center font-medium hover:bg-[#0096d6] transition-colors">Sign in</Link>
                        <Link to="/signup" className="block w-full py-2 bg-gray-50 text-gray-600 rounded-xl text-[13px] text-center font-medium hover:bg-gray-100 transition-colors">Create account</Link>
                      </div>
                    ) : (
                      <div className="px-3 py-2 border-b border-gray-50 mb-1"><p className="text-[13px] font-semibold text-gray-800 truncate">Hi, {user.name}</p></div>
                    )}
                    <div className="space-y-0.5 text-[13px] text-gray-500 mt-1">
                      <Link to="/profile" className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"><User size={15} /> Dashboard</Link>
                      <Link to="/orders" className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"><Package size={15} /> Orders</Link>
                      <Link to="/wishlist" className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"><Heart size={15} /> Wishlist</Link>
                      {user && <button onClick={() => { localStorage.removeItem('user'); window.location.reload(); }} className="w-full flex items-center gap-3 p-2 text-red-500 hover:bg-red-50 rounded-lg mt-1 border-t border-gray-50 pt-2"><LogOut size={15} /> Sign out</button>}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button onClick={openCartDrawer} className="p-2.5 text-white bg-[#0096d6] rounded-full transition-all relative flex items-center gap-2">
              <ShoppingCart size={20} strokeWidth={1.5} />
              <span className="hidden xl:block text-[13px] font-medium">Cart</span>
              {cartCount > 0 && <span className="absolute top-1.5 right-1.5 xl:right-10 bg-[#0096d6] text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-[1.5px] border-white">{cartCount}</span>}
            </button>

            <button className="lg:hidden p-2 bg-gray-50 rounded-full" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Placeholder to prevent layout jump */}
      {isSticky && <div className="h-[60px] lg:h-[80px] w-full invisible"></div>}

      {/* Mobile navigation menu - Clean and Light */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-gray-900/20 z-[2000] backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-white z-[2100] flex flex-col shadow-2xl">
              <div className="bg-[#0096d6]/20 p-6 border-b border-emerald-100">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[11px] font-semibold text-[#0096d6] uppercase tracking-widest">Menu</span>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-gray-800"><X size={22} /></button>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-emerald-100 text-[#0096d6]"><User size={20} /></div>
                  <div className="flex flex-col">
                    <p className="text-[15px] font-semibold text-gray-800">{user ? user.name.split(' ')[0] : 'Hello there'}</p>
                    <Link to="/login" className="text-[12px] text-[#0096d6] font-medium">Sign in to account</Link>
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-6">
                  <div className="space-y-1">
                    {navLinks.map(link => (<Link key={link.name} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className="block py-3 px-4 text-[14px] font-medium text-gray-600 hover:bg-[#0096d6]/20 hover:text-[#0096d6] rounded-xl">{link.name}</Link>))}
                  </div>
                  <div className="pt-6 border-t border-gray-100">
                    <h4 className="text-[11px] font-semibold text-gray-400 mb-3 px-4 tracking-wide">Shop by categories</h4>
                    <div className="space-y-1">
                      {categories.map(cat => (<Link key={cat.id} to={`/shop?category=${cat.slug}`} onClick={() => setIsMobileMenuOpen(false)} className="block py-2.5 px-4 text-[14px] font-medium text-gray-600 hover:bg-[#0096d6]/20 hover:text-[#0096d6] rounded-xl">{cat.name}</Link>))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #10b981; }
      `}</style>
    </>
  );
}
