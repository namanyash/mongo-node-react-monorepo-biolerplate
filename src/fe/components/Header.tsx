import React, { FC } from "react";
import { ChevronRight, Menu, X } from "lucide-react";

interface HeaderProps {
  currentPage: string;
  isMenuOpen: boolean;
  isScrolled: boolean;
  onNavigate: (page: string) => void;
  onToggleMenu: () => void;
}

export const Header: FC<HeaderProps> = ({ currentPage, isMenuOpen, isScrolled, onNavigate, onToggleMenu }) => {
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-gray-900/95 backdrop-blur-md border-b border-gray-800" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => onNavigate("home")} className="flex items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              OpsFlow<span className="text-cyan-400">.tech</span>
            </div>
          </button>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button onClick={() => onNavigate("home")} className={`transition-colors ${currentPage === "home" ? "text-white" : "text-gray-300 hover:text-white"}`}>
                Home
              </button>
              <div className="relative group">
                <button className="text-gray-300 hover:text-white transition-colors flex items-center">
                  Services <ChevronRight className="ml-1 w-4 h-4 rotate-90" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <button onClick={() => onNavigate("code-to-prod")} className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors">
                    Code to Prod
                  </button>
                  <button onClick={() => onNavigate("iac")} className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors">
                    Infrastructure as Code
                  </button>
                  <button onClick={() => onNavigate("consulting")} className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors">
                    CI/CD Consulting
                  </button>
                  <button onClick={() => onNavigate("dashboards")} className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors">
                    Custom Dashboards
                  </button>
                </div>
              </div>
              <button onClick={() => onNavigate("contact")} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all">
                Get Started
              </button>
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={onToggleMenu} className="text-gray-300 hover:text-white">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button onClick={() => onNavigate("home")} className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white">
              Home
            </button>
            <button onClick={() => onNavigate("code-to-prod")} className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white">
              Code to Prod
            </button>
            <button onClick={() => onNavigate("iac")} className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white">
              Infrastructure as Code
            </button>
            <button onClick={() => onNavigate("consulting")} className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white">
              CI/CD Consulting
            </button>
            <button onClick={() => onNavigate("dashboards")} className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white">
              Custom Dashboards
            </button>
            <button onClick={() => onNavigate("contact")} className="block w-full text-left px-3 py-2 text-blue-400 hover:text-white">
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
