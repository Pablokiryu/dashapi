const express = require("express");
const router = express.Router();
const {User,Listing,Application} = require("./../../DB/Schemas.js").MYMODELS;

/// Used to Include new users
router.post("/",(req,res)=>{

    var user = new User({
        name: req.body.name
    });

    user.save().then((doc)=>
    {
        res.status(201).send({createdUser:doc,GetURl:`localhost/Users/${doc._id}`});
    },(err)=>{
        res.status(400).send(err);
    });
});
///Returns FULL JSON data on all users
router.get("/", (req, res, next) => {

    User.find().then((users)=>{

        res.status(200).json({total_User_count : users.length,users: users });
    },(err)=>{
        res.status(400).send(err);
    });

});


//Returns info on selected User
router.get("/:id", (req, res, next) => {
    
    const nid = req.params.id;
    console.log(nid);
    User.find({_id:nid}).select("name _id applications count createdAt").then((User)=>{
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

// Apply to a new Listing
//New Application doc is created on DB
//setting the reference to the Existing Listing ID.
// User.Application is appended the new Application
router.post("/Application",(req,response)=>{

    var newApplication = new Application({
        UserId : req.body.userId, 
        coverLetter : req.body.coverLetter,
        listing    : {_id:req.body.listingId}
    });
    var user;
    newApplication.save()
    .then((savedoc)=>{ newApplication = savedoc;
        console.log(newApplication);
        return User.findById(req.body.userId).exec()})
    .then((userFromDb) =>{
        user = userFromDb;
        user.applications.unshift(newApplication._id);
        user.count++;
        return user.save();
    }).then(() =>
    {
        response.status(201).send({
            Application: newApplication,
            User : user,
            UserGETUrl: `localhost/Users/${user._id}`
        });
    })
    .catch((err)=>{
        response.status(400).send(err);
    });
});



//Delete User?
router.delete("/:id", (req, res, next) => {
    ///TODO: Delete user with corresponding id.
    const id = req.params.id;
    User.deleteOne({_id:id}).then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({error:err});
    });
});

module.exports = router;