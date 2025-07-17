const Supplier=require('../models/supplierModel');
const Product=require('../models/productModel');

async function handleAddingSupplier(req,res){
    console.log(req.body);
    try{
        const {supplierName,companyName,email,phone,address,productSupplied}=req.body;
        if(!supplierName||!companyName||!email||!phone||!address||!productSupplied){
            return res.status(401).json({
                message:"Please provide all the fields",
            });
        }
        const product=await Product.findOne({productName:productSupplied,createdBy:req.user._id});

        if(!product){
            return res.status(404).json({
                message:"Product is not entered. Please add the product first",
            });
        }

        const supplier=await Supplier.create({
            supplierName,
            companyName,
            email,
            phone,
            address,
            productSupplied:product._id,
            createdBy:req.user._id,
        });

        res.status(201).json({
            supplier,
            message:"Supplier added successfully",
        });

    }catch(error){
        console.log(error.message);
        res.status(500).json({
            message:"Error in supplier adding route",
        });
    }
}

async function handleGettingSupplier(req,res){
    try{
        const existingSupplier=await Supplier.find({});
        res.status(200).json({
            existingSupplier,
            message:"Suppliers fetched successfully",
        });
    }catch(error){
        console.log(error.message);
        res.status(500).json({
            error,
            message:"Error in getting supplier route",
        });
    }
}

async function handleSupplierUpdate(req,res){
    try{
        const {id}=req.params;
        const {supplierName,companyName,email,phone,address,}=req.body;

        const supplier=await Supplier.findByIdAndUpdate(id,{
            supplierName,
            companyName,
            email,
            phone,
            address
        });
        if(!supplier){
            return res.status(404).json({
                message:"Supplier not found",
            });
        }

        res.status(200).json({
            message:'Supplier updated successfully',
        })
    }catch(error){
        console.log(error.message);
        res.status(500).json({
            message:"Error in updating supplier route",
        });
    }
}

async function handleSupplierDelete(req,res){
    try{
        const {id}=req.params;

        const supplier=await Supplier.findByIdAndDelete(id);
        if(!supplier){
            return  res.status(404).json({
                        message:"Supplier not found",
                    });
        }

        res.status(200).json({
            message:"Supplier deleted successfully",
        });
    }catch(error){
        console.log(error.message);
        res.status(500).josn({
            message:"Error in deleting supplier route",
        });
    }
}

module.exports={
    handleAddingSupplier,
    handleGettingSupplier,
    handleSupplierUpdate,
    handleSupplierDelete,
}