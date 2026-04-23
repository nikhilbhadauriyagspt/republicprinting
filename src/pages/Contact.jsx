import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import {
  Mail,
  MapPin,
  Send,
  Loader2,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronRight,
  Headphones
} from 'lucide-react';
import API_BASE_URL from '../config';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'General Inquiry',
          message: '',
        });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-['Rubik'] text-slate-900">
      <SEO title="Contact Us | Republic Printing" />

      {/* --- MINIMAL BREADCRUMBS --- */}
      <div className="bg-slate-50 border-b border-slate-200 py-4">
        <div className="max-w-[1400px] mx-auto px-4 md:px-10">
          <nav className="flex items-center gap-2 text-[13px] font-medium text-slate-500">
            <Link to="/" className="hover:text-[#0096d6] transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-medium">Connect With Us</span>
          </nav>
        </div>
      </div>

      {/* --- REFINED PAGE HEADER --- */}
      <div className="py-16 md:py-24 border-b border-slate-100" style={{ background: '#0096d6' }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-10">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6"
            >
              Get in Touch with <span className="text-blue-200">Our Experts.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-base md:text-lg text-blue-50 font-normal leading-relaxed opacity-90"
            >
              Have specialized printer questions? Our team is here to provide expert guidance and support for your workspace.
            </motion.p>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* --- INFO COLUMN --- */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 border border-slate-100 rounded-xl shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Contact Information</h2>
              <p className="text-slate-500 text-[14px] font-normal">Reach out through any of our official channels.</p>

              <div className="mt-10 space-y-8">
                <div className="flex gap-4 items-start group">
                  <div className="w-12 h-12 bg-blue-50 text-[#0096d6] rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#0096d6] group-hover:text-white transition-colors">
                    <Mail size={22} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[12px] text-slate-400 mb-1 uppercase tracking-widest">Email Support</h4>
                    <p className="text-slate-900 text-[15px] font-bold hover:text-[#0096d6] transition-colors cursor-pointer">info@republicprinting.shop</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start group">
                  <div className="w-12 h-12 bg-blue-50 text-[#0096d6] rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#0096d6] group-hover:text-white transition-colors">
                    <MapPin size={22} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[12px] text-slate-400 mb-1 uppercase tracking-widest">Our Location</h4>
                    <p className="text-slate-900 text-[15px] font-medium leading-relaxed">
                      1710 2nd Ave N Birmingham, <br />AL 35203, USA
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 border border-slate-100 rounded-xl">
              <div className="flex items-center gap-3 text-[#0096d6] mb-4">
                <Clock size={20} strokeWidth={1.5} />
                <h4 className="font-bold text-[13px] uppercase tracking-widest">Support Hours</h4>
              </div>
              <p className="text-slate-500 text-[14px] leading-relaxed mb-6 font-normal">Our average response time for technical inquiries is under 2 hours during business operations.</p>
              <div className="text-slate-900 font-bold text-[14px] flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#0096d6]/200 animate-pulse" />
                Monday - Friday: 9AM - 6PM (PST)
              </div>
            </div>

            <div className="bg-[#0096d6] p-8 rounded-xl text-white shadow-lg shadow-blue-600/10">
              <div className="flex items-center gap-3 mb-4">
                <Headphones size={20} />
                <h4 className="font-bold text-[14px] uppercase tracking-widest">Technical Help</h4>
              </div>
              <p className="text-blue-50 text-[14px] leading-relaxed font-normal opacity-90">For urgent technical issues regarding your printer setup, please include your order number for faster assistance.</p>
            </div>
          </div>

          {/* --- FORM COLUMN --- */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-slate-100 rounded-xl p-8 md:p-12 shadow-sm">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-[#0096d6]/20 text-[#0096d6] rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm">
                      <CheckCircle2 size={40} strokeWidth={1.5} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-3">Message Received!</h2>
                    <p className="text-slate-500 mb-10 font-normal text-lg">Thank you for reaching out. An expert from our team will <br /> get back to you shortly.</p>
                    <button
                      onClick={() => setStatus(null)}
                      className="bg-[#0096d6] hover:bg-blue-700 text-white px-10 py-4 text-[13px] font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-2">
                      <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Send us a Message</h2>
                      <p className="text-slate-500 text-[15px] font-normal">We'll get back to you within 24 business hours.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                        <input
                          required
                          type="text"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all text-sm font-medium"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                        <input
                          required
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all text-sm font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                        <input
                          type="tel"
                          placeholder="+1 (000) 000-0000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all text-sm font-medium"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest ml-1">Inquiry Subject</label>
                        <div className="relative">
                          <select
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 appearance-none cursor-pointer text-sm font-medium transition-all"
                          >
                            <option>General Inquiry</option>
                            <option>Technical Support</option>
                            <option>Order Status</option>
                            <option>Bulk/Business Order</option>
                          </select>
                          <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest ml-1">Your Message</label>
                      <textarea
                        required
                        rows="6"
                        placeholder="How can our experts assist you today?"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all resize-none text-sm font-medium"
                      ></textarea>
                    </div>

                    <div className="pt-4">
                      <button
                        disabled={loading}
                        className="w-full md:w-auto min-w-[220px] h-14 bg-[#0096d6] hover:bg-blue-700 text-white rounded-xl font-bold text-[13px] uppercase tracking-widest shadow-lg shadow-blue-600/20 disabled:opacity-50 transition-all active:scale-95 flex items-center justify-center gap-3"
                      >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : (
                          <>
                            <Send size={18} />
                            Send Message
                          </>
                        )}
                      </button>
                    </div>

                    {status === 'error' && (
                      <div className="bg-red-50 text-red-600 text-[14px] font-medium p-4 rounded-xl border border-red-100 flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        Error sending message. Please try again later.
                      </div>
                    )}
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
