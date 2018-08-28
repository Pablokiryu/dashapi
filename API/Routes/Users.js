const express = require("express");
const router = express.Router();
const {User,Listing,Application} = require("./../../DB/Schemas.js").MYMODELS;

///Returns FULL JSON data on all users
router.get("/", (req, res, next) => {

    User.find().then((users)=>{
        res.status(200).json(users);
    },(err)=>{
        res.status(400).send(err);
    });

});

/// Used to Include new users
router.post("/",(req,res)=>{

    var user = new User({
        name: req.body.name
    });

    user.save().then((doc)=>
    {
        res.send(doc);
    },(err)=>{
        res.status(400).send(err);
    });
});

//Returns info on selected User
router.get("/:id", (req, res, next) => {
    
    const nid = req.params.id;
    console.log(nid);
    User.find({_id:nid}).then((User)=>{
        res.send({User});
    },(err)=>{
        res.status(400).send(err);
    });
    // var users = User.find();
    // res.status(200).json({
    //     message: "You selected User ID " + id,
    //     id: id,
    //     // users: users

});

//Insert new Listing by user
//New listing doc is created on DB,
//User.Listings is appended new Listing
//User.Count should be incremented by 1.
//Done
router.post("/Listing",(req,res)=>{
    // res.send({message: `${req.body.id} is trying to add a new Listin`});
    
    var newListing = new Listing({
        name: req.body.name,
        description : req.body.description
    });
    newListing.save().then((doc)=>
    {
        User.update({_id:req.body.id},{ $push: {createdListings:{$each :[doc._id],$position: 0}}, $inc:{count:1} },(err,res)=>
        {
            if(err) return err;
            console.log(res);
        });
        
        res.send(doc);
    },(err)=>{
        res.status(400).send(err);
    });
});

// Apply to a new Listing
//New Application doc is created on DB
//setting the reference to the Existing Listing ID.
// User.Application is appended the new Application
router.post("/Application",(req,res)=>{

    var newApplication = new Application({
        coverLetter : req.body.coverLetter,
        listing     : req.body.listingId
    });

    newApplication.save().then((doc)=>{
        User.update({_id:req.body.id},{$push: {applications:{$each :[doc._id],$position: 0}} },(err,res)=>
        {
            if(err) return err;
            console.log(res);
        });
        
        res.send(doc);
    },(err)=>{
        res.status(400).send(err);
    });
    console.log({message: `${req.body.id} is trying to apply to a new Listing, therefore creating a new application`});
    
});



//Delete User?
router.delete("/:id", (req, res, next) => {
    ///TODO: Delete user with corresponding id.
    //Delete it's listings? make the user in the listing Doc null? so many questions.
    const id = req.params.id;
    User.deleteOne({_id:id}).then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({error:err});
    });
});

module.exports = router;