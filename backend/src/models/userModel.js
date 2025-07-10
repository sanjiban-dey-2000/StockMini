const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    confirmPassword:{
        type:String,
        required:true,
    }
},{
    timestamps:true,
});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    try{
        const salt=await bcrypt.genSalt(10);
        this.password=await bcrypt.hash(this.password,salt);
        this.confirmPassword=await bcrypt.hash(this.confirmPassword,salt);
        next();
    }catch(error){
        next(error);
    }
});

const User=mongoose.model('user',userSchema);

module.exports=User;