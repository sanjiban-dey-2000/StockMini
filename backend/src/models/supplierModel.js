const mongoose=require('mongoose');

const supplierSchema=new mongoose.Schema({
    supplierName:{
        type:String,
        required:true,
    },
    companyName:{
        type:String,
        trim:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    address:{
        street: { type: String },
        city: { type: String },
        state: { type: String },
        postalCode: { type: String },
        country: { type: String },
    },
    productSupplied:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
},{
    timestamps:true,
});

const Supplier=mongoose.model('supplier',supplierSchema);

module.exports=Supplier;