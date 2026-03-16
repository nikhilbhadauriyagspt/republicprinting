import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  ChevronsRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";

const SkeletonSpotlightItem = () => (
  <div className="block py-6 border-b border-[#efefef] animate-pulse last:border-0">
    <div className="flex items-center gap-4">
      <div className="w-[90px] h-[78px] bg-[#eeeeee] rounded-sm shrink-0"></div>
      <div className="min-w-0 flex-1">
        <div className="h-3 w-16 bg-[#eeeeee] mb-2 rounded"></div>
        <div className="h-4 w-full bg-[#eeeeee] mb-2 rounded"></div>
        <div className="h-4 w-24 bg-[#eeeeee] rounded"></div>
      </div>
    </div>
  </div>
);

const SpotlightBlock = ({ title, data, colIndex, loading = false }) => {
  const perPage = 3;
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const maxPage = Math.max(0, Math.ceil((data?.length || 0) / perPage) - 1);

  const goPrev = () => {
    setDirection(-1);
    setPage((p) => Math.max(0, p - 1));
  };

  const goNext = () => {
    setDirection(1);
    setPage((p) => Math.min(maxPage, p + 1));
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 20 : -20,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 20 : -20,
      opacity: 0,
    }),
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === "string" ? JSON.parse(images) : images;
      const first = Array.isArray(imgs) && imgs.length ? imgs[0] : null;
      if (!first) return "/logo/fabicon.png";
      const cleaned = String(first).replaceAll("\\", "/");
      return cleaned.startsWith("/") ? cleaned : `/${cleaned}`;
    } catch {
      return "/logo/fabicon.png";
    }
  };

  const pageItems = (data || []).slice(page * perPage, page * perPage + perPage);

  return (
    <div
      className={`bg-white ${colIndex < 2 ? "lg:border-r border-[#e5e5e5]" : ""}`}
    >
      {/* Block Header */}
      <div className="flex items-center justify-between px-6 md:px-7 py-5 border-b border-[#ededed]">
        <h3 className="text-[15px] font-semibold uppercase  text-[#282828]">
          {title}
        </h3>

        <div className="flex items-center gap-2">
          <button
            onClick={goPrev}
            disabled={page === 0}
            className="w-6 h-6 rounded-full border border-[#d8d8d8] bg-transparent text-[#b8b8b8] hover:bg-[#ff3b30] hover:border-[#ff3b30] hover:text-white transition-all duration-300 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={goNext}
            disabled={page === maxPage}
            className="w-6 h-6 rounded-full border border-[#d8d8d8] bg-transparent text-[#b8b8b8] hover:bg-[#ff3b30] hover:border-[#ff3b30] hover:text-white transition-all duration-300 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="px-6 md:px-7 overflow-hidden min-h-[400px] py-1">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 400, damping: 35 },
              opacity: { duration: 0.2 },
            }}
          >
            {loading ? (
              [...Array(3)].map((_, i) => <SkeletonSpotlightItem key={`skel-${i}`} />)
            ) : pageItems.length ? (
              pageItems.map((p) => (
                <div
                  key={p.id}
                  className="block py-6 border-b border-[#f1f1f1] last:border-0 group"
                >
                  <div className="flex items-center gap-4">
                    {/* Thumbnail */}
                    <Link
                      to={`/product/${p.slug}`}
                      className="w-[95px] h-[80px] flex items-center justify-center shrink-0 bg-[#f3f3f3] rounded-sm border border-[#e3e3e3] p-3 overflow-hidden transition-all duration-300 group-hover:bg-white group-hover:border-[#d7d7d7]"
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

                    <div className="min-w-0 flex-1">
                      <Link
                        to={`/product/${p.slug}`}
                        className="block text-[15px] font-medium text-[#2b2b2b] line-clamp-2 group-hover:text-[#ff3b30] transition-colors leading-snug mb-2"
                      >
                        {p.name}
                      </Link>

                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="text-[16px] font-bold text-[#ff3b30]">
                          ${Number(p?.price || 0).toFixed(2)}
                        </span>
                        {p.old_price && (
                          <span className="text-[13px] text-[#9b9b9b] line-through">
                            ${p.old_price}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(p);
                          }}
                          className="flex items-center gap-2 text-[11px] font-semibold uppercase text-[#666] hover:text-[#ff3b30] transition-colors"
                        >
                          <ShoppingCart size={13} />
                          Add to Cart
                        </button>

                        <span className="w-px h-3 bg-[#dddddd]"></span>

                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(`/product/${p.slug}`);
                          }}
                          className="text-[11px] font-semibold uppercase text-[#666] hover:text-[#ff3b30] transition-colors"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-2 py-20 text-[#999] text-[12px] font-bold uppercase tracking-[0.18em] text-center">
                No products found.
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function SpotlightSection({
  newArrivals = [],
  topRated = [],
  popular = [],
  loading = false,
}) {
  const normalizeList = (input) => {
    if (Array.isArray(input)) return input;
    if (input && Array.isArray(input.data)) return input.data;
    return [];
  };

  return (
    <section className="w-full font-['Rubik'] py-8 md:py-10 bg-[#f5f5f5]">
      <div className="w-full px-4 md:px-6 xl:px-26">
        {/* Section Heading */}
        <div className="flex items-center gap-3 border-b border-[#dddddd] pb-4 mb-8">
          <ChevronsRight
            size={26}
            className="text-[#ff3b30] shrink-0"
            strokeWidth={3}
          />
          <h2 className="text-[24px] font-semibold uppercase  text-[#282828]">
            Trending Collections
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 border border-[#e5e5e5] bg-white">
          <SpotlightBlock
            title="New Arrivals"
            data={normalizeList(newArrivals)}
            colIndex={0}
            loading={loading}
          />
          <SpotlightBlock
            title="Top Rated"
            data={normalizeList(topRated)}
            colIndex={1}
            loading={loading}
          />
          <SpotlightBlock
            title="Popular Products"
            data={normalizeList(popular)}
            colIndex={2}
            loading={loading}
          />
        </div>
      </div>
    </section>
  );
}