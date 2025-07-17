const mongoose=require('mongoose');

const paymentSchema=new mongoose.Schema({
    orderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"order",
    },
    amount:{
        type:Number,
        required:true,
    },
    paymentMethod:{
        type:String,
        enum:["cash","card","upi"],
        required:true,
    },
    paymentStatus:{
        type:String,
        enum:["paid","failed","pending"],
        required:true,
    },
    paymentDate:{
        type:String,
        required:true,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    },
},{
    timestamps:true,
});

const Payment=mongoose.model("payment",paymentSchema);

module.exports=Payment;