import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  MapPin,
  Lock,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import API_BASE_URL from '../config';

export default function Footer() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const printerParent = data.data.find(cat => cat.slug === 'printers' || cat.id === 46);
          if (printerParent && printerParent.children) {
            setCategories(printerParent.children.slice(0, 5));
          }
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <footer className="w-full bg-white font-['Rubik'] border-t border-border mt-12">
      {/* TOP BRANDING & CONTACT INFO */}
      <div className="bg-background/50 border-b border-border">
        <div className="max-w-[1800px] mx-auto px-4 md:px-10 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-center">
            <div className="flex flex-col gap-4">
              <Link to="/">
                <img src="/logo/logo.png" alt="Vital Print" className="h-10 object-contain w-fit" />
              </Link>
              <p className="text-secondary text-[14px] font-medium leading-relaxed max-w-sm">
                Providing hardware solutions and expert guidance for all your home and business printing requirements.
              </p>
            </div>

            <div className="flex items-center gap-5 p-6 bg-white border border-border rounded-2xl shadow-sm group hover:border-primary/30 transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                <Mail size={22} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] mb-1">Send an Email</span>
                <a href="mailto:info@vitalprint.shop" className="text-foreground font-bold text-[15px] hover:text-primary transition-colors">
                  info@vitalprint.shop
                </a>
              </div>
            </div>

            <div className="flex items-center gap-5 p-6 bg-white border border-border rounded-2xl shadow-sm group hover:border-primary/30 transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                <MapPin size={22} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] mb-1">Our Location</span>
                <p className="text-foreground font-bold text-[15px]">
                  3100 Folsom Blvd, Sacramento, CA 95816, USA
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGATION LINKS AREA */}
      <div className="max-w-[1800px] mx-auto px-4 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-12 md:gap-16">

          <div className="col-span-2 xl:col-span-2 flex flex-col gap-8">
            <h4 className="text-foreground font-bold text-[16px] uppercase tracking-[0.15em]">About Our Vision</h4>
            <p className="text-secondary text-[15px] font-medium leading-relaxed max-w-md">
              At Vital Print, we believe in combining cutting-edge technology with world-class service. Our curated selection of hardware is built to ensure reliability and excellence in every print job you perform.
            </p>
          </div>

          <div>
            <h4 className="text-foreground font-bold text-[14px] uppercase tracking-wider mb-8">Hardware</h4>
            <ul className="space-y-4">
              {categories.map(cat => (
                <li key={cat.id}>
                  <Link to={`/shop?category=${cat.slug}`} className="text-secondary hover:text-primary font-semibold text-[14px] transition-all flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-all" />
                    <span className="capitalize">{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-bold text-[14px] uppercase tracking-wider mb-8">Quick Access</h4>
            <ul className="space-y-4">
              {['Home', 'Shop', 'About', 'Contact', 'FAQ'].map(item => (
                <li key={item}>
                  <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-secondary hover:text-primary font-semibold text-[14px] transition-all flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-bold text-[14px] uppercase tracking-wider mb-8">Legal Docs</h4>
            <ul className="space-y-4">
              {[
                { name: 'Privacy Policy', path: '/privacy-policy' },
                { name: 'Terms & Conditions', path: '/terms-and-conditions' },
                { name: 'Shipping Policy', path: '/shipping-policy' },
                { name: 'Return Policy', path: '/return-policy' }
              ].map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-secondary hover:text-primary font-semibold text-[14px] transition-all flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* BOTTOM STRIP */}
      <div className="w-full border-t border-border py-10">
        <div className="max-w-[1800px] mx-auto px-4 md:px-10 flex flex-col md:flex-row items-center justify-between gap-10">

          <div className="flex flex-col items-center md:items-start gap-3">
            <p className="text-secondary text-[13px] font-semibold text-center md:text-left">
              &copy; {new Date().getFullYear()} <span className="text-foreground font-bold tracking-tight">Vital Print Inc.</span> All rights reserved.
            </p>
            <p className="text-[10px] text-secondary font-bold uppercase tracking-[0.2em] opacity-60 text-center md:text-left">
              Disclaimer - For Informational only. No software installation or distribution.
            </p>

          </div>

          <div className="flex items-center gap-8 md:gap-12">
            <div className="flex items-center gap-6 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
              <img src="/logo/PayPal.svg.webp" alt="PayPal" className="h-4" />
            </div>
            <div className="flex items-center gap-2.5 px-5 py-2.5 bg-background rounded-full border border-border shadow-sm">
              <Lock size={14} className="text-primary" />
              <span className="text-foreground text-[11px] font-bold uppercase tracking-widest">SSL Encrypted Checkout</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

