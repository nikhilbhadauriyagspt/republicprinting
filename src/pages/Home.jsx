import Hero from "@/components/Hero";
import SEO from "@/components/SEO";
import SpotlightSection from "@/components/SpotlightSection";
import ShopByCategory from "@/components/ShopByCategory";
import FeaturedTabs from "@/components/FeaturedTabs";
import CategorySpotlight from "@/components/CategorySpotlight";
import BrandMarquee from "@/components/BrandMarquee";
import ProductAccordion from "@/components/ProductAccordion";
import Techprint from "@/components/TechBlueprints"
import SaleBanners from "@/components/SaleBanners";
import PromoSection from "@/components/PromoSection";
import Middlebaner from "@/components/middlebaner"

import Showcase from "@/components/ShowcaseStrip";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight } from "lucide-react";
import API_BASE_URL from "../config";

export default function Home() {
  const [data, setData] = useState({
    printers: [],
    accessories: [],
    all: [],
    categories: [],
    brands: [],
    loading: true
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes, brandRes] = await Promise.all([
          fetch(`${API_BASE_URL}/products?limit=1000`).then(r => r.json()),
          fetch(`${API_BASE_URL}/categories`).then(r => r.json()),
          fetch(`${API_BASE_URL}/brands`).then(r => r.json())
        ]);

        if (prodRes.status === 'success' && catRes.status === 'success' && brandRes.status === 'success') {
          const all = prodRes.data.filter(p => !p.name.toLowerCase().includes('laptop') && !p.name.toLowerCase().includes('macbook') && !p.name.toLowerCase().includes('notebook'));

          const printers = all.filter(p =>
            p.name.toLowerCase().includes('printer') ||
            p.name.toLowerCase().includes('laserjet') ||
            p.name.toLowerCase().includes('pixma')
          );
          const accessories = all.filter(p =>
            p.name.toLowerCase().includes('ink') ||
            p.name.toLowerCase().includes('toner') ||
            p.name.toLowerCase().includes('cable') ||
            p.name.toLowerCase().includes('adapter')
          );

          const printerParent = catRes.data.find(
            (cat) => cat.slug === 'printers' || cat.id === 46
          );

          // Get the base categories to display
          const baseCategories = (printerParent && printerParent.children ? printerParent.children : catRes.data.filter(c => !c.name.toLowerCase().includes('laptop')));

          // Parallel fetch counts for each category
          const categoriesWithCounts = await Promise.all(baseCategories.map(async (cat) => {
            try {
              const res = await fetch(`${API_BASE_URL}/products?category=${cat.slug}&limit=1`).then(r => r.json());
              return {
                ...cat,
                products_count: res.meta?.total || 0
              };
            } catch (err) {
              return { ...cat, products_count: 0 };
            }
          }));

          setData({
            all,
            printers,
            accessories,
            laserPrinters: all.filter(p => p.name.toLowerCase().includes('laserjet') || p.name.toLowerCase().includes('laser')),
            categories: categoriesWithCounts,
            brands: brandRes.data,
            loading: false
          });
        }
      } catch (err) {
        console.error(err);
        setData(prev => ({ ...prev, loading: false }));
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white font-sans overflow-x-hidden text-slate-900">
      <SEO
        title="Dash Printer shop | Premium Printing Solutions"
        description="Shop genuine printers, ink, and toner in Pasadena, CA. Premium business printing solutions with nationwide shipping."
        keywords="Buy HP Printers Online, Genuine HP Ink and Toner, HP LaserJet, HP OfficeJet, Printer Accessories, Business Printing Solutions, Pasadena Tech Store"
      />
      {/* 1. HERO + SIDEBARS */}
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-10 mt-6 md:mt-10">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* LEFT SIDEBAR CATEGORIES */}
          <div className="hidden xl:block w-[244px] shrink-0 border border-[#ececec] bg-white rounded-lg overflow-hidden h-fit ">
            <div className="bg-[#f9f9f9] px-5 py-4 border-b border-[#ececec] flex items-center justify-between">
              <h3 className="text-[14px] font-semibold uppercase  text-[#222]">Shop by Category</h3>
              <div className="w-6 h-6 rounded-full border border-[#FF2D37]/20 flex items-center justify-center text-[#FF2D37] bg-[#FF2D37]/5">
                <ArrowRight size={12} />
              </div>
            </div>
            <div className="flex flex-col">
              {data.categories.length > 0 ? (
                <div className="py-2">
                  {data.categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/shop?category=${cat.slug}`}
                      className="flex items-center justify-between px-5 py-3 text-[14px] font-medium text-[#555] hover:bg-[#fafafa] hover:text-[#ff2d37] transition-all capitalize border-b border-[#f5f5f5] last:border-0"
                    >
                      <span>{cat.name}</span>
                      <ChevronRight size={14} className="text-[#ccc]" />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-10 flex flex-col items-center justify-center gap-3">
                  <div className="w-8 h-8 border-2 border-[#ff2d37]/20 border-t-[#ff2d37] rounded-full animate-spin" />
                </div>
              )}
            </div>
          </div>

          {/* MIDDLE HERO CONTENT */}
          <div className="flex-1 min-w-0 rounded-lg overflow-hidden  border border-[#ececec]">
            <Hero products={data.all} />
          </div>

          {/* RIGHT SIDEBAR STATIC IMAGES */}
          <div className="hidden xl:flex flex-col gap-6 w-[280px] 2xl:w-[360px] shrink-0">
            {/* TOP PROMO: Inkjet Printers */}
            <Link
              to="/shop?category=inkjet-printers"
              className="flex-1 rounded-lg overflow-hidden  hover:shadow-md transition-shadow group relative min-h-[160px]"
            >
              <img
                src="/banner/promo-top-right.jpg"
                alt="Inkjet Printers"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex flex-col justify-center px-6">
                <span className="text-[#FF2D37] text-[10px] font-bold uppercase tracking-widest mb-2">Creative Color</span>
                <h4 className="text-white text-lg font-bold leading-tight mb-4">Inkjet Printing Solutions</h4>
                <div className="flex items-center gap-2 text-white text-[11px] font-bold uppercase tracking-widest group-hover:gap-3 transition-all">
                  Shop Now <ArrowRight size={14} />
                </div>
              </div>
            </Link>

            {/* BOTTOM PROMO: Laser Printers */}
            <Link
              to="/shop?category=laser-printers"
              className="flex-1 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group relative min-h-[160px]"
            >
              <img
                src="/banner/promo-bottom-right.jpg"
                alt="Laser Printers"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex flex-col justify-center px-6">
                <span className="text-[#FF2D37] text-[10px] font-bold uppercase tracking-widest mb-2">High Efficiency</span>
                <h4 className="text-white text-lg font-bold leading-tight mb-4">Professional Laser Systems</h4>
                <div className="flex items-center gap-2 text-white text-[11px] font-bold uppercase tracking-widest group-hover:gap-3 transition-all">
                  Shop Now <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <Showcase />

      {/* 2. CATEGORY SECTION */}
      <ShopByCategory categories={data.categories} loading={data.loading} />
      <Middlebaner />

      {/* 3. FEATURED PRODUCTS (TABS) */}
      <FeaturedTabs
        printers={data.printers}
        accessories={data.accessories}
        loading={data.loading}
      />



      {/* 4. PROMO BANNER */}
      <PromoSection />



      {/* 4. NEW ARRIVALS */}
      <SpotlightSection
        newArrivals={data.all}
        topRated={data.all}
        popular={data.all}
        loading={data.loading}
      />

    </div>
  );
}