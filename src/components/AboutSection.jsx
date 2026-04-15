import React from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Briefcase,
  Tag,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export default function AboutSection() {
  const sections = [
    {
      title: "Home & Personal",
      description:
        "Explore reliable wireless inkjet printers created for everyday home use, vibrant output, and smooth performance.",
      icon: Home,
      path: "/shop?category=inkjet-printers",
      image: "/newproimges/1.png",
    },
    {
      title: "Business & Office",
      description:
        "Discover fast and professional laser printers built for workspaces that demand speed, clarity, and consistency.",
      icon: Briefcase,
      path: "/shop?category=laser-printers",
      image: "/newproimges/4.png",
    },
    {
      title: "Exclusive Value",
      description:
        "Shop selected printer collections that combine modern features, dependable quality, and practical pricing.",
      icon: Tag,
      path: "/shop?category=all-in-one-printers",
      image: "/newproimges/3.png",
    },
    {
      title: "Secure Checkout",
      description:
        "Enjoy a safe buying experience with protected payments, trusted delivery, and dependable customer support.",
      icon: ShieldCheck,
      path: "/shop",
      image: "/newproimges/2.png",
    },
  ];

  return (
    <section className="bg-white py-16 md:py-24 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-0">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-14 md:mb-16">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.24em] text-[#013E24] border border-[#013E24]/15 px-4 py-2 rounded-full bg-[#013E24]/5">
            The Standard in Printing
          </span>

          <h2 className="mt-5 text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
            About <span className="text-[#013E24]">Republic Printing</span>
          </h2>

          <p className="mt-5 text-sm md:text-base leading-7 text-slate-600">
            Reliable printing solutions for homes, professionals, and growing
            businesses with the right mix of performance, value, and ease.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sections.map((section, index) => {
            const Icon = section.icon;

            return (
              <Link key={index} to={section.path} className="group block">
                <div className="h-full bg-white border border-slate-200 rounded-[24px] overflow-hidden transition-all duration-300 hover:border-[#013E24]/25">
                  <div className="grid grid-cols-1 sm:grid-cols-[230px_1fr] h-full">
                    {/* Image Side */}
                    <div className="bg-[#f7faf8] border-b sm:border-b-0 sm:border-r border-slate-100 p-1 flex items-center justify-center">
                      <div className="w-full  flex items-center justify-center">
                        <img
                          src={section.image}
                          alt={section.title}
                          className="h-full w-auto object-cover rounded-tl-[20px] rounded-bl-[20px] transition-transform duration-300 "
                          onError={(e) => {
                            e.currentTarget.src = "/logo/fabicon.png";
                          }}
                        />
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className="p-6 md:p-7 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-11 h-11 rounded-xl bg-[#013E24]/10 text-[#013E24] flex items-center justify-center">
                          <Icon size={20} strokeWidth={1.8} />
                        </div>
                        <div className="h-px flex-1 bg-slate-100" />
                      </div>

                      <h3 className="text-[22px] md:text-[24px] font-semibold text-slate-900 leading-tight">
                        {section.title}
                      </h3>

                      <p className="mt-3 text-[14px] md:text-[15px] leading-7 text-slate-600">
                        {section.description}
                      </p>

                      <div className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold text-[#013E24]">
                        View Collection
                        <ArrowRight
                          size={15}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Content */}
        <div className="max-w-4xl mx-auto mt-16 pt-10 border-t border-slate-100 text-center">
          <p className="text-slate-600 text-[15px] md:text-lg leading-8">
            Republic Printing is focused on making modern printing more accessible
            and dependable. From home-ready wireless models to office-grade
            machines, we help customers choose technology that fits their
            workflow with confidence.
          </p>
        </div>
      </div>
    </section>
  );
}