import React, { useState } from "react";
import {
  FiBox,
  FiList,
  FiTruck,
  FiShoppingCart,
  FiDollarSign,
  FiUsers,
} from "react-icons/fi";

const DashboardHome = () => {
  const [activeForm, setActiveForm] = useState(null);

  const cards = [
    {
      title: "Categories",
      value: 12,
      icon: <FiList className="text-4xl text-cyan-500" />,
      color: "bg-cyan-100",
    },
    {
      title: "Products",
      value: 128,
      icon: <FiBox className="text-4xl text-blue-600" />,
      color: "bg-blue-100",
    },
    {
      title: "Suppliers",
      value: 9,
      icon: <FiTruck className="text-4xl text-violet-600" />,
      color: "bg-violet-100",
    },
    {
      title: "Orders",
      value: 354,
      icon: <FiShoppingCart className="text-4xl text-green-600" />,
      color: "bg-green-100",
    },
    {
      title: "Payments",
      value: "₹75,400",
      icon: <FiDollarSign className="text-4xl text-purple-600" />,
      color: "bg-purple-100",
    },
    {
      title: "Customers",
      value: 214,
      icon: <FiUsers className="text-4xl text-orange-500" />,
      color: "bg-orange-100",
    },
  ];

  const handleToggle = (form) => {
    setActiveForm(activeForm === form ? null : form);
  };

  return (
    <div className="lg:ml-[0px] p-6 mt-16 lg:mt-8 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Dashboard Overview</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
        {cards.map((card, i) => (
          <div
            key={i}
            className={`flex justify-between items-center p-6 rounded-2xl shadow-md ${card.color}`}
          >
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{card.title}</h2>
              <p className="text-3xl font-bold mt-1 text-gray-700">{card.value}</p>
            </div>
            <div>{card.icon}</div>
          </div>
        ))}
      </div>

      {/* Form Toggles */}
      <div className="space-x-4 mb-8">
        <button
          onClick={() => handleToggle("product")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {activeForm === "product" ? "Close Product Form" : "Add Product"}
        </button>
        <button
          onClick={() => handleToggle("category")}
          className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 transition"
        >
          {activeForm === "category" ? "Close Category Form" : "Add Category"}
        </button>
        <button
          onClick={() => handleToggle("supplier")}
          className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700 transition"
        >
          {activeForm === "supplier" ? "Close Supplier Form" : "Add Supplier"}
        </button>
      </div>

      {/* Forms */}
      {activeForm === "product" && (
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Product Name"
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="number"
              placeholder="Price"
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="number"
              placeholder="Quantity"
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="text"
              placeholder="Category"
              className="w-full px-4 py-2 border rounded"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Product
            </button>
          </form>
        </div>
      )}

      {activeForm === "category" && (
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4">Add New Category</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Category Name"
              className="w-full px-4 py-2 border rounded"
            />
            <button
              type="submit"
              className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700"
            >
              Add Category
            </button>
          </form>
        </div>
      )}

      {activeForm === "supplier" && (
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4">Add New Supplier</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Supplier Name"
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="text"
              placeholder="Phone"
              className="w-full px-4 py-2 border rounded"
            />
            <button
              type="submit"
              className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700"
            >
              Add Supplier
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
