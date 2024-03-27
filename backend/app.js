const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors=require('cors');
const errorMiddleware = require("./middlewares/error");

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"*"
}))

//config
dotenv.config({ path: "backend/config/config.env" });

const user = require("./routes/userRoutes");
const task = require("./routes/taskRoutes");

app.get("/", (req, res) => {
  res.status(200).json({ message: "API ROUTES HERE STARTED" });
});

app.use("/api/v1", user);
app.use("/api/v1", task);

//middleware for error
app.use(errorMiddleware);

module.exports = app;
