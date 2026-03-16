import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, ShieldCheck, ChevronLeft, Sparkles } from 'lucide-react';
import API_BASE_URL from '../config';

export default function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'user', identifier: email, password })
      });

      const data = await response.json();

      if (data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(data.data));
        window.dispatchEvent(new Event('storage'));
        navigate('/');
      } else {
        setError(data.message || 'Login failed');
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

        {/* Left Side: Professional Message */}
        <div className="hidden lg:flex flex-col justify-between p-16 bg-slate-950 relative overflow-hidden">
          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-all mb-16 group">
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-[11px] font-bold uppercase tracking-widest">Back to store</span>
            </Link>

            <div className="space-y-6">
              <div className="flex items-center gap-3 text-[#FF2D37]">
                <Sparkles size={20} />
                <span className="text-[11px] font-black uppercase tracking-[3px]">Member Access</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight capitalize">
                Welcome <br /> back to studio
              </h2>
              <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-xs mt-4">
                Secure access to your saved products, orders, and technical help.
              </p>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-3 text-slate-500 text-xs font-bold uppercase tracking-widest">
            <ShieldCheck size={16} className="text-[#FF2D37]" />
            <span>End-to-end encrypted session</span>
          </div>

          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF2D37] opacity-10 blur-[100px] rounded-full pointer-events-none" />
        </div>

        {/* Right Side: Form Stage */}
        <div className="p-10 md:p-16 flex flex-col justify-center bg-white">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2 capitalize">Sign In</h1>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#FF2D37]">Access your professional account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-red-50 text-red-600 text-xs font-bold uppercase tracking-widest rounded-xl border border-red-100 text-center"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-6">
              <div className="space-y-2.5">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Email address</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#FF2D37] transition-colors" size={18} />
                  <input
                    required
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-16 pl-14 pr-6 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-[#FF2D37] outline-none text-[15px] font-bold text-slate-900 transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                  <Link to="#" className="text-[10px] font-bold text-[#FF2D37] hover:underline uppercase tracking-widest">Forgot?</Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#FF2D37] transition-colors" size={18} />
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-16 pl-14 pr-14 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-[#FF2D37] outline-none text-[15px] font-bold text-slate-900 transition-all shadow-sm"
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
            </div>

            <button
              disabled={loading}
              className="w-full h-16 bg-slate-950 text-white flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-widest rounded-full hover:bg-[#FF2D37] transition-all active:scale-95 disabled:opacity-70 group"
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : <>Sign In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-slate-100 text-center">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              New to our platform?{' '}
              <Link to="/signup" className="text-[#FF2D37] hover:underline ml-1 font-black">Create account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
