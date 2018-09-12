const {Listing} = require("../../DB/Schemas.js").MYMODELS;

exports.get = function(req,res){
    Listing.find().then((Listings)=>{
        res.send({Listings});
    },(err)=>{
        res.status(400).send(err);
    });
};

exports.getId = function(req,res){
    const nid = req.params.id;
    Listing.find({_id:nid}).select("_id name description createdAt").then((Listing)=>{
        res.send({Listing});
    },(err)=>{
        res.status(400).send(err);
    });
};

exports.post = function(req,res)
{
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
};

exports.delete = function(req,res){
    const id = req.params.id;
    Listing.deleteOne({_id:id}).then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({error:err});
    });
};