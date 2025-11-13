import React, { FC, ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
}

export const PageContainer: FC<PageContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">{children}</div>
    </div>
  );
};
