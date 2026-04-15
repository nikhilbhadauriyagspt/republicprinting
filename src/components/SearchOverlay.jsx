import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, TrendingUp, History, ChevronRight, Zap, Headphones, Printer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';

export default function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 400);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length > 1) {
        setIsSearching(true);
        try {
          const res = await fetch(`${API_BASE_URL}/products?search=${encodeURIComponent(searchQuery)}&limit=10`);
          const data = await res.json();
          if (data.status === 'success') {
            setSuggestions(data.data);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSuggestions([]);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      closeSearch();
      setSearchQuery('');
    }
  };

  const handleQuickSearch = (query) => {
    navigate(`/shop?search=${encodeURIComponent(query)}`);
    closeSearch();
    setSearchQuery('');
  };

  const getImagePath = (product) => {
    try {
      const images = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
      return images?.length > 0 ? `/${images[0].replace(/\\/g, '/')}` : '/logo/fabicon.png';
    } catch { return '/logo/fabicon.png'; }
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSearch}
            className="fixed inset-0 z-[1600] bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Search Drawer (Half Screen) */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-[1601] w-full max-w-[520px] bg-white shadow-2xl flex flex-col font-['Rubik']"
          >
            {/* Header Area - Clean & Blue Accent */}
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100">
                  <Search size={24} className="text-[#1d4ed8]" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900 tracking-tight leading-none">Global Search</h2>
                  <p className="text-[11px] font-medium uppercase tracking-widest text-[#1d4ed8] mt-1.5">Republic Printing Catalog</p>
                </div>
              </div>
              <button
                onClick={closeSearch}
                className="h-11 w-11 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#1d4ed8] hover:bg-blue-50 transition-all active:scale-95"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {/* Search Input - Minimal & Modern */}
              <div className="p-8 pb-4">
                <form onSubmit={handleSearch} className="relative group">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search for printers, ink, drivers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-16 bg-slate-50 px-6 pl-14 text-[16px] font-semibold text-slate-900 outline-none border border-slate-200 rounded-3xl focus:border-[#1d4ed8] focus:bg-white focus:shadow-xl focus:shadow-blue-600/5 transition-all placeholder:font-medium placeholder:text-slate-400"
                  />
                  <Search
                    size={22}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1d4ed8] transition-colors"
                  />
                </form>
              </div>

              <div className="p-8 pt-4">
                {searchQuery.length > 1 ? (
                  <div className="space-y-6">
                    <h3 className="text-[11px] font-medium text-slate-400 uppercase tracking-widest flex items-center gap-2 px-2">
                      {isSearching ? 'Analyzing catalog...' : 'Matched Results'}
                    </h3>

                    <div className="grid grid-cols-1 gap-3">
                      {suggestions.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => {
                            navigate(`/product/${product.slug}`);
                            closeSearch();
                          }}
                          className="flex items-center gap-5 p-4 bg-white hover:bg-blue-50/50 rounded-3xl border border-slate-100 hover:border-blue-100 transition-all text-left group w-full"
                        >
                          <div className="w-20 h-20 bg-white rounded-2xl border border-slate-50 p-2 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                            <img
                              src={getImagePath(product)}
                              alt={product.name}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-slate-900 text-[14px] leading-tight line-clamp-2 mb-1 group-hover:text-[#1d4ed8] transition-colors">
                              {product.name}
                            </h4>
                            <p className="text-[#1d4ed8] font-semibold text-sm">${product.price}</p>
                          </div>
                          <ChevronRight size={18} className="text-slate-300 group-hover:text-[#1d4ed8] group-hover:translate-x-1 transition-all" />
                        </button>
                      ))}

                      {!isSearching && suggestions.length === 0 && (
                        <div className="text-center py-16 rounded-3xl border border-dashed border-slate-200 bg-slate-50/50">
                          <Printer size={48} className="mx-auto text-slate-200 mb-4" />
                          <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">No products found</p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-10">
                    {/* Popular Searches */}
                    <div>
                      <h3 className="text-[11px] font-medium text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2 px-2">
                        <TrendingUp size={16} className="text-[#1d4ed8]" /> Trending Right Now
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {['LaserJet', 'Ink Tank', 'Smart Tank', 'Pixma', 'Wireless', 'Brother'].map((tag) => (
                          <button
                            key={tag}
                            onClick={() => handleQuickSearch(tag)}
                            className="px-6 py-3 bg-white hover:bg-[#013E24]hover:text-white text-[12px] font-medium rounded-2xl text-slate-600 transition-all border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-600/20 active:scale-95"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Categories */}
                    <div>
                      <h3 className="text-[11px] font-medium text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2 px-2">
                        <History size={16} className="text-[#1d4ed8]" /> Quick Discovery
                      </h3>
                      <div className="grid grid-cols-1 gap-2">
                        {['All-in-One Printers', 'LaserJet Printers', 'Inkjet Printers', 'Toner & Supplies'].map((cat) => (
                          <button
                            key={cat}
                            onClick={() => handleQuickSearch(cat)}
                            className="flex items-center justify-between w-full p-5 bg-slate-50 hover:bg-blue-50 rounded-2xl group transition-all border border-transparent hover:border-blue-100 active:scale-[0.99]"
                          >
                            <span className="font-semibold text-slate-700 text-[14px] group-hover:text-[#1d4ed8] transition-colors">{cat}</span>
                            <ChevronRight size={18} className="text-slate-300 group-hover:text-[#1d4ed8] group-hover:translate-x-1 transition-all" />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Modern Expert Support Box */}
                    <div className="p-8 bg-[#013E24]rounded-[40px] text-white relative overflow-hidden shadow-2xl shadow-blue-600/30 group">
                      <div className="relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-4 border border-white/20">
                          <Headphones size={22} className="text-white" />
                        </div>
                        <h4 className="font-semibold text-2xl mb-2 leading-tight">Need expert advice?</h4>
                        <p className="text-[14px] text-blue-50 mb-8 font-medium leading-relaxed opacity-90">Talk to our technicians for a free consultation.</p>
                        <button
                          onClick={() => { navigate('/contact'); closeSearch(); }}
                          className="w-full py-4 bg-white text-[#1d4ed8] font-semibold uppercase tracking-widest text-[12px] rounded-2xl hover:bg-blue-50 transition-all shadow-lg active:scale-95"
                        >
                          CHALLENGE AN EXPERT
                        </button>
                      </div>
                      <div className="absolute -right-20 -bottom-20 opacity-10 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                        <Zap size={300} className="rotate-12" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #f1f5f9; border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #e2e8f0; }
      `}</style>
    </AnimatePresence>
  );
}
