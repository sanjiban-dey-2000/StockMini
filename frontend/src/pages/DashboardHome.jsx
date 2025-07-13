import React, { useState } from "react";
import {
  FiBox,
  FiList,
  FiTruck,
  FiShoppingCart,
  FiDollarSign,
  FiUsers,
} from "react-icons/fi";
import { addCategory, addProduct, addSupplier, getCategory, getProduct, getSupplier } from "../services/axiosInstance";
import toast from "react-hot-toast";
import { useEffect } from "react";

const DashboardHome = () => {
  const [productDetails,setProductDetails]=useState([]);
  const [categoryDetails,setCategoryDetails]=useState([]);
  const [supplierDetails,setSupplierDetails]=useState([]);
  const [activeForm, setActiveForm] = useState(null);
  const [category, setCategory] = useState({
    categoryName: "",
    image: null,
  });

  const [product, setProduct] = useState({
    productName: "",
    categoryName: "",
    description: "",
    price: "",
    quantity: "",
    image: null,
    status: "",
  });

  const [supplier,setSupplier]=useState({
    supplierName:"",
    companyName:"",
    email:"",
    phone:"",
    address:"",
    productSupplied:""
  });

  const handleSupplierFormChange=(e)=>{
    setSupplier({...supplier,[e.target.name]:e.target.value});
  }

  const postSupplierData=async(data)=>{
    try{
      const res=await addSupplier(data);
      console.log(res.data);
      toast.success(res.data.message);
    }catch(error){
      console.log(error.message);
      toast.error("Something went wrong. Please try again");
    }
  }

  const handleSupplierFormSubmit=(e)=>{
    e.preventDefault();
    postSupplierData(supplier);
    setSupplier({
      supplierName:"",
      companyName:"",
      email:"",
      phone:"",
      address:"",
      productSupplied:""
    });
  }

  const getProductDetails=async()=>{
    try{
      const res=await getProduct();
      console.log(res.data);
      setProductDetails(res.data.existingProduct);
    }catch(error){
      console.log(error.message);
    }
  }
  const getCategoryDetails=async()=>{
    try{
      const res=await getCategory();
      console.log(res.data);
      setCategoryDetails(res.data.existingCategory);
    }catch(error){
      console.log(error.message);
    }
  }
  const getSupplierDetails=async()=>{
    try{
      const res=await getSupplier();
      console.log(res.data);
      setSupplierDetails(res.data.existingSupplier);
    }catch(error){
      console.log(error.message);
    }
  }


  useEffect(()=>{
    getProductDetails();
    getCategoryDetails();
    getSupplierDetails();
  },[])

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

  const handleCategoryFormChange = (e) => {
    const { name, value, files } = e.target;
    setCategory({ ...category, [name]: files ? files[0] : value });
  };

  const postCategoryData = async (formData) => {
    try {
      const res = await addCategory(formData);
      console.log(res.data);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error.message);
      toast.error(res.data.message);
    }
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("categoryName", category.categoryName);
    formData.append("image", category.image);
    postCategoryData(formData);
    setCategory({
      categoryName: "",
      image: null,
    });
  };

  const handleProductFormChange = (e) => {
    const { name, value, files } = e.target;
    setProduct({ ...product, [name]: files ? files[0] : value });
  };

  const postProductData = async (formData) => {
    try {
      const res = await addProduct(formData);
      console.log(res.data.message);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error.message);
      toast.error("Something occures. Please try again!!");
    }
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", product.productName);
    formData.append("categoryName", product.categoryName);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);
    formData.append("status", product.status);

    // Validate before appending image
    if (product.image) {
      formData.append("image", product.image); // name should match multer key: "image"
    } else {
      toast.error("Please upload an image");
      return;
    }

    postProductData(formData);
    setProduct({
      productName: "",
      categoryName: "",
      description: "",
      price: "",
      quantity: "",
      image: null,
      status: "",
    });
  };

  const handleToggle = (form) => {
    setActiveForm(activeForm === form ? null : form);
  };

  return (
    <div className="lg:ml-[0px] p-6 mt-16 lg:mt-8 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        Dashboard Overview
      </h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
          <div
            className={`flex justify-between items-center p-6 rounded-2xl shadow-md bg-cyan-100`}
          >
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Categories
              </h2>
              <p className="text-3xl font-bold mt-1 text-gray-700">
                {categoryDetails.length}
              </p>
            </div>
            <div><FiList className="text-4xl text-cyan-500" /></div>
          </div>

          <div
            className={`flex justify-between items-center p-6 rounded-2xl shadow-md bg-blue-100`}
          >
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Products
              </h2>
              <p className="text-3xl font-bold mt-1 text-gray-700">
                {productDetails.length}
              </p>
            </div>
            <div><FiBox className="text-4xl text-blue-600" /></div>
          </div>

          <div
            className={`flex justify-between items-center p-6 rounded-2xl shadow-md bg-violet-100`}
          >
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Suppliers
              </h2>
              <p className="text-3xl font-bold mt-1 text-gray-700">
                {supplierDetails.length}
              </p>
            </div>
            <div><FiTruck className="text-4xl text-violet-600" /></div>
          </div>

          <div
            className={`flex justify-between items-center p-6 rounded-2xl shadow-md bg-green-100`}
          >
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Orders
              </h2>
              <p className="text-3xl font-bold mt-1 text-gray-700">
                0
              </p>
            </div>
            <div><FiShoppingCart className="text-4xl text-green-600" /></div>
          </div>

          <div
            className={`flex justify-between items-center p-6 rounded-2xl shadow-md bg-purple-100`}
          >
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Payments
              </h2>
              <p className="text-3xl font-bold mt-1 text-gray-700">
                0
              </p>
            </div>
            <div><FiDollarSign className="text-4xl text-purple-600" /></div>
          </div>

          <div
            className={`flex justify-between items-center p-6 rounded-2xl shadow-md bg-orange-100`}
          >
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Customers
              </h2>
              <p className="text-3xl font-bold mt-1 text-gray-700">
                0
              </p>
            </div>
            <div><FiUsers className="text-4xl text-orange-500" /></div>
          </div>
          
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
          <form className="space-y-4" onSubmit={handleProductSubmit}>
            <input
              type="text"
              id="productName"
              name="productName"
              value={product.productName}
              onChange={handleProductFormChange}
              placeholder="Product Name"
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="text"
              id="categoryName"
              name="categoryName"
              value={product.categoryName}
              onChange={handleProductFormChange}
              placeholder="Category Name"
              className="w-full px-4 py-2 border rounded"
            />
            <textarea
              type="text"
              rows="2"
              id="description"
              name="description"
              value={product.description}
              onChange={handleProductFormChange}
              placeholder="Description"
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="number"
              placeholder="Price"
              id="price"
              name="price"
              value={product.price}
              onChange={handleProductFormChange}
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="number"
              placeholder="Quantity"
              id="quantity"
              name="quantity"
              value={product.quantity}
              onChange={handleProductFormChange}
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="file"
              accept="image/*"
              placeholder="Category"
              id="image"
              name="image"
              onChange={handleProductFormChange}
              className="w-full px-4 py-2 border rounded"
            />
            <select
              name="status"
              id="status"
              className="w-full px-4 py-2 border rounded"
              value={product.status}
              onChange={handleProductFormChange}
            >
              <option value="">-- Select Status --</option>
              <option value="in-stock">In-Stock</option>
              <option value="out-of-stock">Out-of-Stock</option>
              <option value="discontinued">Discontinued</option>
            </select>
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
          <form className="space-y-4" onSubmit={handleCategorySubmit}>
            <input
              type="text"
              placeholder="Category Name"
              id="categoryName"
              name="categoryName"
              value={category.categoryName}
              onChange={handleCategoryFormChange}
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="file"
              accept="image/*"
              placeholder="Upload the image"
              id="image"
              name="image"
              onChange={handleCategoryFormChange}
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
          <form className="space-y-4" onSubmit={handleSupplierFormSubmit}>
            <input
              type="text"
              id="supplierName"
              name="supplierName"
              placeholder="Supplier Name"
              value={supplier.supplierName}
              onChange={handleSupplierFormChange}
              className="w-full px-4 py-2 border rounded"
            />
            <input type="text"
              id="companyName"
              name="companyName"
              placeholder="Company name"
               value={supplier.companyName}
              onChange={handleSupplierFormChange}
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              id="email"
              name='email'
               value={supplier.email}
              onChange={handleSupplierFormChange}
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="text"
              placeholder="Phone"
              id="phone"
              name="phone"
               value={supplier.phone}
              onChange={handleSupplierFormChange}
              className="w-full px-4 py-2 border rounded"
            />
            <textarea rows='2' name="address" id="address" className="w-full px-4 py-2 border rounded"
              value={supplier.address}
              onChange={handleSupplierFormChange}
            />
            <input type="text"
              id="productSupplied"
              name="productSupplied"
              placeholder="Name of the product"
               value={supplier.productSupplied}
              onChange={handleSupplierFormChange}
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
