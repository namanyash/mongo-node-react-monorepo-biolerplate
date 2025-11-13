import React, { FC } from "react";
import { Mail, Phone, MapPin, Clock, CheckCircle } from "lucide-react";

interface ContactInfoItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

export const ContactInfo: FC = () => {
  const contactItems: ContactInfoItem[] = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      description: "hello@opsflow.tech",
      gradient: "from-blue-500 to-purple-600",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Schedule a Call",
      description: "Book a consultation",
      gradient: "from-green-500 to-blue-600",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Coverage",
      description: "Global Remote Services",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Response Time",
      description: "Within 24 hours",
      gradient: "from-cyan-500 to-blue-600",
    },
  ];

  const benefits = ["Expert DevOps engineers with 10+ years experience", "Proven track record with enterprise clients", "24/7 support and rapid response times", "Custom solutions tailored to your stack", "Free initial consultation and assessment", "Flexible engagement models"];

  return (
    <div className="space-y-8">
      {/* Contact Information */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
        <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
        <div className="space-y-6">
          {contactItems.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-12 h-12 bg-gradient-to-r ${item.gradient} rounded-lg flex items-center justify-center mr-4`}>{item.icon}</div>
              <div>
                <p className="text-gray-300">{item.title}</p>
                <p className="text-white font-semibold">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
        <h3 className="text-2xl font-bold mb-6">Why Choose OpsFlow?</h3>
        <ul className="space-y-4">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-300">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
