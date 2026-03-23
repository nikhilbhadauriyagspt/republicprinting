import Hero from "@/components/Hero";
import FlashSalesSlider from "@/components/FlashSalesSlider";
import SEO from "@/components/SEO";
import SpotlightSection from "@/components/SpotlightSection";
import ShopByCategory from "@/components/ShopByCategory";
import CategoryShowcase from "@/components/CategoryShowcase";
import FeaturedTabs from "@/components/FeaturedTabs";
import CategorySpotlight from "@/components/CategorySpotlight";
import BrandMarquee from "@/components/BrandMarquee";
import ProductAccordion from "@/components/ProductAccordion";
import Techprint from "@/components/TechBlueprints"
import SaleBanners from "@/components/SaleBanners";
import PromoSection from "@/components/PromoSection";
import Middlebaner from "@/components/middlebaner"
import BottomWideBanner from "@/components/BottomWideBanner"

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
        title="Vital Print | High-Performance Printing Solutions"
        description="Shop printers, ink, and toner in Sacramento, CA. Professional business printing solutions with nationwide shipping."
        keywords="Buy Printers Online, Ink and Toner, LaserJet, OfficeJet, Printer Accessories, Business Printing Solutions, Sacramento Tech Store"
      />
      {/* 1. FULL WIDTH HERO */}
      <div className="w-full">
        <Hero products={data.all} />
      </div>

      <FlashSalesSlider />
      <Middlebaner />


      {/* 2. CATEGORY SECTION */}
      <ShopByCategory categories={data.categories} loading={data.loading} />
      {/* 3. FEATURED PRODUCTS (TABS) */}
      <FeaturedTabs
        printers={data.printers}
        accessories={data.accessories}
        loading={data.loading}
      />

      <BottomWideBanner />


      <CategoryShowcase
        title="Professional Business Printers"
        subtitle="Hardware Series"
        products={data.printers}
        adImage="/category/all-in-one-printers.png"
        adBg="bg-blue-50"
        link="/shop?category=all-in-one-printers"
      />
      {/* 4. NEW ARRIVALS */}
      <SpotlightSection
        newArrivals={data.all}
        topRated={data.all}
        popular={data.all}
        loading={data.loading}
      />

      <CategoryShowcase
        title="Ink & Toner "
        subtitle="Printing Solutions"
        products={data.accessories}
        adImage="/category/printer-accessories.png"
        adBg="bg-rose-50"
        link="/shop?category=printer-accessories"
      />











      <Showcase />
    </div>
  );
}