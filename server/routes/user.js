const express = require('express');
const router = express.Router();
const userController = require("../controller/user.controller")

// register user
router.post("/registerUser", userController.registerUser)

// login user
router.post("/loginUser", userController.loginUser)

// verify otp
router.post("/verification", userController.verification)


module.exports = router;