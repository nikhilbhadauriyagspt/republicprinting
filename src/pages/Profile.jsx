import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import {
  User,
  Lock,
  ArrowRight,
  Package,
  ChevronRight,
  LogOut,
  ShieldCheck,
  Eye,
  EyeOff,
  Loader2,
  Settings,
  Shield,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink
} from 'lucide-react';
import SEO from '@/components/SEO';

export default function Profile() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'orders', 'security'
  const [isUpdating, setIsUpdating] = useState(false);
  const { showToast } = useCart();
  const navigate = useNavigate();

  // Form states
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    zipCode: user?.zip_code || user?.zipCode || ''
  });
  const [securityForm, setSecurityForm] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders?user_id=${user.id}`);
      const data = await response.json();
      if (data.status === 'success') setOrders(data.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileForm)
      });
      const data = await response.json();
      if (data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(data.data));
        setUser(data.data);
        showToast("Profile updated successfully.");
      }
    } catch (err) {
      showToast("Update failed", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSecurityUpdate = async (e) => {
    e.preventDefault();
    if (securityForm.password !== securityForm.confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }
    setIsUpdating(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: securityForm.password })
      });
      const data = await response.json();
      if (data.status === 'success') {
        showToast("Security updated.");
        setSecurityForm({ password: '', confirmPassword: '' });
      }
    } catch (err) {
      showToast("Sync failed", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-['Rubik'] text-[#1D4ED8] pb-20">
      <SEO title="Your Account | Republic Printing" />

      {/* --- PAGE HEADER --- */}
      <div className="bg-white border-b border-gray-200 py-8 md:py-12 mb-12 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <nav className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">
            <Link to="/" className="hover:text-[#4f46e5] transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-[#1D4ED8]">Account Management</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Your Dashboard</h1>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* --- SIDEBAR --- */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-[#1D4ED8]/5">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="h-20 w-20 bg-gradient-to-br from-[#1D4ED8] to-[#4f46e5] text-white flex items-center justify-center text-2xl font-bold rounded-2xl mb-4 shadow-lg shadow-[#1D4ED8]/20">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-xl font-bold tracking-tight">{user.name}</h2>
                <div className="flex items-center gap-1.5 text-gray-500 text-[13px] mt-1">
                  <Mail size={14} />
                  <span>{user.email}</span>
                </div>
              </div>

              <div className="space-y-2">
                {[
                  { id: 'profile', label: 'Personal Information', icon: User },
                  { id: 'orders', label: 'Order History', icon: Package },
                  { id: 'security', label: 'Security & Password', icon: Shield }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-5 py-3.5 text-[14px] font-bold transition-all rounded-xl border cursor-pointer ${activeTab === tab.id
                      ? 'bg-[#013E24] text-white border-[#1D4ED8] shadow-lg shadow-[#1D4ED8]/10'
                      : 'text-gray-600 border-transparent hover:bg-gray-50 hover:text-[#1D4ED8]'
                      }`}
                  >
                    <tab.icon size={18} />
                    <span>{tab.label}</span>
                  </button>
                ))}

                <div className="pt-6 mt-6 border-t border-gray-100">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-5 py-3.5 text-[14px] font-bold text-red-500 hover:bg-red-50 transition-all rounded-xl cursor-pointer group"
                  >
                    <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-[#013E24] text-white p-8 rounded-3xl relative overflow-hidden group">
              <div className="relative z-10">
                <div className="bg-[#f59e0b] text-[#1D4ED8] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest mb-4 inline-block">Support</div>
                <h4 className="text-lg font-bold mb-2 leading-snug">Need help with your printer?</h4>
                <p className="text-white/60 text-[13px] leading-relaxed mb-6">Our tech experts are available 24/7 to assist with setup and troubleshooting.</p>
                <Link to="/contact" className="inline-flex items-center gap-2 text-[13px] font-bold text-[#f59e0b] hover:text-white transition-colors">
                  Get Support <ArrowRight size={16} />
                </Link>
              </div>
              <ShieldCheck size={140} className="absolute -right-8 -bottom-8 text-white opacity-[0.03] rotate-12 group-hover:scale-110 transition-transform duration-700" />
            </div>
          </aside>

          {/* --- MAIN CONTENT --- */}
          <main className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div
                  key="profile" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                  className="bg-white p-8 md:p-12 rounded-[2rem] border border-gray-100 shadow-xl shadow-[#1D4ED8]/5"
                >
                  <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-50">
                    <div className="h-12 w-12 bg-[#1D4ED8]/5 text-[#1D4ED8] flex items-center justify-center rounded-xl">
                      <User size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Personal Information</h3>
                      <p className="text-[12px] font-medium text-gray-400 mt-0.5 uppercase tracking-widest">Update your contact and shipping details</p>
                    </div>
                  </div>

                  <form onSubmit={handleProfileUpdate} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-[13px] font-bold text-gray-500 ml-1">Full Name</label>
                        <input
                          required value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#4f46e5] outline-none text-sm font-medium transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[13px] font-bold text-gray-500 ml-1">Phone Number</label>
                        <input
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                          placeholder="+1 (000) 000-0000"
                          className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#4f46e5] outline-none text-sm font-medium transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[13px] font-bold text-gray-500 ml-1">Delivery Address</label>
                      <textarea
                        rows="3" value={profileForm.address}
                        onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                        placeholder="Street address, building, suite..."
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#4f46e5] outline-none text-sm font-medium transition-all resize-none"
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-[13px] font-bold text-gray-500 ml-1">City</label>
                        <input
                          value={profileForm.city}
                          onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                          className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#4f46e5] outline-none text-sm font-medium transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[13px] font-bold text-gray-500 ml-1">Zip Code</label>
                        <input
                          value={profileForm.zipCode}
                          onChange={(e) => setProfileForm({ ...profileForm, zipCode: e.target.value })}
                          className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#4f46e5] outline-none text-sm font-medium transition-all"
                        />
                      </div>
                    </div>

                    <button
                      disabled={isUpdating}
                      className="h-12 px-10 bg-[#013E24] text-white font-bold text-[13px] uppercase tracking-widest rounded-xl hover:bg-[#4f46e5] transition-all disabled:opacity-50 shadow-lg shadow-[#1D4ED8]/10 flex items-center gap-3 cursor-pointer active:scale-95"
                    >
                      {isUpdating ? <Loader2 className="animate-spin" size={18} /> : "Save Changes"}
                    </button>
                  </form>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div
                  key="orders" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-[#1D4ED8]/5 text-[#1D4ED8] flex items-center justify-center rounded-xl">
                        <Package size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">Recent Orders</h3>
                        <p className="text-[12px] font-medium text-gray-400 mt-0.5 uppercase tracking-widest">{orders.length} orders found</p>
                      </div>
                    </div>
                    <Link to="/shop" className="text-[13px] font-bold text-[#4f46e5] hover:underline flex items-center gap-1.5 group">
                      Browse Catalog <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {orders.length === 0 ? (
                    <div className="bg-white py-20 text-center rounded-[2rem] border border-gray-100 border-dashed">
                      <Package size={40} className="text-gray-200 mx-auto mb-4" />
                      <p className="text-gray-400 font-bold uppercase text-[11px] tracking-widest">No order history available.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {orders.slice(0, 5).map((order) => (
                        <div key={order.id} className="bg-white border border-gray-100 rounded-[1.5rem] p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-lg transition-all group">
                          <div className="flex items-center gap-5 w-full md:w-auto">
                            <div className="h-14 w-14 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center text-[#1D4ED8] group-hover:bg-[#013E24]group-hover:text-white transition-all duration-500">
                              <Clock size={24} />
                            </div>
                            <div>
                              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">#DSP-{order.id}</p>
                              <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${order.status === 'delivered' ? 'bg-emerald-500' : 'bg-[#f59e0b]'}`} />
                                <span className="text-sm font-bold capitalize">{order.status.replace(/_/g, ' ')}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between w-full md:w-auto md:gap-12">
                            <div className="text-right">
                              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">{new Date(order.created_at).toLocaleDateString()}</p>
                              <p className="text-lg font-black tracking-tight">${Number(order.total_amount).toLocaleString()}</p>
                            </div>
                            <Link to="/orders" className="h-10 w-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-[#013E24]hover:text-white hover:border-[#1D4ED8] transition-all">
                              <ExternalLink size={18} />
                            </Link>
                          </div>
                        </div>
                      ))}

                      <Link to="/orders" className="block text-center py-4 text-[13px] font-bold text-[#4f46e5] hover:underline uppercase tracking-widest">
                        View All Orders History
                      </Link>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div
                  key="security" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                  className="bg-white p-8 md:p-12 rounded-[2rem] border border-gray-100 shadow-xl shadow-[#1D4ED8]/5"
                >
                  <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-50">
                    <div className="h-12 w-12 bg-red-50 text-red-500 flex items-center justify-center rounded-xl">
                      <Shield size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Account Security</h3>
                      <p className="text-[12px] font-medium text-gray-400 mt-0.5 uppercase tracking-widest">Manage your login credentials</p>
                    </div>
                  </div>

                  <form onSubmit={handleSecurityUpdate} className="space-y-8">
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-bold text-gray-500 ml-1">New Password</label>
                      <div className="relative group">
                        <input
                          type={showPass ? "text" : "password"} required
                          placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                          value={securityForm.password} onChange={(e) => setSecurityForm({ ...securityForm, password: e.target.value })}
                          className="w-full h-12 pl-4 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#4f46e5] outline-none text-sm font-medium transition-all"
                        />
                        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1D4ED8] cursor-pointer transition-colors">
                          {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-bold text-gray-500 ml-1">Confirm New Password</label>
                      <input
                        type={showPass ? "text" : "password"} required
                        placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                        value={securityForm.confirmPassword} onChange={(e) => setSecurityForm({ ...securityForm, confirmPassword: e.target.value })}
                        className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#4f46e5] outline-none text-sm font-medium transition-all"
                      />
                    </div>
                    <button
                      disabled={isUpdating}
                      className="h-12 px-10 bg-[#013E24] text-white font-bold text-[13px] uppercase tracking-widest rounded-xl hover:bg-red-600 transition-all disabled:opacity-50 shadow-lg shadow-[#1D4ED8]/10 flex items-center gap-3 cursor-pointer active:scale-95"
                    >
                      {isUpdating ? <Loader2 className="animate-spin" size={18} /> : "Update Security"}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </main>

        </div>
      </div>
    </div>
  );
}

