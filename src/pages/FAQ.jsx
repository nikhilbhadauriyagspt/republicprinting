import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { ChevronDown, HelpCircle, Search, Mail, MapPin, Plus, Minus, ChevronRight, ChevronsRight, Sparkles, ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqData = [
  {
    category: "Orders & purchasing",
    questions: [
      { q: "How do I place an order on Dash Printer shop?", a: "Simply browse our products, add your items to the cart, and complete the checkout using your preferred payment method." },
      { q: "Do I need an account to purchase?", a: "No. You can checkout as a guest. However, creating an account helps you track orders and access your purchase history." },
      { q: "How can I check my order status?", a: "Log into your account and visit My Orders to view real-time updates. You will also receive email notifications." },
      { q: "Can I modify or cancel my order after placing it?", a: "Orders can be modified or canceled before shipping. Once the item is dispatched, cancellations aren’t possible." },
      { q: "What payment methods do you accept?", a: "We accept major credit/debit cards (Visa, Mastercard), PayPal, and other secure digital payment options." },
      { q: "Is shopping on Dash Printer shop secure?", a: "Yes. All transactions are encrypted and processed through verified, PCI-compliant payment networks including PayPal Secure." }
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
      { q: "Are your products genuine and covered under warranty?", a: "Yes. All products are 100% genuine and come with an official manufacturer's warranty." },
      { q: "Do you sell only HP products or other brands too?", a: "We specialize in genuine hardware, but we also sell printers and accessories from other trusted manufacturers." },
      { q: "How can I choose the right hardware?", a: "You can contact our expert support for personalized buying recommendations based on your usage and budget." },
      { q: "What if an item is out of stock?", a: "You can join the Back in Stock alert on the product page, and we’ll notify you as soon as it becomes available." }
    ]
  },
  {
    category: "Warranty & support",
    questions: [
      { q: "Do your products come with a manufacturer's warranty?", a: "Yes. Every product includes full brand-backed warranty with repair/replacement coverage." },
      { q: "How do I claim warranty for products?", a: "You can contact the manufacturer directly or reach out to us for guidance and warranty assistance." },
      { q: "What if my hardware arrives damaged?", a: "Contact us within 48 hours with photos/videos. We’ll arrange a replacement or initiate a claim." },
      { q: "Do you provide technical support?", a: "Yes. We offer setup help, troubleshooting, installation support, and product-related guidance." }
    ]
  }
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState(faqData[0].category);
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = faqData.map(cat => ({
    ...cat,
    questions: cat.questions.filter(q =>
      q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0);

  return (
    <div className="bg-white min-h-screen font-['Rubik'] text-slate-900 pb-20">
      <SEO
        title="Knowledge Base | Technical FAQ"
        description="Find detailed answers to common questions about orders, genuine hardware, shipping, and official support."
      />

      {/* --- PAGE HEADER --- */}
      <div className="bg-slate-50 border-b border-slate-100 py-16 md:py-24 mb-16">
        <div className="max-w-full mx-auto px-4 md:px-6 xl:px-26 flex flex-col md:flex-row md:items-center justify-between gap-10">
          <div className="max-w-2xl">
            <nav className="flex items-center gap-2 text-[11px] font-bold text-[#FF2D37] uppercase tracking-[3px] mb-6">
              <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
              <ChevronRight size={14} className="text-slate-300" />
              <span className="text-slate-400 text-sm">Knowledge base</span>
            </nav>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none capitalize">
              How can we help?
            </h1>
          </div>

          <div className="w-full max-w-lg relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#FF2D37] transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search help topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-16 pl-14 pr-8 bg-white border border-slate-100 rounded-full focus:border-[#FF2D37] outline-none text-[15px] font-bold text-slate-900 transition-all placeholder:text-slate-300 shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="max-w-full mx-auto px-4 md:px-6 xl:px-26 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Navigation Sidebar */}
          <div className="lg:col-span-4 space-y-10 lg:sticky lg:top-32">
            <div className="bg-slate-50 border border-slate-100 p-8 rounded-[2.5rem]">
              <div className="flex items-center gap-3 mb-8 ml-2">
                <ChevronsRight size={20} className="text-[#FF2D37]" strokeWidth={3} />
                <span className="text-[11px] font-black text-[#282828] uppercase tracking-[3px]">Categories</span>
              </div>
              <div className="space-y-3">
                {faqData.map((cat) => (
                  <button
                    key={cat.category}
                    onClick={() => {
                      setActiveCategory(cat.category);
                      setOpenIndex(0);
                    }}
                    className={`w-full text-left px-6 py-4 text-[14px] font-bold capitalize transition-all rounded-xl border ${activeCategory === cat.category
                      ? 'bg-slate-950 text-white border-slate-950'
                      : 'text-slate-500 bg-transparent border-transparent hover:bg-white hover:text-slate-900'
                      }`}
                  >
                    {cat.category}
                  </button>
                ))}
              </div>
            </div>

            {/* Support CTA */}
            <div className="p-10 bg-slate-950 text-white rounded-[2.5rem] relative overflow-hidden group">
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                  <Sparkles className="text-[#FF2D37]" size={20} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#FF2D37]">Contact support</span>
                </div>
                <h4 className="text-2xl font-black leading-tight capitalize">Still have questions? <br /> Connect with us</h4>
                <p className="text-slate-400 text-base font-medium leading-relaxed">Our technical experts are ready to provide personalized assistance for your inquiries.</p>
                <Link to="/contact" className="inline-flex items-center gap-4 bg-[#FF2D37] text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#059669] transition-all active:scale-95">
                  Talk to Agent <ArrowRight size={18} />
                </Link>
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#FF2D37] opacity-10 blur-[80px] rounded-full" />
            </div>
          </div>

          {/* FAQ Accordion Stage */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-10"
              >
                <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-100">
                  <div className="w-10 h-[2px] bg-[#FF2D37]" />
                  <h3 className="text-3xl font-black text-slate-900 capitalize tracking-tight">
                    {activeCategory}
                  </h3>
                </div>

                <div className="space-y-6">
                  {filteredData.find(c => c.category === activeCategory)?.questions.map((faq, idx) => (
                    <div
                      key={idx}
                      className={`bg-white rounded-3xl border transition-all duration-500 overflow-hidden ${openIndex === idx ? 'border-[#FF2D37]/30 bg-[#fafbfc]' : 'border-slate-100 hover:border-slate-200'
                        }`}
                    >
                      <button
                        onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                        className="w-full px-8 py-8 flex items-center justify-between text-left group"
                      >
                        <span className={`text-lg font-bold leading-snug pr-10 transition-colors capitalize ${openIndex === idx ? 'text-[#FF2D37]' : 'text-slate-900 group-hover:text-[#FF2D37]'
                          }`}>
                          {faq.q}
                        </span>
                        <div className={`h-10 w-10 flex items-center justify-center shrink-0 transition-all duration-500 rounded-xl ${openIndex === idx ? 'bg-[#FF2D37] text-white rotate-180' : 'bg-slate-50 text-slate-400 group-hover:bg-[#FF2D37] group-hover:text-white'
                          }`}>
                          <ChevronDown size={20} />
                        </div>
                      </button>

                      <AnimatePresence>
                        {openIndex === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                          >
                            <div className="px-8 pb-8">
                              <div className="bg-white p-8 rounded-2xl border border-slate-100">
                                <p className="text-slate-600 text-lg font-medium leading-relaxed">
                                  {faq.a}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                {filteredData.length === 0 && (
                  <div className="py-24 text-center bg-slate-50 border border-slate-100 rounded-[3rem]">
                    <Search size={48} className="text-slate-300 mx-auto mb-6" />
                    <h4 className="text-2xl font-black text-slate-900 capitalize">No results found</h4>
                    <p className="text-slate-500 font-medium mt-2">Try different keywords or browse our topics.</p>
                    <button onClick={() => setSearchQuery('')} className="mt-8 px-8 py-3 bg-slate-900 text-white font-bold rounded-full transition-all hover:bg-[#FF2D37]">Clear Search</button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
