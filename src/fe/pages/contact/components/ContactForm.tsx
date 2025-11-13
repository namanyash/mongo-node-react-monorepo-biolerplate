import React, { FC, useState } from "react";
import { Send, Loader2, CheckCircle } from "lucide-react";
import { submitContactForm } from "../../../requests/requests";

interface FormData {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

export const ContactForm: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await submitContactForm(formData);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        service: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({ submit: "Failed to send message. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold mb-4">Message Sent Successfully!</h3>
        <p className="text-gray-300 mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
        <button onClick={() => setIsSubmitted(false)} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
      <h2 className="text-3xl font-bold mb-8">Start Your Project</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
          <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg focus:outline-none transition-colors text-white ${errors.name ? "border-red-500 focus:border-red-400" : "border-gray-600 focus:border-blue-500"}`} placeholder="Your full name" />
          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
          <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg focus:outline-none transition-colors text-white ${errors.email ? "border-red-500 focus:border-red-400" : "border-gray-600 focus:border-blue-500"}`} placeholder="your@email.com" />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Company Field */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
          <input type="text" name="company" value={formData.company} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-white" placeholder="Your company name" />
        </div>

        {/* Service Interest Field */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Service Interest</label>
          <select name="service" value={formData.service} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-white">
            <option value="">Select a service</option>
            <option value="code-to-prod">Code to Production</option>
            <option value="iac">Infrastructure as Code</option>
            <option value="consulting">CI/CD Consulting</option>
            <option value="dashboards">Custom Dashboards</option>
            <option value="all">All Services</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Message Field */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Project Details *</label>
          <textarea name="message" required rows={4} value={formData.message} onChange={handleInputChange} className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg focus:outline-none transition-colors resize-none text-white ${errors.message ? "border-red-500 focus:border-red-400" : "border-gray-600 focus:border-blue-500"}`} placeholder="Tell us about your project, current challenges, and goals..." />
          {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
        </div>

        {/* Submit Error */}
        {errors.submit && <div className="text-red-400 text-sm text-center">{errors.submit}</div>}

        {/* Submit Button */}
        <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
};
