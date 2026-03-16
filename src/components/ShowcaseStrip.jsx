import React from "react";
import {
  Truck,
  BadgeDollarSign,
  ShieldCheck,
  Headphones,
  CreditCard,
} from "lucide-react";

export default function ServiceHighlights() {
  const items = [
    {
      id: 1,
      icon: Truck,
      title: "FREE SHIPPING",
      subtitle: "On all orders over $99.00",
    },
    {
      id: 2,
      icon: BadgeDollarSign,
      title: "MONEY GUARANTEE",
      subtitle: "7 days money back guarantee",
    },
    {
      id: 3,
      icon: ShieldCheck,
      title: "SAFE SHOPPING",
      subtitle: "Safe shopping guarantee",
    },
    {
      id: 4,
      icon: Headphones,
      title: "ONLINE SUPPORT",
      subtitle: "We support 24/24h on day",
    },
    {
      id: 5,
      icon: CreditCard,
      title: "PAYMENT METHOD",
      subtitle: "Pay in many different ways",
    },
  ];

  return (
    <section className="w-full bg-white mt-8 ">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="group flex items-center gap-5 px-6 py-3 border-r border-[#e5e5e5] last:border-r-0 hover:bg-white transition-all duration-300"
              >
                <div className="w-[70px] h-[70px] rounded-full border-2 border-[#dddddd] flex items-center justify-center shrink-0 bg-white">
                  <Icon
                    size={30}
                    strokeWidth={1.8}
                    className="text-[#ff2d37] transition-colors duration-300"
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="text-[14px] font-semibold uppercase  text-[#2b2b2b] group-hover:text-[#ff2d37] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[12px] text-[#8b8b8b] leading-snug">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}