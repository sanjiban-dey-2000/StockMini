import React from "react";
import { Link } from "react-router-dom";
import { BiError } from "react-icons/bi";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      <BiError className="text-7xl text-red-500 mb-4" />
      <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-4">404 - Page Not Found</h1>
      <p className="text-slate-600 text-base sm:text-lg max-w-xl">
        Oops! The page you're looking for doesn't exist or has been moved. Let’s get you back to the homepage.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block bg-cyan-600 text-white px-6 py-3 rounded-full text-sm sm:text-base font-medium hover:bg-cyan-700 transition"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default ErrorPage;
