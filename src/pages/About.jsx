import React from 'react';
import SEO from '@/components/SEO';
import {
  ShieldCheck,
  Zap,
  Globe,
  Printer,
  Package,
  ChevronRight,
  CheckCircle2,
  Headphones,
  Leaf,
  Wrench,
  Target,
  Users,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function About() {
  const capabilities = [
    {
      icon: Printer,
      title: "Quality Products",
      desc: "A curated selection of modern printing systems, including all-in-one and high-volume industrial units tailored for efficiency."
    },
    {
      icon: Package,
      title: "Logistics Excellence",
      desc: "Reliable access to ink, toner, and essential replacement parts with efficient nationwide delivery across the country."
    },
    {
      icon: Headphones,
      title: "Professional Support",
      desc: "Experts providing seamless setup guidance, troubleshooting, and long-term maintenance for your printer."
    }
  ];

  const advantages = [
    { title: "Tested Quality", icon: ShieldCheck },
    { title: "Reliable Parts", icon: Package },
    { title: "Rapid Service", icon: Zap },
    { title: "Secure Logistics", icon: Globe },
    { title: "New Printer", icon: CheckCircle2 },
    { title: "Expert Care", icon: Headphones },
    { title: "Eco-Tech", icon: Leaf },
    { title: "Service Hub", icon: Wrench }
  ];

  return (
    <div className="min-h-screen bg-white font-['Rubik'] text-slate-900">
      <SEO
        title="About Us | Republic Printing"
        description="Learn about our commitment to printing excellence, our journey, and the core values that drive our professional services."
      />

      {/* --- MINIMAL BREADCRUMBS --- */}
      <div className="bg-slate-50 border-b border-slate-200 py-4">
        <div className="max-w-[1400px] mx-auto px-4 md:px-10">
          <nav className="flex items-center gap-2 text-[13px] font-medium text-slate-500">
            <Link to="/" className="hover:text-[#013E24] transition-colors">Home</Link>
            <span className="text-slate-900">About Our Journey</span>
          </nav>
        </div>
      </div>

      {/* --- REFINED HERO SECTION --- */}
      <section className="py-16 md:py-24 border-b border-slate-100" style={{ background: 'linear-gradient(135deg, rgb(2, 69, 41) 0%, rgb(0, 50, 29) 50%, rgb(5, 138, 44) 100%)' }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-10">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6"
            >
              Providing Excellence in <span className="text-blue-200">Printing Solutions.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-base md:text-lg text-blue-50 font-normal leading-relaxed opacity-90"
            >
              We bridge the gap between advanced technology and a seamless user experience, ensuring your workspace stays productive and efficient.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-16 md:py-24 space-y-16">

        {/* --- OUR FOUNDATION --- */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-[#013E24] text-[12px] font-bold uppercase tracking-widest">
              Our Foundation
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
              Built on Precision and Reliability
            </h2>
            <p className="text-slate-600 leading-relaxed text-[15px] font-normal">
              Established in 2026, Republic Printing was founded to simplify the acquisition of high-performance printing infrastructure. We believe that technology should be accessible, reliable, and straightforward. Our commitment extends beyond merely selling products; we focus on empowering professionals and businesses to achieve their operational goals without the friction of unreliable technology.
            </p>
            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-[#013E24] text-white px-6 py-3 text-[13px] font-bold uppercase tracking-widest rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                Explore Collection <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="bg-slate-50 p-8 rounded-xl border border-slate-100 relative">
            <div className="text-4xl text-blue-200 font-serif mb-4">"</div>
            <p className="text-lg text-slate-800 leading-relaxed italic mb-6 font-medium">
              Our goal is to provide a destination where professionals can find top-tier printers without complexity.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-1 bg-[#013E24] rounded-full" />
              <span className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">Republic Printing Team</span>
            </div>
          </div>
        </section>

        {/* --- CORE CAPABILITIES --- */}
        <section className="space-y-10">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-slate-900">Core Capabilities</h2>
            <p className="text-slate-500 text-sm mt-1">The pillars of our service excellence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {capabilities.map((item, i) => (
              <div
                key={i}
                className="flex flex-col gap-4 p-8 border border-slate-100 rounded-xl hover:border-blue-200 transition-all bg-white group"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-blue-50 text-[#013E24] rounded-lg group-hover:bg-[#013E24] group-hover:text-white transition-colors">
                  <item.icon size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-[14px] text-slate-500 leading-relaxed font-normal">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- MISSION + REACH --- */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 md:p-10 border border-slate-100 rounded-xl hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6 text-[#013E24]">
                <Target size={24} strokeWidth={1.5} />
                <span className="text-[13px] font-bold uppercase tracking-widest">Our Mission</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-900">Empowering Modern Workspaces</h3>
              <p className="text-slate-500 leading-relaxed text-[15px] font-normal">
                To equip professionals with dependable and sustainable printer solutions. We provide expert advice and high-quality products to ensure your operations never slow down.
              </p>
            </div>
            <Target size={120} strokeWidth={0.5} className="absolute -right-8 -bottom-8 text-slate-50 opacity-10 group-hover:text-blue-100 transition-colors" />
          </div>

          <div className="bg-white p-8 md:p-10 border border-slate-100 rounded-xl hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6 text-[#013E24]">
                <Users size={24} strokeWidth={1.5} />
                <span className="text-[13px] font-bold uppercase tracking-widest">Our Reach</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-900">Nationwide Support Network</h3>
              <p className="text-slate-500 leading-relaxed text-[15px] font-normal">
                Serving the entire United States with a commitment to fast logistics and long-term service value. Our team is always available to assist with your needs.
              </p>
            </div>
            <Users size={120} strokeWidth={0.5} className="absolute -right-8 -bottom-8 text-slate-50 opacity-10 group-hover:text-blue-100 transition-colors" />
          </div>
        </section>

        {/* --- ADVANTAGE SECTION --- */}
        <section className="bg-slate-50 p-8 md:p-12 rounded-xl border border-slate-100">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-2xl font-bold text-slate-900">The Republic Printing Advantage</h2>
            <p className="text-slate-500 text-sm mt-1">Why professionals choose us</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {advantages.map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-white border border-slate-100 text-[#013E24] rounded-lg shadow-sm">
                  <item.icon size={20} strokeWidth={1.5} />
                </div>
                <h4 className="text-[14px] font-bold text-slate-800">{item.title}</h4>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
