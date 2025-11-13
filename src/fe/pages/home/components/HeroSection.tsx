import React, { FC } from "react";
import { Shield, ArrowRight } from "lucide-react";
import { ServiceCarousel } from "./ServiceCarousel";
import { Service } from "../../../types/ServiceT";

interface HeroSectionProps {
  onNavigate: (page: string) => void;
  services: Service[];
}

export const HeroSection: FC<HeroSectionProps> = ({ onNavigate, services }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center bg-gray-800/50 border border-gray-700 rounded-full px-6 py-3 mb-8">
            <Shield className="w-5 h-5 text-green-400 mr-2" />
            <span className="text-sm text-gray-300">Trusted DevOps Excellence</span>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Transform Your
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">Code to Production</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">Expert DevOps consulting services that streamline your development workflow, automate infrastructure, and accelerate your path to production with cutting-edge cloud-native solutions.</p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <button onClick={() => onNavigate("contact")} className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center">
            Start Your Journey
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <ServiceCarousel services={services} onNavigate={onNavigate} />
      </div>
    </section>
  );
};
