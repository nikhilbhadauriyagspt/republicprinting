import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="w-full bg-white font-['Rubik'] overflow-hidden">
      <div className="w-full h-[250px] md:h-[450px] lg:h-[600px] xl:h-[800px] relative">
        <Link to="/shop" className="block w-full h-full cursor-pointer">
          <img
            src="/banner/new-banner/2.jpg"
            alt="Premium Printer Banner"
            className="w-full h-full object-cover select-none"
          />
        </Link>
      </div>
    </div>
  );
}
