const Product=require('../models/productModel');
const Category=require('../models/categoryModel');

async function handleAddingProduct(req,res){
    try{
        const {productName,categoryName,description,price,quantity,status}=req.body;
        if(!productName||!categoryName||!description ||!price||!quantity||!req.file||!status){
            return res.status(401).json({
                message:"Please provide all the fields",
            });
        }

        const category=await Category.findOne({categoryName,createdBy:req.user._id});
        if(!category){
            return res.status(404).json({
                message:"Category not found. Please add the category first",
            });
        }

        const existingProduct=await Product.findOne({productName});
        if(existingProduct){
            existingProduct.quantityInStock+=Number(quantity);
            await existingProduct.save();

            return res.status(200).json({
                existingProduct,
                message:"Product already exists. Stock has updated successfully!!",
            });
        }

        const imagePath=req.file.path;

        const newProduct=await Product.create({
            productName,
            category:category._id,
            description,
            price,
            quantityInStock:quantity,
            productImage:imagePath,
            status,
            createdBy:req.user._id,
        });

        res.status(201).json({
            message:"Product added successfully",
            newProduct,
        });
    }catch(error){
        console.log(error.message);
        res.status(500).json({
            message:"Error in product adding route",
        });
    }
}

module.exports={
    handleAddingProduct,
}