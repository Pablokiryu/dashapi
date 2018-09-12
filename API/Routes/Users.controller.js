const {User,Listing,Application} = require("../../DB/Schemas.js").MYMODELS;


exports.get = function(req,res){
    User.find().then((users)=>{
        res.status(200).json({total_User_count : users.length,users: users });
    },(err)=>{
        res.status(400).send(err);
    });
}

exports.post = function (req,res){
    var user = new User({
        name: req.body.name
    });
    user.save().then((doc)=>
    {
        res.status(201).send({createdUser:doc,GetURl:`localhost/Users/${doc._id}`});
    },(err)=>{
        res.status(400).send(err);
    });
}

exports.getId = function(req,res){
    const nid = req.params.id;
    console.log(nid);
    User.find({_id:nid}).select("name _id applications count createdAt").then((User)=>{
        res.send({User});
    },(err)=>{
        res.status(400).send(err);
    });
}

// Apply to a new Listing
//New Application doc is created on DB
//setting the reference to the Existing Listing ID.
// User.Application is appended the new Application
exports.newApplication= function(req,res){
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
        res.status(201).send({
            Application: newApplication,
            User : user,
            UserGETUrl: `localhost/Users/${user._id}`
        });
    })
    .catch((err)=>{
        res.status(400).send(err);
    });
}

exports.delete = function (req,res) {
        const id = req.params.id;
        User.deleteOne({_id:id}).then((result)=>{
            res.status(200).json(result);
        }).catch((err)=>{
            console.log(err);
            res.status(500).json({error:err});
        });
}