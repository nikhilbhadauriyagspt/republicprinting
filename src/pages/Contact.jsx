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
  Phone,
  Clock,
  ChevronDown,
  ChevronRight
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
    <div className="min-h-screen bg-white font-['Rubik'] text-foreground pb-20">
      <SEO title="Contact Us | Vital Print" />

      {/* --- PAGE HEADER --- */}
      <div className="bg-background py-16 md:py-24 border-b border-border">
        <div className="max-w-[1800px] mx-auto px-4 md:px-10 text-center">
          <nav className="flex items-center justify-center gap-2 text-[11px] font-bold text-secondary uppercase tracking-[0.2em] mb-6">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} className="opacity-50" />
            <span className="text-primary">Connect With Us</span>
          </nav>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight mb-6">
            Get in <span className="text-primary">Touch.</span>
          </h1>
          <p className="text-secondary max-w-2xl mx-auto font-medium text-lg">Have specialized hardware questions? Our team is here to provide expert guidance and support for your workspace.</p>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-4 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20 items-start">

          {/* --- INFO COLUMN --- */}
          <div className="space-y-6">
            <div className="flex flex-col gap-4 mb-10">
               <h2 className="text-2xl font-bold text-foreground">Contact Information</h2>
               <p className="text-secondary font-medium">Reach out through any of our official channels.</p>
            </div>

            <div className="flex items-center gap-6 p-8 bg-[#F5F5F5] rounded-[24px] border border-border group hover:border-primary/30 transition-all">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shrink-0 shadow-sm border border-border group-hover:bg-primary group-hover:text-white transition-all duration-500">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-bold text-[11px] uppercase tracking-[0.2em] text-secondary mb-1">Email Support</h4>
                <p className="text-foreground font-bold text-lg">info@vitalprint.shop</p>
              </div>
            </div>

            <div className="flex items-center gap-6 p-8 bg-[#F5F5F5] rounded-[24px] border border-border group hover:border-primary/30 transition-all">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shrink-0 shadow-sm border border-border group-hover:bg-primary group-hover:text-white transition-all duration-500">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-[11px] uppercase tracking-[0.2em] text-secondary mb-1">Our Location</h4>
                <p className="text-foreground font-bold text-lg leading-tight">
                  3100 Folsom Blvd, <br /> Sacramento, CA 95816, USA
                </p>
              </div>
            </div>

            <div className="p-8 bg-foreground rounded-[24px] text-white relative overflow-hidden mt-10">
               <div className="relative z-10">
                  <h4 className="font-bold text-xl mb-4">Fast Response Time</h4>
                  <p className="text-white/70 text-sm leading-relaxed mb-6">Our average response time for technical inquiries is under 2 hours during business operations.</p>
                  <div className="flex items-center gap-2 text-primary font-bold text-[11px] uppercase tracking-widest">
                     <Clock size={16} /> Monday - Friday: 9AM - 6PM
                  </div>
               </div>
               <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            </div>
          </div>

          {/* --- FORM COLUMN --- */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-border rounded-[32px] p-8 md:p-16 shadow-xl shadow-black/5 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-100">
                       <CheckCircle2 size={40} />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground mb-4">Message Received!</h2>
                    <p className="text-secondary mb-10 font-medium text-lg">Thank you for reaching out. An expert from our team will <br /> get back to you shortly.</p>
                    <button
                      onClick={() => setStatus(null)}
                      className="px-10 py-4 bg-primary text-white rounded-full font-bold text-[14px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary-hover transition-all"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[11px] font-bold text-secondary uppercase tracking-widest ml-1">Full Name</label>
                        <input
                          required
                          type="text"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full h-14 px-6 bg-background border border-border rounded-2xl outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-medium"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[11px] font-bold text-secondary uppercase tracking-widest ml-1">Email Address</label>
                        <input
                          required
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full h-14 px-6 bg-background border border-border rounded-2xl outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[11px] font-bold text-secondary uppercase tracking-widest ml-1">Phone Number</label>
                        <input
                          type="tel"
                          placeholder="+1 (000) 000-0000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full h-14 px-6 bg-background border border-border rounded-2xl outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-medium"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[11px] font-bold text-secondary uppercase tracking-widest ml-1">Inquiry Subject</label>
                        <div className="relative">
                          <select
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="w-full h-14 px-6 bg-background border border-border rounded-2xl outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 appearance-none cursor-pointer font-medium transition-all"
                          >
                            <option>General Inquiry</option>
                            <option>Technical Support</option>
                            <option>Order Status</option>
                            <option>Bulk/Business Order</option>
                          </select>
                          <ChevronDown size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[11px] font-bold text-secondary uppercase tracking-widest ml-1">Your Message</label>
                      <textarea
                        required
                        rows="5"
                        placeholder="How can our experts assist you today?"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full p-6 bg-background border border-border rounded-2xl outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all resize-none font-medium"
                      ></textarea>
                    </div>

                    <button
                      disabled={loading}
                      className="w-full h-16 bg-foreground text-white rounded-full font-bold text-[14px] uppercase tracking-[0.2em] hover:bg-primary transition-all shadow-xl shadow-foreground/10 disabled:opacity-50 active:scale-95 flex items-center justify-center gap-3"
                    >
                      {loading ? <Loader2 className="animate-spin" size={24} /> : (
                        <>
                          <Send size={18} />
                          Send Inquiry
                        </>
                      )}
                    </button>

                    {status === 'error' && (
                      <p className="text-center text-primary text-[13px] font-bold mt-4 bg-primary/5 py-2 rounded-lg border border-primary/10">Error sending message. Please try again later.</p>
                    )}
                  </form>
                )}
              </AnimatePresence>
              
              {/* Decorative corner element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

