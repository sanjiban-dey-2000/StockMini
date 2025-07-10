const jwt=require('jsonwebtoken');
const User=require('../models/userModel');

export const protectRoute=async(req,res,next)=>{
    try{
        const token=req.cookies.jwt;
        if(!token){
            return res.status(401).json({
                message:"Unauthorized:No-token provided",
            });
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);

        if(!decoded){
            return res.status(401).json({
                message:"Unauthorized: Invalid token",
            });
        }

        const user=await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(401).json({
                message: "Unauthorized: User not found",
            });
        }

        req.user=user;
        next();

    }catch(error){
        console.log("Error in protect route middleware",error.message);
        res.status(500).json({
            message:"Error in protect route",
        });
    }
}