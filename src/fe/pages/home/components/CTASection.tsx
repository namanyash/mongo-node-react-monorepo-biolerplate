import React, { FC } from "react";

interface CTASectionProps {
  onNavigate: (page: string) => void;
}

export const CTASection: FC<CTASectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Transform Your
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"> DevOps Journey?</span>
        </h2>
        <p className="text-xl text-gray-300 mb-8">Let's discuss how we can streamline your development process and accelerate your time to market.</p>
        <button onClick={() => onNavigate("contact")} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
          Schedule a Consultation
        </button>
      </div>
    </section>
  );
};
