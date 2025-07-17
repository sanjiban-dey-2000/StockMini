const mongoose=require('mongoose');

const customerSchema=new mongoose.Schema({
    customerName:{
        type:String,
        required:true,
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
        type:String,
        required:true,
    },
    totalOrders:{
        type:Number,
        required:true,
    },
    totalSpent:{
        type:Number,
        required:true,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    }
},{
    timestamps:true,
});

const Customer=mongoose.model('customer',customerSchema);

module.exports=Customer;