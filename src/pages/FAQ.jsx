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
      { q: "How can I choose the right hardware?", a: "You can contact our support for personalized buying recommendations based on your usage and budget." },
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
    <div className="bg-white min-h-screen font-['Rubik'] text-foreground pb-20">
      <SEO title="FAQ | Vital Print" />

      {/* --- PAGE HEADER --- */}
      <div className="bg-background py-16 md:py-24 border-b border-border">
        <div className="max-w-[1800px] mx-auto px-4 md:px-10 text-center">
          <nav className="flex items-center justify-center gap-2 text-[11px] font-bold text-secondary uppercase tracking-[0.2em] mb-6">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} className="opacity-50" />
            <span className="text-primary">Help Center</span>
          </nav>

          <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight mb-8">
            How can we <span className="text-primary">help you?</span>
          </h1>

          <div className="max-w-2xl mx-auto relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-primary transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search for answers about orders, shipping, or products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-14 pr-6 bg-white border border-border rounded-full focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none shadow-xl shadow-black/5 transition-all font-medium text-[15px]"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-10 py-16 md:py-24">
        {faqData.map((cat, catIdx) => {
          const filteredQuestions = cat.questions.filter(q =>
            q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.a.toLowerCase().includes(searchQuery.toLowerCase())
          );

          if (filteredQuestions.length === 0) return null;

          return (
            <div key={catIdx} className="mb-16 md:mb-24 last:mb-0">
              <div className="flex items-center gap-4 mb-8 px-2">
                <div className="w-10 h-[2px] bg-primary rounded-full" />
                <h2 className="text-[13px] font-bold text-primary uppercase tracking-[0.3em]">{cat.category}</h2>
              </div>

              <div className="space-y-4">
                {filteredQuestions.map((faq, qIdx) => {
                  const id = `${catIdx}-${qIdx}`;
                  const isOpen = openIndex === id;

                  return (
                    <div key={qIdx} className={`border transition-all duration-300 rounded-[20px] overflow-hidden ${isOpen ? 'border-primary shadow-lg shadow-primary/5' : 'border-border hover:border-secondary/30'}`}>
                      <button
                        onClick={() => toggleAccordion(catIdx, qIdx)}
                        className={`w-full px-6 md:px-8 py-5 flex items-center justify-between text-left transition-all ${isOpen ? 'bg-primary/5' : 'bg-white'}`}
                      >
                        <span className={`text-[15px] md:text-[16px] font-bold ${isOpen ? 'text-primary' : 'text-foreground'}`}>{faq.q}</span>
                        <div className={`w-8 h-8 rounded-full border border-border flex items-center justify-center transition-all ${isOpen ? 'bg-primary border-primary text-white rotate-180' : 'text-secondary'}`}>
                          <ChevronDown size={18} />
                        </div>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-6 md:px-8 pb-6 pt-2 text-secondary text-[15px] leading-relaxed font-medium bg-primary/5">
                              <div className="h-px bg-primary/10 mb-4" />
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
        <div className="mt-20 md:mt-32 p-10 md:p-16 bg-[#F5F5F5] rounded-[32px] border border-border relative overflow-hidden text-center">
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm border border-border">
              <HelpCircle size={32} className="text-primary" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">Still need assistance?</h3>
            <p className="text-secondary mb-10 font-medium max-w-md mx-auto">Our dedicated support team is ready to help you with any specialized hardware questions.</p>
            <Link to="/contact" className="inline-flex items-center gap-3 px-10 py-4 bg-primary text-white rounded-full font-bold text-[14px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary-hover transition-all active:scale-95">
              Contact Support Team <ArrowRight size={18} />
            </Link>
          </div>

          {/* Decorative background element */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
}

