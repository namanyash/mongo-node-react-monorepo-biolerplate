// requests/requests.ts
import axios from "axios";

// Base configuration
const API_BASE = "/api";
const CONTACT_BASE = `${API_BASE}/contact`;
const SERVICES_BASE = `${API_BASE}/services`;
const CONSULTATION_BASE = `${API_BASE}/consultation`;

// Interface definitions
interface ContactFormData {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

// Contact form submission
export const submitContactForm = async (formData: ContactFormData) => {
  try {
    const response = await axios.post(`${CONTACT_BASE}/submit`, {
      ...formData,
      timestamp: new Date().toISOString(),
      source: "website",
    });
    return response.data;
  } catch (error: any) {
    console.error("Error submitting contact form:", error);
    throw error;
  }
};
