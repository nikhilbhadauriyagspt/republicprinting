import { Link } from "react-router-dom";
import { ChevronRight, LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";

export default function ShopByCategory({ categories = [], loading = false }) {
  if (loading) {
    return (
      <section className="w-full py-16 bg-white flex flex-col items-center">
        <div className="w-full max-w-[1800px] px-6 space-y-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-full h-[400px] bg-slate-50 animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  const printerParent = categories.find(
    (c) => c.slug === "printers" || c.id === 46
  );
  const displayCategories = printerParent ? (printerParent.children || []) : categories;

  // Updated to use local images from public/banner/category-imges/
  const getLocalImagePath = (index) => {
    return `/banner/category-imges/${index + 1}.png`;
  };

  if (!displayCategories || displayCategories.length === 0) return null;

  // Static relatable content mapping
  const categoryHeadings = {
    'inkjet-printers': "Inkjet Printers for Vibrant Creative Work",
    'laser-printers': "Laser Systems for High-Speed Business",
    'all-in-one-printers': "All-In-One Solutions for Multi-Tasking",
    'supertank-printers': "Supertank Series for Limitless Printing",
    'thermal-printers': "Thermal Technology for Reliable POS",
    'large-format-printers': "Large Format Units for Industrial Scale",
    'printer-accessories': "Genuine Supplies & Essential Accessories",
    'led-printers': "LED Technology for Energy-Efficient Printing",
    'photo-printers': "Professional Grade Photo Printing Systems",
    'dot-matrix-printers': "Impact Printing for Industrial Reliability"
  };

  const categoryDescs = {
    'inkjet-printers': "Perfect for home offices and creative studios needing photographic precision.",
    'laser-printers': "Engineered for speed and endurance to handle heavy professional workloads.",
    'all-in-one-printers': "Streamline your workflow with smart machines that scan, copy, and print.",
    'supertank-printers': "High-capacity reservoirs that deliver ultra-low cost per page.",
    'thermal-printers': "Compact and durable solutions for retail receipts and logistics labels.",
    'large-format-printers': "Industrial precision for blueprints, banners, and massive marketing materials.",
    'printer-accessories': "Keep your systems running smoothly with our range of ink, toner, and parts.",
    'led-printers': "Reliable and high-quality printing with fewer moving parts for longevity.",
    'photo-printers': "Capture every detail with systems designed for professional photographers.",
    'dot-matrix-printers': "Robust and reliable impact technology for multi-part forms and logs."
  };

  return (
    <section className="w-full py-20 bg-white font-sans">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* SECTION HEADER */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: "#013E24" }}
            >
              Our Catalogue
            </p>
            <h2 className="text-4xl md:text-5xl font-[700] text-slate-900 tracking-tight">
              Discover Your <span class="text-[#013E24]">Perfect Printer</span>
            </h2>
          </motion.div>
        </div>

        {/* CATEGORY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayCategories.map((cat, index) => {
            const fullHeading = categoryHeadings[cat.slug] || cat.name;
            const desc = categoryDescs[cat.slug] || "Explore our curated collection of high-quality products.";

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative rounded-xl overflow-hidden shadow-md group"
              >
                <div className="absolute inset-0 w-full h-full">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    src={getLocalImagePath(index)}
                    alt={cat.name}
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>

                <div className="relative p-8 text-gray-900 flex flex-col items-start">
                  <div
                    className="backdrop-blur-sm bg-white/10 p-6 rounded-xl border border-white/80" // Lighter background and border for glassmorphism
                  >
                    <h3 className="text-2xl md:text-3xl font-[600] text-white">
                      {fullHeading}
                    </h3>
                    <p className="mt-2 text-base text-gray-200 max-w-lg">
                      {desc}
                    </p>
                    <Link
                      to={`/shop?category=${cat.slug}`}
                      className="mt-4 inline-block px-6 py-2.5 rounded-lg font-semibold text-base transition-colors"
                      style={{
                        backgroundColor: "white",
                        color: "#013E24", // Text color is now the main brand color
                        boxShadow: "0 2px 8px 0 rgba(1, 62, 36, 0.15)" // Adjusted shadow for lighter background
                      }}
                    >
                      Shop {cat.name}
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
