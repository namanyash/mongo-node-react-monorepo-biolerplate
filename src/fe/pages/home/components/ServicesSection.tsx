import React, { FC } from "react";
import { ChevronRight } from "lucide-react";
import { Service } from "../../../types/ServiceT";

interface ServicesSectionProps {
  services: Service[];
  onNavigate: (page: string) => void;
}

export const ServicesSection: FC<ServicesSectionProps> = ({ services, onNavigate }) => {
  return (
    <section className="py-20 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">Comprehensive DevOps solutions tailored to accelerate your development lifecycle</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <button key={index} onClick={() => onNavigate(service.page)} className="group bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-gray-600 hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 text-left w-full">
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${service.gradient} mb-6`}>{service.icon}</div>
              <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>
              <div className="inline-flex items-center text-blue-400 hover:text-white transition-colors group-hover:translate-x-2 transition-transform duration-300">
                Learn More <ChevronRight className="ml-1 w-4 h-4" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
