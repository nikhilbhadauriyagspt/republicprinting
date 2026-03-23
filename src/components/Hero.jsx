import React, { useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    title: "Get the Best Printers for Your Home & Office",
    subtitle: "Latest Collection",
    desc: "Shop from a wide range of high-quality printers. We have the perfect machine for every task, from school projects to professional office work.",
    image: "/category/all-in-one-printers.png",
  },
  {
    id: 2,
    title: "Original Ink & Toner at the Best Prices",
    subtitle: "Printing Supplies",
    desc: "Don't let your work stop. We provide genuine ink and toner cartridges for all major printer brands with fast delivery to your door.",
    image: "/category/inkjet-printers.png",
  },
  {
    id: 3,
    title: "Reliable Hardware & Expert Printing Support",
    subtitle: "Professional Setup",
    desc: "Whether you need a compact inkjet or a heavy-duty laser printer, we offer the best hardware and advice to keep your business running smoothly.",
    image: "/category/laser-printers.png",
  },
  {
    id: 4,
    title: "Eco-Friendly Printers with High Ink Savings",
    subtitle: "EcoTank Series",
    desc: "Save up to 90% on ink costs with our latest supertank printers. Perfect for high-volume printing without the high cost.",
    image: "/category/supertank-printers.png",
  },
  {
    id: 5,
    title: "Professional Photo Printers for Stunning Detail",
    subtitle: "Creative Prints",
    desc: "Bring your memories to life with lab-quality photo printing at home. Experience vibrant colors and sharp details in every shot.",
    image: "/category/photo-printers.png",
  },
  {
    id: 6,
    title: "Heavy Duty Printers for Industrial Use",
    subtitle: "Large Format",
    desc: "Scale your business with our professional large-format printers. Reliable, fast, and built for the most demanding creative projects.",
    image: "/category/large-format-printers.png",
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // AUTO SLIDE
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="w-full bg-white py-4 md:py-3 font-['Rubik'] group/hero">
      <div className="max-w-[1800px] mx-auto px-4 md:px-6 relative">
        <div className="w-full bg-[#F5F5F5] relative  h-[500px] md:h-[550px] flex items-center rounded-[15px]">
          {/* SUBTLE BACKGROUND TEXTURE */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:32px_32px]" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="px-6 md:px-12 lg:px-18 w-full relative z-10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-20">

                {/* LEFT CONTENT */}
                <div className="text-foreground text-center lg:text-left">
                  <motion.span
                    initial={{ y: -40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-primary text-[12px] font-bold uppercase tracking-[0.3em] mb-4 block"
                  >
                    {slides[currentIndex].subtitle}
                  </motion.span>

                  <motion.h1
                    initial={{ x: -60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-3xl md:text-5xl font-bold max-w-2xl leading-tight mb-3 tracking-tight text-foreground"
                  >
                    {slides[currentIndex].title}
                  </motion.h1>

                  <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <p className="text-[15px] md:text-[17px] text-secondary mb-8 max-w-lg font-semibold leading-relaxed mx-auto lg:mx-0">
                      {slides[currentIndex].desc}
                    </p>

                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                      <Link
                        to="/shop"
                        className="px-5 py-2.5 bg-primary text-white text-[12px] font-semibold uppercase  hover:bg-primary-hover transition-all rounded-full flex items-center gap-2"
                      >
                        View Collection
                        <ArrowRight size={18} />
                      </Link>

                      <Link
                        to="/contact"
                        className="px-5 py-2.5 border border-border bg-white text-foreground text-[12px] font-semibold uppercase tracking-wider hover:bg-background transition-all rounded-full"
                      >
                        Get Assistance
                      </Link>
                    </div>
                  </motion.div>
                </div>

                {/* RIGHT SIDE: IMAGE */}
                <motion.div
                  initial={{ x: 80, opacity: 0, scale: 0.9 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="relative flex items-center justify-center h-[280px] md:h-[400px]"
                >
                  <img
                    src={slides[currentIndex].image}
                    alt={slides[currentIndex].title}
                    className="max-w-full max-h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                  />
                </motion.div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* NAVIGATION ARROWS - POSITIONED HALF-IN/HALF-OUT */}
          <button
            onClick={prevSlide}
            className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all z-30 "
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all z-30 "
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

