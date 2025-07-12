const mongoose=require('mongoose');

const categorySchema=new mongoose.Schema({
    categoryName:{
        type:String,
        required:true,
    },
    categoryImage:{
        type:String,
        default:'',
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    }
},{
    timestamps:true,
});

const Category=mongoose.model('category',categorySchema);

module.exports=Category;