import React, { FC } from "react";
import { Mail, MessageSquare } from "lucide-react";

export const ContactHero: FC = () => {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 text-center">
        <div className="inline-flex p-6 rounded-xl bg-gradient-to-r from-blue-400 to-purple-500 mb-8">
          <MessageSquare className="w-12 h-12" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Get Started</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">Ready to transform your DevOps journey? Let's discuss how we can accelerate your development process and streamline your workflows.</p>
      </div>
    </section>
  );
};
