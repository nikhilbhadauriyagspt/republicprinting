import { useState, useEffect, useMemo } from "react";
import { Heart, ShoppingCart, ChevronsRight, Eye, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import API_BASE_URL from "../config";

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

  // Specific Printer categories from your data
  const tabs = [
    { name: "New Arrivals", slug: "all" },
    { name: "Inkjet Printers", slug: "inkjet-printers" },
    { name: "Laser Printers", slug: "laser-printers" },
    { name: "All-In-One", slug: "all-in-one-printers" },
    { name: "Supertank", slug: "supertank-printers" },
    { name: "Accessories", slug: "printer-accessories" },
  ];

  const filteredProducts = useMemo(() => {
    const currentTab = tabs.find(t => t.name === activeTab);
    if (!currentTab || currentTab.slug === "all") {
      return products.slice(0, 12);
    }

    // Filter by checking if any of the product's categories match the tab's slug
    // Note: We also check name for fallback if category metadata is missing in the list response
    const filtered = products.filter(p => {
      const categoryMatch = (p.categories || []).some(cat => cat.slug === currentTab.slug);
      const nameMatch = p.name.toLowerCase().includes(activeTab.toLowerCase().replace(' printers', ''));
      return categoryMatch || nameMatch;
    });

    return filtered.length > 0 ? filtered.slice(0, 12) : products.slice(0, 12);
  }, [products, activeTab]);

  const getSalePercent = (product) => {
    const price = parseFloat(product.price || 0);
    const oldPrice = parseFloat(product.compare_price || product.old_price || 0);
    if (oldPrice > price && oldPrice > 0) {
      return `-${Math.round(((oldPrice - price) / oldPrice) * 100)}%`;
    }
    return null;
  };

  return (
    <section className="w-full bg-white py-8 md:py-16 font-['Rubik']">
      <div className="w-full px-4 md:px-6 xl:px-26">
        {/* HEADER */}
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between border-b border-[#dddddd] pb-3 mb-8">
          <div className="flex items-center gap-3">
            <ChevronsRight
              size={26}
              className="text-[#ff3b30] shrink-0"
              strokeWidth={3}
            />
            <h2 className="text-[24px] font-semibold uppercase text-[#282828]">
              Trending Products
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 md:gap-5 xl:gap-7">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`h-[26px] px-4 text-[13px] md:text-[14px] uppercase transition-all ${activeTab === tab.name
                  ? "bg-[#ff3b30] text-white rounded-sm font-semibold"
                  : "text-[#555] hover:text-[#ff3b30] font-medium"
                  }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5">
          {loading
            ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[1/1.12] bg-[#ececec] border border-[#e2e2e2] rounded-sm" />
                <div className="h-5 bg-[#ececec] rounded mt-4" />
                <div className="h-5 bg-[#ececec] rounded mt-3 w-24" />
                <div className="h-10 bg-[#ececec] rounded mt-4" />
              </div>
            ))
            : filteredProducts.map((p) => {
              const salePercent = getSalePercent(p);

              return (
                <div key={p.id} className="group flex flex-col h-full overflow-hidden">
                  {/* IMAGE BOX */}
                  <div className="relative aspect-[1/1.12] bg-white border border-[#dddddd] rounded-sm overflow-hidden flex items-center justify-center p-5">
                    <Link
                      to={`/product/${p.slug}`}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <img
                        src={getImagePath(p.images)}
                        alt={p.name}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = "/logo/fabicon.png";
                        }}
                      />
                    </Link>

                    {salePercent && (
                      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#ff6a00] text-white text-[13px] font-bold flex items-center justify-center z-10">
                        {salePercent}
                      </div>
                    )}

                    {/* EYE ICON ON HOVER */}
                    <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Link
                        to={`/product/${p.slug}`}
                        className="w-[46px] h-[46px] rounded-md bg-[#ff2d37] text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform"
                      >
                        <Eye size={22} strokeWidth={2.5} />
                      </Link>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="pt-4 flex flex-col flex-1 relative bg-white">
                    <div className="min-h-[20px] mb-1">
                      <span className="text-[10px] uppercase tracking-wide text-[#8c8c8c] font-bold">
                        {p.brand_name || "GENUINE"}
                      </span>
                    </div>

                    <Link to={`/product/${p.slug}`}>
                      <h3 className="text-[14px] md:text-[15px] text-[#2b2b2b] font-medium leading-snug min-h-[44px] max-h-[44px] line-clamp-2 hover:text-[#ff2d37] transition-colors mb-2">
                        {p.name}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-2 flex-wrap mb-4">
                      <span className="text-[15px] md:text-[16px] font-bold text-[#ff2d37]">
                        ${p.price}
                      </span>
                      {(p.compare_price || p.old_price) && (
                        <span className="text-[14px] text-[#9b9b9b] line-through">
                          ${p.compare_price || p.old_price}
                        </span>
                      )}
                    </div>

                    {/* ACTION BUTTONS - SLIDE UP FROM BOTTOM ON HOVER */}
                    <div className="mt-auto transition-all duration-300 transform translate-y-[100%] group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                      <div className="flex items-center gap-2 pb-2">
                        <button
                          onClick={() => addToCart(p)}
                          className="flex-1 h-[40px] px-3 border border-[#d7d7d7] text-[#666] text-[13px] md:text-[14px] font-medium hover:bg-[#ff2d37] hover:border-[#ff2d37] hover:text-white transition-all rounded-sm flex items-center justify-center gap-2"
                        >
                          <ShoppingCart size={16} />
                          Add to Cart
                        </button>

                        <button
                          onClick={() => toggleWishlist(p)}
                          className={`w-[40px] h-[40px] border border-[#d7d7d7] rounded-sm flex items-center justify-center transition-all shrink-0 ${isInWishlist(p.id)
                            ? "text-[#ff2d37] border-[#ff2d37]"
                            : "text-[#777] hover:text-[#ff2d37] hover:border-[#ff2d37]"
                            }`}
                        >
                          <Heart
                            size={16}
                            className={isInWishlist(p.id) ? "fill-[#ff2d37]" : ""}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {/* VIEW ALL BUTTON */}
        <div className="mt-12 flex justify-center">
          <Link
            to="/shop"
            className="px-10 py-3 bg-transparent border border-[#d7d7d7] text-[#555] text-[14px] font-semibold uppercase tracking-widest hover:bg-[#ff2d37] hover:border-[#ff2d37] hover:text-white transition-all rounded-sm flex items-center gap-2"
          >
            View All Products
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}