import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ExternalLink, ArrowLeft } from "lucide-react";

interface ServiceCTAProps {
  gradient: string;
  title?: string;
  description?: string;
}

export const ServiceCTA: FC<ServiceCTAProps> = ({ gradient, title = "Ready to Get Started?", description = "Let's discuss how we can optimize your development workflow." }) => {
  const navigate = useNavigate();

  return (
    <section className="py-16">
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">{description}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => navigate("/contact")} className={`bg-gradient-to-r ${gradient} text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-105`}>
            Get Started <ExternalLink className="ml-2 w-5 h-5" />
          </button>

          <button onClick={() => navigate("/")} className="border border-gray-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center">
            <ArrowLeft className="mr-2 w-5 h-5" /> Back to Home
          </button>
        </div>
      </div>
    </section>
  );
};
