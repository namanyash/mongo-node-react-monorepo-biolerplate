import React, { FC } from "react";
import { ArrowRight } from "lucide-react";

interface ProcessStep {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ProcessFlowProps {
  steps: ProcessStep[];
  title?: string;
}

export const ProcessFlow: FC<ProcessFlowProps> = ({ steps, title = "Our Process" }) => {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-gray-300 text-lg">Streamlined workflow for optimal results</p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex-1 text-center">
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-gray-600 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mx-auto mb-6 flex items-center justify-center">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            </div>
            {index < steps.length - 1 && <ArrowRight className="w-8 h-8 text-gray-600 hidden lg:block" />}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};
