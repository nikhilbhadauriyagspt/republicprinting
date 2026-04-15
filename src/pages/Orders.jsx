import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Package, ChevronRight, ChevronDown, Search, Loader2, Calendar, CreditCard, Truck, X, CheckCircle2, Clock, MapPin, Info, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';

export default function Orders() {
  const { addToCart } = useCart();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [guestEmail, setGuestEmail] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const statusMap = [
    { key: 'pending', label: 'Order placed', icon: Clock, desc: 'We have received your order' },
    { key: 'processing', label: 'Processing', icon: Package, desc: 'Your items are being prepared' },
    { key: 'shipped', label: 'Shipped', icon: Truck, desc: 'Package has left our facility' },
    { key: 'out_for_delivery', label: 'Out for delivery', icon: MapPin, desc: 'Courier is on the way' },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle2, desc: 'Successfully delivered' }
  ];

  const getStatusIndex = (status) => statusMap.findIndex(s => s.key === status);

  const fetchOrders = async (email = null) => {
    setLoading(true);
    setHasSearched(true);
    try {
      const identifier = user ? `user_id=${user.id}` : `email=${email}`;
      const response = await fetch(`${API_BASE_URL}/orders?${identifier}`);
      const data = await response.json();
      if (data.status === 'success') {
        setOrders(data.data);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchOrders();
  }, []);

  const handleGuestSearch = (e) => {
    e.preventDefault();
    if (guestEmail) fetchOrders(guestEmail);
  };

  if (!user && !hasSearched) {
    return (
      <div className="min-h-screen bg-[#eaeded] font-['Rubik'] text-[#0f1111] pb-20">
        <SEO title="Track Your Order | Republic Printing" />

        {/* --- BREADCRUMBS --- */}
        <div className="bg-white border-b border-gray-300 py-3 shadow-sm">
          <div className="max-w-[1200px] mx-auto px-4 md:px-8">
            <nav className="flex items-center gap-1 text-[12px] text-[#565959]">
              <Link to="/" className="hover:underline hover:text-[#c45500]">Home</Link>
              <ChevronRight size={12} className="mx-1" />
              <span className="text-[#0f1111] font-bold">Track Order</span>
            </nav>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-4 md:px-8 pt-12 md:pt-20 text-center">
          <div className="bg-white p-8 md:p-12 border border-gray-300 rounded-md shadow-sm max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-[#f0f2f2] text-[#232f3e] rounded-full flex items-center justify-center mx-auto mb-6">
              <Package size={32} />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Track Your Order</h1>
            <p className="text-[#565959] text-[14px] mb-8">Enter the email address used during checkout to view your order status and history.</p>

            <form onSubmit={handleGuestSearch} className="space-y-4 text-left">
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold ml-0.5">Email Address</label>
                <input
                  required type="email"
                  placeholder="example@email.com"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="w-full h-11 px-4 bg-white border border-gray-400 rounded-sm outline-none focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600] transition-all text-sm"
                />
              </div>
              <button
                disabled={loading}
                className="w-full h-11 bg-[#ffd814] border border-[#fcd200] hover:bg-[#f7ca00] text-[#0f1111] rounded-md font-normal text-[14px] shadow-sm disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Continue'}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-[#565959]">Have an account? <Link to="/login" className="text-[#007185] font-bold hover:underline hover:text-[#c45500]">Sign In</Link></p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eaeded] font-['Rubik'] text-[#0f1111] pb-20">
      <SEO title="Your Orders | Republic Printing" />

      {/* --- BREADCRUMBS --- */}
      <div className="bg-white border-b border-gray-300 py-3 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <nav className="flex items-center gap-1 text-[12px] text-[#565959]">
            <Link to="/" className="hover:underline hover:text-[#c45500]">Home</Link>
            <ChevronRight size={12} className="mx-1" />
            <span className="text-[#0f1111] font-bold">Your Orders</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <h1 className="text-3xl font-normal">Your Orders</h1>
          <div className="flex items-center gap-2 text-sm text-[#565959]">
            <span className="font-bold text-[#0f1111]">{orders.length} orders</span> placed in the last 6 months
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-gray-300 rounded-md">
            <Loader2 className="animate-spin h-10 w-10 text-[#e77600] mb-4" />
            <p className="text-sm font-medium text-[#565959]">Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white border border-gray-300 rounded-md p-12 text-center shadow-sm">
            <Package size={48} className="text-gray-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No orders found</h3>
            <p className="text-[#565959] mb-8">You haven't placed any orders with this email yet.</p>
            <Link to="/shop" className="bg-[#ffd814] border border-[#fcd200] hover:bg-[#f7ca00] text-[#0f1111] px-10 py-2.5 text-[14px] font-medium rounded-md shadow-sm transition-colors cursor-pointer inline-flex items-center gap-2">
              Continue Shopping <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white border border-gray-300 rounded-md overflow-hidden shadow-sm transition-shadow hover:shadow-md">
                {/* Order Header Bar */}
                <div className="bg-[#f0f2f2] border-b border-gray-300 px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-[12px]">
                  <div>
                    <p className="text-[#565959] uppercase font-bold tracking-tight mb-1">Order Placed</p>
                    <p className="text-[#0f1111] font-medium">{new Date(order.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                  <div>
                    <p className="text-[#565959] uppercase font-bold tracking-tight mb-1">Total</p>
                    <p className="text-[#0f1111] font-medium">${Number(order.total_amount).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-[#565959] uppercase font-bold tracking-tight mb-1">Ship To</p>
                    <div className="group relative cursor-pointer">
                      <p className="text-[#007185] font-bold hover:underline flex items-center gap-1">{order.firstName || 'Customer'} <ChevronDown size={14} /></p>
                      <div className="absolute top-full left-0 mt-2 w-48 p-3 bg-white border border-gray-200 shadow-xl rounded-sm hidden group-hover:block z-10 text-[#0f1111]">
                        <p className="font-bold mb-1">{order.firstName} {order.lastName}</p>
                        <p>{order.address}</p>
                        <p>{order.city}, {order.zipCode}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[#565959] uppercase font-bold tracking-tight mb-1">Order #DSP-{order.id}</p>
                    <div className="flex flex-col md:flex-row md:items-center justify-end gap-2">
                      <Link to={`/checkout?order_id=${order.id}`} className="text-[#007185] hover:text-[#c45500] hover:underline font-medium">Order Details</Link>
                      <span className="hidden md:inline text-gray-300">|</span>
                      <button className="text-[#007185] hover:text-[#c45500] hover:underline font-medium cursor-pointer">Invoice</button>
                    </div>
                  </div>
                </div>

                {/* Order Body */}
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1 space-y-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-2.5 h-2.5 rounded-full ${order.status === 'delivered' ? 'bg-emerald-600' : 'bg-[#e77600]'}`} />
                        <h3 className="text-lg font-bold capitalize">Status: {order.status.replace(/_/g, ' ')}</h3>
                      </div>

                      <div className="space-y-4">
                        {order.items && order.items.map((item, idx) => (
                          <div key={idx} className="flex gap-4 group">
                            <div className="w-16 h-16 bg-white border border-gray-200 rounded-sm p-1 shrink-0">
                              <img src="/logo/fabicon.png" alt="" className="w-full h-full object-contain mix-blend-multiply" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <Link to={`/product/${item.slug}`} className="text-[14px] font-bold text-[#007185] hover:text-[#c45500] hover:underline leading-tight line-clamp-2">{item.product_name || 'Printer System'}</Link>
                              <p className="text-[12px] text-[#565959] mt-1">Quantity: {item.quantity}</p>
                              <div className="mt-3">
                                <button
                                  onClick={() => addToCart({ ...item, name: item.product_name, id: item.product_id })}
                                  className="bg-[#ffd814] border border-[#fcd200] hover:bg-[#f7ca00] text-[#0f1111] px-4 py-1 text-[12px] rounded-md shadow-sm transition-colors cursor-pointer mr-3"
                                >
                                  Buy it again
                                </button>
                                <Link
                                  to={`/product/${item.slug}`}
                                  className="inline-flex items-center bg-white border border-gray-300 hover:bg-gray-50 text-[#0f1111] px-4 py-1 text-[12px] rounded-md shadow-sm transition-colors cursor-pointer"
                                >
                                  View item
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Actions Sidebar */}
                    <div className="w-full md:w-64 space-y-3">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="w-full h-9 bg-white border border-gray-300 hover:bg-gray-50 text-[#0f1111] rounded-md shadow-sm text-[13px] font-medium transition-colors cursor-pointer"
                      >
                        Track package
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tracking Modal (Amazon style) */}
        <AnimatePresence>
          {selectedOrder && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedOrder(null)}
                className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-[1000]"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white z-[1001] shadow-2xl rounded-md overflow-hidden font-['Rubik']"
              >
                <div className="bg-[#232f3e] text-white px-6 py-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold">Tracking Status: Order #DSP-{selectedOrder.id}</h2>
                  <button onClick={() => setSelectedOrder(null)} className="p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer">
                    <X size={24} />
                  </button>
                </div>

                <div className="p-8 space-y-8">
                  <div className="relative">
                    <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-gray-100" />

                    {statusMap.map((step, idx) => {
                      const isCompleted = getStatusIndex(selectedOrder.status) >= idx;
                      const isActive = selectedOrder.status === step.key;
                      const Icon = step.icon;

                      return (
                        <div key={step.key} className="relative flex gap-8 pb-8 last:pb-0">
                          <div className={`h-12 w-12 rounded-full flex items-center justify-center z-10 transition-all border-2 ${isCompleted ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-gray-300 text-gray-300'}`}>
                            <Icon size={20} />
                          </div>

                          <div className="flex-1 pt-1">
                            <h4 className={`text-[14px] font-bold ${isCompleted ? 'text-[#0f1111]' : 'text-gray-400'}`}>
                              {step.label}
                            </h4>
                            <p className="text-[12px] text-[#565959] mt-0.5">{step.desc}</p>
                            {isActive && (
                              <div className="mt-2 inline-flex items-center gap-2 px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-sm border border-emerald-100">
                                Current Location
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-[#f0f2f2] p-6 border-t border-gray-300 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm font-bold text-[#0f1111]">
                    <Truck size={18} />
                    <span>Republic Printing Logistics</span>
                  </div>
                  <p className="text-[12px] text-[#565959]">Estimated delivery: <span className="text-[#0f1111] font-bold">2-3 Business Days</span></p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

