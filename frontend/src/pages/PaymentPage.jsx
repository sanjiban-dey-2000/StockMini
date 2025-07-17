import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getPayments, addPayment } from "../services/axiosInstance";

const PaymentPage = () => {
  const [payments, setPayments] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    orderId: "",
    amount: "",
    paymentMethod: "cash",
    paymentStatus: "paid",
    paymentDate: "",
  });

  const fetchPayments = async () => {
    try {
      const res = await getPayments();
      setPayments(res.data.existingPayments || []);
      toast.success(res.data.message || "Payments fetched");
    } catch (err) {
      console.error(err.message);
      setPayments([]);
      toast.error("Failed to fetch payments.");
    }
  };

  const handleInputChange = (e) => {
    setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value });
  };

  const handleAddPayment = async (e) => {
    e.preventDefault();
    try {
      const res = await addPayment(paymentForm);
      toast.success(res.data.message || "Payment added");
      setShowAddModal(false);
      setPaymentForm({
        orderId: "",
        amount: "",
        paymentMethod: "cash",
        paymentStatus: "paid",
        paymentDate: "",
      });
      fetchPayments();
    } catch (err) {
      console.error(err.message);
      toast.error("Failed to add payment.");
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="p-6 mt-16 lg:mt-8 min-h-screen bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Payments</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Payment
        </button>
      </div>

      {Array.isArray(payments) && payments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {payments.map((payment, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-5 border border-gray-200"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Order ID: {payment.orderId || "N/A"}
              </h3>
              <p className="text-sm text-gray-600">
                Amount: ₹{payment.amount.toFixed(2)}
              </p>
              <p className="text-sm text-gray-600 capitalize">
                Method: {payment.paymentMethod}
              </p>
              <p className="text-sm text-gray-600 capitalize">
                Status: {payment.paymentStatus}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Payment Date: {payment.paymentDate}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No payments found.</p>
      )}

      {/* Add Payment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add New Payment</h2>
            <form onSubmit={handleAddPayment} className="space-y-4">
              <input
                type="text"
                name="orderId"
                value={paymentForm.orderId}
                onChange={handleInputChange}
                placeholder="Order ID"
                required
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                name="amount"
                value={paymentForm.amount}
                onChange={handleInputChange}
                placeholder="Amount"
                required
                className="w-full border p-2 rounded"
              />
              <select
                name="paymentMethod"
                value={paymentForm.paymentMethod}
                onChange={handleInputChange}
                required
                className="w-full border p-2 rounded"
              >
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="upi">UPI</option>
              </select>
              <select
                name="paymentStatus"
                value={paymentForm.paymentStatus}
                onChange={handleInputChange}
                required
                className="w-full border p-2 rounded"
              >
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
              <input
                type="date"
                name="paymentDate"
                value={paymentForm.paymentDate}
                onChange={handleInputChange}
                required
                className="w-full border p-2 rounded"
              />
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Add Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
