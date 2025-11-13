import React, { FC } from "react";
import { Code } from "lucide-react";

export const TechnologiesSection: FC = () => {
  const technologies = ["AWS", "Azure", "Kubernetes", "Docker", "Terraform", "GitHub", "Bitbucket", "Jenkins", "ArgoCD", "Prometheus", "Grafana", "Helm"];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Technologies</span> We Master
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {technologies.map((tech, index) => (
            <div key={index} className="group text-center">
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-gray-600 hover:bg-gray-800/50 transition-all duration-300 hover:scale-110">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <Code className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{tech}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
