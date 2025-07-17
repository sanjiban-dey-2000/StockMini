import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from "../services/axiosInstance";

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
    totalOrders: "",
    totalSpent: "",
  });

  const fetchCustomers = async () => {
    try {
      const res = await getCustomers();
      setCustomers(res.data.customers || []);
    } catch (err) {
      console.error(err.message);
      toast.error("Failed to load customers");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit && selectedCustomer) {
        const res = await updateCustomer(selectedCustomer._id, formData);
        toast.success(res.data.message || "Customer updated");
      } else {
        const res = await addCustomer(formData);
        toast.success(res.data.message || "Customer added");
      }

      setFormData({
        customerName: "",
        email: "",
        phone: "",
        address: "",
        totalOrders: "",
        totalSpent: "",
      });
      setFormOpen(false);
      setIsEdit(false);
      setSelectedCustomer(null);
      fetchCustomers();
    } catch (err) {
      console.error(err.message);
      toast.error("Operation failed");
    }
  };

  const handleEdit = (customer) => {
    setFormData({ ...customer });
    setSelectedCustomer(customer);
    setIsEdit(true);
    setFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
    try {
      const res = await deleteCustomer(id);
      toast.success(res.data.message || "Deleted");
      fetchCustomers();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6 mt-16 min-h-screen bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Customers</h1>
        <button
          onClick={() => {
            setFormOpen(true);
            setIsEdit(false);
            setFormData({
              customerName: "",
              email: "",
              phone: "",
              address: "",
              totalOrders: "",
              totalSpent: "",
            });
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Customer
        </button>
      </div>

      {Array.isArray(customers) && customers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {customers.map((customer) => (
            <div
              key={customer._id}
              className="bg-white rounded-xl p-4 shadow hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold">{customer.customerName}</h3>
              <p className="text-sm text-gray-600">{customer.email}</p>
              <p className="text-sm text-gray-600">📞 {customer.phone}</p>
              <p className="text-sm text-gray-600">📍 {customer.address}</p>
              <p className="text-sm text-gray-500 mt-1">
                Orders: <strong>{customer.totalOrders}</strong>
              </p>
              <p className="text-sm text-gray-500">
                Spent: ₹<strong>{customer.totalSpent}</strong>
              </p>
              <div className="flex justify-end mt-4 gap-3">
                <button
                  onClick={() => handleEdit(customer)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FiEdit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(customer._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No customers available.</p>
      )}

      {/* Modal Form */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">
              {isEdit ? "Edit Customer" : "Add Customer"}
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleFormChange}
                placeholder="Customer Name"
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                placeholder="Email"
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                placeholder="Phone Number"
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleFormChange}
                placeholder="Address"
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="number"
                name="totalOrders"
                value={formData.totalOrders}
                onChange={handleFormChange}
                placeholder="Total Orders"
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                name="totalSpent"
                value={formData.totalSpent}
                onChange={handleFormChange}
                placeholder="Total Spent (₹)"
                className="w-full border p-2 rounded"
              />
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {isEdit ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerPage;
