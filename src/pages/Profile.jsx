import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import {
  User,
  Lock,
  ShoppingBag,
  Package,
  ChevronRight,
  LogOut,
  ShieldCheck,
  Eye,
  EyeOff,
  Loader2,
  Sparkles
} from 'lucide-react';

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
    address: user?.address || ''
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
        showToast("System profile updated.");
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
      showToast("Mismatch in credentials", "error");
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
        showToast("Protocol updated.");
        setSecurityForm({ password: '', confirmPassword: '' });
      }
    } catch (err) {
      showToast("Update failed", "error");
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
    <div className="bg-white min-h-screen font-['Rubik'] text-slate-900 pb-20">

      {/* --- PAGE HEADER --- */}
      <div className="bg-slate-50 border-b border-slate-100 py-12 md:py-16 mb-16">
        <div className="max-w-full mx-auto px-4 md:px-6 xl:px-26 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <nav className="flex items-center gap-2 text-[12px] font-bold text-[#FF2D37] uppercase tracking-[3px] mb-4">
              <Link to="/" className="hover:text-slate-950 transition-colors">Home</Link>
              <ChevronRight size={14} className="text-slate-300" />
              <span className="text-slate-400">My Profile</span>
            </nav>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-none tracking-tight capitalize">
              Account dashboard
            </h1>
          </div>

          <div className="flex items-center gap-2 px-5 py-2.5 bg-white text-[#FF2D37] rounded-2xl border border-slate-100 shadow-sm">
            <ShieldCheck size={18} />
            <span className="text-[11px] font-black uppercase tracking-widest">Authenticated Session</span>
          </div>
        </div>
      </div>

      <div className="max-w-full mx-auto px-4 md:px-6 xl:px-26 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Sidebar Modular Panel */}
          <div className="lg:col-span-4">
            <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 sticky top-32">
              <div className="flex flex-col items-center text-center mb-12">
                <div className="h-24 w-24 bg-slate-900 text-white flex items-center justify-center text-3xl font-black rounded-3xl mb-6 shadow-xl shadow-slate-200">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-2xl font-black text-slate-900 capitalize">{user.name}</h2>
                <p className="text-sm font-medium text-slate-400 mt-2">{user.email}</p>
              </div>

              <div className="space-y-3">
                {[
                  { id: 'profile', label: 'Identity settings', icon: User },
                  { id: 'orders', label: 'Order history', icon: ShoppingBag },
                  { id: 'security', label: 'Access protocols', icon: Lock }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-4 px-6 py-4 text-[15px] font-bold transition-all rounded-2xl border ${activeTab === tab.id
                      ? 'bg-white text-[#FF2D37] border-[#FF2D37]/20 shadow-xl shadow-slate-100'
                      : 'text-slate-500 bg-transparent border-transparent hover:bg-white hover:text-slate-900'
                      }`}
                  >
                    <tab.icon size={20} />
                    <span className="capitalize">{tab.label}</span>
                  </button>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 px-6 py-4 text-[15px] font-bold text-red-500 hover:bg-red-50 transition-all rounded-2xl mt-10"
                >
                  <LogOut size={20} />
                  Terminate Session
                </button>
              </div>
            </div>
          </div>

          {/* Main Stage Panel */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div
                  key="profile" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
                  className="bg-white p-8 md:p-16 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-100"
                >
                  <div className="flex items-center gap-4 mb-16 pb-8 border-b border-slate-100">
                    <div className="h-14 w-14 bg-slate-50 text-[#FF2D37] flex items-center justify-center rounded-2xl">
                      <User size={28} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-950 capitalize">Personal identity</h3>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">Update your verified contact data</p>
                    </div>
                  </div>

                  <form onSubmit={handleProfileUpdate} className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-4">Display name</label>
                        <input
                          required value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="w-full h-16 px-8 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-[#FF2D37] outline-none text-[15px] font-bold text-slate-900 transition-all shadow-inner"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-4">Phone link</label>
                        <input
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                          className="w-full h-16 px-8 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-[#FF2D37] outline-none text-[15px] font-bold text-slate-900 transition-all shadow-inner"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-4">Default address</label>
                      <textarea
                        rows="4" value={profileForm.address}
                        onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                        className="w-full p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] focus:bg-white focus:border-[#FF2D37] outline-none text-[15px] font-bold text-slate-900 transition-all resize-none shadow-inner"
                      ></textarea>
                    </div>
                    <button
                      disabled={isUpdating}
                      className="h-16 px-12 bg-slate-950 text-white font-bold text-sm uppercase tracking-widest rounded-2xl hover:bg-[#FF2D37] transition-all disabled:opacity-50 shadow-xl shadow-slate-200"
                    >
                      {isUpdating ? "Syncing..." : "Apply Changes"}
                    </button>
                  </form>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div
                  key="orders" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
                  className="space-y-8"
                >
                  <div className="bg-white p-10 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 bg-slate-50 text-[#FF2D37] flex items-center justify-center rounded-2xl">
                        <ShoppingBag size={28} strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-slate-950 capitalize">Orders</h3>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">{orders.length} active records</p>
                      </div>
                    </div>
                    <Link to="/shop" className="text-xs font-black text-[#FF2D37] uppercase tracking-widest hover:underline">New Acquisition</Link>
                  </div>

                  {orders.length === 0 ? (
                    <div className="bg-slate-50 p-24 text-center rounded-[3rem] border border-slate-100">
                      <Package size={48} className="text-slate-300 mx-auto mb-8" />
                      <p className="text-slate-400 font-bold uppercase text-[11px] tracking-widest">No procurement records found.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-6">
                      {orders.map((order) => (
                        <div key={order.id} className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden group hover:border-[#FF2D37]/20 transition-all hover:shadow-2xl hover:shadow-slate-100">
                          <div className="p-10 flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-slate-50">
                            <div>
                              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">ID #PTP-{order.id}</p>
                              <span className={`px-4 py-1.5 text-[10px] font-black uppercase rounded-full border ${order.status === 'delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-600 border-slate-100'}`}>
                                {order.status}
                              </span>
                            </div>
                            <div className="md:text-right space-y-1">
                              <p className="text-2xl font-black text-slate-950">${order.total_amount}</p>
                              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{new Date(order.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                            </div>
                          </div>
                          <div className="p-6 bg-slate-50 border-t border-slate-50">
                            <Link to="/orders" className="flex items-center justify-center gap-3 text-xs font-black text-slate-950 uppercase tracking-widest hover:text-[#FF2D37] transition-all group">
                              <span>Track Shipment</span> <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div
                  key="security" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
                  className="bg-white p-8 md:p-16 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-100"
                >
                  <div className="flex items-center gap-4 mb-16 pb-8 border-b border-slate-100">
                    <div className="h-14 w-14 bg-red-50 text-red-500 flex items-center justify-center rounded-2xl">
                      <Lock size={28} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-950 capitalize">Access protocols</h3>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">Manage your authentication layer</p>
                    </div>
                  </div>

                  <form onSubmit={handleSecurityUpdate} className="space-y-10">
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-4">New protocol code</label>
                      <div className="relative">
                        <input
                          type={showPass ? "text" : "password"} required
                          value={securityForm.password} onChange={(e) => setSecurityForm({ ...securityForm, password: e.target.value })}
                          className="w-full h-16 pl-8 pr-16 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-[#FF2D37] outline-none text-[15px] font-bold text-slate-900 transition-all shadow-inner"
                        />
                        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#FF2D37]">
                          {showPass ? <EyeOff size={22} /> : <Eye size={22} />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-4">Verify protocol</label>
                      <input
                        type={showPass ? "text" : "password"} required
                        value={securityForm.confirmPassword} onChange={(e) => setSecurityForm({ ...securityForm, confirmPassword: e.target.value })}
                        className="w-full h-16 pl-8 pr-8 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-[#FF2D37] outline-none text-[15px] font-bold text-slate-900 transition-all shadow-inner"
                      />
                    </div>
                    <button
                      disabled={isUpdating}
                      className="h-16 px-12 bg-slate-950 text-white font-bold text-sm uppercase tracking-widest rounded-2xl hover:bg-[#FF2D37] transition-all disabled:opacity-50 shadow-xl shadow-slate-200"
                    >
                      {isUpdating ? "Processing..." : "Update Credentials"}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
