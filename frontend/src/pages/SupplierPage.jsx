import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import { deleteSupplier, getSupplier, updateSupplier } from "../services/axiosInstance";

const SupplierPage = () => {
  const [supplierDetails, setSupplierDetails] = useState([]);
  const [supplier, setSupplier] = useState(null);
  const [updatedSupplier, setUpdatedSupplier] = useState({
    supplierName: "",
    companyName: "",
    email: "",
    phone: "",
    address: "",
  });

  const getSupplierDetails = async () => {
    try {
      const res = await getSupplier();
      console.log(res.data.existingSupplier);
      setSupplierDetails(res.data.existingSupplier);
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong. Please try again!!");
    }
  };

  const handleFormClick = (supplier) => {
    setSupplier(supplier);
    setUpdatedSupplier({
      supplierName: supplier.supplierName,
      companyName: supplier.companyName,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address,
    });
  };

  const handleFormChange=(e)=>{
    setUpdatedSupplier({...updatedSupplier,[e.target.name]:e.target.value});
  }

  const updateSupplierDetails=async(id,data)=>{
    try{
        const res=await updateSupplier(id,data);
        toast.success(res.data.message);
    }catch(error){
        console.log(error.message);
        toast.error("Something went wrong. Please try again!!");
    }
  }

  const handleFormSubmit=(e)=>{
    e.preventDefault();
    updateSupplierDetails(supplier._id,updatedSupplier);
    getSupplierDetails();
    setSupplier(null);
  }

  const handleSupplierDelete=async(id)=>{
    try{
        const res=await deleteSupplier(id);
        toast.success(res.data.message);
        getSupplierDetails();
    }catch(error){
        console.log(error.message);
        toast.error("Something went wrong. Please try again!!");
    }
  }

  useEffect(() => {
    getSupplierDetails();
  }, []);

  return (
    <div className="p-6 mt-16 lg:mt-8 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Manage Suppliers
      </h1>

      {/* Supplier List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {supplierDetails.map((supplier, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                Supplier {index + 1}
              </h3>
              <p className="text-md text-gray-700">
                Contact Person: {supplier.supplierName}
              </p>
              <p className="text-md text-gray-700">
                Company: {supplier.companyName}
              </p>
              <p className="text-md text-gray-700">Email: {supplier.email}</p>
              <p className="text-md text-gray-700">Phone: {supplier.phone}</p>
              <p className="text-md text-gray-700">
                Address: {supplier.address}
              </p>
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <button
                className="text-blue-600 hover:text-blue-800"
                onClick={() => handleFormClick(supplier)}
              >
                <FiEdit className="text-xl" />
              </button>
              <button className="text-red-600 hover:text-red-800" onClick={()=>handleSupplierDelete(supplier._id)}>
                <FiTrash2 className="text-xl" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {supplier && (
        <div className="fixed inset-0 bg-white bg-opacity-30 backdrop-blur-sm z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Edit Supplier
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input
                type="text"
                name="supplierName"
                value={updatedSupplier.supplierName}
                onChange={handleFormChange}
                className="w-full border p-2 rounded"
                placeholder="Supplier Name"
                required
              />
              <input
                type="text"
                name="companyName"
                value={updatedSupplier.companyName}
                onChange={handleFormChange}
                className="w-full border p-2 rounded"
                placeholder="Contact Person"
              />
              <input
                type="email"
                name="email"
                value={updatedSupplier.email}
                onChange={handleFormChange}
                className="w-full border p-2 rounded"
                placeholder="Email"
              />
              <input
                type="text"
                name="phone"
                value={updatedSupplier.phone}
                onChange={handleFormChange}
                className="w-full border p-2 rounded"
                placeholder="Phone Number"
              />
              <textarea
                name="address"
                value={updatedSupplier.address}
                onChange={handleFormChange}
                className="w-full border p-2 rounded"
                placeholder="Address"
              ></textarea>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setSupplier(null)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierPage;
