import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

export const BackButton: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-8">
      <button onClick={() => navigate("/")} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300">
        Back to Home
      </button>
    </div>
  );
};
