import { useState, useMemo } from "react";
import { Heart, ShoppingCart, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function FeaturedTabs({ printers = [], accessories = [], loading = false }) {
  const [activeTab, setActiveTab] = useState("New Arrivals");
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const products = useMemo(() => {
    return [...printers, ...accessories];
  }, [printers, accessories]);

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === "string" ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) {
        return `/${imgs[0].replace(/\\/g, "/")}`;
      }
      return "/logo/fabicon.png";
    } catch {
      return "/logo/fabicon.png";
    }
  };

  const tabs = [
    { name: "New Arrivals", slug: "all" },
    { name: "Inkjet", slug: "inkjet-printers" },
    { name: "Laser", slug: "laser-printers" },
    { name: "All-In-One", slug: "all-in-one-printers" },
    { name: "Supertank", slug: "supertank-printers" },
    { name: "Accessories", slug: "printer-accessories" },
  ];

  const filteredProducts = useMemo(() => {
    const currentTab = tabs.find(t => t.name === activeTab);
    if (!currentTab || currentTab.slug === "all") {
      return products.slice(0, 12);
    }

    const filtered = products.filter(p => {
      const categoryMatch = (p.categories || []).some(cat => cat.slug === currentTab.slug);
      const nameMatch = p.name.toLowerCase().includes(activeTab.toLowerCase().replace(' printers', ''));
      return categoryMatch || nameMatch;
    });

    return filtered.length > 0 ? filtered.slice(0, 12) : products.slice(0, 12);
  }, [products, activeTab]);

  return (
    <section className="w-full bg-white py-12 md:py-16 font-['Rubik']">
      <div className="max-w-[1800px] mx-auto px-4 md:px-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            Featured Products
          </h2>

          {/* SIMPLIFIED TABS */}
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar max-w-full border-b border-border pb-1">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`text-[14px] font-bold whitespace-nowrap transition-all duration-300 relative pb-3 ${
                  activeTab === tab.name
                    ? "text-primary"
                    : "text-secondary hover:text-foreground"
                }`}
              >
                {tab.name}
                {activeTab === tab.name && (
                  <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-[2px] bg-primary" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 md:gap-8">
          <AnimatePresence mode="wait">
            {loading
              ? [...Array(12)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-slate-50 rounded-[16px] aspect-[1/1.2]" />
                ))
              : filteredProducts.map((p) => (
                    <motion.div
                      layout
                      key={p.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="group"
                    >
                      {/* IMAGE CONTAINER */}
                      <div className="relative aspect-square bg-[#F5F5F5] rounded-[16px] flex items-center justify-center overflow-hidden mb-4 border border-transparent transition-all group-hover:border-border group-hover:shadow-sm">
                        <Link to={`/product/${p.slug}`} className="w-full h-full flex items-center justify-center p-6">
                          <img
                            src={getImagePath(p.images)}
                            alt={p.name}
                            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                            onError={(e) => { e.currentTarget.src = "/logo/fabicon.png"; }}
                          />
                        </Link>

                        {/* WISHLIST BUTTON */}
                        <button 
                          onClick={() => toggleWishlist(p)}
                          className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center transition-all ${isInWishlist(p.id) ? "text-primary" : "text-secondary hover:text-primary"}`}
                        >
                          <Heart size={16} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                        </button>
                      </div>

                      {/* CONTENT */}
                      <div className="px-1">
                        <Link to={`/product/${p.slug}`}>
                          <h3 className="text-[15px] font-semibold text-foreground leading-tight line-clamp-1 hover:text-primary transition-colors mb-2">
                            {p.name}
                          </h3>
                        </Link>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex flex-col">
                            <span className="text-[17px] font-bold text-primary">
                              ${p.price}
                            </span>
                            {(p.compare_price || p.old_price) && (
                              <span className="text-[12px] text-secondary line-through leading-none mt-0.5">
                                ${p.compare_price || p.old_price}
                              </span>
                            )}
                          </div>

                          <button
                            onClick={() => addToCart(p)}
                            className="flex items-center justify-center gap-2 px-5 py-2 bg-foreground text-white rounded-full text-[12px] font-bold uppercase tracking-wider hover:bg-primary transition-all active:scale-95"
                          >
                            <ShoppingCart size={14} />
                            Add
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
          </AnimatePresence>
        </div>

        {/* FOOTER ACTION */}
        <div className="mt-14 flex items-center justify-center pt-8 border-t border-border">
           <Link to="/shop" className="flex items-center gap-2 text-foreground font-bold uppercase text-[12px] tracking-[0.2em] hover:text-primary transition-all group">
              Browse Complete Catalog <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>
      </div>
    </section>
  );
}

