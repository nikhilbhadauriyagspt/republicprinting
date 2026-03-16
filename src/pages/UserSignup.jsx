import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Phone, Eye, EyeOff, ArrowRight, Loader2, ShieldCheck, CheckCircle2, ChevronLeft, Sparkles } from 'lucide-react';
import API_BASE_URL from '../config';

export default function UserSignup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.status === 'success') {
        alert('Account created successfully! Please sign in.');
        navigate('/login');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Could not connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafbfc] font-['Rubik'] px-6 py-20">

      <div className="max-w-[1000px] w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[3rem] overflow-hidden border border-slate-100">

        {/* Left Side: Professional Branding */}
        <div className="hidden lg:flex flex-col justify-between p-16 bg-slate-950 text-white relative overflow-hidden">
          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-all mb-16 group">
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-[11px] font-bold uppercase tracking-widest">Back to store</span>
            </Link>

            <div className="space-y-6">
              <div className="flex items-center gap-3 text-[#FF2D37]">
                <Sparkles size={20} />
                <span className="text-[11px] font-black uppercase tracking-[3px]">New Member</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black leading-tight tracking-tight text-white capitalize">
                Begin your <br /> journey today
              </h2>
              <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-xs mt-4">
                Register to unlock exclusive product configurations and priority hardware support.
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-20">
            <div className="p-6 bg-white/5 border border-white/10 rounded-3xl flex items-center gap-4">
              <div className="h-12 w-12 bg-[#FF2D37]/20 rounded-2xl flex items-center justify-center text-[#FF2D37] border border-[#FF2D37]/20">
                <CheckCircle2 size={20} strokeWidth={2} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-white uppercase tracking-widest">Instant activation</p>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Enterprise ecosystem ready</p>
              </div>
            </div>
          </div>

          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF2D37] opacity-10 blur-[100px] rounded-full pointer-events-none" />
        </div>

        {/* Right Side: Form Stage */}
        <div className="p-10 md:p-16 flex flex-col justify-center bg-white">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2 capitalize">Create Account</h1>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#FF2D37]">Register your professional profile</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-red-50 text-red-600 text-xs font-bold uppercase tracking-widest rounded-xl border border-red-100 text-center"
              >
                {error}
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2.5">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Full name</label>
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#FF2D37] transition-colors" size={18} />
                  <input
                    required
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-16 pl-14 pr-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-[#FF2D37] outline-none text-[15px] font-bold text-slate-900 transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Mobile contact</label>
                <div className="relative group">
                  <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#FF2D37] transition-colors" size={18} />
                  <input
                    required
                    type="tel"
                    placeholder="+1 (000) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-16 pl-14 pr-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-[#FF2D37] outline-none text-[15px] font-bold text-slate-900 transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Email address</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#FF2D37] transition-colors" size={18} />
                <input
                  required
                  type="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full h-16 pl-14 pr-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-[#FF2D37] outline-none text-[15px] font-bold text-slate-900 transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2.5">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#FF2D37] transition-colors" size={18} />
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full h-16 pl-14 pr-12 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-[#FF2D37] outline-none text-[15px] font-bold text-slate-900 transition-all shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#FF2D37] transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="pt-6">
              <button
                disabled={loading}
                className="w-full h-16 bg-slate-950 text-white flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-widest rounded-full hover:bg-[#FF2D37] transition-all active:scale-95 disabled:opacity-70 group"
              >
                {loading ? <Loader2 className="animate-spin" size={24} /> : <>Create account <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>}
              </button>
            </div>
          </form>

          <div className="mt-12 pt-8 border-t border-slate-100 text-center">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Already verified?{' '}
              <Link to="/login" className="text-[#FF2D37] hover:underline ml-1 font-black">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
