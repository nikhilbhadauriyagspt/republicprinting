import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { ChevronDown, Search, HelpCircle, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqData = [
  {
    category: "Orders & purchasing",
    questions: [
      { q: "How do I place an order?", a: "Simply browse our products, add your items to the cart, and complete the checkout using your preferred payment method." },
      { q: "Do I need an account to purchase?", a: "No. You can checkout as a guest. However, creating an account helps you track orders and access your purchase history." },
      { q: "How can I check my order status?", a: "Log into your account and visit My Orders to view real-time updates. You will also receive email notifications." },
      { q: "Can I modify or cancel my order?", a: "Orders can be modified or canceled before shipping. Once the item is dispatched, cancellations aren’t possible." },
      { q: "What payment methods do you accept?", a: "We accept major credit/debit cards (Visa, Mastercard), PayPal, and other secure digital payment options." },
      { q: "Is shopping here secure?", a: "Yes. All transactions are encrypted and processed through secure, PCI-compliant payment networks." }
    ]
  },
  {
    category: "Shipping & delivery",
    questions: [
      { q: "What are your shipping options?", a: "We offer standard and expedited shipping across the USA, depending on your location." },
      { q: "Do you deliver nationwide?", a: "Yes, we ship to all 50 states, including business addresses." },
      { q: "How long does delivery take?", a: "Delivery typically takes 3–7 business days, based on your region and order volume." },
      { q: "How much does shipping cost?", a: "Shipping charges vary by product weight, location, and delivery speed. Final charges appear at checkout." },
      { q: "Will I receive a tracking number?", a: "Yes. You’ll receive a tracking link via email as soon as your order ships." },
      { q: "What if my order is delayed?", a: "You can use your tracking link or contact our support team for an immediate update." }
    ]
  },
  {
    category: "Products & availability",
    questions: [
      { q: "Are your products covered under warranty?", a: "Yes. All products come with a manufacturer's warranty." },
      { q: "What brands do you sell?", a: "We sell printers and accessories from various trusted manufacturers." },
      { q: "How can I choose the right printer?", a: "You can contact our support for personalized buying recommendations based on your usage and budget." },
      { q: "What if an item is out of stock?", a: "You can join the Back in Stock alert on the product page, and we’ll notify you as soon as it becomes available." }
    ]
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState('0-0');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleAccordion = (catIdx, qIdx) => {
    const id = `${catIdx}-${qIdx}`;
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className="bg-white min-h-screen font-['Rubik'] text-slate-900 pb-20">
      <SEO title="FAQ | Republic Printing" />

      {/* --- MINIMAL BREADCRUMBS --- */}
      <div className="bg-slate-50 border-b border-slate-200 py-4">
        <div className="max-w-[1400px] mx-auto px-4 md:px-10">
          <nav className="flex items-center gap-2 text-[13px] font-medium text-slate-500">
            <Link to="/" className="hover:text-[#0096d6] transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-medium">Help Center</span>
          </nav>
        </div>
      </div>

      {/* --- REFINED PAGE HEADER --- */}
      <div className="py-16 md:py-24 border-b border-slate-100" style={{ background: '#0096d6' }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-8"
          >
            How can we <span className="text-blue-200">help you?</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto relative group"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0096d6] transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search for answers about orders, shipping, or products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-12 pr-6 bg-white border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-slate-900 text-sm md:text-base shadow-sm transition-all"
            />
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* --- SIDEBAR CATEGORIES --- */}
          <div className="hidden lg:block lg:col-span-3 sticky top-8">
            <div className="bg-white p-6 border border-slate-100 rounded-xl shadow-sm">
              <h3 className="text-[14px] font-bold text-slate-900 mb-4 border-b border-slate-50 pb-3 uppercase tracking-wider">Categories</h3>
              <ul className="space-y-4">
                {faqData.map((cat, idx) => (
                  <li key={idx}>
                    <a href={`#cat-${idx}`} className="text-[14px] text-slate-500 hover:text-[#0096d6] transition-all flex items-center gap-2 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-[#0096d6] transition-colors" />
                      {cat.category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* --- MAIN CONTENT --- */}
          <div className="lg:col-span-9 space-y-10">
            {faqData.map((cat, catIdx) => {
              const filteredQuestions = cat.questions.filter(q =>
                q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                q.a.toLowerCase().includes(searchQuery.toLowerCase())
              );

              if (filteredQuestions.length === 0) return null;

              return (
                <div key={catIdx} id={`cat-${catIdx}`} className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden scroll-mt-8">
                  <div className="bg-slate-50 px-8 py-4 border-b border-slate-100">
                    <h2 className="text-[13px] font-bold text-[#0096d6] uppercase tracking-[0.2em]">{cat.category}</h2>
                  </div>

                  <div className="divide-y divide-slate-50">
                    {filteredQuestions.map((faq, qIdx) => {
                      const id = `${catIdx}-${qIdx}`;
                      const isOpen = openIndex === id;

                      return (
                        <div key={qIdx} className="group">
                          <button
                            onClick={() => toggleAccordion(catIdx, qIdx)}
                            className="w-full px-8 py-5 flex items-center justify-between text-left hover:bg-slate-50/50 transition-all"
                          >
                            <span className={`text-[15px] font-bold ${isOpen ? 'text-[#0096d6]' : 'text-slate-900 group-hover:text-[#0096d6]'} transition-colors`}>{faq.q}</span>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-[#0096d6] text-white rotate-180' : 'bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-[#0096d6]'}`}>
                              <ChevronDown size={18} strokeWidth={2.5} />
                            </div>
                          </button>
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                              >
                                <div className="px-8 pb-8 text-slate-500 text-[15px] leading-relaxed font-normal">
                                  <div className="h-px bg-slate-100 mb-6" />
                                  {faq.a}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* BOTTOM CALL TO ACTION */}
            <div className="bg-slate-50 p-10 md:p-12 border border-slate-100 rounded-xl text-center space-y-6">
              <div className="w-16 h-16 bg-white shadow-sm border border-slate-100 rounded-2xl flex items-center justify-center mx-auto text-[#0096d6]">
                <HelpCircle size={32} strokeWidth={1.5} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900">Still need assistance?</h3>
                <p className="text-slate-500 text-[15px] font-normal max-w-md mx-auto">Our dedicated support team is ready to help you with any specialized printer questions.</p>
              </div>
              <Link to="/contact" className="inline-flex items-center gap-3 bg-[#0096d6] hover:bg-blue-700 text-white px-10 py-4 text-[13px] font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                Contact Support Team <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
