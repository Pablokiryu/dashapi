const express = require("express");
const router = express.Router();
const myModels = require("../../DB/Schemas.js").MYMODELS; // use Object Destructuring later :D 
const mongoose = require("mongoose");
const mySchemes = require("../../DB/Schemas.js").MYSCHEMES;


router.post("/", (req, res, next) => {
    
    const name = req.query.name;
    const description = req.query.description;
    
    var newListing = new myModels.Listing;

    newListing.name = name;
    newListing.description = description;


    newListing.save((err) => {
        if (err) throw err;
        console.log("New Listing : " + newListing.name + " saved to DB successfully");
    })

    res.status(201).json({
        message: "Handling Post Request Listings route",
    });
});

router.get("/",(req,res,next) =>{

    myModels.Listing.find().then((Listings)=>{
        res.send({Listings});
    },(err)=>{
        res.status(400).send(err);
    });
});

module.exports = router;