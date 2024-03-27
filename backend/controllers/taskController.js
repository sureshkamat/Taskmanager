const Task = require("../models/taskModel");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncError");

//Create Tasks Here --ADmin
exports.createTask = catchAsyncErrors(async (req, res, next) => {
  req.body.owner = req.user.id;
  const task = await Task.create(req.body);

  res.status(200).json({ success: true, task });
});

//get Tasks
exports.getAllTasks = catchAsyncErrors(async (req, res, next) => {
  const tasks = await Task.find({owner:req.user.id});

  res.json({
    success: true,
    tasks,
  });
});

//get Tasks
exports.getAll = catchAsyncErrors(async (req, res, next) => {
    const tasks = await Task.find( );
  
    res.json({
      success: true,
      tasks,
    });
  });
//update Task details --- Task Admin
exports.updateTask = catchAsyncErrors(async (req, res, next) => {
    let task = await Task.findById(req.params.id);
  
    if (!task) {
      return res
        .status(500)
        .json({ success: false, message: "Task Not Found" });
    }
    if (String(task.owner) !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not Authorized to Perform Operation" });
    }
    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({ message: true, task });
  });


  //delete Tasks by same user or admin
exports.deleteTask = catchAsyncErrors(async (req, res, next) => {
    const task = await Task.findById(req.params.id);
  
  
    if (!task) {
      return res.status(404).json({ success: false, message: "TAsk Not Found" });
    }
  
    // Check if the requester is the owner of the Task 
    if (String(task.owner)=== req.user.id ) {
      await Task.findByIdAndDelete(req.params.id);
      return res.status(200).json({ success: true });
    }
  
    // If the requester is neither the owner 
    return res.status(403).json({ success: false, message: "Not Authorized to Perform Operation" });
  });
  