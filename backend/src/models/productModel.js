const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    quantityInStock:{
        type:Number,
        required:true,
        min:0,
    },
    productImage:{
        type:String,
    },
    status:{
        type:String,
        enum:["in-stock","out-of-stock","discontinued"],
        default:"in-stock",
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
},{
    timestamps:true,
});

const Product=mongoose.model('product',productSchema);

module.exports=Product;