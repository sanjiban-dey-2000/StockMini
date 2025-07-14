import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { getProduct, deleteProduct, updateProduct} from '../services/axiosInstance';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null); // product to edit
  const [editForm, setEditForm] = useState({
    productName: '',
    description: '',
    price: '',
    quantityInStock: '',
    status: ''
  });

  const fetchProducts = async () => {
    try {
      const res = await getProduct();
      setProducts(res.data.existingProduct);
      toast.success(res.data.message);
    } catch (err) {
      console.log(err.message);
      toast.error('Something went wrong. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await deleteProduct(id);
      toast.success(res.data.message);
      fetchProducts();
    } catch (err) {
      console.log(err.message);
      toast.error("Failed to delete product");
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setEditForm({
      productName: product.productName,
      description: product.description,
      price: product.price,
      quantityInStock: product.quantityInStock,
      status: product.status
    });
  };

  const handleEditFormChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProduct(editingProduct._id, editForm);
      toast.success(res.data.message);
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.log(err.message);
      toast.error("Failed to update product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6 mt-16 lg:mt-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Products</h1>

      {products.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <div className="space-y-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white shadow-md p-6 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="flex items-start md:items-center gap-6">
                <img
                  src={`http://localhost:5001/${product.productImage.replace(/\\/g, '/')}`}
                  alt={product.productName}
                  className="w-28 h-28 object-cover rounded-lg border"
                />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">{product.productName}</h2>
                  <p className="text-sm text-gray-600">{product.description}</p>
                  <p className="text-sm mt-1 text-gray-500">₹{product.price} | Quantity: {product.quantityInStock}</p>
                  <p className="text-sm text-gray-500 capitalize">Status: {product.status}</p>
                </div>
              </div>

              <div className="flex gap-4 mt-4 md:mt-0">
                <button onClick={() => handleEditClick(product)} className="text-blue-600 hover:text-blue-800">
                  <FiEdit className="text-2xl" />
                </button>
                <button onClick={() => handleDelete(product._id)} className="text-red-600 hover:text-red-800">
                  <FiTrash2 className="text-2xl" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <form onSubmit={handleEditFormSubmit} className="space-y-4">
              <input type="text" name="productName" value={editForm.productName} onChange={handleEditFormChange} className="w-full border p-2 rounded" placeholder="Product Name" />
              <input type="text" name="description" value={editForm.description} onChange={handleEditFormChange} className="w-full border p-2 rounded" placeholder="Description" />
              <input type="number" name="price" value={editForm.price} onChange={handleEditFormChange} className="w-full border p-2 rounded" placeholder="Price" />
              <input type="number" name="quantityInStock" value={editForm.quantityInStock} onChange={handleEditFormChange} className="w-full border p-2 rounded" placeholder="Quantity" />
              <select name="status" value={editForm.status} onChange={handleEditFormChange} className="w-full border p-2 rounded">
                <option value="in-stock">In-Stock</option>
                <option value="out-of-stock">Out-of-Stock</option>
                <option value="discontinued">Discontinued</option>
              </select>
              <div className="flex justify-end gap-4">
                <button type="button" onClick={() => setEditingProduct(null)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
