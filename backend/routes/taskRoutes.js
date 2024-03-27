const express=require('express');
const { isAuthenticatedUser } = require('../middlewares/auth');
const { getAllTasks,getAll, createTask, deleteTask, updateTask } = require('../controllers/taskController');
const router=express.Router();

router.route('/tasks').get(isAuthenticatedUser,getAllTasks);
router.route('/alltasks').get(getAll);
router.route('/tasks/new').post(isAuthenticatedUser,createTask);

 router.route('/task/:id').put(isAuthenticatedUser,updateTask).delete(isAuthenticatedUser,deleteTask);


module.exports=router