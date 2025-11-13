import React, { FC } from "react";

interface ServiceHeroProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
}

export const ServiceHero: FC<ServiceHeroProps> = ({ title, description, icon, gradient }) => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 text-center">
        <div className={`inline-flex p-6 rounded-xl bg-gradient-to-r ${gradient} mb-8`}>{icon}</div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>{title}</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">{description}</p>
      </div>
    </section>
  );
};
