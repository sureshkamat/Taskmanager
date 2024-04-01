const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwttokens");

const crypto = require("crypto");

//Register a user
exports.registerUser = catchAsyncError(async (req, res, next) => {


    const { name, email,password } = req.body;
  
    const user = await User.create({
      name,
      email,
      password,
      
    });
      // sendToken(user, 201, res);
      const token=user.getJWTToken();
    res.status(201).send({user,token});
  });


  //login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    //check email and password
  
    if (!email || !password) {
      return next(new ErrorHandler("Please Enter Email and Password", 400));
    }
  
    const user = await User.findOne({ email }).select("+password");
  
    if (!user) {
      return next(new ErrorHandler("Invalid Email or Password", 401));
    }
  
    const isPasswordMatched = await user.comparePassword(password);
  
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid Email or Password", 401));
    }
    
    //  sendToken(user, 200, res);
    const token=user.getJWTToken();
    res.status(200).send({user,token});
    
  });


  //logout user
exports.logOut = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
  
    res.status(200).json({
      success: true,
      message: "LogOut User",
    });
  });

//get User details
exports.getUserdetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user,
    });
  });
  