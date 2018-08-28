const express = require("express");
const router = express.Router();
const {Listing} = require("../../DB/Schemas.js").MYMODELS;
router.get("/",(req,res,next) =>{

    Listing.find().then((Listings)=>{
        res.send({Listings});
    },(err)=>{
        res.status(400).send(err);
    });
});

module.exports = router;