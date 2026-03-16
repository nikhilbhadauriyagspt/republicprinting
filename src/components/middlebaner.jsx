import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function PrinterPromoSection() {
    return (
        <section className="w-full  py-16">
            <div className="max-w-full mx-auto px-4 md:px-26">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    {/* Left Banner */}
                    <div
                        className="relative overflow-hidden rounded-md min-h-[180px] flex items-center bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('/banner/printer-banner-1.jpg')",
                        }}
                    >
                        <div className="absolute inset-0 bg-black/45"></div>

                        <div className="relative z-10 px-8 py-8 max-w-[70%]">
                            <h3 className="text-[#f5b52e] text-[14px] md:text-[16px] font-semibold leading-tight">
                                Premium Wireless
                            </h3>
                            <h2 className="text-white text-[22px] md:text-[26px] font-bold leading-tight mt-1">
                                Home & Office Printers
                            </h2>

                            <Link to="/shop" className="mt-5 inline-flex items-center gap-2 bg-[#ff3b30] hover:bg-[#e53127] text-white text-sm font-semibold px-5 py-3 rounded-md transition">
                                SHOP NOW
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>

                    {/* Right Banner */}
                    <div
                        className="relative overflow-hidden rounded-md min-h-[180px] flex items-center bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('/banner/printer-banner-2.jpg')",
                        }}
                    >
                        <div className="absolute inset-0 bg-black/35"></div>

                        <div className="relative z-10 px-8 py-8 max-w-[72%]">
                            <h3 className="text-[#f5b52e] text-[14px] md:text-[16px] font-semibold leading-tight">
                                Latest Deals On
                            </h3>
                            <h2 className="text-white text-[20px] md:text-[24px] font-bold leading-tight mt-1">
                                Inkjet, Laser & All-in-One Printers
                            </h2>

                            <Link to="/shop" className="mt-5 inline-flex items-center gap-2 bg-[#ff3b30] hover:bg-[#e53127] text-white text-sm font-semibold px-5 py-3 rounded-md transition">
                                SHOP NOW
                                <ArrowRight size={16} />
                            </Link>
                        </div>

                        <div className="absolute right-2 top-2 z-10 bg-[#ff2f55] text-white text-[12px]   px-2 py-1 rounded-full">
                            Up to 25% Off
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}