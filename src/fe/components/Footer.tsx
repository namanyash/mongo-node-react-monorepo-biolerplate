import React, { FC } from "react";

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <button onClick={() => onNavigate("home")} className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4 block">
              OpsFlow<span className="text-cyan-400">.tech</span>
            </button>
            <p className="text-gray-400 mb-4 max-w-md">Transforming your code into production-ready solutions with cutting-edge DevOps practices, Infrastructure as Code, and cloud-native architectures.</p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate("code-to-prod")} className="hover:text-white transition-colors">
                  Code to Prod
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("iac")} className="hover:text-white transition-colors">
                  Infrastructure as Code
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("consulting")} className="hover:text-white transition-colors">
                  CI/CD Consulting
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("dashboards")} className="hover:text-white transition-colors">
                  Custom Dashboards
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Technologies</h3>
            <ul className="space-y-2">
              <li>
                <span className="cursor-default">AWS / Azure</span>
              </li>
              <li>
                <span className="cursor-default">Kubernetes</span>
              </li>
              <li>
                <span className="cursor-default">GitHub / Bitbucket</span>
              </li>
              <li>
                <span className="cursor-default">Terraform</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2025 OpsFlow.tech. All rights reserved. | Transforming DevOps Excellence</p>
        </div>
      </div>
    </footer>
  );
};
