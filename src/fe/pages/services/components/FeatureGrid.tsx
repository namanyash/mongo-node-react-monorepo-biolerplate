import React, { FC } from "react";
import { CheckCircle } from "lucide-react";

interface FeatureGridProps {
  features: string[];
  title?: string;
}

export const FeatureGrid: FC<FeatureGridProps> = ({ features, title = "What We Deliver" }) => {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-gray-300 text-lg">Professional implementation and optimization</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-gray-600 hover:bg-gray-800/50 transition-all duration-300">
            <CheckCircle className="w-8 h-8 text-green-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">{feature}</h3>
            <p className="text-gray-400 text-sm">Expert implementation with best practices</p>
          </div>
        ))}
      </div>
    </section>
  );
};
