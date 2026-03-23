import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  CreditCard,
  Truck,
  ShieldCheck,
  ArrowRight,
  Lock,
  MapPin,
  Mail,
  Loader2,
  CheckCircle2,
  Package
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PayPalButtons } from "@paypal/react-paypal-js";
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';

export default function Checkout() {
  const { cart, cartCount, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
    paymentMethod: 'cod',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrderSuccess = async (paymentDetails = null) => {
    setLoading(true);
    try {
      const orderData = {
        ...formData,
        user_id: user?.id,
        total: total,
        items: cart,
        payment_details: paymentDetails,
        source: 'vitalprint.shop',
      };

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      if (data.status === 'success') {
        setOrderId(data.order_id);
        setStep(3);
        clearCart();
      }
    } catch (err) {
      alert('Error placing order.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) setStep(2);
    else if (formData.paymentMethod === 'cod') await handleOrderSuccess();
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <h2 className="text-xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/shop" className="text-primary font-bold">Return to Shop</Link>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <CheckCircle2 size={64} className="text-emerald-500 mb-6" />
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-secondary mb-8">Thank you for your purchase. Your order ID is #DSP-{orderId}</p>
        <Link to="/" className="px-8 py-3 bg-foreground text-white rounded-lg font-bold">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-['Rubik'] text-foreground pb-20">
      <SEO title="Secure Checkout | Vital Print" />

      {/* --- PAGE HEADER --- */}
      <div className="bg-background py-10 md:py-14 border-b border-border mb-12">
        <div className="max-w-[1800px] mx-auto px-4 md:px-10">
          <nav className="flex items-center gap-2 text-[11px] font-bold text-secondary uppercase tracking-[0.2em] mb-4">
            <Link to="/cart" className="hover:text-primary transition-colors flex items-center gap-1.5">
              <ChevronLeft size={14} /> Back to Cart
            </Link>
          </nav>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">Checkout</h1>

            {/* STEP TRACKER */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold ${step >= 1 ? 'bg-primary text-white' : 'bg-white border border-border text-secondary'}`}>1</div>
                <span className={`text-[11px] font-bold uppercase tracking-widest ${step >= 1 ? 'text-foreground' : 'text-secondary'}`}>Shipping</span>
              </div>
              <div className="w-10 h-px bg-border" />
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold ${step >= 2 ? 'bg-primary text-white' : 'bg-white border border-border text-secondary'}`}>2</div>
                <span className={`text-[11px] font-bold uppercase tracking-widest ${step >= 2 ? 'text-foreground' : 'text-secondary'}`}>Payment</span>
              </div>
              <div className="w-10 h-px bg-border" />
              <div className="flex items-center gap-2 opacity-40">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold bg-white border border-border text-secondary">3</div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-secondary">Review</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20 items-start">

          {/* MAIN FORM AREA */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-10">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-8"
                  >
                    <div className="flex items-center gap-3 border-b border-border pb-4">
                      <Truck size={24} className="text-primary" />
                      <h3 className="text-xl font-bold">Shipping Information</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-[11px] font-bold text-secondary uppercase tracking-widest ml-1">Email Address</label>
                        <input required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="name@email.com" className="w-full h-14 px-6 bg-[#F5F5F5] border border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 rounded-2xl outline-none transition-all font-medium" />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-secondary uppercase tracking-widest ml-1">First Name</label>
                        <input required name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="John" className="w-full h-14 px-6 bg-[#F5F5F5] border border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 rounded-2xl outline-none transition-all font-medium" />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-secondary uppercase tracking-widest ml-1">Last Name</label>
                        <input required name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Doe" className="w-full h-14 px-6 bg-[#F5F5F5] border border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 rounded-2xl outline-none transition-all font-medium" />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <label className="text-[11px] font-bold text-secondary uppercase tracking-widest ml-1">Delivery Address</label>
                        <input required name="address" value={formData.address} onChange={handleInputChange} placeholder="Street address, apartment, suite" className="w-full h-14 px-6 bg-[#F5F5F5] border border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 rounded-2xl outline-none transition-all font-medium" />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-secondary uppercase tracking-widest ml-1">City</label>
                        <input required name="city" value={formData.city} onChange={handleInputChange} placeholder="New York" className="w-full h-14 px-6 bg-[#F5F5F5] border border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 rounded-2xl outline-none transition-all font-medium" />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-secondary uppercase tracking-widest ml-1">Zip Code</label>
                        <input required name="zipCode" value={formData.zipCode} onChange={handleInputChange} placeholder="10001" className="w-full h-14 px-6 bg-[#F5F5F5] border border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 rounded-2xl outline-none transition-all font-medium" />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <label className="text-[11px] font-bold text-secondary uppercase tracking-widest ml-1">Phone Number</label>
                        <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder="+1 (000) 000-0000" className="w-full h-14 px-6 bg-[#F5F5F5] border border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 rounded-2xl outline-none transition-all font-medium" />
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="flex items-center gap-3 border-b border-border pb-4">
                      <CreditCard size={24} className="text-primary" />
                      <h3 className="text-xl font-bold">Payment Selection</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div
                        onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                        className={`p-8 border-2 rounded-[24px] cursor-pointer transition-all ${formData.paymentMethod === 'cod' ? 'border-primary bg-primary/5 shadow-lg shadow-primary/5' : 'border-border bg-white hover:border-secondary/30'
                          }`}
                      >
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mb-6 ${formData.paymentMethod === 'cod' ? 'border-primary' : 'border-border'}`}>
                          {formData.paymentMethod === 'cod' && <div className="w-3 h-3 bg-primary rounded-full" />}
                        </div>
                        <p className="font-bold text-lg mb-1">Cash on Delivery</p>
                        <p className="text-xs text-secondary font-medium uppercase tracking-widest">Pay upon receipt</p>
                      </div>

                      <div
                        onClick={() => setFormData({ ...formData, paymentMethod: 'paypal' })}
                        className={`p-8 border-2 rounded-[24px] cursor-pointer transition-all ${formData.paymentMethod === 'paypal' ? 'border-primary bg-primary/5 shadow-lg shadow-primary/5' : 'border-border bg-white hover:border-secondary/30'
                          }`}
                      >
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mb-6 ${formData.paymentMethod === 'paypal' ? 'border-primary' : 'border-border'}`}>
                          {formData.paymentMethod === 'paypal' && <div className="w-3 h-3 bg-primary rounded-full" />}
                        </div>
                        <p className="font-bold text-lg mb-1">Digital Payment</p>
                        <p className="text-xs text-secondary font-medium uppercase tracking-widest">Secure PayPal / Cards</p>
                      </div>
                    </div>

                    {formData.paymentMethod === 'paypal' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-8 bg-[#F5F5F5] rounded-[32px] border border-border"
                      >
                        <PayPalButtons
                          style={{ layout: "vertical", shape: "pill" }}
                          createOrder={(data, actions) => actions.order.create({ purchase_units: [{ amount: { value: total.toString() } }] })}
                          onApprove={async (data, actions) => {
                            const details = await actions.order.capture();
                            await handleOrderSuccess(details);
                          }}
                        />
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ACTION BUTTONS */}
              <div className="flex items-center gap-4 pt-10 border-t border-border">
                {step === 2 && (
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-10 h-14 border border-border rounded-full font-bold text-[13px] uppercase tracking-widest hover:bg-background transition-all active:scale-95"
                  >
                    Go Back
                  </button>
                )}
                {(step === 1 || formData.paymentMethod === 'cod') && (
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 h-16 bg-foreground text-white rounded-full font-bold text-[14px] uppercase tracking-[0.2em] hover:bg-primary transition-all shadow-xl shadow-foreground/10 active:scale-95 flex items-center justify-center gap-3"
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : (
                      <>
                        {step === 1 ? 'Continue to Payment' : 'Complete Purchase'}
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* ORDER SUMMARY SIDEBAR */}
          <div className="lg:col-span-1 sticky top-24">
            <div className="bg-[#F5F5F5] border border-border rounded-[32px] p-8 md:p-10 shadow-sm relative overflow-hidden">
              <h3 className="text-lg font-bold mb-8 flex items-center gap-2">
                <Package size={20} className="text-primary" /> Order Summary
              </h3>

              <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto no-scrollbar pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-bold text-foreground line-clamp-1">{item.name}</p>
                      <p className="text-[11px] text-secondary font-bold uppercase tracking-widest mt-1">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-[14px] text-foreground">${(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-8 border-t border-border">
                <div className="flex justify-between text-[14px] font-medium text-secondary">
                  <span>Subtotal</span>
                  <span className="text-foreground">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[14px] font-medium text-secondary">
                  <span>Shipping</span>
                  <span className="text-emerald-500 font-bold uppercase text-[11px] tracking-widest">Free</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-border">
                  <span className="text-lg font-bold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-primary">${total.toLocaleString()}</span>
                </div>
              </div>

              {/* SECURITY BADGE */}
              <div className="mt-10 flex items-center justify-center gap-2.5 py-3 px-4 bg-white border border-border rounded-2xl">
                <Lock size={14} className="text-primary" />
                <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.1em]">256-bit SSL Encrypted</span>
              </div>

              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 blur-2xl" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

