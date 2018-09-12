const express = require("express");
const router = express.Router();
const UserController = require("./Users.controller.js");

///Returns FULL JSON data on all users
router.get("/", (req,res) =>{UserController.get(req,res);});
/// Used to Include new users
router.post("/",(req,res)=>{UserController.post(req,res)});
//Returns info on selected User
router.get("/:id", (req,res) => {UserController.getId(req,res)});

//Creates a new Application
router.post("/Application",(req,res)=>{UserController.newApplication(req,res)});

//Delete User
router.delete("/:id",(req,res)=>{UserController.delete(req,res)});

module.exports = router;