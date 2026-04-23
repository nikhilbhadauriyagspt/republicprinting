import { motion } from "framer-motion";
import { Heart, ShoppingCart, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";

// public folder image path
const sideImage = "/newproimges/1.png";

export default function ProductGrid({ products = [] }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [addedItems, setAddedItems] = useState({});

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItems((prev) => ({ ...prev, [product.id]: true }));

    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === "string" ? JSON.parse(images) : images;

      if (Array.isArray(imgs) && imgs.length > 0) {
        return `/${String(imgs[0]).replace(/\\/g, "/")}`;
      }
    } catch (e) {
      console.log("Image parse error:", e);
    }

    return "/logo/fabicon.png";
  };

  return (
    <section className="w-full bg-white py-14 md:py-20 px-4 sm:px-6 lg:px-10 font-snpro">
      <div className="max-w-[1600px] mx-auto px-8">
        {/* heading */}
        <div className="flex items-end justify-between gap-4 mb-10">
          <div>
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.28em] mb-3"
              style={{ color: "#0096d6" }}
            >
              New Collection
            </p>
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 leading-tight">
              Fresh Picks For Your Workspace
            </h2>
          </div>

          <Link
            to="/shop"
            className="hidden md:inline-flex text-sm font-medium border-b pb-1 transition hover:opacity-80"
            style={{ color: "#0096d6", borderColor: "#0096d6" }}
          >
            View All Products
          </Link>
        </div>

        {/* main layout */}
        <div className="grid grid-cols-1 xl:grid-cols-[30%_70%] gap-6 lg:gap-8 items-stretch">
          {/* left static image */}
          <div className="relative overflow-hidden  min-h-[320px] md:h-[720px] bg-[#F4F7F5]">
            <img
              src={sideImage}
              alt="Featured printer collection"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/logo/fabicon.png";
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#0096d6]/70 via-[#0096d6]/15 to-transparent" />

            <div className="absolute left-0 bottom-0 p-6 md:p-8 text-white z-10">
              <p className="text-xs uppercase tracking-[0.25em] text-white/80 mb-3">
                Smart Printing
              </p>
              <h3 className="text-2xl md:text-3xl font-semibold leading-snug max-w-[320px]">
                Minimal design with powerful performance
              </h3>
              <Link
                to="/shop"
                className="inline-flex mt-5 px-5 py-2.5 rounded-full bg-white text-sm font-semibold transition hover:scale-[1.02]"
                style={{ color: "#0096d6" }}
              >
                Explore Now
              </Link>
            </div>
          </div>

          {/* right product area */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 content-start">
            {products && products.length > 0 ? (
              products.slice(0, 8).map((p, i) => (
                <motion.div
                  key={p.id || i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className="group bg-white border border-slate-200 rounded-[0px] p-2  transition-all duration-300"
                >
                  {/* top action */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-[10px] font-semibold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full"
                      style={{
                        color: "#0096d6",
                        backgroundColor: "rgba(1,62,36,0.06)",
                      }}
                    >
                      Printer
                    </span>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(p);
                      }}
                      className="h-9 w-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-red-500 transition"
                    >
                      <Heart
                        size={16}
                        fill={isInWishlist(p.id) ? "currentColor" : "none"}
                      />
                    </button>
                  </div>

                  {/* image */}
                  <Link
                    to={`/product/${p.slug}`}
                    className="bg-[#F7F8F7] rounded-[10px] h-[170px]  flex items-center justify-center p-4 overflow-hidden"
                  >
                    <img
                      src={getImagePath(p.images)}
                      alt={p.name}
                      className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = "/logo/fabicon.png";
                      }}
                    />
                  </Link>

                  {/* info */}
                  <div className="pt-4">
                    <Link to={`/product/${p.slug}`}>
                      <h3 className="text-[13px] md:text-[14px] font-semibold text-slate-900 line-clamp-2 leading-5 min-h-[40px] group-hover:text-[#0096d6] transition-colors">
                        {p.name}
                      </h3>
                    </Link>

                    <div className="mt-3 flex items-center justify-between gap-3">
                      <span
                        className="text-base md:text-lg font-bold"
                        style={{ color: "#0096d6" }}
                      >
                        ${p.price}
                      </span>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAddToCart(p);
                        }}
                        disabled={addedItems[p.id]}
                        className={`h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 ${addedItems[p.id]
                          ? "bg-[#0096d6]/200 text-white"
                          : "text-white hover:scale-105"
                          }`}
                        style={{
                          backgroundColor: addedItems[p.id]
                            ? undefined
                            : "#0096d6",
                        }}
                      >
                        {addedItems[p.id] ? (
                          <Check size={18} />
                        ) : (
                          <ShoppingCart size={17} />
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-2 md:col-span-3 xl:col-span-4 rounded-[24px] border border-dashed border-slate-300 bg-slate-50 py-16 px-6 text-center">
                <p className="text-lg font-semibold text-slate-800">
                  Products not available
                </p>
                <p className="text-sm text-slate-500 mt-2">
                  Please ensure the component is receiving the 'products' prop correctly.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}