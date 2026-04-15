import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingCart, ChevronLeft, ChevronRight, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartCount } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white text-center">
        <ShoppingCart size={64} className="text-slate-200 mb-6" />
        <h2 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
        <p className="text-secondary mb-8">Add some items to your cart to see them here.</p>
        <Link to="/shop" className="px-8 py-3 bg-foreground text-white font-bold rounded-lg hover:bg-[#013E24] transition-all">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-['Rubik'] text-foreground pb-20">
      <SEO title="Shopping Cart | Republic Printing" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-12">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-6 p-6 border border-border rounded-2xl">
                <div className="w-24 h-24 bg-background rounded-xl flex items-center justify-center shrink-0">
                  <img
                    src={item.images ? `/${(typeof item.images === 'string' ? JSON.parse(item.images)[0] : item.images[0]).replace(/\\/g, '/')}` : ''}
                    alt={item.name}
                    className="max-w-full max-h-full object-contain mix-blend-multiply"
                    onError={(e) => { e.target.src = "/logo/fabicon.png"; }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-4 mb-4">
                    <Link to={`/product/${item.slug}`} className="font-bold text-foreground hover:text-primary line-clamp-1">{item.name}</Link>
                    <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-500"><Trash2 size={18} /></button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 bg-background border border-border rounded-lg px-3 py-1">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-slate-400 hover:text-primary"><Minus size={14} /></button>
                      <span className="font-bold text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-slate-400 hover:text-primary"><Plus size={14} /></button>
                    </div>
                    <span className="font-bold text-foreground">${Number(item.price).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}

            <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline pt-4">
              <ChevronLeft size={16} /> Continue Shopping
            </Link>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-background border border-border rounded-2xl p-8 sticky top-24">
              <h3 className="text-lg font-bold mb-6">Order Summary</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-secondary">
                  <span>Subtotal</span>
                  <span className="font-bold text-foreground">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-secondary">
                  <span>Shipping</span>
                  <span className="text-emerald-600 font-bold">Free</span>
                </div>
                <div className="pt-4 border-t border-border flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-2xl text-foreground">${total.toLocaleString()}</span>
                </div>
              </div>
              <Link to="/checkout" className="w-full h-14 bg-foreground text-white flex items-center justify-center rounded-xl font-bold uppercase tracking-widest hover:bg-[#013E24] transition-all">
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


