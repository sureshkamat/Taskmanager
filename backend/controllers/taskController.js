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
  const { search, status, priorities, size, sort } = req.query;
  const query = { owner: req.user.id };

  if (status) query.status = status;
  if (priorities) query.priorities = priorities;
  if (search) {
    const searchQuery = new RegExp(search, 'i');
    query.$or = [
      { name: searchQuery },
      { description: searchQuery }
    ];
  }

  // Get total count
  const totalCount = await Task.countDocuments(query);

  const sortOptions = {};
  if (sort === 'asc') {
    sortOptions.createdAt = 1;
  }
  if (sort === 'desc') {
    sortOptions.createdAt = -1;
  }

  // Get tasks
  const tasks = await Task.find(query).sort(sortOptions).limit(size);

  res.json({
    success: true,
    tasks,
    totalCount // Send totalCount in the response
  });
});


//get Tasks
exports.getAll = catchAsyncErrors(async (req, res, next) => {
  const tasks = await Task.find();

  res.json({
    success: true,
    tasks,
  });
});
//update Task details --- Task Admin
exports.updateTask = catchAsyncErrors(async (req, res, next) => {
  let task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(500).json({ success: false, message: "Task Not Found" });
  }
  if (String(task.owner) !== req.user.id) {
    return res
      .status(403)
      .json({ success: false, message: "Not Authorized to Perform Operation" });
  }
  task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({ success: true, task });
});

//delete Tasks by same user or admin
exports.deleteTask = catchAsyncErrors(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ success: false, message: "Task Not Found" });
  }

  // Check if the requester is the owner of the Task
  if (String(task.owner) === req.user.id) {
    await Task.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true });
  }

  // If the requester is neither the owner
  return res
    .status(403)
    .json({ success: false, message: "Not Authorized to Perform Operation" });
});
