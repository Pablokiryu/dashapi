const express  = require("express");
const router = express.Router();
const topActiveUsersController = require("./topActiveUsers.controller.js");

router.get("/",(req,res,next) =>{topActiveUsersController.get(req,res);});

module.exports = router;