const mongoose=require('mongoose')


const connection=mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.qx5lobv.mongodb.net/TaskManager`)

module.exports={connection}