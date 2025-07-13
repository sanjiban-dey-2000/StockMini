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

module.exports={
    handleAddingSupplier,
}