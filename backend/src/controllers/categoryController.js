const Category=require('../models/categoryModel');

async function handleAddingCategory(req,res){
    try{
        console.log(req.body);
        console.log(req.file);
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

        const imagePath=`/assets/${req.file.filename}`;

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

async function handleDeleteCategory(req,res){
    try{
        const {id}=req.params;

        const category=await Category.findByIdAndDelete(id);

        if(!category){
            return res.status(404).json({
                message:"Category not found",
            });
        }

        res.status(200).json({
            message:"Category deleted successfully",
        });
    }catch(error){
        console.log(error.message);
        res.status(500).json({
            message:"Error in category deletion route",
        });
    }
}

async function handleUpdateCategory(req,res){
    try{
        const {id}=req.params;
        const {categoryName}=req.body;

        const category=await Category.findByIdAndUpdate(id,
            {
                categoryName,
            }
        )

        if(!category){
            return res.status(404).json({
                message:"Category not found",
            });
        }

        res.status(200).json({
            message:"Category updated successfully",
        });
    }catch(error){
        console.log(error.message);
        res.status(500).json({
            message:"Error in updating category route",
        });
    }
}

module.exports={
    handleAddingCategory,
    handleGettingCategory,
    handleDeleteCategory,
    handleUpdateCategory,
}