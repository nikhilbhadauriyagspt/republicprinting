import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function ShopByCategory({ categories = [], loading = false }) {
  if (loading) {
    return (
      <section className="w-full py-16 bg-white flex flex-col items-center">
        <div className="flex gap-6 justify-center w-full max-w-[1800px] px-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-full aspect-[4/5] bg-slate-50 rounded-[20px] animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  const printerParent = categories.find(
    (c) => c.slug === "printers" || c.id === 46
  );
  const displayCategories = printerParent ? (printerParent.children || []) : categories;

  const getImagePath = (image) => {
    if (!image) return "/logo/fabicon.png";
    let path = image.startsWith("/") ? image : `/${image}`;
    return path.replace(/\.(jpg|jpeg)$/i, '.png');
  };

  const softColors = [
    "bg-blue-50",
    "bg-rose-50",
    "bg-emerald-50",
    "bg-amber-50",
    "bg-indigo-50",
    "bg-cyan-50",
    "bg-violet-50",
    "bg-orange-50",
  ];

  if (!displayCategories || displayCategories.length === 0) return null;

  return (
    <section className="w-full py-12 md:py-20 bg-white font-['Rubik'] overflow-hidden relative group/section">
      <div className="max-w-[1800px] mx-auto px-4 md:px-10 relative">
        
        {/* HEADER SECTION */}
        <div className="flex items-end justify-between mb-10 md:mb-14 px-2">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight">
              Browse Categories
            </h2>
            <p className="text-secondary text-sm md:text-base font-medium mt-2">Find the perfect hardware for your specific needs</p>
          </div>
          <div className="flex gap-3">
            <button className="shop-cat-prev w-10 h-10 rounded-full border border-border bg-white text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center justify-center shadow-sm">
              <ChevronLeft size={20} />
            </button>
            <button className="shop-cat-next w-10 h-10 rounded-full border border-border bg-white text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center justify-center shadow-sm">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* SLIDER */}
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".shop-cat-next",
              prevEl: ".shop-cat-prev",
            }}
            spaceBetween={16}
            slidesPerView={2.4}
            breakpoints={{
              480: { slidesPerView: 3.2, spaceBetween: 16 },
              768: { slidesPerView: 4.2, spaceBetween: 20 },
              1024: { slidesPerView: 5.2, spaceBetween: 20 },
              1280: { slidesPerView: 7.2, spaceBetween: 24 },
              1536: { slidesPerView: 8.2, spaceBetween: 24 },
            }}
            className="!overflow-visible"
          >
            {displayCategories.map((cat, index) => (
              <SwiperSlide key={cat.id}>
                <Link
                  to={`/shop?category=${cat.slug}`}
                  className="group block bg-white border border-border rounded-[16px] p-1.5 hover:border-primary/30 hover:shadow-lg transition-all duration-500"
                >
                  {/* IMAGE CONTAINER WITH SOFT VARIABLE BG */}
                  <div className={`relative aspect-square ${softColors[index % softColors.length]} rounded-[12px] flex items-center justify-center overflow-hidden mb-3`}>
                    <img
                      src={getImagePath(cat.image)}
                      alt={cat.name}
                      className="w-[70%] h-[75%] object-contain transition-transform duration-700 group-hover:scale-110 mix-blend-multiply"
                      onError={(e) => {
                        e.currentTarget.src = "/logo/fabicon.png";
                      }}
                    />
                    
                    {/* OVERLAY BUTTON */}
                    <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-white text-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 shadow-md">
                      <ArrowRight size={12} className="text-primary" />
                    </div>
                  </div>

                  {/* DETAILS */}
                  <div className="px-2 pb-2">
                    <h3 className="text-[13px] md:text-[14px] font-bold text-foreground group-hover:text-primary transition-colors duration-300 capitalize truncate">
                      {cat.name}
                    </h3>
                    <p className="text-[9px] font-semibold text-secondary uppercase tracking-widest mt-0.5">
                      Explore
                    </p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

