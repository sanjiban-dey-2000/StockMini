const Product = require('../models/productModel');
const Category = require('../models/categoryModel');

async function handleAddingProduct(req, res) {
  try {
    const {
      productName,
      categoryName,
      description,
      price,
      quantity,
      status
    } = req.body;

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    // Validation
    if (
      !productName ||
      !categoryName ||
      !description ||
      !price ||
      !quantity ||
      !req.file 
    ) {
      return res.status(400).json({
        message: "Please provide all the fields",
      });
    }

    // Check if category exists
    const category = await Category.findOne({
      categoryName,
      createdBy: req.user._id,
    });

    if (!category) {
      return res.status(404).json({
        message: "Category not found. Please add the category first",
      });
    }

    // Check if product exists for the same user
    const existingProduct = await Product.findOne({
      productName,
      createdBy: req.user._id,
    });

    if (existingProduct) {
      existingProduct.quantityInStock += Number(quantity);
      await existingProduct.save();

      return res.status(200).json({
        message: "Product already exists. Stock updated successfully!",
        product: existingProduct,
      });
    }

    const imagePath = req.file.path;

    // Create new product
    const newProduct = await Product.create({
      productName,
      category: category._id,
      description,
      price: Number(price),
      quantityInStock: Number(quantity),
      productImage: imagePath,
      status,
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.log("Error in handleAddingProduct:", error.message);
    res.status(500).json({
      message: "Error in product adding route",
    });
  }
}

async function handleGettingProducts(req,res){
  try{
    const existingProduct=await Product.find({});
    res.status(200).json({
      existingProduct,
      message:"Products fetched successfully",
    });
  }catch(error){
    console.log(error.message);
    res.status(500).json({
      message:"Error in Getting products route",
      error,
    });
  }
}

module.exports = {
  handleAddingProduct,
  handleGettingProducts,
};
