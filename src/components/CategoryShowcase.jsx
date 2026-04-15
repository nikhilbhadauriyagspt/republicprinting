import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, ChevronLeft, ChevronRight, Tag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function CategoryShowcase({ title, products = [], adImage, link, discount = 0, showBadge = true }) {
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

  if (!products || products.length === 0) return null;

  const swiperId = title.replace(/\s+/g, '-').toLowerCase();

  return (
    <section className="w-full bg-[#f1f3f6] py-10 md:py-16 font-['Rubik'] overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-4 md:px-10">

        <div className="bg-white rounded-xl overflow-hidden flex flex-col lg:flex-row items-stretch shadow-sm border border-gray-100 relative">

          {/* DISCOUNT BADGE OVERLAY - ONLY FOR SALES SECTIONS */}
          {discount > 0 && showBadge && (
            <div className="absolute top-4 left-4 z-20 bg-red-600 text-white px-4 py-1.5 rounded-full text-[12px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg">
              <Tag size={14} /> Extra {discount}% OFF
            </div>
          )}

          {/* LEFT SIDE BANNER - NO OVERLAYS */}
          <div className="w-full lg:w-[320px] xl:w-[380px] shrink-0 relative overflow-hidden bg-gray-50 border-r border-gray-100">
            <Link to={link} className="block w-full h-full">
              <img
                src={adImage}
                alt=""
                className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 hover:scale-105"
              />
            </Link>
          </div>

          {/* RIGHT SIDE - PRODUCTS SLIDER */}
          <div className="flex-1 p-4 md:p-8 relative group/slider overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <div className="flex flex-col">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">{title}</h3>
                {showBadge && <p className="text-[12px] text-red-600 font-bold uppercase tracking-wider mt-1">Limited Time Offer</p>}
              </div>

              <div className="flex items-center gap-2">
                <button className={`${swiperId}-prev w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-[#013E24] hover:text-white transition-all shadow-sm`}>
                  <ChevronLeft size={20} />
                </button>
                <button className={`${swiperId}-next w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-[#013E24] hover:text-white transition-all shadow-sm`}>
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={{
                prevEl: `.${swiperId}-prev`,
                nextEl: `.${swiperId}-next`,
              }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              spaceBetween={20}
              slidesPerView={2}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              className="!overflow-visible"
            >
              {products.map((p) => {
                const originalPrice = parseFloat(p.price);
                // Calculate old price only if discount is provided
                const oldPrice = discount > 0 ? (originalPrice / (1 - (discount / 100))).toFixed(2) : null;

                return (
                  <SwiperSlide key={p.id}>
                    <div className="group bg-white flex flex-col h-full border border-gray-50 rounded-xl p-3 md:p-4 hover:shadow-xl transition-all duration-300">
                      <div className="relative aspect-square mb-4 rounded-lg bg-gray-50 flex items-center justify-center p-3 overflow-hidden">
                        <Link to={`/product/${p.slug}`} className="w-full h-full flex items-center justify-center">
                          <img
                            src={getImagePath(p.images)}
                            alt={p.name}
                            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                            onError={(e) => { e.currentTarget.src = "/logo/fabicon.png"; }}
                          />
                        </Link>
                        <button
                          onClick={() => toggleWishlist(p)}
                          className={`absolute top-2 right-2 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center ${isInWishlist(p.id) ? "text-red-500" : "text-gray-400"}`}
                        >
                          <Heart size={16} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                        </button>
                      </div>

                      <div className="flex flex-col flex-1">
                        <Link to={`/product/${p.slug}`}>
                          <h4 className="text-[13px] md:text-[14px] font-medium text-gray-800 leading-snug line-clamp-2 hover:text-primary transition-colors mb-3 h-[36px]">
                            {p.name}
                          </h4>
                        </Link>
                        <div className="mt-auto">
                          {/* PRICE DISPLAY */}
                          <div className="flex items-baseline gap-2 mb-3">
                            <span className="text-[20px] font-black text-gray-900">${originalPrice}</span>
                            {oldPrice && <span className="text-[12px] text-gray-400 line-through font-bold">${oldPrice}</span>}
                          </div>

                          <button
                            onClick={() => addToCart(p)}
                            className="w-full py-2 bg-gray-900 text-white rounded-lg text-[11px] font-bold uppercase tracking-wider hover:bg-[#013E24] transition-all flex items-center justify-center gap-2"
                          >
                            <ShoppingCart size={14} /> Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

        </div>
      </div>
    </section>
  );
}
