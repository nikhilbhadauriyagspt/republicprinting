import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2, ShieldCheck, ChevronLeft, Sparkles, LayoutGrid } from 'lucide-react';
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';

export default function UserSignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'user',
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(data.data));
        window.dispatchEvent(new Event('storage'));
        navigate('/');
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
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] font-['Rubik'] px-4 md:px-6 py-12 md:py-20">
      <SEO title="Create Your Account | Vital Print" />

      <div className="max-w-[1100px] w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[32px] overflow-hidden border border-border shadow-2xl shadow-black/5">

        {/* --- LEFT: BRAND STAGE --- */}
        <div className="hidden lg:flex flex-col justify-between p-12 md:p-16 bg-foreground relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary opacity-10 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-2.5 text-white/60 hover:text-white transition-all mb-16 group">
              <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-[11px] font-bold uppercase tracking-widest">Back to Homepage</span>
            </Link>

            <div className="space-y-8">
              <div className="flex items-center gap-3 text-primary">
                <Sparkles size={20} fill="currentColor" />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em]">Join Our Community</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
                Unlock exclusive <br /> <span className="text-primary">benefits.</span>
              </h2>
              <p className="text-white/60 text-lg font-medium leading-relaxed max-w-sm">
                Register today to track your orders, manage hardware subscriptions, and access premium technical support.
              </p>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-3 text-white/40 text-[11px] font-bold uppercase tracking-[0.2em]">
            <ShieldCheck size={18} className="text-primary" />
            <span>Secure & Private Connection</span>
          </div>
        </div>

        {/* --- RIGHT: FORM STAGE --- */}
        <div className="p-8 md:p-16 flex flex-col justify-center bg-white">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2">Create Account</h1>
            <p className="text-[13px] font-semibold text-secondary">Join Vital Print for a better experience</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-primary/5 text-primary text-[12px] font-bold uppercase tracking-widest rounded-xl border border-primary/10 text-center"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-secondary uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-primary transition-colors" size={18} />
                  <input
                    required
                    type="text"
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-14 pl-14 pr-6 bg-[#F5F5F5] border border-transparent focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 rounded-2xl outline-none text-[15px] font-medium text-foreground transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-secondary uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-primary transition-colors" size={18} />
                  <input
                    required
                    type="email"
                    placeholder="name@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-14 pl-14 pr-6 bg-[#F5F5F5] border border-transparent focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 rounded-2xl outline-none text-[15px] font-medium text-foreground transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-secondary uppercase tracking-widest ml-1">Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-primary transition-colors" size={18} />
                    <input
                      required
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full h-14 pl-14 pr-6 bg-[#F5F5F5] border border-transparent focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 rounded-2xl outline-none text-[15px] font-medium text-foreground transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-secondary uppercase tracking-widest ml-1">Confirm Password</label>
                  <div className="relative group">
                    <ShieldCheck className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-primary transition-colors" size={18} />
                    <input
                      required
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full h-14 pl-14 pr-6 bg-[#F5F5F5] border border-transparent focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 rounded-2xl outline-none text-[15px] font-medium text-foreground transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 px-1">
              <input
                type="checkbox"
                id="showPass"
                onChange={(e) => setShowPassword(e.target.checked)}
                className="w-4 h-4 accent-primary"
              />
              <label htmlFor="showPass" className="text-[12px] font-bold text-secondary uppercase tracking-wider cursor-pointer">Show Passwords</label>
            </div>

            <button
              disabled={loading}
              className="w-full h-16 bg-foreground text-white flex items-center justify-center gap-4 text-[14px] font-bold uppercase tracking-[0.15em] rounded-full hover:bg-primary transition-all active:scale-[0.98] disabled:opacity-70 group shadow-xl shadow-foreground/10 mt-4"
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : <>Create Account <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-border text-center">
            <p className="text-[13px] font-semibold text-secondary">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:text-primary-hover ml-1 font-bold transition-colors underline decoration-2 underline-offset-4">Sign In Here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

