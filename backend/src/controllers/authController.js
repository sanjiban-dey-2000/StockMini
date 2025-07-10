const User=require('../models/userModel');
const JWT=require('jsonwebtoken');

async function handleUserRegistration(req,res){
    try{
        const {fullName,email,password,confirmPassword}=req.body;
        if(!fullName||!email||!password||!confirmPassword){
            return res.status(401).json({
                message:"Please provide all the fields",
            });
        }
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(401).json({
                message:"Email already exists",
            });
        }

        if (password!==confirmPassword){
            return res.status(401).json({
                message:"Passwords are not same.Please provide same password",
            });
        }
        const user=await User.create({
            fullName,
            email,
            password,
            confirmPassword,
        });

        const token=JWT.sign({ userId: user._id }, process.env.JWT_SECRET_KEY,{
            expiresIn:'7d',
        });

        res.cookie('jwt',token,{
            maxAge:7*24*60*60*1000,
            httpOnly:true,
            sameSite:"strict",
        });

        res.status(201).json({
            message:"User registration is successful",
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"Error in user registration route",
        });
    }
}

module.exports={
    handleUserRegistration,
}