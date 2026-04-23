import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function MiddleBanner() {
    const banners = [
        {
            title: "Advanced Wireless Printing Solutions",
            subtitle: "Modern Office",
            image: "/midbanner/A modern colorful wireless printer help website banner, two large stylish home-office printers placed on the right, glowing wireless signal inspired abstract design, smooth curved geometric wall elem.jpg",
            link: "/shop",
            className: "md:col-span-2 h-[280px] md:h-[320px]"
        },
        {
            title: "Exclusive Ink Collection",
            subtitle: "Premium Supplies", image: "/midbanner/A premium printer support service hero banner for a website, featuring one large modern printer and one smaller accessory element on the right, bright and colorful background with blue, aqua, amber, .jpg",
            link: "/shop",
            className: "md:col-span-1 h-[280px] md:h-[320px]"
        }
    ];

    return (
        <section className="w-full pt-8 pb-4 bg-white font-['Rubik']">
            <div className="max-w-[1800px] mx-auto px-0 md:px-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {banners.map((banner, index) => (
                        <div
                            key={index}
                            className={`relative group overflow-hidden flex items-center ${banner.className}`}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                                style={{ backgroundImage: `url("${banner.image}")` }}
                            />

                            <div className="relative z-10 px-8 md:px-12 w-full max-w-2xl">
                                <span className="text-[11px] font-bold text-primary uppercase tracking-[0.3em] block mb-3">
                                    {banner.subtitle}
                                </span>
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-white mb-6">
                                    {banner.title}
                                </h2>
                                <Link
                                    to={banner.link}
                                    className="inline-flex items-center gap-2 px-7 py-3 bg-[#0096d6] text-white text-[13px] font-bold uppercase tracking-wider transition-all duration-300 hover:bg-[#0096d6]-hover active:scale-95"
                                >
                                    Explore More
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
