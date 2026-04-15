import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';

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
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] font-['Rubik'] px-4 py-12">
            <SEO title="Sign In | Republic Printing" />

            <div className="w-full max-w-[450px] bg-white rounded-3xl border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden">
                {/* Top Accent Bar */}
                <div className="h-2 bg-gradient-to-r from-[#1D4ED8] to-[#4f46e5]"></div>

                <div className="p-8 md:p-12">
                    <div className="text-center mb-10">
                        <Link to="/" className="inline-block mb-6">
                            <img src="/logo/logo.png" alt="Logo" className="h-10 object-contain" />
                        </Link>
                        <h1 className="text-3xl font-bold text-[#1D4ED8] tracking-tight">Welcome Back</h1>
                        <p className="text-gray-500 mt-2 text-sm">Enter your credentials to access your account</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        {error && (
                            <div className="p-4 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100 flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                                {error}
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-[13px] font-bold text-[#1D4ED8] ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#4f46e5] transition-colors" size={18} />
                                <input
                                    required
                                    type="email"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#4f46e5] focus:bg-white focus:ring-4 focus:ring-[#4f46e5]/5 transition-all text-sm font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[13px] font-bold text-[#1D4ED8]">Password</label>
                                <Link to="#" className="text-[11px] font-bold text-[#4f46e5] hover:underline uppercase tracking-wider">Forgot?</Link>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#4f46e5] transition-colors" size={18} />
                                <input
                                    required
                                    type={showPassword ? "text" : "password"}
                                    placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full h-12 pl-12 pr-12 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#4f46e5] focus:bg-white focus:ring-4 focus:ring-[#4f46e5]/5 transition-all text-sm font-medium"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1D4ED8] transition-colors cursor-pointer"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            className="w-full h-14 bg-[#013E24] text-white rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-[#4f46e5] transition-all disabled:opacity-70 shadow-xl shadow-[#1D4ED8]/10 cursor-pointer flex items-center justify-center gap-3 active:scale-[0.98]"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : (
                                <>
                                    Sign In
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col items-center gap-6">
                        <p className="text-sm text-gray-500 font-medium">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-[#4f46e5] font-bold hover:underline">Create Account</Link>
                        </p>

                        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                            <ShieldCheck size={14} className="text-emerald-500" />
                            Secure & Encrypted Connection
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

