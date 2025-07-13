const Category=require('../models/categoryModel');

async function handleAddingCategory(req,res){
    try{
        const {categoryName}=req.body;

        if(!categoryName || !req.file){
            return res.status(401).json({
                message:"Please provide all the fields",
            });
        }

        const existingCategory=await Category.findOne({categoryName, createdBy:req.user._id});
        if(existingCategory){
            return res.status(401).json({
                message:"The category already exists",
            });
        }

        const imagePath=req.file.path;

        const category=await Category.create({
            categoryName,
            categoryImage:imagePath,
            createdBy:req.user._id,
        });

        res.status(201).json({
            message:"Category created successfully",
            category,
        });

    }catch(error){
        console.log(error.message);
        res.status(500).json({
            message:"Error in category adding route",
        });
    }
}

async function handleGettingCategory(req,res){
    try{
        const existingCategory=await Category.find({});
        res.status(200).json({
            existingCategory,
            message:"Category Fetched successfully",
        });
    }catch(error){
        console.log(error.message);
        res.status(500).json({
            error,
            message:"Error in getting category route",
        });
    }
}

module.exports={
    handleAddingCategory,
    handleGettingCategory,
}