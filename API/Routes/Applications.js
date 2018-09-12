const express = require("express");
const router = express.Router();
const ApplicationsController = require("./Applications.controller.js");

router.get("/",(req,res,next)=>{ApplicationsController.get(req,res)});

router.get("/:id", (req, res, next) => { ApplicationsController.getId(req,res)});

router.delete("/:id",(req,res,next)=>{ApplicationsController.delete(req,res)});

module.exports = router;