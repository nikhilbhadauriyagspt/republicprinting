import { motion } from "framer-motion";
import {
  ShieldCheck,
  Truck,
  Headphones,
  Award,
  Sparkles
} from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Supply Partner",
    desc: "Reliable Printer Inventory",
    accent: "bg-blue-50 text-[#013E24]"
  },
  {
    icon: Truck,
    title: "Express Logistics",
    desc: "Fast Global Priority Delivery",
    accent: "bg-blue-50 text-[#013E24]"
  },
  {
    icon: ShieldCheck,
    title: "Elite Protection",
    desc: "Comprehensive Warranty",
    accent: "bg-blue-50 text-[#013E24]"
  },
  {
    icon: Headphones,
    title: "Expert Support",
    desc: "24/7 Dedicated Consultation",
    accent: "bg-blue-50 text-[#013E24]"
  }
];

export default function Features() {
  return (
    <section className="py-24 bg-slate-50 font-sans">
      <div className="max-w-[1800px] mx-auto px-6">

        {/* --- STANDARDIZED SECTION HEADER --- */}
        <div className="flex flex-col gap-4 mb-16">
          <div className="flex items-center gap-3 opacity-40">
            <div className="h-[1px] w-8 bg-blue-900" />
            <span className="text-[10px] font-bold text-blue-900 uppercase tracking-[0.4em]">The Standard</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Strategic <span className="text-[#013E24] italic font-light">Performance.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-start gap-5 group"
            >
              {/* Minimal Icon Hub */}
              <div className={`h-12 w-12 shrink-0 rounded-2xl border border-blue-100/50 flex items-center justify-center transition-all duration-500 group-hover:bg-[#013E24] group-hover:text-white group-hover:border-transparent group-hover:shadow-lg group-hover:shadow-blue-900/10 text-[#013E24] bg-white`}>
                <item.icon size={20} strokeWidth={1.5} />
              </div>

              {/* Precise Typography */}
              <div className="space-y-1.5 py-1">
                <h3 className="text-[13px] font-bold text-slate-900 uppercase tracking-wider group-hover:text-[#013E24] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] font-medium text-slate-500 leading-tight">
                  {item.desc}
                </p>

                {/* Micro-interaction Line */}
                <div className="h-0.5 w-4 bg-blue-200 rounded-full transition-all duration-500 group-hover:w-8 group-hover:bg-[#013E24]" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
