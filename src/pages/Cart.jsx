import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingCart, ShieldCheck, ChevronLeft, ChevronRight, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartCount } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white font-['Rubik'] text-center">
        <div className="h-32 w-32 bg-slate-50 flex items-center justify-center mb-8 rounded-[2.5rem]">
          <ShoppingCart size={48} className="text-slate-200" strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 capitalize tracking-tight">Your cart is empty</h2>
        <p className="text-slate-500 font-medium text-lg mb-12 max-w-md">You haven't added any products to your selection yet. Explore our catalog to find what you need.</p>
        <Link to="/shop" className="px-12 py-5 bg-slate-950 text-white font-bold rounded-full hover:bg-[#FF2D37] transition-all active:scale-95">
          Start Shopping Today
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-['Rubik'] text-slate-900 pb-20">

      {/* --- PAGE HEADER --- */}
      <div className="bg-slate-50 border-b border-slate-100 py-12 md:py-16 mb-16">
        <div className="max-w-full mx-auto px-4 md:px-6 xl:px-26 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <nav className="flex items-center gap-2 text-[12px] font-bold text-[#FF2D37] uppercase tracking-[3px] mb-4">
              <Link to="/" className="hover:text-slate-950 transition-colors">Home</Link>
              <ChevronRight size={14} className="text-slate-300" />
              <span className="text-slate-400">Shopping Cart</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-none tracking-tight capitalize">
              Your shopping bag
            </h1>
          </div>
          <div className="flex items-center gap-3 px-6 py-3 bg-white text-slate-900 rounded-full border border-slate-100 shadow-sm">
            <span className="text-sm font-bold text-[#FF2D37]">{cartCount}</span>
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Items ready for checkout</span>
          </div>
        </div>
      </div>

      <div className="max-w-full mx-auto px-4 md:px-6 xl:px-26">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">

          {/* Cart Items */}
          <div className="xl:col-span-8 space-y-8">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white border border-slate-100 p-6 md:p-10 flex flex-col md:flex-row items-center gap-10 group rounded-[2.5rem] hover:border-[#FF2D37]/20 transition-all duration-500"
                >
                  <Link to={`/product/${item.slug}`} className="h-44 w-44 bg-slate-50 p-8 flex items-center justify-center shrink-0 rounded-3xl group-hover:bg-white transition-colors duration-500 border border-transparent group-hover:border-slate-100">
                    <img
                      src={item.images ? `/${(typeof item.images === 'string' ? JSON.parse(item.images)[0] : item.images[0]).replace(/\\/g, '/')}` : ''}
                      alt={item.name}
                      className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => { e.target.src = "/logo/fabicon.png"; }}
                    />
                  </Link>

                  <div className="flex-1 min-w-0 w-full">
                    <div className="flex flex-col mb-8">
                      <span className="text-[10px] font-semibold text-[#FF2D37] uppercase tracking-[3px] mb-2">{item.brand_name || 'Premium Supply'}</span>
                      <Link to={`/product/${item.slug}`}>
                        <h3 className="text-xl font-semibold text-slate-900 hover:text-[#FF2D37] transition-colors leading-tight line-clamp-2">{item.name}</h3>
                      </Link>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-8 border-t border-slate-50 pt-8">
                      <div className="flex items-center gap-10">
                        <div className="h-14 px-4 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-8">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-slate-400 hover:text-[#FF2D37] transition-all active:scale-125"><Minus size={18} strokeWidth={3} /></button>
                          <span className="text-[15px] font-bold text-slate-900 w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-slate-400 hover:text-[#FF2D37] transition-all active:scale-125"><Plus size={18} strokeWidth={3} /></button>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block">Unit Price</span>
                          <span className="text-xl font-bold text-slate-900 leading-none">${Number(item.price).toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-8">
                        <div className="space-y-1 text-right">
                          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block">Subtotal</span>
                          <span className="text-2xl font-bold text-[#FF2D37] leading-none">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="h-12 w-12 text-slate-300 flex items-center justify-center hover:text-red-500 transition-all rounded-xl border border-transparent hover:bg-red-50"
                          aria-label="Remove item"
                        >
                          <Trash2 size={24} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link to="/shop" className="inline-flex items-center gap-3 text-xs font-bold text-slate-400 hover:text-[#FF2D37] transition-all pt-12 group uppercase tracking-widest">
              <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Continue Shopping
            </Link>
          </div>

          {/* Summary Module */}
          <div className="xl:col-span-4">
            <div className="bg-slate-50 p-10 lg:p-12 rounded-[3rem] border border-slate-100 sticky top-32">
              <div className="flex items-center gap-4 mb-12 pb-8 border-b border-slate-200">
                <div className="w-14 h-14 bg-white rounded-2xl text-[#FF2D37] border border-slate-100 flex items-center justify-center">
                  <Package size={28} />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[2px] text-slate-900">Order Summary</h3>
                  <p className="text-[11px] text-slate-400 font-semibold mt-1 uppercase">Secure Review</p>
                </div>
              </div>

              <div className="space-y-6 mb-12">
                <div className="flex justify-between items-center pb-6 border-b border-slate-200/50">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">Bag subtotal</span>
                  <span className="text-xl font-bold text-slate-950">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pb-6 border-b border-slate-200/50">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">Estimated Logistics</span>
                  <span className="text-[10px] font-semibold text-[#FF2D37] uppercase bg-[#FF2D37]/10 px-4 py-1.5 rounded-full">Calculated at Checkout</span>
                </div>
                <div className="flex justify-between items-end pt-6">
                  <span className="text-[13px] font-bold uppercase tracking-widest text-slate-900">Grand Total</span>
                  <span className="text-4xl font-bold text-[#FF2D37] leading-none tracking-tighter">${total.toFixed(2)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full h-20 bg-slate-950 hover:bg-[#FF2D37] text-white flex items-center justify-center gap-4 text-[13px] font-bold uppercase tracking-widest rounded-full transition-all active:scale-95 group"
              >
                Proceed to Secure Checkout
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="mt-12 pt-10 border-t border-slate-200 space-y-6">
                <div className="flex items-center gap-4 text-slate-500">
                  <ShieldCheck size={28} className="text-[#FF2D37] shrink-0" />
                  <p className="text-[11px] font-bold leading-relaxed uppercase tracking-tight">
                    Secure merchant connection. Your hardware purchase is protected by official warranty.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
