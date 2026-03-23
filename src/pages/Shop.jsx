import { useState, useEffect } from 'react';
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
  ChevronRight,
  ShoppingCart,
  Plus,
  CheckCircle2,
  X
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
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [total, setTotal] = useState(0);
  const [viewMode, setViewMode] = useState('grid');

  const category = searchParams.get('category') || pathCategory || '';
  const sort = searchParams.get('sort') || 'newest';
  const search = searchParams.get('search') || '';

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
    params.delete('brand');

    fetch(`${API_BASE_URL}/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          const filteredProducts = data.data.filter(
            (p) =>
              !p.name.toLowerCase().includes('laptop') &&
              !p.name.toLowerCase().includes('macbook') &&
              !p.name.toLowerCase().includes('notebook')
          );
          setProducts(filteredProducts);
          setTotal(filteredProducts.length);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [searchParams]);

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    setSearchParams(newParams);
    setActiveDropdown(null);
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

  return (
    <div className="min-h-screen bg-white font-['Rubik'] text-foreground">
      <SEO title="Shop | Vital Print" />

      {/* --- PAGE HEADER --- */}
      <div className="bg-background py-10 md:py-14 border-b border-border">
        <div className="max-w-[1800px] mx-auto px-4 md:px-10">
          <nav className="flex items-center gap-2 text-[11px] font-bold text-secondary uppercase tracking-[0.2em] mb-4">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} className="opacity-50" />
            <span className="text-primary">Shop Catalog</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">Professional Hardware</h1>
              <p className="text-secondary text-sm md:text-base font-medium mt-3 max-w-2xl">
                Browse our complete collection of high-performance printers, genuine ink, and premium office supplies.
              </p>
            </div>
            <div className="text-secondary text-sm font-bold uppercase tracking-widest bg-white px-5 py-2 border border-border rounded-full shadow-sm">
              Showing {products.length} Results
            </div>
          </div>
        </div>
      </div>

      {/* --- FILTER & SEARCH BAR --- */}
      <div className="bg-white border-b border-border sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1800px] mx-auto px-4 md:px-10 h-20 flex items-center justify-between gap-6">

          <div className="flex items-center gap-4 flex-1">
            {/* Category Dropdown */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'cat' ? null : 'cat')}
                className={`flex items-center gap-3 px-6 py-2.5 rounded-full text-[13px] font-bold transition-all border ${category ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-background border-border text-foreground hover:border-primary'
                  }`}
              >
                {category ? category.replace('-', ' ') : 'Select Category'}
                <ChevronDown size={16} className={`transition-transform duration-300 ${activeDropdown === 'cat' ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === 'cat' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-3 w-64 bg-white border border-border rounded-2xl shadow-2xl p-2 z-50 overflow-hidden"
                  >
                    <button
                      onClick={() => updateFilter('category', '')}
                      className="w-full text-left px-5 py-3 text-[13px] font-bold text-secondary hover:bg-primary/5 hover:text-primary rounded-xl transition-all"
                    >
                      Show All Collections
                    </button>
                    <div className="h-px bg-background mx-2 my-1" />
                    {categories.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => updateFilter('category', c.slug)}
                        className={`w-full text-left px-5 py-3 text-[13px] font-bold rounded-xl transition-all capitalize ${category === c.slug ? 'bg-primary text-white' : 'text-foreground hover:bg-primary/5 hover:text-primary'
                          }`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search Input */}
            <div className="relative hidden lg:block max-w-md w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => updateFilter('search', e.target.value)}
                className="w-full h-11 pl-12 pr-6 bg-background border border-border rounded-full text-[14px] font-medium focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all"
              />
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-4 shrink-0">
            <span className="hidden sm:block text-[11px] font-bold text-secondary uppercase tracking-widest">Sort By:</span>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => updateFilter('sort', e.target.value)}
                className="appearance-none h-11 bg-background border border-border rounded-full pl-5 pr-10 text-[13px] font-bold text-foreground outline-none cursor-pointer hover:border-primary focus:border-primary transition-all"
              >
                <option value="newest">Latest Release</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" />
            </div>
          </div>

        </div>
      </div>

      {/* --- PRODUCTS GRID --- */}
      <div className="max-w-[1800px] mx-auto px-4 md:px-10 py-12">
        {loading ? (
          <div className="py-32 text-center">
            <Loader2 className="animate-spin text-primary mx-auto mb-6" size={48} />
            <p className="text-[13px] font-bold text-secondary uppercase tracking-[0.3em]">Updating Catalog...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="py-32 text-center bg-background rounded-[32px] border border-dashed border-border">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-border">
              <Search size={32} className="text-secondary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">No matching hardware found</h2>
            <p className="text-secondary font-medium mb-8">Try adjusting your filters or search terms to find what you're looking for.</p>
            <button
              onClick={() => {
                setSearchParams(new URLSearchParams());
                navigate('/shop');
              }}
              className="px-8 py-3 bg-primary text-white rounded-full text-[13px] font-bold uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 md:gap-10">
            {products.map((p) => (
              <div key={p.id} className="group">
                {/* Image Container */}
                <div className="relative aspect-square bg-[#F5F5F5] rounded-[24px] flex items-center justify-center overflow-hidden mb-5 border border-transparent transition-all group-hover:border-border group-hover:shadow-xl group-hover:shadow-black/5">
                  <Link to={`/product/${p.slug}`} className="w-full h-full flex items-center justify-center p-8">
                    <img
                      src={getImagePath(p.images)}
                      alt={p.name}
                      className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                    />
                  </Link>

                  {/* Floating Action Buttons */}
                  <button
                    onClick={() => toggleWishlist(p)}
                    className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-all translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 ${isInWishlist(p.id) ? 'text-primary' : 'text-secondary hover:text-primary'
                      }`}
                  >
                    <Heart size={18} fill={isInWishlist(p.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>

                {/* Content */}
                <div className="px-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] bg-primary/5 px-2.5 py-1 rounded-full">Hardware</span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => <div key={i} className="w-1 h-1 rounded-full bg-amber-400" />)}
                    </div>
                  </div>

                  <Link to={`/product/${p.slug}`}>
                    <h3 className="text-[16px] font-bold text-foreground leading-tight hover:text-primary transition-colors line-clamp-2 min-h-[40px] mb-4">
                      {p.name}
                    </h3>
                  </Link>

                  <div className="flex items-center justify-between gap-4 pt-2">
                    <div className="flex flex-col">
                      <span className="text-[18px] font-bold text-foreground">${Number(p.price).toLocaleString()}</span>
                      <span className="text-[11px] font-bold text-secondary uppercase tracking-widest">In Stock</span>
                    </div>

                    <button
                      onClick={() => addToCart(p)}
                      className="flex-1 h-11 bg-foreground text-white rounded-full flex items-center justify-center gap-2 text-[12px] font-bold uppercase tracking-widest hover:bg-primary transition-all shadow-lg active:scale-95"
                    >
                      <ShoppingCart size={16} />
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

