const User=require('../models/userModel');
const JWT=require('jsonwebtoken');
const bcrypt=require('bcrypt');

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
            user:user,
            message:"User registration is successful",
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"Error in user registration route",
        });
    }
}

async function handleUserLogin(req,res){
    try{
        const {email,password}=req.body;

        if(!email||!password){
            return res.status(401).json({
                message:"Please provide all the fields",
            });
        }

        const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({
                message:"Email or password is incorrect",
            });
        }

        const comparePassword=await bcrypt.compare(password,user.password);

        if(!comparePassword){
            return res.status(401).json({
                message:"Incorrect password provided",
            });
        }

        const token=JWT.sign({userId:user._id},process.env.JWT_SECRET_KEY,{
            expiresIn:"7d",
        });

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: false, // true in production with HTTPS
        });
        res.status(200).json({
            user:user,
            message:"User has logged in successfully",
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"Error in login route",
        });
    }
}

async function handleUseLogout(req,res){
    try{
        res.clearCookie('jwt',{
            httpOnly:true,
            secure:true,
            sameSite:true,
        });
        res.status(200).json({
            message:"Logged out successfully",
        });
    }catch(error){
        console.log(error.message);
        res.status(500).json({
            message:"Error in logout route",
        });
    }
}

module.exports={
    handleUserRegistration,
    handleUserLogin,
    handleUseLogout,
}