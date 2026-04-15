import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import API_BASE_URL from "../config";

export default function FlashSalesSlider() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const scrollRef = useRef(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/products?limit=12`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setProducts(data.data.map(p => ({ ...p, quantity: 1 })));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // AUTO SLIDE EFFECT
  useEffect(() => {
    if (products.length === 0) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const maxScroll = scrollWidth - clientWidth;

        // Calculate the exact width of one card + gap to slide perfectly
        const cardWidth = scrollRef.current.firstElementChild?.offsetWidth + 24 || 400;

        if (scrollLeft >= maxScroll - 20) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [products]);

  const handleQuantity = (id, type) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const newQty = type === "inc" ? p.quantity + 1 : Math.max(1, p.quantity - 1);
        return { ...p, quantity: newQty };
      }
      return p;
    }));
  };

  const getImagePath = (product) => {
    try {
      const images = JSON.parse(product.images);
      return images && images.length > 0 ? `/${images[0].replace(/\\/g, "/")}` : "/logo/fabicon.png";
    } catch (e) {
      return "/logo/fabicon.png";
    }
  };

  if (loading) return null;

  return (
    <section className="py-6 bg-white font-['Rubik']">
      <div className="max-w-[1800px] mx-auto px-4 md:px-10 relative">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-6 scroll-smooth"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-[300px] md:min-w-[calc((100%-72px)/4)] bg-white rounded-[15px] p-4 flex gap-4 shadow-[0_2px_5px_rgba(0,0,0,0.08)] border border-background snap-start"
            >
              {/* LEFT: IMAGE (30%) */}
              <Link to={`/product/${product.slug}`} className="w-[30%] aspect-square bg-[#F5F5F5] rounded-[12px] flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src={getImagePath(product)}
                  alt={product.name}
                  className="w-full h-full object-contain p-3 hover:scale-110 transition-transform duration-500 mix-blend-multiply"
                />
              </Link>

              {/* RIGHT: DETAILS (70%) */}
              <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                <div>
                  <Link to={`/product/${product.slug}`} className="text-[14px] font-bold text-foreground truncate block hover:text-primary transition-colors">
                    {product.name}
                  </Link>
                  <p className="text-[18px] font-bold text-primary mt-1">${product.price}</p>
                </div>

                <div className="flex items-center gap-3 mt-4">
                  {/* QUANTITY SELECTOR */}
                  <div className="flex items-center border border-border rounded-full p-1 bg-background">
                    <button
                      onClick={() => handleQuantity(product.id, "dec")}
                      className="w-7 h-7 flex items-center justify-center text-secondary hover:text-primary transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-[12px] font-bold text-foreground">{product.quantity}</span>
                    <button
                      onClick={() => handleQuantity(product.id, "inc")}
                      className="w-7 h-7 flex items-center justify-center text-secondary hover:text-primary transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* ADD TO CART */}
                  <button
                    onClick={() => addToCart(product, product.quantity)}
                    className="flex-1 h-9 bg-[#013E24] text-white rounded-full flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-wider hover:bg-[#013E24]-hover transition-all shadow-lg shadow-primary/10"
                  >
                    <ShoppingCart size={13} />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
          {/* Spacer to ensure the last card is fully visible and can snap */}
          <div className="min-w-[1px] h-1 shrink-0" />
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
