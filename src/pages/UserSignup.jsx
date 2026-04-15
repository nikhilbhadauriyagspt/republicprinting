import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2, ShieldCheck, Sparkles } from 'lucide-react';
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
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] font-['Rubik'] px-4 py-12 md:py-20">
      <SEO title="Create Your Account | Republic Printing" />

      <div className="w-full max-w-[500px] bg-white rounded-[2rem] border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden">
        {/* Top Decorative Gradient */}
        <div className="h-2 bg-gradient-to-r from-[#4f46e5] via-[#1D4ED8] to-[#f59e0b]"></div>

        <div className="p-8 md:p-12">
          <div className="text-center mb-10">
            <Link to="/" className="inline-block mb-6">
              <img src="/logo/logo.png" alt="Logo" className="h-10 object-contain" />
            </Link>
            <div className="flex items-center justify-center gap-2 text-[#f59e0b] mb-2">
              <Sparkles size={16} fill="currentColor" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Join Republic Printing</span>
            </div>
            <h1 className="text-3xl font-bold text-[#1D4ED8] tracking-tight">Create Account</h1>
            <p className="text-gray-500 mt-2 text-sm">Experience premium printing benefits</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            {error && (
              <div className="p-4 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100 text-center">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-[#1D4ED8] ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#4f46e5] transition-colors" size={18} />
                <input
                  required
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#4f46e5] focus:bg-white focus:ring-4 focus:ring-[#4f46e5]/5 transition-all text-sm font-medium"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-[#1D4ED8] ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#4f46e5] transition-colors" size={18} />
                <input
                  required
                  type="email"
                  placeholder="name@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#4f46e5] focus:bg-white focus:ring-4 focus:ring-[#4f46e5]/5 transition-all text-sm font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-[#1D4ED8] ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#4f46e5] transition-colors" size={18} />
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#4f46e5] focus:bg-white focus:ring-4 focus:ring-[#4f46e5]/5 transition-all text-sm font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-[#1D4ED8] ml-1">Confirm</label>
                <div className="relative group">
                  <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#4f46e5] transition-colors" size={18} />
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#4f46e5] focus:bg-white focus:ring-4 focus:ring-[#4f46e5]/5 transition-all text-sm font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 px-1 py-2">
              <input
                type="checkbox"
                id="showPass"
                onChange={(e) => setShowPassword(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-[#4f46e5] focus:ring-[#4f46e5] cursor-pointer"
              />
              <label htmlFor="showPass" className="text-[12px] font-bold text-gray-500 uppercase tracking-wider cursor-pointer">Show Passwords</label>
            </div>

            <button
              disabled={loading}
              className="w-full h-14 bg-[#013E24] text-white rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-[#4f46e5] transition-all disabled:opacity-70 shadow-xl shadow-[#1D4ED8]/10 cursor-pointer flex items-center justify-center gap-3 active:scale-[0.98] mt-2"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (
                <>
                  Create Account
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500 font-medium">
              Already have an account?{' '}
              <Link to="/login" className="text-[#4f46e5] font-bold hover:underline">Sign In Instead</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

