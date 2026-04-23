import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Droplets,
  Printer,
  Monitor,
  Layers,
  Maximize,
  Receipt,
  Cpu,
  Image,
  Settings,
  Headphones,
  HelpCircle,
  Truck
} from 'lucide-react';

export default function CategoryNavigation() {
  return (
    <section className="py-24 bg-white font-sans relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Static Category Navigation (Modern Staggered Z-Pattern with Icons) */}
        <div className="space-y-24">

          {/* 01. Popular Printers - Left Aligned */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-20 relative">
            <div className="absolute -top-10 -left-10 text-[120px] font-black text-slate-50 select-none pointer-events-none z-0">01</div>
            <div className="w-full md:w-1/3 relative z-10 bg-blue-50/50 p-8 rounded-[1rem] border border-blue-100/50 text-start">
              <h5 className="text-2xl font-bold text-slate-900 leading-none mb-4 tracking-tight">Popular <span className="text-[#0096d6]">Printers</span></h5>
              <p className="text-slate-500 text-[15px] font-medium leading-relaxed">
                Defining industry standards for reliability and speed, our most requested systems deliver high-quality output for every professional office environment.
              </p>
            </div>
            <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
              {[
                { name: 'Inkjet Printers', path: '/shop?category=inkjet-printers', desc: 'Vibrant color output', icon: Droplets },
                { name: 'Laser Printers', path: '/shop?category=laser-printers', desc: 'High-speed efficiency', icon: Printer },
                { name: 'All-In-One Systems', path: '/shop?category=all-in-one-printers', desc: 'Multi-tasking ready', icon: Monitor },
                { name: 'Supertank Series', path: '/shop?category=supertank-printers', desc: 'High-capacity ink', icon: Layers }
              ].map(link => (
                <Link key={link.name} to={link.path} className="group/tile bg-white border border-slate-100 p-6 rounded-2xl hover:border-blue-600 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/5 flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover/tile:bg-blue-50 group-hover/tile:text-[#0096d6] transition-all shrink-0">
                    <link.icon size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h6 className="text-[15px] font-bold text-slate-900 group-hover/tile:text-[#0096d6] transition-colors mb-1">{link.name}</h6>
                    <p className="text-[12px] text-slate-400 font-medium">{link.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-slate-100 hidden md:block" />

          {/* 02. Specialized Units - Right Aligned */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-20 relative">
            <div className="absolute -top-10 -right-10 text-[120px] font-black text-slate-50 select-none pointer-events-none z-0">02</div>
            <div className="w-full md:w-1/3 relative z-10 text-left md:text-right bg-indigo-50/50 p-8 rounded-[1rem] border border-indigo-100/50">
              <h5 className="text-2xl font-bold text-slate-900 leading-none mb-4 tracking-tight">Specialized <span className="text-[#0096d6]">Units</span></h5>
              <p className="text-slate-500 text-[15px] font-medium leading-relaxed">
                Tailored technology engineered for unique requirements, from large scale blueprints to precise thermal labeling built for extreme specialized precision.
              </p>
            </div>
            <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
              {[
                { name: 'Large Format', path: '/shop?category=large-format-printers', desc: 'Wide-scale production', icon: Maximize },
                { name: 'Thermal Printers', path: '/shop?category=thermal-printers', desc: 'Point of sale experts', icon: Receipt },
                { name: 'LED Technology', path: '/shop?category=led-printers', desc: 'Energy-saving precision', icon: Cpu },
                { name: 'Photo Printing', path: '/shop?category=photo-printers', desc: 'Studio-grade results', icon: Image }
              ].map(link => (
                <Link key={link.name} to={link.path} className="group/tile bg-white border border-slate-100 p-6 rounded-2xl hover:border-blue-600 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/5 flex gap-4 text-left">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover/tile:bg-blue-50 group-hover/tile:text-[#0096d6] transition-all shrink-0">
                    <link.icon size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h6 className="text-[15px] font-bold text-slate-900 group-hover/tile:text-[#0096d6] transition-colors mb-1">{link.name}</h6>
                    <p className="text-[12px] text-slate-400 font-medium">{link.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-slate-100 hidden md:block" />

          {/* 03. Support & Essentials - Left Aligned */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-20 relative">
            <div className="absolute -top-10 -left-10 text-[120px] font-black text-slate-50 select-none pointer-events-none z-0">03</div>
            <div className="w-full md:w-1/3 relative z-10 bg-slate-50 p-8 rounded-[1rem] border border-slate-200/50">
              <h5 className="text-2xl font-bold text-slate-900 leading-none mb-4 tracking-tight">Service & <span className="text-[#0096d6]">Essentials</span></h5>
              <p className="text-slate-500 text-[15px] font-medium leading-relaxed">
                Ensuring your infrastructure never stops with fast shipping, expert technical advice, and a comprehensive ecosystem for all maintenance needs.
              </p>
            </div>
            <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
              {[
                { name: 'Printer Accessories', path: '/shop?category=printer-accessories', desc: 'Ink, toner & supplies', icon: Settings },
                { name: 'Expert Advice', path: '/contact', desc: 'Consult with professionals', icon: Headphones },
                { name: 'Help Center', path: '/faq', desc: 'Immediate troubleshooting', icon: HelpCircle },
                { name: 'Fast Shipping', path: '/shipping-policy', desc: 'Global delivery network', icon: Truck }
              ].map(link => (
                <Link key={link.name} to={link.path} className="group/tile bg-white border border-slate-100 p-6 rounded-2xl hover:border-blue-600 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/5 flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover/tile:bg-blue-50 group-hover/tile:text-[#0096d6] transition-all shrink-0">
                    <link.icon size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h6 className="text-[15px] font-bold text-slate-900 group-hover/tile:text-[#0096d6] transition-colors mb-1">{link.name}</h6>
                    <p className="text-[12px] text-slate-400 font-medium">{link.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
