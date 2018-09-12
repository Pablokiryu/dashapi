const express = require("express");
const router = express.Router();
const ListingController = require("./Listings.controller.js");

router.get("/",(req,res) =>{ListingController.get(req,res)});

router.get("/:id",(req,res) =>{ListingController.getId(req,res)});

router.post("/",(req,res)=>{ListingController.post(req,res)});

router.delete("/:id", (req, res, next) => {ListingController.delete(req,res)});

module.exports = router;