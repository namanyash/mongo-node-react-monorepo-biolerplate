import React, { FC } from "react";
import { GitBranch, Cloud, Settings, Zap } from "lucide-react";
import { HeroSection } from "./components/HeroSection";
import { ServicesSection } from "./components/ServicesSection";
import { TechnologiesSection } from "./components/TechnologiesSection";
import { CTASection } from "./components/CTASection";
import { Service } from "../../types/ServiceT";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: FC<HomePageProps> = ({ onNavigate }) => {
  const services: Service[] = [
    {
      title: "Code to Prod",
      description: "Seamless deployment pipelines from development to production",
      icon: <GitBranch className="w-8 h-8" />,
      gradient: "from-green-400 to-blue-500",
      page: "code-to-prod",
    },
    {
      title: "Infrastructure as Code",
      description: "Automated, scalable, and version-controlled infrastructure",
      icon: <Cloud className="w-8 h-8" />,
      gradient: "from-blue-400 to-purple-500",
      page: "iac",
    },
    {
      title: "CI/CD Consulting",
      description: "Optimize your continuous integration and deployment workflows",
      icon: <Settings className="w-8 h-8" />,
      gradient: "from-purple-400 to-pink-500",
      page: "consulting",
    },
    {
      title: "Custom Dashboards",
      description: "Real-time visibility across all your development platforms",
      icon: <Zap className="w-8 h-8" />,
      gradient: "from-cyan-400 to-blue-500",
      page: "dashboards",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-16">
      <HeroSection onNavigate={onNavigate} services={services} />
      <ServicesSection services={services} onNavigate={onNavigate} />
      <TechnologiesSection />
      <CTASection onNavigate={onNavigate} />
    </div>
  );
};
