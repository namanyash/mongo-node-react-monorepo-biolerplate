import React, { FC } from "react";
import { Code } from "lucide-react";

interface TechStackProps {
  technologies: string[];
  title?: string;
}

export const TechStack: FC<TechStackProps> = ({ technologies, title = "Technologies We Use" }) => {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-gray-300 text-lg">Industry-leading tools and platforms</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {technologies.map((tech, index) => (
          <div key={index} className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-4 text-center hover:border-gray-600 hover:bg-gray-800/50 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
              <Code className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{tech}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
