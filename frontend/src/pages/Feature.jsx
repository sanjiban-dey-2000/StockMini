import React from "react";
import {
  FaBoxes,
  FaBell,
  FaChartBar,
  FaUsers,
  FaTags,
  FaTruck,
} from "react-icons/fa";

const features = [
  {
    icon: <FaBoxes className="text-3xl text-cyan-600" />,
    title: "Real-Time Inventory Tracking",
    description:
      "Monitor stock levels instantly and avoid overstocking or shortages.",
  },
  {
    icon: <FaBell className="text-3xl text-cyan-600" />,
    title: "Low Stock Alerts",
    description:
      "Get notified when items reach their minimum threshold levels.",
  },
  {
    icon: <FaChartBar className="text-3xl text-cyan-600" />,
    title: "Dashboard Insights",
    description:
      "View key metrics like total products, low stock, and sales trends at a glance.",
  },
  {
    icon: <FaUsers className="text-3xl text-cyan-600" />,
    title: "User Management",
    description:
      "Control who accesses the system with secure role-based login.",
  },
  {
    icon: <FaTags className="text-3xl text-cyan-600" />,
    title: "Category Organization",
    description:
      "Sort your products by categories for better stock organization and reporting.",
  },
  {
    icon: <FaTruck className="text-3xl text-cyan-600" />,
    title: "Supplier Management",
    description:
      "Track vendor details, purchase history, and contact info all in one place.",
  },
];

const Feature = () => {
  return (
    <section className="py-16 px-4 sm:px-8 md:px-12 bg-gray-50" id="features">
      <div className="max-w-screen-xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
          Powerful Features Built for Efficiency
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto mb-10 text-base sm:text-lg">
          Our inventory management system simplifies your business operations by
          combining smart tracking, real-time insights, and intuitive controls
          in one easy-to-use platform.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300 text-left"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600 text-sm sm:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;
