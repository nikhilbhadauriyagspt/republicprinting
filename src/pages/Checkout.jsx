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
  Navigation,
  CheckCircle2,
  Package,
  ChevronRight,
  ChevronsRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { PayPalButtons } from "@paypal/react-paypal-js";
import API_BASE_URL from '../config';

export default function Checkout() {
  const { cart, cartCount, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const finalTotal = total;

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

  const [detectingLocation, setDetectingLocation] = useState(false);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );
          const data = await response.json();

          if (data.address) {
            const addr = data.address;
            const streetAddress = [
              addr.house_number,
              addr.road,
              addr.suburb,
              addr.neighbourhood,
            ]
              .filter(Boolean)
              .join(', ');

            setFormData((prev) => ({
              ...prev,
              address: streetAddress || data.display_name,
              city: addr.city || addr.town || addr.village || addr.state || '',
              zipCode: addr.postcode || '',
            }));
          }
        } catch (err) {
          console.error("Location detection error:", err);
          alert("Could not detect address. Please enter it manually.");
        } finally {
          setDetectingLocation(false);
        }
      },
      () => {
        setDetectingLocation(false);
        alert("Location access denied or unavailable.");
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrderSuccess = async (paymentDetails = null) => {
    setLoading(true);
    try {
      const orderData = {
        ...formData,
        address: `${formData.address} (via dashprintershop.com)`,
        user_id: user?.id,
        total: finalTotal,
        items: cart,
        payment_details: paymentDetails,
        source: 'dashprintershop.com',
        notes: `Order from dashprintershop.com | ${formData.notes || ''}`,
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
      } else {
        alert('Error placing order: ' + data.message);
      }
    } catch (err) {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      window.scrollTo(0, 0);
    } else if (formData.paymentMethod === 'cod') {
      await handleOrderSuccess();
    }
  };

  const getItemImage = (item) => {
    try {
      const images =
        typeof item.images === 'string' ? JSON.parse(item.images) : item.images;
      if (Array.isArray(images) && images.length > 0) {
        const first = images[0];
        return String(first).startsWith('/') ? first : `/${first}`;
      }
    } catch { }
    return '/logo/fabicon.png';
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#f5f5f5] font-['Rubik'] text-center">
        <div className="w-16 h-16 bg-white border border-[#e5e5e5] flex items-center justify-center mb-6 rounded-full">
          <Package size={30} className="text-[#c8c8c8]" />
        </div>
        <h2 className="text-[28px] font-bold text-[#222] mb-2">Your cart is empty</h2>
        <p className="text-[#666] mb-8 max-w-md">
          Please add products to your cart before proceeding to checkout.
        </p>
        <Link
          to="/shop"
          className="h-[44px] px-8 bg-[#111] text-white inline-flex items-center justify-center text-[13px] font-semibold uppercase rounded-sm hover:bg-[#ff3b30] transition-all"
        >
          Return To Catalog
        </Link>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#f5f5f5] font-['Rubik'] text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 bg-emerald-50 text-emerald-500 flex items-center justify-center mb-6 border border-emerald-100 rounded-full"
        >
          <CheckCircle2 size={40} strokeWidth={2.2} />
        </motion.div>

        <h1 className="text-[32px] md:text-[40px] font-bold text-[#222] mb-3">
          Order Confirmed
        </h1>
        <p className="text-[#666] text-[15px] md:text-[16px] mb-8 max-w-[560px]">
          Your order has been placed successfully and is now being prepared for dispatch.
        </p>

        <div className="bg-white border border-[#e5e5e5] p-6 md:p-8 mb-8 max-w-md w-full">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#888] mb-3">
            Order Reference
          </p>
          <p className="text-[28px] md:text-[32px] font-bold text-[#ff3b30] tracking-tight">
            #DSP-{orderId || 'PENDING'}
          </p>
        </div>

        <Link
          to="/"
          className="h-[44px] px-8 bg-[#111] text-white inline-flex items-center justify-center text-[13px] font-semibold uppercase rounded-sm hover:bg-[#ff3b30] transition-all"
        >
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] font-['Rubik'] text-[#222] pb-14 md:pb-20">
      {/* PAGE HEADER */}
      <div className="bg-[#f5f5f5] border-b border-[#dddddd]">
        <div className="w-full px-4 md:px-6 xl:px-10 py-8 md:py-10">
          <div className="flex flex-col gap-5">
            <nav className="flex items-center gap-2 text-[12px] font-semibold text-[#7a7a7a]">
              <Link to="/" className="hover:text-[#ff3b30] transition-colors">
                Home
              </Link>
              <ChevronRight size={14} className="text-[#bdbdbd]" />
              <Link to="/cart" className="hover:text-[#ff3b30] transition-colors">
                Cart
              </Link>
              <ChevronRight size={14} className="text-[#bdbdbd]" />
              <span className="text-[#ff3b30]">Checkout</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-[#dddddd] pb-4">
              <div className="flex items-center gap-3">
                <ChevronsRight
                  size={26}
                  className="text-[#ff3b30] shrink-0"
                  strokeWidth={3}
                />
                <h1 className="text-[26px] md:text-[30px] font-extrabold uppercase tracking-tight text-[#1f2937]">
                  Secure Checkout
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 flex items-center justify-center border text-[13px] font-semibold ${step >= 1
                      ? 'bg-[#111] text-white border-[#111]'
                      : 'bg-white text-[#aaa] border-[#dcdcdc]'
                    }`}
                >
                  1
                </div>
                <div className={`w-10 h-[2px] ${step >= 2 ? 'bg-[#ff3b30]' : 'bg-[#dcdcdc]'}`} />
                <div
                  className={`w-9 h-9 flex items-center justify-center border text-[13px] font-semibold ${step >= 2
                      ? 'bg-[#ff3b30] text-white border-[#ff3b30]'
                      : 'bg-white text-[#aaa] border-[#dcdcdc]'
                    }`}
                >
                  2
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4 md:px-6 xl:px-10 py-8 md:py-10">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-10">
          {/* MAIN FORM */}
          <div className="xl:col-span-8">
            <div className="bg-white border border-[#e5e5e5] p-6 md:p-8">
              {step === 1 ? (
                <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                  <div>
                    <div className="flex items-center gap-3 border-b border-[#ededed] pb-4 mb-6">
                      <Mail size={18} className="text-[#ff3b30]" />
                      <h3 className="text-[18px] md:text-[20px] font-extrabold uppercase tracking-tight text-[#222]">
                        Contact Information
                      </h3>
                    </div>

                    <input
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      type="email"
                      placeholder="Email address for order updates"
                      className="w-full h-[48px] px-4 bg-white border border-[#dcdcdc] rounded-sm outline-none text-[14px] font-medium text-[#222] focus:border-[#ff3b30] transition-all placeholder:text-[#999]"
                    />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ededed] pb-4 mb-6">
                      <div className="flex items-center gap-3">
                        <MapPin size={18} className="text-[#ff3b30]" />
                        <h3 className="text-[18px] md:text-[20px] font-extrabold uppercase tracking-tight text-[#222]">
                          Shipping Details
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={detectLocation}
                        disabled={detectingLocation}
                        className="h-[40px] px-4 border border-[#ffd9dc] bg-[#fff5f5] text-[#ff3b30] text-[12px] font-semibold uppercase rounded-sm hover:bg-[#ff3b30] hover:text-white transition-all disabled:opacity-50 inline-flex items-center gap-2"
                      >
                        {detectingLocation ? (
                          <Loader2 className="animate-spin" size={14} />
                        ) : (
                          <Navigation size={14} />
                        )}
                        {detectingLocation ? 'Locating...' : 'Auto Detect'}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                      <input
                        required
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="First name"
                        className="w-full h-[48px] px-4 bg-white border border-[#dcdcdc] rounded-sm outline-none text-[14px] font-medium text-[#222] focus:border-[#ff3b30] transition-all placeholder:text-[#999]"
                      />
                      <input
                        required
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Last name"
                        className="w-full h-[48px] px-4 bg-white border border-[#dcdcdc] rounded-sm outline-none text-[14px] font-medium text-[#222] focus:border-[#ff3b30] transition-all placeholder:text-[#999]"
                      />
                    </div>

                    <div className="mt-5 md:mt-6">
                      <input
                        required
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Complete street address"
                        className="w-full h-[48px] px-4 bg-white border border-[#dcdcdc] rounded-sm outline-none text-[14px] font-medium text-[#222] focus:border-[#ff3b30] transition-all placeholder:text-[#999]"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mt-5 md:mt-6">
                      <input
                        required
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City / Region"
                        className="w-full h-[48px] px-4 bg-white border border-[#dcdcdc] rounded-sm outline-none text-[14px] font-medium text-[#222] focus:border-[#ff3b30] transition-all placeholder:text-[#999]"
                      />
                      <input
                        required
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="Postal code"
                        className="w-full h-[48px] px-4 bg-white border border-[#dcdcdc] rounded-sm outline-none text-[14px] font-medium text-[#222] focus:border-[#ff3b30] transition-all placeholder:text-[#999]"
                      />
                    </div>

                    <div className="mt-5 md:mt-6">
                      <input
                        required
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        type="tel"
                        placeholder="Mobile phone number"
                        className="w-full h-[48px] px-4 bg-white border border-[#dcdcdc] rounded-sm outline-none text-[14px] font-medium text-[#222] focus:border-[#ff3b30] transition-all placeholder:text-[#999]"
                      />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-[#ededed] pb-4 mb-6">
                    <CreditCard size={18} className="text-[#ff3b30]" />
                    <h3 className="text-[18px] md:text-[20px] font-extrabold uppercase tracking-tight text-[#222]">
                      Payment Selection
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                    <div
                      onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      className={`p-6 border cursor-pointer transition-all ${formData.paymentMethod === 'cod'
                          ? 'border-[#ff3b30] bg-[#fff5f5]'
                          : 'border-[#dcdcdc] bg-white hover:border-[#cfcfcf]'
                        }`}
                    >
                      <div className="flex items-center justify-between mb-5">
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.paymentMethod === 'cod'
                              ? 'border-[#ff3b30]'
                              : 'border-[#cfcfcf]'
                            }`}
                        >
                          {formData.paymentMethod === 'cod' && (
                            <div className="w-2.5 h-2.5 rounded-full bg-[#ff3b30]" />
                          )}
                        </div>
                        <Truck
                          size={26}
                          className={
                            formData.paymentMethod === 'cod'
                              ? 'text-[#ff3b30]'
                              : 'text-[#b0b0b0]'
                          }
                        />
                      </div>

                      <h4 className="text-[18px] font-bold text-[#222] mb-2">
                        Cash on Delivery
                      </h4>
                      <p className="text-[13px] text-[#777]">
                        Pay when your order arrives.
                      </p>
                    </div>

                    <div
                      onClick={() => setFormData({ ...formData, paymentMethod: 'paypal' })}
                      className={`p-6 border cursor-pointer transition-all ${formData.paymentMethod === 'paypal'
                          ? 'border-[#ff3b30] bg-[#fff5f5]'
                          : 'border-[#dcdcdc] bg-white hover:border-[#cfcfcf]'
                        }`}
                    >
                      <div className="flex items-center justify-between mb-5">
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.paymentMethod === 'paypal'
                              ? 'border-[#ff3b30]'
                              : 'border-[#cfcfcf]'
                            }`}
                        >
                          {formData.paymentMethod === 'paypal' && (
                            <div className="w-2.5 h-2.5 rounded-full bg-[#ff3b30]" />
                          )}
                        </div>
                        <div className="text-[#222] font-bold text-[24px] italic tracking-tight">
                          PayPal
                        </div>
                      </div>

                      <h4 className="text-[18px] font-bold text-[#222] mb-2">
                        PayPal Express
                      </h4>
                      <p className="text-[13px] text-[#777]">
                        Fast and secure online payment.
                      </p>
                    </div>
                  </div>

                  {formData.paymentMethod === 'paypal' && (
                    <div className="pt-6 border-t border-[#ededed] space-y-6">
                      <div className="bg-[#111] text-white p-6 text-center">
                        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#cfcfcf] mb-3">
                          Secured with SSL Encryption
                        </p>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/10 text-[12px] font-semibold uppercase">
                          <ShieldCheck size={14} className="text-[#ff3b30]" />
                          Protected Checkout
                        </div>
                      </div>

                      <div className="relative z-0">
                        <PayPalButtons
                          style={{ layout: "vertical", shape: "pill", height: 55 }}
                          createOrder={(data, actions) => {
                            return actions.order.create({
                              purchase_units: [
                                {
                                  amount: { value: finalTotal.toString() },
                                  description: `Printer order - ${cartCount} item(s)`,
                                },
                              ],
                            });
                          }}
                          onApprove={async (data, actions) => {
                            const details = await actions.order.capture();
                            await handleOrderSuccess(details);
                          }}
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-[#ededed] mt-8">
                {step === 2 && (
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="h-[44px] px-7 border border-[#dcdcdc] text-[#555] text-[13px] font-semibold uppercase hover:border-[#ff3b30] hover:text-[#ff3b30] transition-all"
                  >
                    Back
                  </button>
                )}

                {(formData.paymentMethod === 'cod' || step === 1) && (
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 h-[44px] bg-[#111] text-white inline-flex items-center justify-center gap-2 text-[13px] font-semibold uppercase hover:bg-[#ff3b30] transition-all disabled:opacity-50 group"
                  >
                    {loading
                      ? 'Finalizing...'
                      : step === 1
                        ? 'Go To Payment'
                        : 'Complete Purchase'}
                    {!loading && (
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* SUMMARY */}
          <div className="xl:col-span-4">
            <div className="bg-white border border-[#e5e5e5] p-6 md:p-8 sticky top-28">
              <div className="flex items-center gap-3 border-b border-[#ededed] pb-4 mb-6">
                <ChevronsRight
                  size={24}
                  className="text-[#ff3b30] shrink-0"
                  strokeWidth={3}
                />
                <h3 className="text-[22px] md:text-[24px] font-extrabold uppercase tracking-tight text-[#222]">
                  Order Summary
                </h3>
              </div>

              <div className="space-y-5 mb-6 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-16 h-16 bg-[#f1f1f1] border border-[#dddddd] flex items-center justify-center shrink-0 p-2">
                      <img
                        src={getItemImage(item)}
                        className="max-w-full max-h-full object-contain"
                        alt={item.name}
                        onError={(e) => {
                          e.currentTarget.src = '/logo/fabicon.png';
                        }}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-[14px] font-medium text-[#222] truncate leading-tight">
                        {item.name}
                      </h4>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[12px] text-[#888] font-medium">
                          Qty: {item.quantity}
                        </span>
                        <span className="text-[14px] font-bold text-[#ff3b30]">
                          ${(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 border-t border-[#ededed] pt-5">
                <div className="flex justify-between items-center text-[13px] text-[#666]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#222]">
                    ${total.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center text-[13px] text-[#666]">
                  <span>Shipping</span>
                  <span className="font-semibold text-[#ff3b30]">
                    Free Delivery
                  </span>
                </div>

                <div className="flex justify-between items-end pt-4 border-t border-[#ededed]">
                  <span className="text-[14px] font-semibold uppercase text-[#222]">
                    Grand Total
                  </span>
                  <span className="text-[30px] font-bold text-[#ff3b30] leading-none tracking-tight">
                    ${finalTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[#fafafa] border border-[#ededed] flex items-center gap-3">
                <Lock size={18} className="text-[#ff3b30] shrink-0" />
                <p className="text-[12px] text-[#666] font-medium leading-relaxed">
                  Your checkout session is protected with secure encryption.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #dddddd;
          border-radius: 999px;
        }
      `}</style>
    </div>
  );
}