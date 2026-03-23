import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ChevronLeft, ChevronRight, Sparkles, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart, wishlistCount } = useCart();

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) {
        const path = imgs[0].replace(/\\/g, '/');
        return path.startsWith('/') ? path : `/${path}`;
      }
    } catch (e) { }
    return "/logo/fabicon.png";
  };

  if (wishlistCount === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white font-['Rubik'] text-center">
        <div className="w-24 h-24 bg-[#F5F5F5] rounded-3xl flex items-center justify-center mb-8 border border-border shadow-sm">
          <Heart size={40} className="text-secondary opacity-30" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-4 tracking-tight">Your Wishlist is Empty</h2>
        <p className="text-secondary font-medium text-base mb-12 max-w-md">Save your favorite hardware and supplies to this collection for easy access later.</p>
        <Link to="/shop" className="px-10 py-4 bg-primary text-white font-bold text-[13px] uppercase tracking-widest hover:bg-primary-hover transition-all rounded-full shadow-xl shadow-primary/20 active:scale-95">
          Explore All Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-['Rubik'] text-foreground pb-20">

      {/* --- PAGE HEADER --- */}
      <div className="bg-background py-10 md:py-14 border-b border-border mb-12">
        <div className="max-w-[1800px] mx-auto px-4 md:px-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <nav className="flex items-center gap-2 text-[11px] font-bold text-secondary uppercase tracking-[0.2em]">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight size={12} className="opacity-50" />
              <span className="text-primary">Saved Hardware</span>
            </nav>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
              Your Favorites
            </h1>
          </div>
          <div className="text-secondary text-sm font-bold uppercase tracking-widest bg-white px-6 py-2.5 border border-border rounded-full shadow-sm">
            <span className="text-primary">{wishlistCount}</span> Items Saved
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 md:gap-10">
          <AnimatePresence>
            {wishlist.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-square bg-[#F5F5F5] rounded-[24px] flex items-center justify-center overflow-hidden mb-5 border border-transparent transition-all group-hover:border-border group-hover:shadow-xl group-hover:shadow-black/5">
                  <Link to={`/product/${p.slug}`} className="w-full h-full flex items-center justify-center p-8">
                    <img
                      src={getImagePath(p.images)}
                      alt={p.name}
                      className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => { e.currentTarget.src = "/logo/fabicon.png"; }}
                    />
                  </Link>

                  <button
                    onClick={() => toggleWishlist(p)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white shadow-lg text-primary rounded-full flex items-center justify-center z-10 hover:bg-primary hover:text-white transition-all active:scale-90"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* Content */}
                <div className="px-1 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] bg-primary/5 px-2.5 py-1 rounded-full">{p.brand_name || 'HP Series'}</span>
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  </div>
                  
                  <Link to={`/product/${p.slug}`}>
                    <h3 className="text-[16px] font-bold text-foreground group-hover:text-primary transition-colors leading-tight line-clamp-2 mb-4 min-h-[40px]">{p.name}</h3>
                  </Link>
                  
                  <div className="mt-auto pt-2 flex items-center justify-between gap-4">
                    <p className="text-[18px] font-bold text-foreground">${parseFloat(p.price).toLocaleString()}</p>
                    
                    <button
                      onClick={() => addToCart(p)}
                      className="flex-1 h-11 bg-foreground text-white rounded-full flex items-center justify-center gap-2 text-[12px] font-bold uppercase tracking-widest hover:bg-primary transition-all shadow-lg active:scale-95"
                    >
                      <ShoppingCart size={16} /> Add to cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-24 pt-10 border-t border-border">
          <Link to="/shop" className="inline-flex items-center gap-3 text-[12px] font-bold text-secondary hover:text-primary transition-all group uppercase tracking-[0.2em]">
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Continue Browsing Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
