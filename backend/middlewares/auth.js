const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors=require('./catchAsyncError');
const User=require("../models/userModel");
const jwt=require("jsonwebtoken");
exports.isAuthenticatedUser=catchAsyncErrors (async(req,res,next)=>{
    const token=req.headers.authorization.split(' ')[1];
    if(!token){
        return next(new ErrorHandler("Please Login First to get resource",401));
    }
    const decodedData=jwt.verify(token,process.env.JWT_SECRET);
   

    req.user=await User.findById(decodedData.id);
    
    next();
})
