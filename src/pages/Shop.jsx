import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link, useParams, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import {
  Search,
  ChevronDown,
  LayoutGrid,
  List,
  Heart,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Plus,
  Filter,
  X,
  Star,
  SlidersHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';

export default function Shop() {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { category: pathCategory } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;

  const category = searchParams.get('category') || pathCategory || '';
  const sort = searchParams.get('sort') || 'newest';
  const search = searchParams.get('search') || '';
  const minPrice = searchParams.get('minPrice') || 0;
  const maxPrice = searchParams.get('maxPrice') || 5000;
  const activeBrand = searchParams.get('brand') || '';

  const brands = ['HP', 'Canon', 'Epson', 'Brother', 'Lexmark', 'Xerox', 'Samsung', 'Ricoh'];

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then((res) => res.json())
      .then((d) => {
        if (d.status === 'success') {
          const printers = d.data.find((c) => c.slug === 'printers' || c.id === 46);
          setCategories(printers ? printers.children : []);
        }
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(searchParams);
    params.set('limit', '1000');

    fetch(`${API_BASE_URL}/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          let filtered = data.data.filter(
            (p) =>
              !p.name.toLowerCase().includes('laptop') &&
              !p.name.toLowerCase().includes('macbook') &&
              !p.name.toLowerCase().includes('notebook')
          );

          filtered = filtered.filter(p => Number(p.price) >= minPrice && Number(p.price) <= maxPrice);

          if (activeBrand) {
            filtered = filtered.filter(p => p.name.toLowerCase().includes(activeBrand.toLowerCase()));
          }

          setProducts(filtered);
          setCurrentPage(1); // Reset to first page on filter change
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [searchParams, minPrice, maxPrice, activeBrand]);

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) {
        return `/${imgs[0].replace(/\\/g, '/')}`;
      }
      return '/logo/fabicon.png';
    } catch {
      return '/logo/fabicon.png';
    }
  };

  // Pagination Logic
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const FilterSidebar = () => (
    <div className="space-y-8 pb-10">
      {/* Categories */}
      <div>
        <h3 className="text-[14px] font-bold text-foreground mb-4 flex items-center gap-2">
          <LayoutGrid size={16} className="text-[#013E24]" />
          Categories
        </h3>
        <div className="space-y-1">
          <button
            onClick={() => updateFilter('category', '')}
            className={`w-full text-left px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all ${!category ? 'bg-blue-50 text-[#013E24]' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            All Categories
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => updateFilter('category', c.slug)}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all capitalize ${category === c.slug ? 'bg-blue-50 text-[#013E24]' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="text-[14px] font-bold text-foreground mb-4 flex items-center gap-2">
          <Star size={16} className="text-[#013E24]" />
          Brands
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => updateFilter('brand', activeBrand === brand ? '' : brand)}
              className={`px-2 py-1.5 rounded-lg text-[11px] font-bold border transition-all ${activeBrand === brand ? 'bg-[#013E24] border-blue-600 text-white' : 'border-gray-200 text-gray-600 hover:border-blue-600'}`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-[14px] font-bold text-foreground mb-4 flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-[#013E24]" />
          Price Range
        </h3>
        <div className="space-y-4 px-2">
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={maxPrice}
            onChange={(e) => updateFilter('maxPrice', e.target.value)}
            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex items-center justify-between text-[12px] font-bold text-gray-600">
            <span>$0</span>
            <span className="text-[#013E24] bg-blue-50 px-2 py-0.5 rounded-full">${maxPrice}</span>
          </div>
        </div>
      </div>

      <button
        onClick={clearFilters}
        className="w-full py-2.5 border border-dashed border-gray-300 rounded-xl text-[11px] font-bold text-gray-500 hover:border-blue-600 hover:text-[#013E24] transition-all uppercase tracking-widest"
      >
        Clear All Filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <SEO title="Shop | Printing Mania" />

      {/* --- BREADCRUMBS --- */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-[1800px] mx-auto px-4 md:px-10 py-3">
          <nav className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <Link to="/" className="hover:text-[#013E24] transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-slate-900">Shop</span>
            {category && (
              <>
                <ChevronRight size={12} />
                <span className="capitalize" style={{ color: '#013E24' }}>{category.replace('-', ' ')}</span>
              </>
            )}
          </nav>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-4 md:px-10 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* --- LEFT SIDEBAR (Desktop) --- */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-hide">
              <FilterSidebar />
            </div>
          </aside>

          {/* --- MAIN CONTENT --- */}
          <main className="flex-1">

            {/* Toolbar */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => updateFilter('search', e.target.value)}
                  className="w-full h-11 pl-12 pr-4 bg-slate-100 border-transparent rounded-xl text-sm focus:bg-white focus:border-[#013E24] focus:ring-1 focus:ring-[#013E24] outline-none transition-all"
                />
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden flex-1 h-11 bg-white border border-slate-300 rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-slate-700"
                >
                  <Filter size={16} /> Filters
                </button>

                <div className="relative flex-1 md:w-48">
                  <select
                    value={sort}
                    onChange={(e) => updateFilter('sort', e.target.value)}
                    className="w-full h-11 appearance-none bg-white border border-slate-300 rounded-xl px-4 text-sm font-bold text-slate-700 outline-none cursor-pointer focus:border-[#013E24] focus:ring-1 focus:ring-[#013E24]"
                  >
                    <option value="newest">Newest</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Results Info */}
            <div className="flex items-center justify-between mb-4 px-2">
              <h2 className="text-xl font-bold text-slate-900">
                {category ? category.replace('-', ' ') : 'All Products'}
                <span className="text-slate-500 text-sm font-medium ml-3">({products.length} results)</span>
              </h2>
            </div>

            {/* Grid */}
            {loading ? (
              <div className="py-24 text-center">
                <Loader2 className="animate-spin text-[#013E24] mx-auto mb-4" size={36} />
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Loading Products...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="py-24 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-2">No Products Found</h3>
                <p className="text-slate-500 mb-4">Try adjusting your filters or clearing them.</p>
                <button onClick={clearFilters} className="font-bold text-sm" style={{ color: '#013E24' }}>
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {currentProducts.map((p) => (
                  <div key={p.id} className="group bg-white rounded-2xl p-4 border border-slate-200 hover:shadow-xl hover:border-[#013E24] transition-all duration-300 flex flex-col">
                    {/* Image */}
                    <div className="relative aspect-square bg-slate-100 rounded-xl overflow-hidden mb-4">
                      <Link to={`/product/${p.slug}`} className="w-full h-full flex items-center justify-center p-2">
                        <img
                          src={getImagePath(p.images)}
                          alt={p.name}
                          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
                        />
                      </Link>
                      <button
                        onClick={() => toggleWishlist(p)}
                        className={`absolute top-2 right-2 w-7 h-7 rounded-full bg-white/70 backdrop-blur-sm shadow flex items-center justify-center transition-all ${isInWishlist(p.id) ? 'text-red-500' : 'text-slate-400 hover:text-red-500'}`}
                      >
                        <Heart size={14} fill={isInWishlist(p.id) ? 'currentColor' : 'none'} />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col">
                      <Link to={`/product/${p.slug}`} className="flex-1">
                        <h3 className="text-sm font-bold text-slate-800 leading-snug line-clamp-2 min-h-[40px] group-hover:text-[#013E24] transition-colors">
                          {p.name}
                        </h3>
                      </Link>

                      <div className="pt-2 mt-auto">
                        <span className="text-lg font-extrabold text-slate-900 block">${Number(p.price).toLocaleString()}</span>
                        <button
                          onClick={() => addToCart(p)}
                          className="w-full mt-2 h-10 rounded-lg flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider transition-all active:scale-95"
                          style={{ backgroundColor: '#013E24', color: 'white' }}
                        >
                          <ShoppingCart size={14} />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {!loading && totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-xl border border-slate-300 bg-white flex items-center justify-center hover:border-[#013E24] hover:text-[#013E24] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={18} />
                </button>

                <div className="flex items-center gap-2">
                  {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    if (page === 1 || page === totalPages || (page >= currentPage - 2 && page <= currentPage + 2)) {
                      if (page === currentPage - 2 && currentPage > 3) return <span key={page} className="px-1 text-slate-500">...</span>;
                      if (page === currentPage + 2 && currentPage < totalPages - 2) return <span key={page} className="px-1 text-slate-500">...</span>;
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${currentPage === page ? 'text-white shadow-lg' : 'bg-white border border-slate-300 text-slate-600 hover:border-[#013E24] hover:text-[#013E24]'}`}
                          style={currentPage === page ? { backgroundColor: '#013E24', boxShadow: '0 4px 14px 0 rgba(1, 62, 36, 0.3)' } : {}}
                        >
                          {page}
                        </button>
                      );
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-xl border border-slate-300 bg-white flex items-center justify-center hover:border-[#013E24] hover:text-[#013E24] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* --- MOBILE FILTERS OVERLAY --- */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 250 }}
              className="fixed top-0 right-0 bottom-0 w-[300px] bg-white z-[70] p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-slate-900">Filters</h2>
                <button onClick={() => setShowMobileFilters(false)} className="p-2 -mr-2">
                  <X size={22} />
                </button>
              </div>
              <FilterSidebar />
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full mt-6 py-3 text-white rounded-xl font-bold"
                style={{backgroundColor: '#013E24'}}
              >
                Apply Filters
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
