import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  MapPin,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';
import API_BASE_URL from '../config';

export default function Footer() {
  const [categories, setCategories] = useState([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const printerParent = data.data.find(cat => cat.slug === 'printers' || cat.id === 46);
          if (printerParent && printerParent.children) {
            setCategories(printerParent.children.slice(0, 6));
          }
        }
      })
      .catch(err => console.error(err));
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Logic for subscription can be added here
    alert("Thank you for subscribing!");
    setEmail('');
  };

  return (
    <footer className="w-full bg-gray-900 text-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* NEWSLETTER SECTION */}
        <div className="py-12 border-b border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold">Stay Updated</h3>
              <p className="mt-2 text-gray-400">Subscribe to our newsletter for the latest product news and offers.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900"
                style={{ borderColor: '#013E24', color: 'white' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-r-md font-semibold text-white transition-colors"
                style={{ backgroundColor: '#013E24' }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* MAIN FOOTER CONTENT */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 gap-8">

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white" >Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/shop" className="text-gray-400 hover:text-white transition-colors">Shop All</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* TOP CATEGORIES */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white" >Top Categories</h4>
            <ul className="space-y-3">
              {categories.map(cat => (
                <li key={cat.id}>
                  <Link to={`/shop?category=${cat.slug}`} className="text-gray-400 hover:text-white transition-colors capitalize">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* OUR POLICIES */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white" >Our Policies</h4>
            <ul className="space-y-3">
              <li><Link to="/terms-and-conditions" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/shipping-policy" className="text-gray-400 hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link to="/return-policy" className="text-gray-400 hover:text-white transition-colors">Return Policy</Link></li>
              <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/cookie-policy" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white" >Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail size={20} className="mt-1" />
                <div>
                  <p className="font-semibold">Email Support</p>
                  <p className="text-gray-400 text-sm">info@republicprinting.shop</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={20} className="mt-1" />
                <div>
                  <p className="font-semibold">Headquarters</p>
                  <p className="text-gray-400 text-sm">Birmingham, AL 35203, USA</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM STRIP */}
        <div className="py-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Republic Printing Inc. All Rights Reserved.</p>

        </div>

      </div>
    </footer>
  );
}
