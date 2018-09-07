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

router.get("/:id",(req,res) =>{
    const nid = req.params.id;
    Listing.find({_id:nid}).select("_id name description createdAt").then((Listing)=>{
        res.send({Listing});
    },(err)=>{
        res.status(400).send(err);
    });
});


//New listing doc is created on DB,
//Done
router.post("/",(req,res)=>{
    // res.send({message: `${req.body.id} is trying to add a new Listin`});
    
    var newListing = new Listing({
        name: req.body.name,
        description : req.body.description
    });
    newListing.save().then((doc)=>
    {
            res.status(201).send({newListing : doc,getURL : `localhost/Listings/${doc._id}` });
    },(err)=>{
        res.status(400).send(err);
    });
});

router.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    Listing.deleteOne({_id:id}).then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({error:err});
    });
});

module.exports = router;