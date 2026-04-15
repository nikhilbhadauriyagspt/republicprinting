import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import CategoryNavigation from "@/components/CategoryNavigation";
import FlashSalesSlider from "@/components/FlashSalesSlider";
import SEO from "@/components/SEO";
import SpotlightSection from "@/components/SpotlightSection";
import ShopByCategory from "@/components/ShopByCategory";
import CategoryShowcase from "@/components/CategoryShowcase";
import FeaturedTabs from "@/components/FeaturedTabs";
import PrinterGuide from "@/components/PrinterGuide";
import BrandMarquee from "@/components/BrandMarquee";
import Showcase from "@/components/ShowcaseStrip";
import Middlebaner from "@/components/middlebaner";
import ProductGrid from "@/components/ProductGrid";
import BottomWideBanner from "@/components/BottomWideBanner";
import { useState, useEffect, useMemo } from "react";
import API_BASE_URL from "../config";

// Import side banners
import inkjetSide from "@/assets/bannerr/inkjet-side.png";
import laserSide from "@/assets/bannerr/laser-side.png";
import bannerSide from "@/assets/bannerr/banner-side.png";

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

          const baseCategories = (printerParent && printerParent.children ? printerParent.children : catRes.data.filter(c => !c.name.toLowerCase().includes('laptop')));

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

  const inkjetPrinters = useMemo(() =>
    data.all.filter(p => p.name.toLowerCase().includes('inkjet') || p.name.toLowerCase().includes('pixma')),
    [data.all]);

  const laserPrinters = useMemo(() =>
    data.all.filter(p => p.name.toLowerCase().includes('laserjet') || p.name.toLowerCase().includes('laser')),
    [data.all]);

  const trendingMix = useMemo(() =>
    [...data.all].sort(() => 0.5 - Math.random()).slice(0, 20),
    [data.all]);

  return (
    <div className="bg-white font-sans overflow-x-hidden text-slate-900">
      <SEO
        title="Republic Printing | High-Performance Printing Solutions"
        description="Shop printers, ink, and toner globally. Professional business printing solutions with international shipping."
        keywords="Buy Printers Online, Ink and Toner, LaserJet, OfficeJet, Printer Accessories, Business Printing Solutions"
      />

      <Hero products={data.all} />
      <Showcase />

      <AboutSection />


      <ProductGrid products={data.all} />
      <ShopByCategory categories={data.categories} loading={data.loading} />
      <FeaturedTabs
        printers={data.printers}
        accessories={data.accessories}
        loading={data.loading}
      />

      <PrinterGuide />


    </div>
  );
}

