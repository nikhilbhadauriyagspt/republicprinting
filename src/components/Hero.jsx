import React, { useRef } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

import hero3 from "@/assets/bannerr/banner-2.jpg";
import hero1 from "@/assets/bannerr/hero-4.jpg";
import hero6 from "@/assets/bannerr/hero-5.jpg";
import hero2 from "@/assets/bannerr/hero-6.jpg";

const mainBanners = [
  {
    image: hero2,
    title: "Shop Printers for Home & Office",
    subtitle: "Find reliable printers & accessories",
    tag: "Top Picks",
  },
  {
    image: hero6,
    title: "Everyday Printing Made Easy",
    subtitle: "Popular products for work & school",
    tag: "Best Sellers",
  },
  {
    image: hero3,
    title: "Printers, Ink & Toner",
    subtitle: "Everything you need in one place",
    tag: "Featured Deals",
  },
  {
    image: hero1,
    title: "Upgrade Your Setup",
    subtitle: "Smart choices for home & office",
    tag: "New Arrivals",
  }
];

export default function Hero() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const { openSearch } = useCart();

  return (
    <div className="w-full font-['Rubik'] bg-white relative">
      <div className="w-full h-[400px] md:h-[535px] relative group overflow-hidden">
        <button
          ref={prevRef}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/10 backdrop-blur-md text-white z-50 hover:bg-[#FF2D37] hover:border-[#FF2D37] transition-all duration-500 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          ref={nextRef}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/10 backdrop-blur-md text-white z-50 hover:bg-[#FF2D37] hover:border-[#FF2D37] transition-all duration-500 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
        >
          <ChevronRight size={18} />
        </button>

        <Swiper
          modules={[Pagination, Autoplay, EffectFade, Navigation]}
          effect="fade"
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          speed={1000}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className} custom-bullet"></span>`;
            }
          }}
          className="h-full w-full"
        >
          {mainBanners.map((item, index) => (
            <SwiperSlide key={index}>
              {({ isActive }) => (
                <div className="relative w-full h-full bg-slate-100 overflow-hidden">
                  <div className="absolute inset-0 w-full h-full">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-black/10 to-transparent" />
                  </div>

                  <div className="absolute inset-0 rounded-2xl">
                    <div className="max-w-full mx-auto h-full px-6 md:px-16 flex rounded-2xl overflow-hidden flex-col justify-center items-end relative">
                      <div className="max-w-[550px] relative z-10  text-right flex flex-col items-end">
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={isActive ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.2 }}
                          className="flex items-center gap-3 mb-4"
                        >
                          <span className="px-2.5 py-1 bg-[#FF2D37] text-white text-[10px] font-semibold uppercase tracking-[0.15em] rounded-sm">
                            {item.tag}
                          </span>
                        </motion.div>

                        <motion.h2
                          initial={{ opacity: 0, x: 30 }}
                          animate={isActive ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.4, duration: 0.7 }}
                          className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.2] mb-3 tracking-tight"
                        >
                          {item.title}
                        </motion.h2>

                        <motion.h3
                          initial={{ opacity: 0, x: 20 }}
                          animate={isActive ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.6 }}
                          className="text-base md:text-lg font-medium text-white/90 mb-8"
                        >
                          {item.subtitle}
                        </motion.h3>

                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={isActive ? { opacity: 1, y: 0 } : {}}
                          transition={{ delay: 0.8 }}
                          className="flex items-center gap-4 justify-end"
                        >
                          <Link
                            to="/shop"
                            className="px-8 py-3 bg-[#FF2D37] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-white hover:text-[#FF2D37] transition-all rounded-sm flex items-center gap-2.5 relative group overflow-hidden"
                          >
                            <span className="relative z-10">Shop Now</span>
                            <ArrowRight
                              size={16}
                              className="relative z-10 group-hover:translate-x-1 transition-transform"
                            />
                          </Link>

                          <button
                            onClick={openSearch}
                            className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white group bg-white/10 backdrop-blur-md px-6 py-3 rounded-sm border border-white/20 hover:bg-white hover:text-[#FF2D37] transition-all"
                          >
                            <Search size={14} />
                            <span>Search Store</span>
                          </button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        .custom-bullet {
          width: 8px !important;
          height: 8px !important;
          border-radius: 50% !important;
          background: rgba(255,255,255,0.4) !important;
          opacity: 1 !important;
          margin: 0 5px !important;
          transition: all 0.4s ease !important;
        }
        .swiper-pagination-bullet-active {
          background: #FF2D37 !important;
          width: 24px !important;
          border-radius: 4px !important;
        }
        .swiper-pagination {
          bottom: 40px !important;
          right: 64px !important;
          left: auto !important;
          text-align: right !important;
          width: auto !important;
        }
        @media (max-width: 1024px) {
          .swiper-pagination {
            right: 50% !important;
            transform: translateX(50%) !important;
            bottom: 20px !important;
            text-align: center !important;
          }
        }
      `}</style>
    </div>
  );
}
