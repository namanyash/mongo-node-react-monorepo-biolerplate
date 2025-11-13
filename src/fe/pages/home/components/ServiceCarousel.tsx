import React, { FC, useState, useEffect } from "react";
import { Service } from "../../../types/ServiceT";

interface ServiceCarouselProps {
  services: Service[];
  onNavigate: (page: string) => void;
}

export const ServiceCarousel: FC<ServiceCarouselProps> = ({ services, onNavigate }) => {
  const [currentService, setCurrentService] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentService((prev) => (prev + 1) % services.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [services.length]);

  const current = services[currentService];

  return (
    <div className="w-full max-w-5xl mx-auto">
      <button onClick={() => onNavigate(current.page)} className="w-full bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-3xl p-8 md:p-12 hover:border-gray-600 hover:bg-gray-800/50 transition-all duration-300 hover:scale-[1.02] transform">
        {/* Content Container */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Icon Section */}
          <div className="flex-shrink-0">
            <div className={`inline-flex p-6 md:p-8 rounded-2xl bg-gradient-to-r ${current.gradient} shadow-lg`}>
              <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">{current.icon}</div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight">{current.title}</h3>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl">{current.description}</p>
          </div>

          {/* Visual Indicator */}
          <div className="flex-shrink-0 hidden md:block">
            <div className="flex flex-col space-y-2">
              {services.map((_, index) => (
                <div key={index} className={`w-2 h-8 rounded-full transition-all duration-300 ${index === currentService ? `bg-gradient-to-b ${current.gradient}` : "bg-gray-600"}`} />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Indicator Dots */}
        <div className="flex justify-center space-x-3 mt-8 md:hidden">
          {services.map((_, index) => (
            <div key={index} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentService ? `bg-gradient-to-r ${current.gradient}` : "bg-gray-600"}`} />
          ))}
        </div>
      </button>

      {/* Service Counter */}
      <div className="text-center mt-6">
        <p className="text-gray-500 text-sm">
          {currentService + 1} of {services.length} services
        </p>
      </div>
    </div>
  );
};
