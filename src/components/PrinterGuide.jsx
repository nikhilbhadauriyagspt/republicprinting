import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Briefcase, Factory, ArrowRight, CheckCircle2, Search } from 'lucide-react';

export default function PrinterGuide() {
  const guides = [
    {
      title: "Home Users",
      subtitle: "Portable & Wireless",
      description: "A home printer with wireless inkjet for vibrant colors and everyday reliability.",
      points: ["Print photos, documents and homework", "Low cost printing", "Simple Wi-Fi set-up"],
      icon: Home,
      link: "/shop?category=inkjet-printers",
      btnText: "Shop for Home"
    },
    {
      title: "Small Business",
      subtitle: "Multifunction & Connected",
      description: "Print, scan and copy in one office printer with advanced networking.",
      points: ["Auto duplex and document feeder", "Prepared for the network", "Consistent daily printing"],
      icon: Briefcase,
      link: "/shop?category=all-in-one-printers",
      btnText: "Shop for Office",
      featured: true
    },
    {
      title: "Enterprise",
      subtitle: "High Speed & High Volume",
      description: "Powerful laser printers designed for large workloads and continuous printing.",
      points: ["High page-per-minute output", "Secure document scanning", "Designed for scale"],
      icon: Factory,
      link: "/shop?category=laser-printers",
      btnText: "Shop Laser Printers"
    }
  ];

  return (
    <section className="py-20 bg-white font-sans">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: "#0096d6" }}
            >
              Assistance
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
              A Guide to Buying a Printer
            </h2>
            <p className="text-slate-600 text-lg max-w-3xl mx-auto mt-4">
              Find the perfect printer for your needs, whether for home, office, or enterprise use.
            </p>
          </motion.div>
        </div>

        {/* GUIDES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {guides.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-slate-50 p-8 rounded-2xl flex flex-col h-full text-center items-center"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: "rgba(1, 62, 36, 0.1)" }}
              >
                <item.icon size={32} style={{ color: "#0096d6" }} />
              </div>

              <h3 className="text-2xl font-bold text-slate-900">{item.title}</h3>
              <p
                className="text-sm font-semibold uppercase tracking-wider mb-4"
                style={{ color: "#0096d6" }}
              >
                {item.subtitle}
              </p>

              <p className="text-slate-600 text-base leading-relaxed mb-6 flex-1">
                {item.description}
              </p>

              <ul className="space-y-3 text-left mb-8">
                {item.points.map((point, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 text-sm">
                    <CheckCircle2 size={16} style={{ color: "#0096d6" }} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={item.link}
                className="w-full py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                style={{
                  backgroundColor: "#0096d6",
                  color: "white",
                }}
              >
                {item.btnText}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* FOOTER CALL TO ACTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mt-20 text-center"
        >
          <h4 className="text-2xl font-bold text-slate-900 mb-2">Still Not Sure?</h4>
          <p className="text-slate-600 mb-6">Let us help you find the best solution for your needs.</p>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white"
            style={{ backgroundColor: "#0096d6" }}
          >
            Browse All Products
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
