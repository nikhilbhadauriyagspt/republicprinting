import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

export default function CategoryShowcase({ title, subtitle, products = [], adImage, adBg, link }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

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

  return (
    <section className="w-full bg-white py-10 md:py-14 font-['Rubik']">
      <div className="max-w-[1800px] mx-auto px-4 md:px-10">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-stretch">
          
          {/* LEFT STATIC AD CARD - MATCHED HEIGHT */}
          <div className={`w-full lg:w-[320px] xl:w-[380px] ${adBg} rounded-[20px] overflow-hidden flex flex-col justify-between p-6 md:p-8 shrink-0 relative group`}>
             <div className="relative z-10">
                <span className="text-primary text-[11px] font-bold uppercase tracking-[0.2em] block mb-3">
                  {subtitle}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-4">
                  {title}
                </h2>
                <Link to={link} className="inline-flex items-center gap-2 text-foreground font-bold uppercase text-[12px] tracking-widest hover:text-primary transition-all">
                  Browse Now <ArrowRight size={16} />
                </Link>
             </div>
             
             {/* IMAGE FOR AD - OPTIMIZED SIZE */}
             <div className="mt-6 relative z-10 flex items-center justify-center">
                <img 
                  src={adImage} 
                  alt={title} 
                  className="max-h-[180px] md:max-h-[220px] w-auto object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-700" 
                />
             </div>

             {/* DECORATIVE ELEMENT */}
             <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full -mr-8 -mt-8 blur-2xl pointer-events-none" />
          </div>

          {/* RIGHT PRODUCTS GRID */}
          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
              {products.slice(0, 4).map((p) => (
                <div key={p.id} className="group flex flex-col">
                  {/* IMAGE CONTAINER */}
                  <div className="relative aspect-square bg-[#F5F5F5] rounded-[16px] flex items-center justify-center overflow-hidden mb-3 border border-transparent transition-all group-hover:border-border group-hover:shadow-sm">
                    <Link to={`/product/${p.slug}`} className="w-full h-full flex items-center justify-center p-4">
                      <img
                        src={getImagePath(p.images)}
                        alt={p.name}
                        className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => { e.currentTarget.src = "/logo/fabicon.png"; }}
                      />
                    </Link>

                    <button 
                      onClick={() => toggleWishlist(p)}
                      className={`absolute top-2 right-2 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center transition-all ${isInWishlist(p.id) ? "text-primary" : "text-secondary hover:text-primary"}`}
                    >
                      <Heart size={15} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                    </button>
                  </div>

                  {/* DETAILS */}
                  <div className="px-1 flex-1 flex flex-col justify-between">
                    <Link to={`/product/${p.slug}`}>
                      <h3 className="text-[14px] font-semibold text-foreground leading-tight line-clamp-1 hover:text-primary transition-colors mb-2">
                        {p.name}
                      </h3>
                    </Link>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[16px] font-bold text-primary">
                        ${p.price}
                      </span>
                      <button
                        onClick={() => addToCart(p)}
                        className="flex items-center justify-center gap-2 px-3 py-1.5 bg-foreground text-white rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-primary transition-all active:scale-95"
                      >
                        <ShoppingCart size={12} />
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
