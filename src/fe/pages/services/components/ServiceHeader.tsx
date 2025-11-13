import React, { FC } from "react";

interface ServiceHeaderProps {
  title: string;
  description?: string;
}

export const ServiceHeader: FC<ServiceHeaderProps> = ({ title, description }) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-5xl font-bold text-center mb-6">{title}</h1>
      {description ? <p className="text-xl text-gray-300 text-center">{description}</p> : <p className="text-xl text-gray-300 text-center">Coming Soon...</p>}
    </div>
  );
};
