import React from "react";
import { Link } from "react-router-dom";

export default function PrinterPromoBanners() {
  const banners = [
    {
      id: 1,
      image: "/banner/printer-promo-1.jpg",
      titleTop: "PREMIUM",
      titleMain: "Laser Printer Deals",
      subtitle: "High-speed office printers with clean output",
      button: "Shop Now",
      align: "right",
      theme: "dark",
    },
    {
      id: 2,
      image: "/banner/printer-promo-2.jpg",
      titleTop: "MEGA SALE",
      titleMain: "Up to 30% Off",
      subtitle: "Wireless, ink tank & all-in-one printers",
      button: "Explore Now",
      align: "left",
      theme: "light",
    },
    {
      id: 3,
      image: "/banner/printer-promo-3.jpg",
      titleTop: "LIMITED OFFER",
      titleMain: "Printer Sale Event",
      subtitle: "Best picks for home and business printing",
      button: "Buy Now",
      align: "right",
      theme: "dark",
    },
  ];

  return (
    <section className="w-full py-8 md:py-16 font-['Rubik']">
      <div className="max-w-full mx-auto px-4 md:px-6 xl:px-26">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {banners.map((banner) => {
            const isRight = banner.align === "right";
            const isLight = banner.theme === "light";

            return (
              <div
                key={banner.id}
                className="relative min-h-[230px] md:min-h-[260px] rounded-[6px] overflow-hidden group"
              >
                <img
                  src={banner.image}
                  alt={banner.titleMain}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div
                  className={`relative z-10 h-full p-8 md:p-10 flex flex-col justify-center ${isRight ? "items-end text-right" : "items-start text-left"
                    }`}
                >
                  <span
                    className={`text-[13px] md:text-[14px] font-semibold uppercase tracking-[0.18em] mb-3 ${isLight ? "text-[#333]" : "text-white/90"
                      }`}
                  >
                    {banner.titleTop}
                  </span>

                  <h3
                    className={`text-[30px] leading-[1.05] font-extrabold uppercase max-w-[320px] ${isLight ? "text-[#111]" : "text-white"
                      }`}
                  >
                    {banner.titleMain}
                  </h3>

                  <p
                    className={`mt-3 text-[14px] max-w-[320px] leading-relaxed ${isLight ? "text-[#444]" : "text-white/85"
                      }`}
                  >
                    {banner.subtitle}
                  </p>

                  <Link
                    to="/shop"
                    className="mt-6 inline-flex items-center justify-center h-[42px] px-6 bg-[#ff2d37] text-white text-[13px] font-bold uppercase tracking-wide rounded-sm hover:bg-black transition-colors"
                  >
                    {banner.button}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}