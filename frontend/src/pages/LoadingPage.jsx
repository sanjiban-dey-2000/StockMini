import React from "react";
import { FiLoader } from "react-icons/fi";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <FiLoader className="animate-spin text-4xl text-blue-600 mb-4" />
        <p className="text-lg text-gray-700 font-medium">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
