import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Truck, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const { isCartDrawerOpen, closeCartDrawer, cart, removeFromCart, updateQuantity, cartCount } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === "string" ? JSON.parse(images) : images;
      const first = Array.isArray(imgs) && imgs.length ? imgs[0] : null;
      if (!first) return "/logo/fabicon.png";
      const cleaned = String(first).replaceAll("\\", "/");
      return cleaned.startsWith("/") ? cleaned : `/${cleaned}`;
    } catch {
      return "/logo/fabicon.png";
    }
  };

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCartDrawer}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-[1500]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 right-0 h-full w-full max-w-[420px] bg-white z-[1501] shadow-2xl flex flex-col font-['Rubik']"
          >
            {/* Header - Fresh Blue */}
            <div className="bg-[#013E24] text-white px-6 py-6 flex items-center justify-between shadow-lg shadow-blue-600/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center border border-white/20">
                  <ShoppingBag size={20} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-[17px] font-semibold leading-none">Your Cart</h2>
                  <p className="text-[11px] font-medium text-blue-100 uppercase tracking-widest mt-1">{cartCount} items selected</p>
                </div>
              </div>
              <button
                onClick={closeCartDrawer}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Sub-header Message */}
            {cart.length > 0 && (
              <div className="bg-blue-50 px-6 py-3 border-b border-blue-100 flex items-center gap-3">
                <div className="w-5 h-5 bg-[#013E24]rounded-full flex items-center justify-center text-white">
                  <ShieldCheck size={12} strokeWidth={3} />
                </div>
                <p className="text-[12px] font-medium text-blue-800">Your order qualifies for FREE Express Shipping</p>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-slate-50/50">
              {cart.length > 0 ? (
                <>
                  {cart.map((item) => (
                    <div key={item.id} className="bg-white border border-slate-100 rounded-3xl p-4 flex gap-4 shadow-sm group hover:shadow-md transition-all">
                      <div className="h-24 w-24 flex-shrink-0 bg-white rounded-2xl border border-slate-50 p-2 flex items-center justify-center">
                        <img
                          src={getImagePath(item.images)}
                          alt={item.name}
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => { e.target.src = "/logo/fabicon.png"; }}
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col">
                        <Link
                          to={`/product/${item.slug}`}
                          onClick={closeCartDrawer}
                          className="text-[14px] font-semibold text-slate-800 hover:text-[#1d4ed8] transition-colors line-clamp-2 leading-tight mb-2"
                        >
                          {item.name}
                        </Link>

                        <div className="mt-auto flex items-end justify-between">
                          <div className="flex items-center bg-slate-50 rounded-full p-1 border border-slate-100 h-9">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm text-slate-500 transition-all disabled:opacity-30"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={12} strokeWidth={3} />
                            </button>
                            <span className="px-3 text-[13px] font-semibold text-slate-800">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm text-slate-500 transition-all"
                            >
                              <Plus size={12} strokeWidth={3} />
                            </button>
                          </div>

                          <div className="flex flex-col items-end">
                            <span className="text-[16px] font-semibold text-[#1d4ed8]">${(Number(item.price || 0) * item.quantity).toLocaleString()}</span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-[11px] font-medium text-red-400 hover:text-red-500 transition-colors uppercase tracking-wider mt-1"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center px-6">
                  <div className="w-24 h-24 bg-blue-50 rounded-[40px] flex items-center justify-center mb-6 border border-blue-100 animate-pulse">
                    <ShoppingBag size={40} className="text-blue-200" />
                  </div>
                  <h3 className="text-[20px] font-semibold text-slate-800 mb-2">Empty Cart</h3>
                  <p className="text-[14px] text-slate-400 mb-8 font-medium">Add some world-class printers to your cart to see them here.</p>
                  <button
                    onClick={closeCartDrawer}
                    className="bg-[#013E24]hover:bg-blue-700 text-white px-10 py-4 text-[14px] font-semibold rounded-2xl shadow-xl shadow-blue-100 transition-all transform hover:-translate-y-1 active:scale-95 cursor-pointer"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="bg-white border-t border-slate-100 p-8 space-y-6 shadow-[0_-20px_50px_rgba(0,0,0,0.05)] rounded-t-[40px]">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-[13px] font-medium">
                    <span>Subtotal</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-[#1d4ed8] text-[24px] font-semibold">
                    <span>Total</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    to="/checkout"
                    onClick={closeCartDrawer}
                    className="w-full h-14 bg-[#013E24]hover:bg-blue-700 text-white flex items-center justify-center gap-3 font-semibold text-[15px] rounded-2xl shadow-xl shadow-blue-100 transition-all hover:-translate-y-1 active:scale-95"
                  >
                    CHECKOUT NOW <ArrowRight size={18} />
                  </Link>
                  <Link
                    to="/cart"
                    onClick={closeCartDrawer}
                    className="w-full h-14 bg-slate-50 hover:bg-slate-100 text-slate-700 flex items-center justify-center font-semibold text-[15px] rounded-2xl transition-all"
                  >
                    View Full Cart
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                    <Truck size={14} className="text-blue-400" />
                    <span>Fast Delivery</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                    <ShieldCheck size={14} className="text-blue-400" />
                    <span>Secure SSL</span>
                  </div>
                </div>
              </div>
            )}
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
