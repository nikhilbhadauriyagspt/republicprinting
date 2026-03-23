import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";

const SkeletonSpotlightItem = () => (
  <div className="block py-5 animate-pulse last:border-0">
    <div className="flex items-center gap-4">
      <div className="w-[85px] h-[85px] bg-slate-50 rounded-xl shrink-0"></div>
      <div className="min-w-0 flex-1">
        <div className="h-3 w-3/4 bg-slate-50 mb-2 rounded"></div>
        <div className="h-4 w-1/4 bg-slate-50 mb-2 rounded"></div>
        <div className="h-3 w-1/2 bg-slate-50 rounded"></div>
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
      x: direction > 0 ? 10 : -10,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 10 : -10,
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
    <div className={`p-6 md:p-8 ${colIndex < 2 ? "lg:border-r border-border" : ""}`}>
      {/* Block Header */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-[18px] font-bold text-foreground tracking-tight">
          {title}
        </h3>

        <div className="flex items-center gap-2">
          <button
            onClick={goPrev}
            disabled={page === 0}
            className="w-8 h-8 rounded-full border border-border bg-white text-secondary hover:text-primary hover:border-primary transition-all flex items-center justify-center disabled:opacity-20"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={goNext}
            disabled={page === maxPage}
            className="w-8 h-8 rounded-full border border-border bg-white text-secondary hover:text-primary hover:border-primary transition-all flex items-center justify-center disabled:opacity-20"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden min-h-[340px]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-2"
          >
            {loading ? (
              [...Array(3)].map((_, i) => <SkeletonSpotlightItem key={`skel-${i}`} />)
            ) : pageItems.length ? (
              pageItems.map((p) => (
                <div
                  key={p.id}
                  className="block p-3 rounded-2xl transition-all duration-300 hover:bg-background group"
                >
                  <div className="flex items-center gap-4">
                    {/* Thumbnail with Tinted BG */}
                    <Link
                      to={`/product/${p.slug}`}
                      className="w-[85px] h-[85px] flex items-center justify-center shrink-0 bg-[#F5F5F5] rounded-xl overflow-hidden p-2 transition-all group-hover:scale-95"
                    >
                      <img
                        src={getImagePath(p.images)}
                        alt={p.name}
                        className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.src = "/logo/fabicon.png";
                        }}
                      />
                    </Link>

                    <div className="min-w-0 flex-1">
                      <Link
                        to={`/product/${p.slug}`}
                        className="block text-[14px] font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors leading-tight mb-1"
                      >
                        {p.name}
                      </Link>

                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[16px] font-bold text-primary">
                          ${Number(p?.price || 0).toFixed(2)}
                        </span>
                        {p.old_price && (
                          <span className="text-[12px] text-secondary line-through">
                            ${p.old_price}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(p);
                          }}
                          className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-primary hover:underline"
                        >
                          <ShoppingCart size={12} />
                          Quick Add
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(`/product/${p.slug}`);
                          }}
                          className="text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-foreground"
                        >
                          View Info
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-secondary text-[13px] font-medium text-center">
                No items currently available.
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
    <section className="w-full font-['Rubik'] py-12 md:py-16 bg-white">
      <div className="max-w-[1800px] mx-auto px-4 md:px-10">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-10 px-2 gap-4">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight">
              Spotlight Collections
            </h2>
            <p className="text-secondary text-sm md:text-base font-medium mt-2">Explore our most curated printer and hardware series</p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-primary font-bold uppercase text-[12px] tracking-widest pb-1">
             <Sparkles size={16} /> Trending Series
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 border border-border rounded-[24px] overflow-hidden bg-white shadow-sm">
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

