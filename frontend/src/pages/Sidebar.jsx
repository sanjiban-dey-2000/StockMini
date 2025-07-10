import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiBox,
  FiList,
  FiShoppingCart,
  FiTruck,
  FiDollarSign,
  FiUser,
  FiUsers,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between bg-black text-white px-4 py-3 shadow-md fixed w-full z-50">
        <h1 className="text-xl font-bold">Stock <span>Mini</span></h1>
        <button onClick={toggleSidebar}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <nav
        className={`bg-gradient-to-br from-black via-black to-purple-700 shadow-md border-r border-gray-200 h-screen fixed top-0 left-0 z-40 w-[250px] py-14 px-4 overflow-auto transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:relative lg:z-0`}
      >
        <ul>
          <li>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 text-white font-semibold text-[22px] hover:text-slate-900 hover:bg-gray-100 rounded px-4 py-2 transition-all"
              onClick={() => setIsOpen(false)}
            >
              <FiHome />
              Dashboard
            </Link>
          </li>
        </ul>

        {/* Inventory Section */}
        <div className="mt-6">
          <h6 className="text-cyan-300 text-[20px] font-semibold px-4">Inventory</h6>
          <ul className="mt-2 space-y-1">
            <li>
              <Link
                to="/dashboard/products"
                className="flex items-center gap-2 text-white text-[18px] font-medium hover:text-slate-900 hover:bg-gray-100 rounded px-4 py-2 transition-all"
                onClick={() => setIsOpen(false)}
              >
                <FiBox />
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/categories"
                className="flex items-center gap-2 text-white text-[18px] font-medium hover:text-slate-900 hover:bg-gray-100 rounded px-4 py-2 transition-all"
                onClick={() => setIsOpen(false)}
              >
                <FiList />
                Categories
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/suppliers"
                className="flex items-center gap-2 text-white text-[18px] font-medium hover:text-slate-900 hover:bg-gray-100 rounded px-4 py-2 transition-all"
                onClick={() => setIsOpen(false)}
              >
                <FiTruck />
                Suppliers
              </Link>
            </li>
          </ul>
        </div>

        {/* Sales Section */}
        <div className="mt-6">
          <h6 className="text-cyan-300 text-[20px] font-semibold px-4">Sales</h6>
          <ul className="mt-2 space-y-1">
            <li>
              <Link
                to="/dashboard/orders"
                className="flex items-center gap-2 text-white text-[18px] font-medium hover:text-slate-900 hover:bg-gray-100 rounded px-4 py-2 transition-all"
                onClick={() => setIsOpen(false)}
              >
                <FiShoppingCart />
                Orders
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/customers"
                className="flex items-center gap-2 text-white text-[18px] font-medium hover:text-slate-900 hover:bg-gray-100 rounded px-4 py-2 transition-all"
                onClick={() => setIsOpen(false)}
              >
                <FiUsers />
                Customers
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/payments"
                className="flex items-center gap-2 text-white text-[18px] font-medium hover:text-slate-900 hover:bg-gray-100 rounded px-4 py-2 transition-all"
                onClick={() => setIsOpen(false)}
              >
                <FiDollarSign />
                Payments
              </Link>
            </li>
          </ul>
        </div>

        {/* Profile Section */}
        <div className="mt-6">
          <h6 className="text-cyan-300 text-[20px] font-semibold px-4">Account</h6>
          <ul className="mt-2 space-y-1">
            <li>
              <Link
                to="/dashboard/profile"
                className="flex items-center gap-2 text-white text-[18px] font-medium hover:text-slate-900 hover:bg-gray-100 rounded px-4 py-2 transition-all"
                onClick={() => setIsOpen(false)}
              >
                <FiUser />
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  // useAuth().logout();
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 text-left w-full text-white text-[18px] font-medium hover:text-slate-900 hover:bg-gray-100 rounded px-4 py-2 transition-all"
              >
                <FiLogOut />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
