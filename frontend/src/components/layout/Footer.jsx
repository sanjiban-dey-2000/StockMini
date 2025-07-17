import React from "react";
import { FaFacebook, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="tracking-wide bg-gradient-to-br from-black via-black to-purple-700 px-8 sm:px-12 pt-16 pb-8 text-[15px]">
      <div className="grid min-[1200px]:grid-cols-3 gap-12 xl:gap-16">
        {/* Logo and Social */}
        <div className="min-[1200px]:max-w-sm max-w-lg w-full">
          <div className="flex flex-col items-center space-y-5">
            <h1 className="text-white text-4xl font-bold">
              Stock <span className="text-cyan-400">Mini</span>
            </h1>
            <p className="text-slate-300 text-center text-base">
              Efficient and smart inventory & sales management system tailored for small businesses.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <a href="#" className="text-white text-3xl"><FaFacebook /></a>
              <a href="#" className="text-white text-3xl"><FaInstagram /></a>
              <a href="#" className="text-white text-3xl"><FaLinkedinIn /></a>
              <a href="#" className="text-white text-3xl"><FaXTwitter /></a>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="min-[1200px]:col-span-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Features */}
          <div>
            <h4 className="text-white font-semibold text-lg">Features</h4>
            <ul className="mt-6 space-y-4">
              <li><a href="#" className="hover:text-white text-slate-300 text-base">Product Management</a></li>
              <li><a href="#" className="hover:text-white text-slate-300 text-base">Sales Tracking</a></li>
              <li><a href="#" className="hover:text-white text-slate-300 text-base">Customer Profiles</a></li>
              <li><a href="#" className="hover:text-white text-slate-300 text-base">Order History</a></li>
              <li><a href="#" className="hover:text-white text-slate-300 text-base">Supplier Management</a></li>
              <li><a href="#" className="hover:text-white text-slate-300 text-base">Analytics & Reports</a></li>
            </ul>
          </div>

          {/* Integrations */}
          <div>
            <h4 className="text-white font-semibold text-lg">Integrations</h4>
            <ul className="space-y-4 mt-6">
              <li><a href="#" className="hover:text-white text-slate-300 text-base">Stripe & Payments</a></li>
              <li><a href="#" className="hover:text-white text-slate-300 text-base">MongoDB & Mongoose</a></li>
              <li><a href="#" className="hover:text-white text-slate-300 text-base">React & Tailwind UI</a></li>
              <li><a href="#" className="hover:text-white text-slate-300 text-base">PDF & Reporting Tools</a></li>
              <li><a href="#" className="hover:text-white text-slate-300 text-base">Socket.IO (Future Chat)</a></li>
            </ul>
          </div>

          {/* Company Info */}
          <div>
            <h4 className="text-white font-semibold text-lg">Company</h4>
            <ul className="space-y-4 mt-6">
              <li><a href="#" className="hover:text-white text-slate-300 text-base">About Stock Mini</a></li>
              <li><a href="#" className="hover:text-white text-slate-300 text-base">Blog</a></li>
              <li><a href="#" className="hover:text-white text-slate-300 text-base">Careers</a></li>
              <li><a href="#" className="hover:text-white text-slate-300 text-base">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="mt-10 mb-8 border-gray-600" />

      {/* Bottom */}
      <div className="flex flex-wrap max-md:flex-col gap-4">
        <ul className="md:flex md:space-x-6 max-md:space-y-4">
          <li><a href="#" className="hover:text-white text-slate-300 text-base">Terms of Service</a></li>
          <li><a href="#" className="hover:text-white text-slate-300 text-base">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-white text-slate-300 text-base">Security</a></li>
        </ul>
        <p className="text-slate-400 text-base md:ml-auto">
          © {new Date().getFullYear()} Stock Mini. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
