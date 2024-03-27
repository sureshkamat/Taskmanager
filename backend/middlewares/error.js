const ErrorHandler=require("../utils/errorHandler")

module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.message=err.message || "Internal Server Error"

//Wrong Jwt TokenError
if(err.name==="JsonwebTokenError"){
    const message=`Json Web ToKen is Invalid Try Again`;
    err=new ErrorHandler(message,404);
}
    

    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}