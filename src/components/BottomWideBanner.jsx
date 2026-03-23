import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function BottomWideBanner() {
    const banner = {
        title: "Home Office Excellence & Smart Workspace Setup",
        subtitle: "Smart Setup",
        image: "/midbanner/A realistic premium website hero banner with one large modern wireless printer placed on the right side in a bright stylish office environment, full background image, clean premium desk and modern de.jpg",
        link: "/shop",
    };

    return (
        <section className="w-full pt-4 pb-12 bg-white font-['Rubik']">
            <div className="max-w-[1800px] mx-auto px-0 md:px-10">
                <div className="relative group overflow-hidden flex items-center h-[280px] md:h-[450px]">
                    {/* Background Image - No rounding, No shadow */}
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                        style={{ backgroundImage: `url("${banner.image}")` }}
                    />

                    {/* Content - Directly on image, no overlay */}
                    <div className="relative z-10 px-8 md:px-12 w-full max-w-2xl">
                        <span className="text-[11px] font-bold text-primary uppercase tracking-[0.3em] block mb-3">
                            {banner.subtitle}
                        </span>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-white mb-6">
                            {banner.title}
                        </h2>
                        <Link
                            to={banner.link}
                            className="inline-flex items-center gap-2 px-7 py-3 bg-primary text-white text-[13px] font-bold uppercase tracking-wider transition-all duration-300 hover:bg-primary-hover active:scale-95"
                        >
                            Explore More
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
