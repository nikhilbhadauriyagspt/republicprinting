import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function ShopByCategory({ categories = [], loading = false }) {
  // Skeleton Loader for Categories
  if (loading) {
    return (
      <section className="w-full mt-4 py-8 md:py-16 font-['Rubik'] overflow-hidden">
        <div className="w-full px-4 md:px-6 xl:px-26">
          <div className="flex items-center justify-between border-b border-[#dddddd] pb-2 mb-8 animate-pulse">
            <div className="h-8 w-64 bg-gray-200 rounded"></div>
            <div className="hidden md:flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200"></div>
              <div className="w-8 h-8 rounded-full bg-gray-200"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-6">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="flex flex-col items-center animate-pulse">
                <div className="w-full aspect-square max-w-[140px] bg-gray-100 rounded-full mb-4"></div>
                <div className="h-4 w-24 bg-gray-100 rounded mb-2"></div>
                <div className="h-3 w-16 bg-gray-50 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Find printer parent if it exists in the provided list
  const printerParent = categories.find(
    (c) => c.slug === "printers" || c.id === 46
  );

  // If found, use its children. If not, use the passed categories directly.
  const displayCategories = printerParent ? (printerParent.children || []) : categories;

  const getImagePath = (image) => {
    if (!image) return "/logo/fabicon.png";
    const path = image.startsWith("/") ? image : `/${image}`;
    return path.replace(/\.jpg$/, '.png');
  };

  if (!displayCategories || displayCategories.length === 0) return null;

  return (
    <section className="w-full mt-4  py-8 md:py-16 font-['Rubik'] overflow-hidden">
      <div className="w-full px-4 md:px-6 xl:px-26">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-[#dddddd] pb-2 mb-8">
          <div className="flex items-center gap-3">
            <ChevronsRight size={26} className="text-[#ff3b30] shrink-0" strokeWidth={3} />
            <h2 className="text-[24px] font-semibold uppercase  text-[#282828]">
              Popular Categories
            </h2>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button className="shop-cat-prev w-8 h-8 rounded-full border border-[#d8d8d8] bg-transparent text-[#b8b8b8] hover:bg-[#ff3b30] hover:border-[#ff3b30] hover:text-white transition-all duration-300 flex items-center justify-center">
              <ChevronLeft size={22} />
            </button>
            <button className="shop-cat-next w-8 h-8 rounded-full border border-[#d8d8d8] bg-transparent text-[#b8b8b8] hover:bg-[#ff3b30] hover:border-[#ff3b30] hover:text-white transition-all duration-300 flex items-center justify-center">
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* SLIDER */}
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".shop-cat-next",
            prevEl: ".shop-cat-prev",
          }}
          loop={displayCategories.length > 6}
          spaceBetween={18}
          slidesPerView={2}
          breakpoints={{
            480: { slidesPerView: 2.4, spaceBetween: 16 },
            640: { slidesPerView: 3.2, spaceBetween: 18 },
            768: { slidesPerView: 4.2, spaceBetween: 18 },
            1024: { slidesPerView: 5.2, spaceBetween: 20 },
            1280: { slidesPerView: 6.2, spaceBetween: 24 },
            1536: { slidesPerView: 7, spaceBetween: 28 },
          }}
          className="shop-category-swiper"
        >
          {displayCategories.map((cat) => (
            <SwiperSlide key={cat.id} className="h-auto">
              <Link
                to={`/shop?category=${cat.slug}`}
                className="group flex flex-col items-center text-center"
              >
                {/* IMAGE */}
                <div className="w-full h-[120px] md:h-[135px] flex items-center justify-center mb-4">
                  <img
                    src={getImagePath(cat.image)}
                    alt={cat.name}
                    className="max-w-[120px] md:max-w-[140px] max-h-[110px] md:max-h-[120px] object-contain transition-all duration-500 group-hover:scale-110 drop-shadow-[0_15px_25px_rgba(0,0,0,0.12)] group-hover:drop-shadow-[0_25px_35px_rgba(0,0,0,0.18)]"
                    onError={(e) => {
                      e.currentTarget.src = "/logo/fabicon.png";
                    }}
                  />
                </div>

                {/* TITLE */}
                <h3 className="text-[15px] font-semibold text-[#222] leading-tight group-hover:text-[#ff3b30] transition-colors duration-300">
                  {cat.name}
                </h3>

                {/* COUNT */}
                <p className="mt-2 text-[15px] text-[#5f6b7a] font-normal">
                  {cat.products_count || cat.product_count || cat.count || 0} Devices
                </p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* MOBILE ARROWS */}
        <div className="flex md:hidden items-center justify-center gap-3 mt-8">
          <button className="shop-cat-prev w-11 h-11 rounded-full border border-[#d8d8d8] bg-transparent text-[#b8b8b8] hover:bg-[#ff3b30] hover:border-[#ff3b30] hover:text-white transition-all duration-300 flex items-center justify-center">
            <ChevronLeft size={20} />
          </button>
          <button className="shop-cat-next w-11 h-11 rounded-full border border-[#d8d8d8] bg-transparent text-[#b8b8b8] hover:bg-[#ff3b30] hover:border-[#ff3b30] hover:text-white transition-all duration-300 flex items-center justify-center">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <style>{`
        .shop-category-swiper {
          overflow: visible !important;
        }
      `}</style>
    </section>
  );
}