const express = require("express");
const {
  registerUser,
  loginUser,
  logOut,
  getUserdetails,
  
} = require("../controllers/userController");
const { isAuthenticatedUser, } = require("../middlewares/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logOut);


 router.route("/me").get(isAuthenticatedUser, getUserdetails);


module.exports = router;
