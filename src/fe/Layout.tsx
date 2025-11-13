import React, { useState, useEffect, FC } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/home/HomePage";
import { ContactPage } from "./pages/contact/ContactPage";
import { ServicePage } from "./pages/services/ServicePage";

export const Layout: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Convert route to page name for header
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === "/") return "home";
    if (path.startsWith("/service/")) return path.split("/")[2];
    return path.slice(1); // Remove leading slash
  };

  const handleNavigate = (page: string) => {
    setIsMenuOpen(false);

    if (page === "home") {
      navigate("/");
    } else if (["code-to-prod", "iac", "consulting", "dashboards"].includes(page)) {
      navigate(`/service/${page}`);
    } else {
      navigate(`/${page}`);
    }

    window.scrollTo(0, 0);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen">
      {/* Header - Always Rendered */}
      <Header currentPage={getCurrentPage()} isMenuOpen={isMenuOpen} isScrolled={isScrolled} onNavigate={handleNavigate} onToggleMenu={toggleMenu} />

      {/* Main Content - Route Based */}
      <main>
        <Routes>
          <Route path="/" element={<HomePage onNavigate={handleNavigate} />} />
          <Route path="/service/code-to-prod" element={<ServicePage serviceType="code-to-prod" />} />
          <Route path="/service/iac" element={<ServicePage serviceType="iac" />} />
          <Route path="/service/consulting" element={<ServicePage serviceType="consulting" />} />
          <Route path="/service/dashboards" element={<ServicePage serviceType="dashboards" />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Catch all route - redirect to home */}
          <Route path="*" element={<HomePage onNavigate={handleNavigate} />} />
        </Routes>
      </main>

      {/* Footer - Always Rendered */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};
