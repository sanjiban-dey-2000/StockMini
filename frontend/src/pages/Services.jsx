import React from "react";
import {
  FaWarehouse,
  FaCogs,
  FaExchangeAlt,
  FaFileInvoice,
  FaChartLine,
  FaShieldAlt,
} from "react-icons/fa";

const services = [
  {
    icon: <FaWarehouse className="text-4xl text-cyan-600" />,
    title: "Stock Management",
    description:
      "Keep an accurate count of your inventory with real-time stock tracking and status updates.",
  },
  {
    icon: <FaExchangeAlt className="text-4xl text-cyan-600" />,
    title: "Sales & Returns",
    description:
      "Easily manage product sales, issue returns, and update stock quantities instantly.",
  },
  {
    icon: <FaFileInvoice className="text-4xl text-cyan-600" />,
    title: "Invoicing System",
    description:
      "Generate professional invoices for purchases and manage billing efficiently.",
  },
  {
    icon: <FaChartLine className="text-4xl text-cyan-600" />,
    title: "Analytics & Reports",
    description:
      "Gain insights through detailed reports on sales, inventory trends, and performance.",
  },
  {
    icon: <FaCogs className="text-4xl text-cyan-600" />,
    title: "Custom Settings",
    description:
      "Configure low stock alerts, reorder levels, and category settings as per your needs.",
  },
  {
    icon: <FaShieldAlt className="text-4xl text-cyan-600" />,
    title: "Data Security",
    description:
      "Your data is protected with role-based access control and secure cloud backups.",
  },
];

const Services = () => {
  return (
    <section className="py-16 px-4 sm:px-8 md:px-12 bg-white max-h-screen">
      <div className="max-w-screen-xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">Our Services</h1>
        <p className="text-slate-600 max-w-2xl mx-auto mb-12 text-base sm:text-lg">
          We provide a suite of powerful services designed to simplify inventory
          operations and help small businesses thrive. Here’s what you get with
          our system:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-50 hover:bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all text-left"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                {service.title}
              </h3>
              <p className="text-slate-600 text-sm sm:text-base">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
