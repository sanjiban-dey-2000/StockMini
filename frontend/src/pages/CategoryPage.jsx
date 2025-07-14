import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import { deleteCategory, getCategory, updateCategory } from "../services/axiosInstance";

const CategoryPage = () => {
  const [categoryDetails, setCategoryDetails] = useState([]);
  const [editCategory, setEditCategory] = useState(null);
  const [editForm, setEditForm] = useState({
    categoryName: "",
  });

  const getCategoryDetails = async () => {
    try {
      const res = await getCategory();
      setCategoryDetails(res.data.existingCategory);
      toast.success(res.data.message);
    } catch (error) {
      console.error(error.message);
      toast.error("Something went wrong. Please try again!!");
    }
  };

  const handleEditCategoryClick = (category) => {
    setEditCategory(category);
    setEditForm({
      categoryName: category.categoryName,
    });
  };

  const handleEditFormChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateCategory(editCategory._id, editForm);
      toast.success(res.data.message || "Category updated successfully!");
      setEditCategory(null);
      setEditForm({ categoryName: "" });
      getCategoryDetails();
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to update category.");
    }
  };

  const handleDeleteClick=async(id)=>{
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try{
      const res=await deleteCategory(id);
      toast.success(res.data.message);
      getCategoryDetails();
    }catch(error){
      console.log(error.message);
      toast.error("Something went wrong. Please try again!!");
    }
  }

  useEffect(() => {
    getCategoryDetails();
  }, []);

  return (
    <div className="p-6 mt-16 lg:mt-8 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Categories</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryDetails.map((category, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <img
              src={`http://localhost:5001${category.categoryImage}`}
              alt="Category"
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">
                {category.categoryName}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Short description of the category...
              </p>
              <div className="flex justify-end gap-4">
                <button
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => handleEditCategoryClick(category)}
                >
                  <FiEdit className="text-xl" />
                </button>
                <button className="text-red-600 hover:text-red-800" onClick={()=>handleDeleteClick(category._id)}>
                  <FiTrash2 className="text-xl" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editCategory && (
        <div className="fixed inset-0 bg-transparent bg-opacity-10 backdrop-blur-sm z-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Category</h2>
            <form onSubmit={handleEditFormSubmit} className="space-y-4">
              <input
                type="text"
                name="categoryName"
                value={editForm.categoryName}
                onChange={handleEditFormChange}
                className="w-full border p-2 rounded"
                placeholder="Category Name"
                required
              />
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setEditCategory(null)}
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

export default CategoryPage;
