import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import {
  User,
  Lock,
  ShoppingBag, ArrowRight,
  Package,
  ChevronRight,
  LogOut,
  ShieldCheck,
  Eye,
  EyeOff,
  Loader2,
  Sparkles,
  LayoutGrid,
  Shield,
  MapPin,
  Phone
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
        showToast("Identity parameters synchronized.");
      }
    } catch (err) {
      showToast("Update sequence failed", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSecurityUpdate = async (e) => {
    e.preventDefault();
    if (securityForm.password !== securityForm.confirmPassword) {
      showToast("Credential mismatch", "error");
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
    <div className="bg-white min-h-screen font-['Rubik'] text-foreground pb-20">
      <SEO title="User Dashboard | Account Management" />

      {/* --- REFINED PAGE HEADER --- */}
      <div className="bg-background border-b border-border py-12 md:py-16 mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-primary/5 skew-x-12 translate-x-1/2" />

        <div className="max-w-[1800px] mx-auto px-6 lg:px-10 flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10">
          <div>
            <nav className="flex items-center gap-2 text-[11px] font-bold text-primary uppercase tracking-[0.4em] mb-6">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <ChevronRight size={14} className="text-border" />
              <span className="text-secondary">Professional Hub</span>
            </nav>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-none tracking-tight">
              Control <span className="text-primary italic">Panel.</span>
            </h1>
          </div>

          <div className="flex items-center gap-3 px-6 py-3 bg-white text-foreground rounded-2xl border border-border shadow-sm">
            <ShieldCheck size={20} className="text-primary" />
            <span className="text-[11px] font-black uppercase tracking-widest text-secondary">Authenticated Stream Active</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 lg:px-10 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">

          {/* --- SIDEBAR PANEL --- */}
          <div className="lg:col-span-4">
            <div className="bg-background p-10 rounded-[3rem] border border-border sticky top-32">
              <div className="flex flex-col items-center text-center mb-12">
                <div className="h-24 w-24 bg-foreground text-white flex items-center justify-center text-3xl font-bold rounded-3xl mb-6 shadow-xl shadow-foreground/10 border-4 border-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-2xl font-bold text-foreground capitalize tracking-tight">{user.name}</h2>
                <p className="text-sm font-medium text-secondary mt-2 uppercase tracking-widest text-[10px]">{user.email}</p>
              </div>

              <div className="space-y-3">
                {[
                  { id: 'profile', label: 'Identity Settings', icon: User },
                  { id: 'orders', label: 'Hardware Logs', icon: Package },
                  { id: 'security', label: 'Access Protocols', icon: Shield }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-4 px-6 py-4 text-[14px] font-bold transition-all rounded-2xl border-2 ${activeTab === tab.id
                      ? 'bg-white text-primary border-primary shadow-xl shadow-primary/5'
                      : 'text-secondary border-transparent hover:bg-white hover:text-foreground hover:border-border'
                      }`}
                  >
                    <tab.icon size={18} />
                    <span className="tracking-tight">{tab.label}</span>
                  </button>
                ))}

                <div className="pt-8 mt-8 border-t border-border">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-4 px-6 py-4 text-[14px] font-bold text-red-500 hover:bg-red-50 transition-all rounded-2xl group"
                  >
                    <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Terminate Session
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* --- MAIN STAGE PANEL --- */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div
                  key="profile" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
                  className="bg-white p-8 md:p-16 rounded-[3rem] border border-border/60 shadow-sm"
                >
                  <div className="flex items-center gap-5 mb-16 pb-8 border-b border-background">
                    <div className="h-14 w-14 bg-background text-primary flex items-center justify-center rounded-2xl border border-border">
                      <User size={28} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground tracking-tight">Identity Parameters</h3>
                      <p className="text-[11px] font-bold text-secondary uppercase tracking-[0.2em] mt-1">Update your verified contact data</p>
                    </div>
                  </div>

                  <form onSubmit={handleProfileUpdate} className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[11px] font-black text-secondary uppercase tracking-[0.2em] ml-4">Full Identifier</label>
                        <input
                          required value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="w-full h-16 px-8 bg-background border border-border rounded-2xl focus:bg-white focus:border-primary outline-none text-[15px] font-medium text-foreground transition-all"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[11px] font-black text-secondary uppercase tracking-[0.2em] ml-4">Communication Line</label>
                        <input
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                          placeholder="+1 (000) 000-0000"
                          className="w-full h-16 px-8 bg-background border border-border rounded-2xl focus:bg-white focus:border-primary outline-none text-[15px] font-medium text-foreground transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-secondary uppercase tracking-[0.2em] ml-4">Standard Deployment Address</label>
                      <textarea
                        rows="4" value={profileForm.address}
                        onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                        placeholder="Complete logistics coordinates..."
                        className="w-full p-8 bg-background border border-border rounded-[2.5rem] focus:bg-white focus:border-primary outline-none text-[15px] font-medium text-foreground transition-all resize-none"
                      ></textarea>
                    </div>
                    <button
                      disabled={isUpdating}
                      className="h-16 px-12 bg-foreground text-white font-bold text-sm uppercase tracking-widest rounded-2xl hover:bg-primary transition-all disabled:opacity-50 shadow-xl shadow-foreground/10 flex items-center gap-3"
                    >
                      {isUpdating ? "Synchronizing..." : "Commit Changes"}
                      {!isUpdating && <ArrowRight size={18} />}
                    </button>
                  </form>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div
                  key="orders" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
                  className="space-y-8"
                >
                  <div className="bg-white p-10 md:p-12 rounded-[3rem] border border-border/60 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                      <div className="h-14 w-14 bg-background text-primary flex items-center justify-center rounded-2xl border border-border">
                        <Package size={28} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground tracking-tight">Deployment Logs</h3>
                        <p className="text-[11px] font-bold text-secondary uppercase tracking-[0.2em] mt-1">{orders.length} Active Procurements</p>
                      </div>
                    </div>
                    <Link to="/shop" className="h-12 px-6 flex items-center justify-center bg-background text-[11px] font-bold text-primary uppercase tracking-widest rounded-xl border border-border hover:bg-primary hover:text-white transition-all">New Acquisition</Link>
                  </div>

                  {orders.length === 0 ? (
                    <div className="bg-background p-24 text-center rounded-[3rem] border border-border">
                      <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-border shadow-sm">
                        <LayoutGrid size={32} className="text-border" />
                      </div>
                      <p className="text-secondary font-bold uppercase text-[11px] tracking-[0.3em]">No hardware records in current stream.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-6">
                      {orders.map((order) => (
                        <div key={order.id} className="bg-white border border-border/60 rounded-[2.5rem] overflow-hidden group hover:border-primary/30 transition-all duration-500 shadow-sm">
                          <div className="p-10 flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-background">
                            <div>
                              <p className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] mb-3">Unit ID #DSP-{order.id}</p>
                              <span className={`px-4 py-1.5 text-[10px] font-bold uppercase rounded-lg border ${order.status === 'delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-primary border-blue-100'}`}>
                                {order.status}
                              </span>
                            </div>
                            <div className="md:text-right space-y-1">
                              <p className="text-3xl font-black text-foreground tracking-tighter">${Number(order.total_amount).toLocaleString()}</p>
                              <p className="text-[11px] font-bold text-secondary uppercase tracking-widest">{new Date(order.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                            </div>
                          </div>
                          <div className="p-6 bg-background/50 group-hover:bg-white transition-colors">
                            <Link to={`/checkout?order_id=${order.id}`} className="flex items-center justify-center gap-3 text-[11px] font-bold text-foreground uppercase tracking-widest hover:text-primary transition-all group/btn">
                              <span>Track Hardware Status</span> <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
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
                  className="bg-white p-8 md:p-16 rounded-[3rem] border border-border/60 shadow-sm"
                >
                  <div className="flex items-center gap-5 mb-16 pb-8 border-b border-background">
                    <div className="h-14 w-14 bg-red-50 text-red-500 flex items-center justify-center rounded-2xl border border-red-100">
                      <Shield size={28} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground tracking-tight">Access Protocols</h3>
                      <p className="text-[11px] font-bold text-secondary uppercase tracking-[0.2em] mt-1">Manage your authentication layer</p>
                    </div>
                  </div>

                  <form onSubmit={handleSecurityUpdate} className="space-y-10">
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-secondary uppercase tracking-[0.2em] ml-4">New Protocol Code</label>
                      <div className="relative group">
                        <input
                          type={showPass ? "text" : "password"} required
                          placeholder="••••••••"
                          value={securityForm.password} onChange={(e) => setSecurityForm({ ...securityForm, password: e.target.value })}
                          className="w-full h-16 pl-8 pr-16 bg-background border border-border rounded-2xl focus:bg-white focus:border-primary outline-none text-[15px] font-medium text-foreground transition-all"
                        />
                        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-6 top-1/2 -translate-y-1/2 text-border hover:text-primary transition-colors">
                          {showPass ? <EyeOff size={22} /> : <Eye size={22} />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-secondary uppercase tracking-[0.2em] ml-4">Verify Access Key</label>
                      <input
                        type={showPass ? "text" : "password"} required
                        placeholder="••••••••"
                        value={securityForm.confirmPassword} onChange={(e) => setSecurityForm({ ...securityForm, confirmPassword: e.target.value })}
                        className="w-full h-16 px-8 bg-background border border-border rounded-2xl focus:bg-white focus:border-primary outline-none text-[15px] font-medium text-foreground transition-all"
                      />
                    </div>
                    <button
                      disabled={isUpdating}
                      className="h-16 px-12 bg-foreground text-white font-bold text-sm uppercase tracking-widest rounded-2xl hover:bg-primary transition-all disabled:opacity-50 shadow-xl shadow-foreground/10 flex items-center gap-3"
                    >
                      {isUpdating ? "Encoding..." : "Update Security Credentials"}
                      {!isUpdating && <ShieldCheck size={18} />}
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

