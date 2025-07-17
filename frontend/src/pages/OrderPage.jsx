import React, { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { FiEdit, FiTrash2, FiDownload } from "react-icons/fi";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  getOrders,
  addOrder,
  updateOrder,
  deleteOrder,
  getCustomers,
  getProduct,
} from "../services/axiosInstance";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [formData, setFormData] = useState({
    orderNumber: "",
    customerId: "",
    products: [],
    totalAmount: 0,
    status: "pending",
  });

  const pdfRef = useRef(null);

  useEffect(() => {
    fetchOrders();
    fetchCustomers();
    fetchProducts();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await getOrders();
      setOrders(res.data?.existingOrder || []);
    } catch (err) {
      toast.error("Failed to fetch orders");
    }
  };

  const fetchCustomers = async () => {
    try {
      const res = await getCustomers();
      setCustomers(res.data?.customers || []);
    } catch (err) {
      toast.error("Failed to fetch customers");
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await getProduct();
      setProducts(res.data?.products || []);
    } catch (err) {
      toast.error("Failed to fetch products");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleProductSelect = (productId) => {
    const product = products.find((p) => p._id === productId);
    if (product) {
      const existing = formData.products.find((p) => p.productId === productId);
      if (!existing) {
        setFormData((prev) => ({
          ...prev,
          products: [
            ...prev.products,
            {
              productId,
              quantity: 1,
              priceAtPurchase: product.price,
            },
          ],
          totalAmount: prev.totalAmount + product.price,
        }));
      }
    }
  };

  const handleQuantityChange = (index, newQty) => {
    const updatedProducts = [...formData.products];
    const productId = updatedProducts[index].productId;
    const product = products.find((p) => p._id === productId);
    const oldQty = updatedProducts[index].quantity;
    updatedProducts[index].quantity = newQty;
    const total = formData.totalAmount - (oldQty * product.price) + (newQty * product.price);

    setFormData({
      ...formData,
      products: updatedProducts,
      totalAmount: total,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingOrder) {
        const res = await updateOrder(editingOrder._id, formData);
        toast.success(res.data.message);
      } else {
        const res = await addOrder(formData);
        toast.success(res.data.message);
      }
      resetForm();
      fetchOrders();
    } catch (err) {
      toast.error("Error saving order");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      const res = await deleteOrder(id);
      toast.success(res.data.message);
      fetchOrders();
    } catch (err) {
      toast.error("Error deleting order");
    }
  };

  const resetForm = () => {
    setFormData({
      orderNumber: "",
      customerId: "",
      products: [],
      totalAmount: 0,
      status: "pending",
    });
    setEditingOrder(null);
  };

  const downloadPDF = () => {
    html2canvas(pdfRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("orders.pdf");
    });
  };

  return (
    <div className="p-6 mt-16 min-h-screen bg-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
        <button onClick={downloadPDF} className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700">
          <FiDownload /> Download PDF
        </button>
      </div>

      <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded-xl shadow mb-8 space-y-4">
        <input type="text" name="orderNumber" placeholder="Order Number" className="w-full p-2 border rounded" value={formData.orderNumber} onChange={handleChange} required />

        <select name="customerId" className="w-full p-2 border rounded" value={formData.customerId} onChange={handleChange} required>
          <option value="">Select Customer</option>
          {customers.map((cust) => (
            <option key={cust._id} value={cust._id}>{cust.customerName}</option>
          ))}
        </select>

        <select onChange={(e) => handleProductSelect(e.target.value)} className="w-full p-2 border rounded">
          <option value="">Select Product</option>
          {products.map((prod) => (
            <option key={prod._id} value={prod._id}>{prod.productName} - ₹{prod.price}</option>
          ))}
        </select>

        {formData.products.map((item, idx) => {
          const product = products.find((p) => p._id === item.productId);
          return (
            <div key={idx} className="flex gap-2 items-center">
              <p className="w-full">{product?.productName} - ₹{item.priceAtPurchase}</p>
              <input
                type="number"
                min="1"
                className="w-20 border rounded p-1"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(idx, parseInt(e.target.value))}
              />
            </div>
          );
        })}

        <p className="font-semibold">Total Amount: ₹{formData.totalAmount}</p>

        <select name="status" className="w-full p-2 border rounded" value={formData.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <div className="flex justify-end gap-4">
          <button type="button" onClick={resetForm} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{editingOrder ? "Update" : "Create"} Order</button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" ref={pdfRef}>
        {orders.map((order) => (
          <div key={order._id} className="bg-white p-4 rounded-lg shadow space-y-2">
            <h2 className="text-xl font-bold text-gray-800">#{order.orderNumber}</h2>
            <p className="text-sm text-gray-600">Customer: {customers.find((c) => c._id === order.customerId)?.customerName || "N/A"}</p>
            <ul className="text-sm text-gray-600">
              {order.products.map((p, idx) => {
                const prod = products.find((pr) => pr._id === p.productId);
                return (
                  <li key={idx}>{prod?.productName || "N/A"} - ₹{p.priceAtPurchase} x {p.quantity}</li>
                );
              })}
            </ul>
            <p className="text-sm text-gray-800 font-semibold">Total: ₹{order.totalAmount}</p>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${order.status === "pending" ? "bg-yellow-100 text-yellow-800" : order.status === "delivered" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{order.status}</span>
            <div className="flex justify-end gap-4 mt-2">
              <button onClick={() => {
                setEditingOrder(order);
                setFormData({
                  orderNumber: order.orderNumber,
                  customerId: order.customerId,
                  products: order.products,
                  totalAmount: order.totalAmount,
                  status: order.status,
                });
              }} className="text-blue-600 hover:text-blue-800"><FiEdit className="text-xl" /></button>
              <button onClick={() => handleDelete(order._id)} className="text-red-600 hover:text-red-800"><FiTrash2 className="text-xl" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
