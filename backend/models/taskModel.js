const mongoose=require('mongoose');

const tasksSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please Enter Description"]
    },
    status:{
        type:String,
        required:[true,"Please Enter status"]
    },
    priorities:{
        type:String,
        required:[true,"Please Enter Priorities"]
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    owner:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:[true,"Please Enter Owner Name"]
    }
    
})

module.exports=mongoose.model("Tasks",tasksSchema);