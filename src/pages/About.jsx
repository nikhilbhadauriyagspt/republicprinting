import React from 'react';
import SEO from '@/components/SEO';
import {
  ShieldCheck,
  Zap,
  Globe,
  Printer,
  Package,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  Headphones,
  Leaf,
  Wrench,
  Target,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const capabilities = [
    {
      icon: Printer,
      title: "Quality Products",
      desc: "A curated selection of modern printing systems, including all-in-one and high-volume industrial units tailored for efficiency."
    },
    {
      icon: Package,
      title: "Logistics Excellence",
      desc: "Reliable access to ink, toner, and essential replacement parts with efficient nationwide delivery across the country."
    },
    {
      icon: Headphones,
      title: "Professional Support",
      desc: "Experts providing seamless setup guidance, troubleshooting, and long-term maintenance for your hardware."
    }
  ];

  const advantages = [
    { title: "Tested Quality", icon: ShieldCheck },
    { title: "Reliable Parts", icon: Package },
    { title: "Rapid Service", icon: Zap },
    { title: "Secure Logistics", icon: Globe },
    { title: "New Hardware", icon: CheckCircle2 },
    { title: "Expert Care", icon: Headphones },
    { title: "Eco-Tech", icon: Leaf },
    { title: "Service Hub", icon: Wrench }
  ];

  return (
    <div className="min-h-screen bg-white font-['Rubik'] text-foreground pb-14 md:pb-20">
      <SEO
        title="About Us"
        description="Learn about our commitment to printing excellence, our journey, and the core values that drive our professional services."
      />

      {/* PAGE HEADER */}
      <div className="bg-background border-b border-border">
        <div className="max-w-[1800px] mx-auto px-4 md:px-10 py-16 md:py-24">
          <div className="flex flex-col gap-6">
            <nav className="flex items-center gap-2 text-[11px] font-bold text-secondary uppercase tracking-[0.2em]">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight size={12} className="opacity-50" />
              <span className="text-primary">About Our Journey</span>
            </nav>

            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-8">
                Providing Excellence in <br />
                <span className="text-primary">Printing Solutions.</span>
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-secondary font-medium max-w-2xl">
                We bridge the gap between advanced technology and a seamless user experience, ensuring your workspace stays productive and efficient.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-4 md:px-10 py-16 md:py-24 space-y-20 md:space-y-32">
        {/* VISION SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 text-primary rounded-full mb-8 text-[11px] font-bold uppercase tracking-[0.2em]">
              Our Foundation
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-8 tracking-tight leading-tight">
              Built on Precision <br /> and Reliability.
            </h2>
            <p className="text-base md:text-lg text-secondary leading-relaxed mb-10 font-medium max-w-xl">
              Established in 2026, Vital Print was founded to simplify the acquisition of high-performance printing infrastructure. We believe that technology should be accessible, reliable, and straightforward.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 bg-foreground text-white px-10 py-4 text-[14px] font-bold uppercase tracking-widest rounded-full hover:bg-primary transition-all shadow-xl shadow-foreground/10 active:scale-95"
            >
              Explore Collection
              <ArrowRight size={18} />
            </Link>
          </div>
          <div className="bg-[#F5F5F5] p-10 md:p-16 rounded-[32px] border border-border relative overflow-hidden">
            <p className="text-xl md:text-2xl text-foreground leading-relaxed font-bold italic relative z-10">
              "Our goal is to provide a destination where professionals can find top-tier hardware without complexity."
            </p>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/50 rounded-full blur-3xl" />
          </div>
        </div>

        {/* CORE CAPABILITIES */}
        <div className="space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight text-left">
                Core Capabilities
              </h2>
              <p className="text-secondary text-sm md:text-base font-medium mt-2">The pillars of our service excellence</p>
            </div>
            <div className="flex items-center gap-2 text-primary font-bold uppercase text-[12px] tracking-widest">
              <Zap size={16} fill="currentColor" /> Business Standards
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {capabilities.map((item, i) => (
              <div
                key={i}
                className="p-10 bg-white border border-border rounded-[24px] hover:border-primary/20 hover:shadow-xl transition-all group"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-[#F5F5F5] text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <item.icon size={30} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {item.title}
                </h3>
                <p className="text-[15px] text-secondary leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* MISSION + REACH */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="bg-foreground p-12 md:p-16 rounded-[32px] text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12">
              <Target size={160} />
            </div>
            <div className="relative z-10">
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary mb-6 block">Our Mission</span>
              <h3 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">Empowering Modern <br /> Workspaces.</h3>
              <p className="text-lg text-white/70 leading-relaxed font-medium max-w-md">
                To equip professionals with dependable and sustainable hardware solutions. We provide expert advice and high-quality products to ensure your operations never slow down.
              </p>
            </div>
          </div>

          <div className="bg-[#F5F5F5] p-12 md:p-16 rounded-[32px] text-foreground border border-border relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-12">
              <Users size={160} />
            </div>
            <div className="relative z-10">
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary mb-6 block">Our Reach</span>
              <h3 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">Nationwide Hardware <br /> Support Network.</h3>
              <p className="text-lg text-secondary leading-relaxed font-medium max-w-md">
                Serving the entire United States with a commitment to fast logistics and long-term service value. Our team is always available to assist with your needs.
              </p>
            </div>
          </div>
        </div>

        {/* ADVANTAGE SECTION */}
        <div className="space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight">
                The Advantage
              </h2>
              <p className="text-secondary text-sm md:text-base font-medium mt-2">Why professionals choose Vital Print</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {advantages.map((item, i) => (
              <div
                key={i}
                className="group flex flex-col items-center text-center gap-5 p-10 bg-white rounded-[24px] border border-border hover:border-primary/20 hover:shadow-xl transition-all duration-500"
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#F5F5F5] text-secondary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                  <item.icon size={24} strokeWidth={1.5} />
                </div>
                <h4 className="text-[15px] font-bold text-foreground">
                  {item.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

