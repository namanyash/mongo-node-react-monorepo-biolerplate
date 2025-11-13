import React, { FC } from "react";

interface Stat {
  number: string;
  label: string;
  description: string;
}

interface StatsSectionProps {
  stats: Stat[];
  title?: string;
}

export const StatsSection: FC<StatsSectionProps> = ({ stats, title = "Proven Results" }) => {
  return (
    <section className="py-16 bg-gray-900/50 rounded-2xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-gray-300 text-lg">Delivering measurable impact for our clients</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">{stat.number}</div>
            <h3 className="text-xl font-semibold mb-2">{stat.label}</h3>
            <p className="text-gray-400">{stat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
